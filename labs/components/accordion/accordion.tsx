// accordion.tsx
import React, {
	memo,
	PropsWithChildren,
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { Flex, Text } from '@labs/index';

import ArrowDown from '@labs/icons/dashboard/down.svg';

import styles from './accordion.module.scss';

interface AccordionProps extends PropsWithChildren {
	/**
	 * The title of the accordion
	 */
	title: string | ReactNode;
	/**
	 * The key of the accordion to be selected
	 */
	dataKey?: string;
	/**
	 * The theme of the accordion
	 */
	theme?: 'dark' | 'light';
	/**
	 * The size of the accordion
	 */
	size?: 'sm' | 'md' | 'lg';
	/**
	 * Component class name
	 */
	className?: string;
	/**
	 * leading icon
	 */
	leadingIcon?: React.ReactElement;
	/**
	 * trailing icon
	 */
	trailingIcon?: React.ReactElement;
}

const AccordionMain = memo<AccordionProps>(
	({
		title,
		children,
		theme = 'dark',
		size = 'sm',
		className,
		leadingIcon,
		trailingIcon,
	}) => {
		const [isOpen, setIsOpen] = useState(false);

		const onToggle = useCallback(() => {
			setIsOpen((prev) => !prev);
		}, []);

		const renderChildren = useCallback(
			(children: ReactNode) => (
				<AnimatePresence mode="wait">
					{isOpen && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: '100%' }}
							key={isOpen ? 'open' : 'closed'}
							transition={{ type: 'ease' }}
							className={styles.AccordionBody}
						>
							{children}
						</motion.div>
					)}
				</AnimatePresence>
			),
			[isOpen]
		);

		const accordionClassName = useMemo(
			() =>
				classNames([
					styles.Accordion,
					styles[theme],
					className,
					{
						[styles.isOpen]: isOpen,
						[styles[size]]: size,
					},
				]),
			[theme, className, isOpen, size]
		);

		return (
			<motion.div className={accordionClassName}>
				<button
					className={classNames([
						styles.AccordionHeader,
						isOpen && styles.isOpen,
					])}
					onClick={onToggle}
				>
					<Flex>
						<span
							className={styles.leadingIcon}
							role="button"
							tabIndex={0}
							aria-label="accordion_icon"
							onClick={(e) => e.stopPropagation()}
						>
							{leadingIcon}
						</span>
						{typeof title === 'string' ? (
							<Text.span weight={700}>{title}</Text.span>
						) : (
							title
						)}
					</Flex>

					<Flex gap={14}>
						<span
							className={styles.trailingIcon}
							role="button"
							tabIndex={0}
							aria-label="accordion"
							onClick={(e) => e.stopPropagation()}
						>
							{trailingIcon}
						</span>
						<ArrowDown className={styles.arrow} />
					</Flex>
				</button>
				{renderChildren(children)}
			</motion.div>
		);
	}
);

AccordionMain.displayName = 'Accordion';

interface AccordionGroupProps extends PropsWithChildren {
	/**
	 * Allows multiple accordions to be open at the same time
	 */
	allowMultiple?: boolean;
	/**
	 * default active key
	 */
	defaultActiveKey?: string | number;
}

export const useAccordionGroupState = (
	allowMultiple: boolean,
	defaultActiveKey?: string | number
) => {
	const [activeKeys, setActiveKeys] = useState<number[] | number | string>(
		allowMultiple ? [] : defaultActiveKey ?? -1
	);

	useEffect(() => {
		if (defaultActiveKey) {
			setActiveKeys(defaultActiveKey);
		}
	}, [defaultActiveKey]);

	const handleAccordionClick = useCallback(
		(index: number) => {
			setActiveKeys((prevactiveKeys) => {
				if (allowMultiple) {
					if (Array.isArray(prevactiveKeys) && prevactiveKeys.includes(index)) {
						return prevactiveKeys.filter((i) => i !== index);
					}
					return [...(prevactiveKeys as number[]), index];
				} else {
					return prevactiveKeys === index ? -1 : index;
				}
			});
		},
		[allowMultiple]
	);

	return { activeKeys, handleAccordionClick };
};

const AccordionGroup = memo<AccordionGroupProps>(
	({ children, allowMultiple = false, defaultActiveKey }) => {
		const { activeKeys, handleAccordionClick } = useAccordionGroupState(
			allowMultiple,
			defaultActiveKey
		);

		const renderChildren = useCallback(
			(children: ReactNode, parentIndex = 0) => {
				return React.Children.map(children, (child: any, index) => {
					if (!React.isValidElement(child)) {
						return child;
					}
					const $child = child as React.ReactElement & {
						type: { displayName: string };
					};

					let currentKey = $child.props.dataKey || parentIndex;

					if (
						$child.type?.displayName === 'Accordion' &&
						!$child.props.dataKey
					) {
						currentKey = parentIndex++;
					}

					if (
						$child.props.$children ||
						typeof $child.props.children === 'object'
					) {
						child = React.cloneElement(child as any, {
							children: renderChildren(
								(child as any).props.children,
								parentIndex
							),
						});
					}

					if (child.type === Accordion) {
						const _currentKey = child.props.dataKey || currentKey;

						return React.cloneElement(child, {
							dataKey: _currentKey,
							isOpen:
								(Array.isArray(activeKeys) &&
									activeKeys.includes(_currentKey)) ||
								activeKeys === _currentKey,
							onToggle: () => handleAccordionClick(_currentKey),
						});
					}

					return child;
				});
			},
			[activeKeys, handleAccordionClick]
		);

		return <>{renderChildren(children)}</>;
	}
);

AccordionGroup.displayName = 'AccordionGroup';

/**
 * Accordion component
 * @interface AccordionProps
 *
 * @example
 * ```tsx
 * <Accordion.Group allowMultiple>
 *  <Accordion title="Accordion 1">
 *   <p>Accordion 1 content</p>
 * </Accordion>
 * <Accordion title="Accordion 2">
 *  <p>Accordion 2 content</p>
 * </Accordion>
 * </Accordion.Group>
 *
 * ```
 *
 * @example
 * ```tsx
 * <Accordion title="Accordion 1">
 * <p>Accordion 1 content</p>
 * </Accordion>
 * ```
 *
 */
export const Accordion = Object.assign(AccordionMain, {
	Group: AccordionGroup,
});
