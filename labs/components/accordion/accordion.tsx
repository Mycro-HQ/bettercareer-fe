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

import { createErrorWithCode } from '../../utils';
import { Flex, Text } from '../layout';

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
	dataKey: string;
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
	leadingIcon?: React.ReactElement | null;
	/**
	 * trailing icon
	 */
	trailingIcon?: React.ReactElement | null;
}

const AccordionMain = memo<AccordionProps>(
	({
		title,
		children,
		size = 'sm',
		className,
		dataKey,
		leadingIcon,
		trailingIcon,
	}) => {
		const { activeKeys, handleAccordionClick } = useAccordion();

		const isOpen = useMemo(() => {
			if (Array.isArray(activeKeys)) {
				return activeKeys.find((key) => `${key}` === `${dataKey}`);
			}

			return activeKeys === dataKey;
		}, [activeKeys, dataKey]);

		const onToggle = useCallback(() => {
			handleAccordionClick(dataKey || title?.toString()!);
		}, []);

		const accordionClassName = useMemo(
			() =>
				classNames([
					styles.Accordion,
					className,
					{
						[styles.isOpen]: isOpen,
						[styles[size]]: size,
					},
				]),
			[, className, isOpen, size]
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
					<Flex fullWidth gap={8} alignItems="center">
						{leadingIcon && (
							<span
								className={styles.leadingIcon}
								role="button"
								tabIndex={0}
								aria-label="accordion_icon"
								onClick={(e) => {
									e.stopPropagation();
									if (!isOpen) {
										onToggle();
									}
								}}
							>
								{leadingIcon}
							</span>
						)}

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
							onClick={(e) => {
								e.stopPropagation();
								if (!isOpen) {
									onToggle();
								}
							}}
						>
							{trailingIcon}
						</span>
						<ArrowDown className={styles.arrow} />
					</Flex>
				</button>
				<AnimatePresence mode="wait">
					{isOpen && (
						<motion.div
							initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
							animate={{ opacity: 1, height: '100%', overflow: 'auto' }}
							exit={{
								opacity: 0,
								height: 0,
								overflow: 'hidden',
								transition: {
									opacity: { duration: 0 },
								},
							}}
							transition={{ duration: 0.1, ease: 'linear' }}
							key={dataKey}
							className={styles.AccordionBody}
						>
							{children}
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		);
	}
);

AccordionMain.displayName = 'Accordion';

const AccordionContext = React.createContext<{
	activeKeys: number[] | number | string;
	handleAccordionClick: (index: number[] | number | string) => void;
}>({
	activeKeys: -1,
	handleAccordionClick: () =>
		createErrorWithCode(
			'ACCORDION_CONTEXT_MISSING',
			'handleAccordionClick',
			`Before calling \`handleAccordionClick\`, wrap your accordion with \`<Accordion.Group>\`.`
		),
});

export const useAccordion = () => {
	return React.useContext(AccordionContext);
};

interface AccordionGroupProps extends PropsWithChildren {
	/**
	 * Allows multiple accordions to be open at the same time
	 */
	allowMultiple?: boolean;
	/**
	 * default active key
	 */
	defaultActiveKey?: number[] | number | string;
}

const AccordionProvider = ({
	children,
	allowMultiple = false,
	defaultActiveKey,
}: {
	children: ReactNode;
	allowMultiple: boolean;
	defaultActiveKey?: number[] | number | string;
}) => {
	const [activeKeys, setActiveKeys] = useState<number[] | number | string>(
		allowMultiple ? [] : defaultActiveKey ?? -1
	);

	useEffect(() => {
		if (defaultActiveKey) {
			setActiveKeys(
				allowMultiple ? [defaultActiveKey as number] : defaultActiveKey
			);
		}
	}, [defaultActiveKey, allowMultiple]);

	const handleAccordionClick = useCallback(
		(index: any) => {
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

	return (
		<AccordionContext.Provider value={{ activeKeys, handleAccordionClick }}>
			{children}
		</AccordionContext.Provider>
	);
};

const AccordionGroup = memo<AccordionGroupProps>(
	({ children, allowMultiple = false, defaultActiveKey }) => {
		return (
			<AccordionProvider
				allowMultiple={allowMultiple}
				defaultActiveKey={defaultActiveKey}
			>
				{children}
			</AccordionProvider>
		);
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
