import React from 'react';
import styles from './visually-hidden.module.scss';

interface IVisualHiddenProps {
	children: React.ReactNode;
}

/**
 * Visually hidden component used to hide
 * elements on screen
 */

const VisuallyHidden: React.FC<IVisualHiddenProps> = ({
	children,
	...delegated
}) => {
	const [forceShow, setForceShow] = React.useState(false);
	React.useEffect(() => {
		if (process.env.NODE_ENV !== 'production') {
			const handleKeyDown = (ev: KeyboardEvent) => {
				if (ev.key === 'Alt') {
					setForceShow(true);
				}
			};
			const handleKeyUp = (ev: KeyboardEvent) => {
				if (ev.key === 'Alt') {
					setForceShow(false);
				}
			};
			window.addEventListener('keydown', handleKeyDown);
			window.addEventListener('keyup', handleKeyUp);
			return () => {
				window.removeEventListener('keydown', handleKeyDown);
				window.removeEventListener('keyup', handleKeyUp);
			};
		}
	}, []);

	if (forceShow) {
		return children as React.ReactElement;
	}

	return (
		<span className={styles.VisuallyHidden} {...delegated}>
			{children}
		</span>
	);
};

export default VisuallyHidden;
