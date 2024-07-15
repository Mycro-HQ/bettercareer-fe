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
import React, { useEffect, useCallback, useRef } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { EphemeralPortal } from '../layout/ephemeral-portal';
import { useMediaQuery } from '../media';
import { forwardRefWrapper, generateUUID, getDataIcons } from '../../utils';
import type { NativeElementProps } from '../../utils/types/utility';

import styles from './modal.module.scss';

interface ModalParentProps extends NativeElementProps<'div'> {
	/**
	 * users can directly load the header component with the title prop
	 */
	title?: string;

	/**
	 * When set to `true` The modal will show itself.
	 */
	in?: boolean;

	/**
	 * Allow to different sizes of modal either large or small modal.
	 */
	size?: 'sm' | 'md' | 'lg' | 'xlg' | 'xxlg';

	/**
	 * vertically center the Modal content in the window
	 */
	centered?: boolean;
	/**
	 * Allow the modal to hug the content
	 */
	hug?: boolean;
	/**
	 * Allow users to close the modal by clicking on the backdrop
	 */
	dismissible?: boolean;

	/**
	 * Close the modal when escape key is pressed
	 */
	keyboard?: boolean;

	/**
	 * A callback fired to close modal and its backdrop
	 * Required
	 */
	onClose?: () => void;

	/**
	 * Enable double scrolling and allow users to scroll on body
	 */
	bodyScroll?: boolean;

	/**
	 * responsive fluid width
	 */
	fluid?: boolean;
	/**
	 * max height of the modal
	 */
	maxHeight?: boolean;
}
const MODAL_ID = generateUUID();
const ModalParent = forwardRefWrapper<HTMLDivElement, ModalParentProps>(
	'Modal',
	{
		keyboard: true,
	},
	(
		{
			in: inProp,
			size,
			children,
			keyboard,
			centered,
			onClose,
			title,
			hug,
			fluid,
			dismissible,
			bodyScroll,
			maxHeight,
			...rest
		},
		ref
	) => {
		const MODAL_HEADER_ID = generateUUID();
		const MODAL_BODY_ID = generateUUID();
		const isMobile = useMediaQuery('md', 'greaterThan');

		const closeOnEscapeKeyDown = useCallback(
			(e: KeyboardEvent) => {
				/**
				 * Return early if we user disables the keyboard interactions
				 */
				if (!keyboard) return;

				/**
				 * Close the modal when escape key is fired
				 */
				if (e.key === 'Escape' || e.key === 'Esc') {
					onClose?.();
				}
			},
			[onClose, keyboard]
		);

		useEffect(() => {
			document.body.addEventListener('keydown', closeOnEscapeKeyDown);
			return () => {
				document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
			};
		}, [closeOnEscapeKeyDown]);

		/**
		 * Create a focus trap for just focusable elements in the modal
		 */
		useEffect(() => {
			const currentFeedbackAreaLeft = getComputedStyle(
				document.documentElement
			).getPropertyValue('--feedback-area-left');

			if (inProp) {
				if (typeof window !== 'undefined')
					document.documentElement.style.setProperty(
						'--feedback-area-left',
						'0px'
					);

				/**
				 * Disable body scroll and attach focus to just the modal
				 */
				if (!bodyScroll || isMobile) document.body.style.overflow = 'hidden';
			}

			/**
			 * Cleanup all the DOM manipulation
			 */
			return () => {
				if (!bodyScroll || isMobile) document.body.style.overflow = 'auto';
				if (currentFeedbackAreaLeft !== '0px')
					document.documentElement.style.setProperty(
						'--feedback-area-left',
						currentFeedbackAreaLeft
					);
			};
		}, [inProp, bodyScroll, isMobile]);

		return (
			<AnimatePresence initial mode="wait">
				{inProp ? (
					<EphemeralPortal>
						<FocusScope>
							<section
								className={classNames([
									styles.ModalSection,
									fluid && styles.fluid,
								])}
								data-amlabs-modal-backdrop
								data-testid="modal-backdrop"
								{...rest}
							>
								<motion.div
									className={styles.ModalBackdrop}
									aria-hidden="true"
									data-amlabs-modal-backdrop
									exit={{ opacity: 0 }}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.02 }}
									key={MODAL_ID}
									onClick={dismissible ? onClose : undefined}
								/>
								<motion.div
									className={classNames([
										styles.Modal,
										centered && styles.centered,
										styles[size!],
										maxHeight && styles.maxHeight,
									])}
									data-amlabs-modal
									role="dialog"
									aria-modal={inProp}
									aria-hidden={!inProp}
									aria-labelledby={title && MODAL_HEADER_ID}
									aria-describedby={MODAL_BODY_ID}
									initial={{ opacity: 0, scale: 0.95, y: 10 }}
									exit={{
										opacity: 0,
										scale: 0.95,
										y: 0,
									}}
									animate={{ opacity: 1, scale: 1, y: -10 }}
									transition={{ duration: 0.2 }}
								>
									<div
										className={classNames([
											styles.ModalContent,
											hug && styles.hug,
											'custom-scrollbar',
										])}
										ref={ref}
									>
										{dismissible && (
											<div
												className={classNames([
													styles.ModalActionBar,
													title && styles.hasTitle,
												])}
											>
												<button
													aria-label="Close Modal"
													type="button"
													onClick={onClose}
													className={styles.Close}
												>
													<img
														src={getDataIcons('close', '#000')}
														aria-hidden="true"
														alt="close icon"
													/>
												</button>
											</div>
										)}

										{/* Check if we have title props and render ModalHeader */}

										<div id={MODAL_BODY_ID}>{children}</div>
									</div>
								</motion.div>
							</section>
						</FocusScope>
					</EphemeralPortal>
				) : null}
			</AnimatePresence>
		);
	}
);

