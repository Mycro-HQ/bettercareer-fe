/**
 * 📝 Notes for Contributors:
 *
 * @description
 *
 * - When creating an interactive component, we recommend consuming the
 * component hook created.
 * - Ensure the component is composable and can adapt to multiple use-cases
 *
 * Bootstrapped by Plop
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Slot } from '@radix-ui/themes';

type MediaQueryType =
	| 'xs'
	| 'sm'
	| 'md'
	| 'lg'
	| 'xl'
	| (string & NonNullable<unknown>);
type MediaQQueryType = 'lessThan' | 'greaterThan' | 'greaterThanOrEqual';

export interface MediaProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * The media query to be used for the component
	 */
	query: MediaQueryType;

	/**
	 * The type of query to be used for the component
	 */
	queryType?: MediaQQueryType;
}

const mediaQueries = (queryType: MediaQueryType = 'greaterThanOrEqual') => {
	const breakpoints = {
		xs: '(min-width: 0px)',
		sm: '(min-width: 576px)',
		md: '(min-width: 768px)',
		lg: '(min-width: 992px)',
		xl: '(min-width: 1280px)',
	};

	const reverseBreakpoints = {
		xs: '(max-width: 575.98px)',
		sm: '(max-width: 767.98px)',
		md: '(max-width: 991.98px)',
		lg: '(max-width: 1199.98px)',
		xl: '(max-width: 1280px)',
	};

	const inclusiveBreakpoints = {
		xs: '(min-width: 0px) and (max-width: 575.98px)',
		sm: '(min-width: 576px) and (max-width: 767.98px)',
		md: '(min-width: 768px) and (max-width: 991.98px)',
		lg: '(min-width: 992px) and (max-width: 1199.98px)',
		xl: '(min-width: 1280px)',
	};

	switch (queryType) {
		case 'lessThan':
			return breakpoints;
		case 'greaterThan':
			return reverseBreakpoints;
		case 'greaterThanOrEqual':
			return inclusiveBreakpoints;
		default:
			return {};
	}
};

/**
 * Responsible for rendering a media query component
 * @type {React.ForwardRefExoticComponent<MediaProps & React.RefAttributes<HTMLElement>>}
 * @interface MediaProps
 *
 * @param query The media query to be used for the component
 * @param queryType The type of query to be used for the component

 * @returns React.ReactElement
 *
 * @example
 * <Media query="sm" queryType="greaterThan">
 *  <div>Content</div>
 * </Media>
 *
 * <Media query="sm" queryType="lessThan">
 *  <div>Content</div>
 * </Media>
 */
export function Media(props: MediaProps) {
	const { query, queryType, children, ...otherProps } = props;
	const matches = useMediaQuery(query, queryType);
	const getDirectChildType = React.Children.toArray(children)[0] as unknown as {
		type: string;
		props: {
			href?: string;
		};
	};
	const canRenderAriaLabel =
		!getDirectChildType?.props?.href || getDirectChildType?.type !== 'button';

	return matches ? (
		<Slot
			aria-hidden={!matches}
			{...(canRenderAriaLabel && {
				'aria-label': `This element is ${
					['lessThan', 'greaterThan'].includes(queryType!)
						? 'hidden'
						: 'visible'
				} when this screen size is ${queryType} ${query}`,
			})}
			{...otherProps}
		>
			{children}
		</Slot>
	) : null;
}

export function useMediaQuery(
	query: MediaQueryType,
	queryType: MediaQQueryType = 'greaterThanOrEqual'
): boolean {
	const mediaQueryList = useMemo(() => {
		return query in mediaQueries(queryType)
			? mediaQueries(queryType)[query as keyof typeof mediaQueries]
			: query;
	}, [query, queryType]);

	const getMatches = useCallback((): boolean => {
		// Prevents SSR issues
		if (typeof window !== 'undefined') {
			return window.matchMedia(mediaQueryList).matches;
		}
		return false;
	}, [mediaQueryList]);

	const [matches, setMatches] = useState<boolean>(getMatches());

	const handleChange = useCallback(() => {
		setMatches(getMatches());
	}, [getMatches]);

	useEffect(() => {
		const matchMedia = window.matchMedia(mediaQueryList);

		// Triggered at the first client-side load and if query changes
		handleChange();

		// Listen matchMedia
		if (matchMedia.addListener) {
			matchMedia.addListener(handleChange);
		} else {
			matchMedia.addEventListener('change', handleChange);
		}

		return () => {
			if (matchMedia.removeListener) {
				matchMedia.removeListener(handleChange);
			} else {
				matchMedia.removeEventListener('change', handleChange);
			}
		};
	}, [handleChange, mediaQueryList]);

	return matches;
}

export default useMediaQuery;
