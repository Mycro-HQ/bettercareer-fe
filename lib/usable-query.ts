import { AxiosRequestConfig } from 'axios';
import {
	InvalidateQueryFilters,
	QueryClient,
	UseInfiniteQueryOptions,
	UseMutationOptions,
	UseQueryOptions,
	useInfiniteQuery,
	useMutation,
	useQuery,
} from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import queryString from 'query-string';
import { useEffect } from 'react';

import { queryClient } from './query-client';
import { baseQueryFn } from './base-query';

type ListenerConfig<TData = unknown, TError = unknown> = {
	matches: (action: { type: 'query' | 'mutation'; key: string }) => boolean;
	performAction: (action: {
		type: 'query' | 'mutation';
		key: string;
		state: 'success' | 'error' | 'loading';
		data?: TData;
		error?: TError;
	}) => void;
};

type ListenerAction<TData = unknown, TError = unknown> = {
	onSuccess: (data: TData, variable?: void, context?: TData) => void;
	onError: (error: TError, variable?: void, context?: TData) => void;
	onSettled: (
		data: TData,
		error: TError,
		variable?: void,
		context?: TData
	) => void;
	onStart: () => void;
};

type QueryDefinition<Args, ResultType> = {
	key?: string;
	isInfinite?: boolean;
	queryFn: (args: Args) => AxiosRequestConfig<ResultType>;
	transformResponse?: (response: any) => any;
};

type MutationDefinition<Args, ResultType> = {
	key?: string;
	mutationFn: (args: Args) => AxiosRequestConfig<ResultType>;
	invalidatesQueries?: unknown[];
	setCache?: (
		queryClient: QueryClient,
		action: {
			data: ResultType;
			variable: Args;
			context: any;
		}
	) => void;
	transformResponse?: (response: any) => any;
};

type Endpoints = Record<
	string,
	QueryDefinition<any, any> | MutationDefinition<any, any>
>;

type SmartQueryHook<
	K extends unknown,
	Z extends 'Query' | 'Mutation' = 'Query',
> = `use${Capitalize<K extends string ? K : never>}${Z}`;

type SmartApiDefinition<
	K extends keyof Endpoints,
	Definitions extends Endpoints,
	Z extends true | false = true,
> =
	Definitions[K] extends QueryDefinition<infer Args, infer ResultType>
		? Z extends true
			? ((
					args: Args,
					options?: UseQueryOptions<ResultType>
				) => ReturnType<typeof useQuery<ResultType>> &
					Omit<
						ReturnType<typeof useInfiniteQuery<ResultType>>,
						'data' | 'error'
					>) & {}
			: (options: Args, extra?: unknown) => Promise<ResultType>
		: Definitions[K] extends MutationDefinition<infer Args, infer ResultType>
			? (
					options?: UseMutationOptions<ResultType, unknown, Args>
				) => ReturnType<typeof useMutation<ResultType, unknown, Args>>
			: never;

type SmartApi<Definitions extends Endpoints> = {
	[K in keyof Definitions]: SmartApiDefinition<
		K extends string ? K : never,
		Definitions,
		false
	>;
} & {
	[T in keyof Definitions as SmartQueryHook<
		string & T,
		Definitions[T] extends QueryDefinition<any, any> ? 'Query' : 'Mutation'
	>]: SmartApiDefinition<T extends string ? T : never, Definitions, true>;
} & {
	startListening: (listenerConfig: ListenerConfig) => void;
};

/**
 * A function that creates a smart API from a set of endpoints.
 * @param endpoints The endpoints to create a smart API from.
 * @returns A smart API.
 *
 * @example
 * ```ts
 * import { createSmartApi } from '@lib/smart-query';
 *
 * const authApiCreator = createSmartApi({
 *  endpoints: (builder) => ({
 *   login: builder.mutation<{ username: string; password: string }, { token: string }>({
 *   key: 'login',
 *  mutationFn: ({ username, password }) => ({
 *   url: '/auth/login',
 *  method: 'POST',
 * data: { username, password },
 * }),
 *
 *
 * export {useLoginMutation} = authApiCreator;
 */
