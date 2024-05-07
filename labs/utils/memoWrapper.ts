import { memo, MemoExoticComponent } from 'react';

/**
 * Wraps `memo` and applies a semantic `displayName` and
 * `defaultProps` without side effects.
 */

export function memoWrapper<T, P = {}>(
	name: string,
	definitelyRender?: React.FC<P>
): MemoExoticComponent<React.FC<P>> {
	const pristineComponent = memo(definitelyRender!);
	pristineComponent.displayName = name;
	return pristineComponent;
}
