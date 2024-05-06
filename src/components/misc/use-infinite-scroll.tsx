import { useCallback, useEffect, useMemo } from 'react';
import { CallToAction, Flex, Spinner, useMediaQuery } from '@labs';

type InfiniteScrollOptions = {
	hasMore: boolean;
	isRootLoading?: boolean;
	ref?: any;
	skip?: boolean;
	useButton?: boolean;
};

// A utility function to convert a callback into a promise
const promisify = (callback: any) => {
	return new Promise((resolve) => {
		callback();
		return resolve(null);
	});
};

let passiveSupported: boolean | null = null;

export function passiveOption() {
	if (passiveSupported !== null) {
		return passiveSupported ? { passive: true } : false;
	}

	try {
		const options = Object.defineProperty({}, 'passive', {
			get() {
				passiveSupported = true;
			},
		});

		(window as any).addEventListener('test', null, options);
		(window as any).removeEventListener('test', null, options);
	} catch (err) {
		passiveSupported = false;
	}

	return passiveSupported ? { passive: true } : false;
}

export const useInfiniteScroll = (
	callback: () => void,
	options?: Partial<InfiniteScrollOptions>
) => {
	const FOOTER_HEIGHT = 310;

	const isMediaMatch = useMediaQuery('md', 'lessThan') || options?.useButton;
	const { hasMore, isRootLoading, ref, skip, useButton } = options || {
		hasMore: true,
		isRootLoading: false,
		ref: null,
		skip: false,
		useButton: false,
	};

	const isMediaMatchOrUseButton = useMemo(() => {
		if (skip) return false;
		if (useButton) return true;

		return !isMediaMatch;
	}, [useButton, isMediaMatch, skip]);

	const scrollSelector = useCallback(() => {
		if (ref?.current) {
			const { scrollTop, scrollHeight, clientHeight } = ref.current;

			return {
				isBottom:
					scrollTop + clientHeight >= scrollHeight - (FOOTER_HEIGHT - 300),
				scrollTop,
				el: ref.current,
			};
		}

		return {
			isBottom:
				window.innerHeight + window.pageYOffset >=
				document.documentElement.scrollHeight - FOOTER_HEIGHT,
			scrollTop: window.pageYOffset,
			el: document.documentElement,
		};
	}, [ref]);

	const handleScroll = useCallback(() => {
		if (skip) return;
		if (isRootLoading || !hasMore) return;

		if (!isMediaMatchOrUseButton) {
			if (scrollSelector().isBottom && !isRootLoading) {
				promisify(callback).then(() => {});
			}
		}
	}, [
		callback,
		hasMore,
		isMediaMatchOrUseButton,
		isRootLoading,
		scrollSelector,
		skip,
	]);

	useEffect(() => {
		const scroll_options = passiveOption();

		if (ref?.current) {
			/**
			 * At this point we are trying to attach the scroll event to the ref instead
			 * @see ref def
			 */
			const compRef = ref.current;

			compRef.addEventListener('scroll', handleScroll, scroll_options);
			return () => compRef.removeEventListener('scroll', handleScroll);
		}

		window.addEventListener('scroll', handleScroll, scroll_options);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll, isMediaMatchOrUseButton, ref]);

	const InfiniteLoader = () => {
		if (options && !options?.hasMore && options?.useButton && !isRootLoading)
			return;

		return isRootLoading ? (
			<Spinner
				center
				style={{
					margin: '3rem 0 1rem',
				}}
				size={30}
				spinner="logo"
				text="Loading..."
			/>
		) : (
			<>
				{isMediaMatchOrUseButton && options?.hasMore && (
					<Flex
						justifyContent="center"
						css={{
							margin: '1.5rem 0',
						}}
					>
						<CallToAction.button onClick={() => callback()}>
							Load more
						</CallToAction.button>
					</Flex>
				)}
			</>
		);
	};

	return {
		Loader: InfiniteLoader,
	};
};

export default useInfiniteScroll;
