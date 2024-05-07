import { useCallback, useEffect } from 'react';
import type { RefObject } from 'react';

/**
 * @name Handler
 * This is a TypeScript type that represents a function that takes a MouseEvent as its only parameter
 * and returns void.
 *
 * @example
 * const handleClick: Handler = (event) => {
 *   console.log(event.target);
 * };
 */
type Handler = (event: MouseEvent) => void;

/**
 * @name useClickOutside
 *
 * This is a TypeScript function that listens for clicks outside of a specified element or array of
 * elements and triggers a callback function when a click occurs outside of the element(s).
 * @param {RefObject<T> | RefObject<T>[]} ref - A RefObject or an array of RefObjects that refer to the
 * element(s) that should trigger the callback when a click event occurs outside of them.
 * @param {Handler} callback - The callback function that will be called when a click event occurs
 * outside of the specified element(s) referenced by the ref parameter.
 *
 * @example
 * const ref = useRef(null);
 *
 * useClickOutside(ref, () => {
 *  console.log('Clicked outside of the element');
 * });
 *
 * @example
 * const ref1 = useRef(null);
 * const ref2 = useRef(null);
 *
 * useClickOutside([ref1, ref2], () => {
 *  console.log('Clicked outside of the elements');
 * });
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
	ref: RefObject<T> | RefObject<T>[],
	callback: Handler
) {
	const isServer = typeof window === 'undefined';

	const handleClick = useCallback(
		(e: MouseEvent) => {
			const isClickOutside = Array.isArray(ref)
				? !ref.some((r) => r?.current && r.current?.contains(e.target as Node))
				: ref?.current && !ref.current.contains(e.target as Node);

			if (isClickOutside) {
				callback(e);
			}
		},
		[callback, ref]
	);

	useEffect(() => {
		if (isServer) {
			return;
		}

		document.addEventListener('click', handleClick);
		return () => document.removeEventListener('click', handleClick);
	}, [handleClick, isServer]);
}