export const createSmartApi = <Definitions extends Endpoints>(options: {
	key?: string;
	endpoints: (builder: {
		query: <Args, ResultType>(
			definition: QueryDefinition<Args, ResultType>
		) => QueryDefinition<Args, ResultType>;
		mutation: <Args, ResultType>(
			definition: MutationDefinition<Args, ResultType>
		) => MutationDefinition<Args, ResultType>;
	}) => Definitions;
}) => {
	const { endpoints } = options;
	const builder = {
		query: <Args, ResultType>(definition: QueryDefinition<Args, ResultType>) =>
			definition,
		mutation: <Args, ResultType>(
			definition: MutationDefinition<Args, ResultType>
		) => definition,
	};

	const apiDefinitions = endpoints(builder!);

	const smartApi = {} as SmartApi<Definitions>;
	const listeners: ListenerConfig[] = [];

	const { startListening, buildListeners } = smartListen(listeners);

	type HookName<K extends string> = `use${Capitalize<K>}${K extends any
		? 'Query'
		: 'Mutation'}`;

	for (const [key, definition] of Object.entries(apiDefinitions)) {
		const hookName = `use${capitalizeFirstLetter(key)}${
			'queryFn' in definition ? 'Query' : 'Mutation'
		}` as HookName<typeof key>;

		if ('queryFn' in definition) {
			(smartApi as any)[key] = (
				args: any,
				options?: UseQueryOptions<any> & {
					extra?: {
						req?: GetServerSidePropsContext['req'];
						headers?: Record<string, string>;
						cookies?: Record<string, string>;
					};
				}
			) => {
				const { extra, ...rest } = options || {};
				/**
				 * We want to use the queryClient directly here instead of the useQuery hook
				 * for use cases where we want to use the queryClient outside of a React component.
				 */
				return queryClient.fetchQuery({
					queryKey: [definition.key, key, args],
					queryFn: () => {
						if (typeof definition.transformResponse === 'function') {
							return definition.transformResponse(
								baseQueryFn({
									...(definition.queryFn(args) as any),
									token: extra?.req?.cookies?.token || extra?.cookies?.token,
									headers: extra?.req?.headers || extra?.headers,
								})
							);
						}

						return baseQueryFn({
							...(definition.queryFn(args) as any),
							token: extra?.req?.cookies?.token || extra?.cookies?.token,
							headers: extra?.req?.headers || extra?.headers,
						});
					},
					...rest,
				});
			};

			type UseQueryOptionsType = typeof definition.isInfinite extends true
				? UseInfiniteQueryOptions<any>
				: UseQueryOptions<any>;

			(smartApi as any)[hookName] = (
				args?: any,
				options?: UseQueryOptionsType & {
					onError?: (error: unknown) => void;
				}
			) => {
				const isInfinite = definition.isInfinite;

				const _options = {
					...options,
					onError: (error: unknown) => {
						return options?.onError?.(error);
					},
				} as UseQueryOptionsType;

				// eslint-disable-next-line react-hooks/rules-of-hooks
				return useCustomQuery(
					{
						queryFn: (context: any) => {
							const queryOptions = definition.queryFn(args);
							if (typeof definition.transformResponse === 'function') {
								return definition.transformResponse(
									baseQueryFn(definition.queryFn(queryOptions) as any)
								);
							}

							return baseQueryFn(
								isInfinite && context?.pageParam
									? {
											...queryOptions,
											url: queryString.stringifyUrl({
												url: queryOptions?.url!,
												query: {
													...args,
													cursor: `next.${context?.pageParam}`,
												},
											}),
										}
									: (queryOptions as any)
							);
						},

						...(isInfinite && {
							getNextPageParam: (lastPage: any) => {
								return lastPage?.pagination?.next;
							},

							select: (data: any) => {
								return data?.pages
									?.flatMap((page: any) => page)
									?.reduce((acc: any, curr: any) => {
										Object.keys(curr).forEach((key) => {
											if (Array.isArray(curr[key])) {
												acc[key] = [...(acc[key] || []), ...curr[key]];
											} else {
												acc[key] = curr[key];
											}
										});

										return acc;
									}, {});
							},
						}),

						..._options,
						queryKey: [definition.key, key, args].filter(Boolean),
						...buildListeners('query', _options!, definition),
					},
					{ type: isInfinite ? 'infiniteQuery' : 'query' }
				);
			};
		} else if ('mutationFn' in definition) {
			(smartApi as any)[hookName] = (
				options?: UseMutationOptions<any, unknown, any>
			) => {
				const _options = {
					...options,
					onError: (error: unknown, variable: unknown, mutation: unknown) => {
						return options?.onError?.(error, variable, mutation);
					},
				} as UseMutationOptions<any, unknown, any>;

				// eslint-disable-next-line react-hooks/rules-of-hooks
				return useMutation({
					mutationKey: [key, definition.key].filter(Boolean),
					mutationFn: (args: any) => {
						if (typeof definition.transformResponse === 'function') {
							return definition.transformResponse(
								baseQueryFn(definition.mutationFn(args) as any)
							);
						}

						return baseQueryFn(definition.mutationFn(args) as any);
					},

					..._options,
					...buildListeners('mutation', _options!, definition),
				});
			};
		}
	}

	return {
		...smartApi,
		startListening,
	};
};

