import React from 'react';
import { Spinner, VisuallyHidden, Empty } from '@labs';
import type { EmptyProps } from '@labs';
import useInfiniteScroll from './use-infinite-scroll';

interface FetchContainerProps {
	children: React.ReactNode;
	shouldBeEmpty: boolean;
	emptyMessage?: string;
	isLoading?: boolean;
	emptyProps?: Omit<EmptyProps, 'message'>;
	closeChildOnLoading?: boolean;
	closeChildrenOnEmpty?: boolean;
	fetchNextPage?: () => void;
	hasMore?: boolean;
	skip?: boolean;
	useButton?: boolean;
	emptyActions?: React.ReactNode;
}

export const FetchContainer: React.FC<FetchContainerProps> = ({
	children,
	shouldBeEmpty,
	emptyMessage = 'No results found.',
	emptyProps,
	closeChildrenOnEmpty,
	closeChildOnLoading,
	isLoading,
	fetchNextPage,
	hasMore,
	skip,
	useButton,
	emptyActions,
}) => {
	const [isVisible, setIsVisible] = React.useState(false);
	const loaderRef = React.useRef<HTMLDivElement>(null);
	const { Loader: InfiniteLoader } = useInfiniteScroll(
		() => {
			if (fetchNextPage) {
				fetchNextPage();
			}
		},
		{
			hasMore,
			useButton,
			isRootLoading: isLoading,
			skip,
		}
	);

	React.useEffect(() => {
		const _loaderRef = loaderRef.current;
		const observer = new IntersectionObserver(
			([entry]) => setIsVisible(entry.isIntersecting),
			{
				threshold: 0.5,
			}
		);
		const currentLoaderRef = loaderRef.current;
		if (currentLoaderRef) observer.observe(currentLoaderRef);

		return () => {
			if (currentLoaderRef) observer.unobserve(currentLoaderRef);
		};
	}, [loaderRef]);

	if (closeChildrenOnEmpty && shouldBeEmpty && !isLoading) return null;

	return (
		<>
			{(!isVisible || !fetchNextPage) && isLoading ? (
				<Spinner center size={30} spinner="logo" />
			) : null}

			{closeChildOnLoading ? (
				<VisuallyHidden>
					<>{children}</>
				</VisuallyHidden>
			) : (
				children
			)}

			<div ref={loaderRef}>
				{fetchNextPage ? (
					<>
						{shouldBeEmpty && !isLoading ? (
							<Empty message={emptyMessage} {...emptyProps}>
								{emptyActions}
							</Empty>
						) : (
							<InfiniteLoader />
						)}
					</>
				) : !fetchNextPage && !isLoading ? (
					<>
						{shouldBeEmpty && (
							<Empty message={emptyMessage} {...emptyProps}>
								{emptyActions}
							</Empty>
						)}
					</>
				) : null}
			</div>
		</>
	);
};

export default FetchContainer;