ModalParent.displayName = 'Modal';
ModalParent.defaultProps = {
	in: false,
	keyboard: true,
	size: 'md',
	centered: false,
	bodyScroll: false,
};

interface ModalHeaderProps extends NativeElementProps<'div'> {
	title?: string;
	noBorder?: boolean;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
	title,
	children,
	noBorder,
	...rest
}) => {
	return (
		<div
			className={classNames([styles.ModalHeader, noBorder && styles.noBorder])}
			{...rest}
		>
			{children || <h3>{title}</h3>}
		</div>
	);
};

ModalHeader.displayName = 'Modal.Header';

const ModalFooter: React.FC<NativeElementProps<'div'>> = ({
	children,
	...rest
}) => {
	return (
		<div className={styles.Footer} {...rest}>
			{children}
		</div>
	);
};

ModalFooter.displayName = 'Modal.Footer';

interface ModalBodyProps extends NativeElementProps<'div'> {
	noPadding?: boolean;
}

const ModalBody: React.FC<ModalBodyProps> = ({
	children,
	noPadding,
	...rest
}) => {
	return (
		<div
			className={classNames([styles.ModalBody, noPadding && styles.noPadding])}
			{...rest}
		>
			{children}
		</div>
	);
};

ModalBody.displayName = 'Modal.Body';

interface FocusScopeProps {
	children: React.ReactNode;
}

const FocusScope: React.FC<FocusScopeProps> = ({ children }) => {
	const scopeRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Tab' && scopeRef.current) {
				event.preventDefault();
				const focusableElements = getFocusableElements(scopeRef.current);
				const currentIndex = focusableElements.indexOf(
					document.activeElement as HTMLElement
				);
				const nextIndex = event.shiftKey ? currentIndex - 1 : currentIndex + 1;
				const nextElement =
					focusableElements[nextIndex % focusableElements.length];
				if (nextElement) {
					(nextElement as HTMLElement).focus();
				}
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
		const focusableElements: HTMLElement[] = Array.from(
			container.querySelectorAll(
				'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
			)
		);
		return focusableElements.filter(
			(element) => !element.hasAttribute('disabled') && isVisible(element)
		);
	};

	const isVisible = (element: HTMLElement): boolean => {
		const rect = element.getBoundingClientRect();
		const viewHeight = Math.max(
			document.documentElement.clientHeight,
			window.innerHeight
		);
		return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
	};

	return <div ref={scopeRef}>{children}</div>;
};

export default FocusScope;

/**
 * Modal Component
 * @param {ModalParentProps} props
 * @returns {JSX.Element}
 *
 * @example
 * <Modal
 *    in={true}
 *    onClose={handleClose}
 *    title="Modal Title"
 * >
 *   <Modal.Header><h3>Modal Title</h3></Modal.Header>
 *   <Modal.Body><p>Modal Body</p></Modal.Body>
 *   <Modal.Footer><Button onClick={handleClose}>Close</Button></Modal.Footer>
 * </Modal>
 *
 */
export const Modal = Object.assign(ModalParent, {
	Header: ModalHeader,
	Footer: ModalFooter,
	Body: ModalBody,
});

ModalParent.defaultProps = {
	centered: true,
	size: 'md',
	dismissible: true,
	keyboard: true,
};