/**
 * A function that creates a smart Listener API from a set of endpoints.
 *
 * @param listeners The listeners to create a smart API from.
 * @returns A smart Listener API.
 *
 * @example
 * import { createSmartApi } from '@lib/smart-query';
 *
 * const authApiCreator = createSmartApi({
 *  endpoints: (builder) => ({
 *   login: builder.mutation<{ username: string; password: string }, { token: string }>({
 *   key: 'login',
 *  mutationFn: ({ username, password }) => ({
 *   url: '/auth/login',
 *  method: 'POST',
 * data: { username, password },
 * }),
 *
 * export {useLoginMutation} = authApiCreator;
 *
 * authApiCreator.startListening({
 *  matches: (action) => action.key === 'login',
 *  performAction: (action) => {
 *   if (action.state === 'success') {
 *    console.log(`Login successful:`, action.data);
 *   } else if (action.state === 'error') {
 *    console.error(`Login failed:`, action.error);
 *   } else if (action.state === 'loading') {
 *    console.log(`Login started`);
 *   }
 *  },
 * });
 */
const smartListen = <TData = unknown, TError = unknown>(
	listeners: Array<ListenerConfig<TData, TError>>
) => {
	const startListening = (listenerConfig: ListenerConfig) => {
		listeners.push(listenerConfig);
	};

	const stopListening = (listenerConfig: ListenerConfig) => {
		/**
		 * We want to eminently stop listening to the listenerConfig after it has performed its action.
		 *
		 */
		const index = listeners.indexOf(listenerConfig);
		if (index > -1) {
			listeners.splice(index, 1);
		}
	};

	const notifyListeners = (action: {
		type: 'query' | 'mutation';
		key: string;
		state: 'success' | 'error' | 'loading';
		data?: any;
		error?: any;
	}) => {
		// Map each listener to a promise
		const promises = listeners.map((listener) => {
			if (listener.matches(action)) {
				return (
					listener.performAction(action) as unknown as Promise<void>
				).then((e) => {
					if (action.state === 'success') {
						stopListening(listener as ListenerConfig);
					}
				});
			}

			return Promise.resolve();
		});

		return Promise.all(promises);
	};

	const buildListeners = <T extends 'query' | 'mutation'>(
		type: 'query' | 'mutation',
		options: (T extends 'query'
			? UseQueryOptions<any>
			: UseMutationOptions<any>) & {
			onSuccess?: (data: any, variable?: void, context?: any) => void;
			onError?: (error: any, variable?: void, context?: any) => void;
			onSettled?: (
				data: any,
				error: any,
				variable?: void,
				context?: any
			) => void;
		},
		definition: T extends 'query'
			? QueryDefinition<any, any>
			: MutationDefinition<any, any>
	): ListenerAction => ({
		onStart: () => {
			notifyListeners({ type, key: definition?.key || '', state: 'loading' });
		},
		onSuccess: async (data, variable, mutation) => {
			await notifyListeners({
				type,
				key: definition?.key || '',
				state: 'success',
				data,
			});

			if (
				typeof (definition as MutationDefinition<any, any>).setCache ===
				'function'
			) {
				(definition as any).setCache(queryClient, {
					data,
					variable,
					mutation,
				});
			}

			if ((definition as MutationDefinition<any, any>).invalidatesQueries) {
				(
					definition as MutationDefinition<any, any>
				)?.invalidatesQueries?.forEach((queryKey) => {
					queryClient.invalidateQueries({
						queryKey: queryKey as InvalidateQueryFilters[],
					});
				});
			}

			options?.onSuccess?.(data, variable, mutation);
		},
		onError: async (error, variable, mutation) => {
			await notifyListeners({
				type,
				key: definition.key || '',
				state: 'error',
				error,
			});

			options?.onError?.(error, variable, mutation);
		},
		onSettled: async (data, error, variable, context) => {
			// onSettled is called whether the query was successful or not
			const state = error ? 'error' : 'success';
			await notifyListeners({
				type,
				key: definition.key || '',
				state,
				data,
				error,
			});
			options?.onSettled?.(data, error, variable, context);
		},
	});

	return {
		startListening,
		buildListeners,
	};
};

function useCustomQuery(
	queryOptions: any,
	definition: {
		type: 'query' | 'mutation' | 'infiniteQuery';
	}
) {
	// Determine if it's a query or a mutation based on the provided definition
	const isQuery = definition.type === 'query';
	const useQueryOrMutation: any = isQuery
		? definition.type === 'infiniteQuery'
			? useInfiniteQuery
			: useQuery
		: useMutation;

	const result = useQueryOrMutation({
		...queryOptions,
	});

	// Effect hooks to handle onSuccess and onError logic
	useEffect(() => {
		if (result.isSuccess && queryOptions.onSuccess) {
			queryOptions.onSuccess(result.data);
		}
		if (result.isError && queryOptions.onError) {
			queryOptions.onError(result.error);
		}
	}, [result.isSuccess, result.isError, result.data, result.error]);

	return result;
}

function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
