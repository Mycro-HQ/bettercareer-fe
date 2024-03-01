import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom';

import { useIsomorphicLayoutEffect, generateUUID } from '../../../utils';
import type { NativeElementProps } from '../../../utils/types/utility';

interface EphemeralPortalProps extends NativeElementProps<'div'> {
	/**
	 * The root element to mount the portal to
	 */
	root?: Element;
}

/**
 * EphemeralPortal is a component that is used to render a portal that is
 * removed from the DOM when the component unmounts.
 *
 * @param {EphemeralPortalProps} props - The EphemeralPortal props
 * @returns {JSX.Element} - The EphemeralPortal component
 *
 * @example
 * <EphemeralPortal>
 *  <div>Content</div>
 * </EphemeralPortal>
 */

export const EphemeralPortal: React.FC<EphemeralPortalProps> = (props) => {
	const { children, className = '', style = {}, root } = props;

	const portalID = useMemo(() => generateUUID(), []);

	const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(
		null
	);

	useIsomorphicLayoutEffect(() => {
		const container = document.createElement('div');

		container.dataset.amLabsEphemeralPortal = portalID;
		if (className) container.className = className;

		for (const cssProperty of Object.keys(style)) {
			(container.style as any)[cssProperty] = (style as any)[cssProperty];
		}

		(root || document.body).appendChild(container);
		setPortalElement(container);

		return () => container.remove();
	}, [root, className, JSON.stringify(style)]);

	return portalElement ? (
		<>{ReactDOM.createPortal(children, portalElement)}</>
	) : null;
};
