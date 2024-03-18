import classNames from 'classnames';
import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';

import CloseIcon from '../../../public/images/Close.svg';
import RightArrow from '../../../public/images/RightArrow.svg';

export const AccordionWrapper = Accordion.Root;

export const AccordionItem = React.forwardRef<
	React.ElementRef<typeof Accordion.Item>,
	React.ComponentPropsWithoutRef<typeof Accordion.Item>
>(({ children, className, ...props }, forwardedRef) => (
	<Accordion.Item className={className} {...props} ref={forwardedRef}>
		{children}
	</Accordion.Item>
));

export const AccordionTrigger = React.forwardRef<
	React.ElementRef<typeof Accordion.Trigger>,
	React.ComponentPropsWithoutRef<typeof Accordion.Trigger>
>(({ children, className, ...props }, forwardedRef) => (
	<Accordion.Header className="flex">
		<Accordion.Trigger
			className={classNames(
				'group flex h-[45px] flex-1 cursor-pointer items-center justify-between outline-none',
				className
			)}
			{...props}
			ref={forwardedRef}
		>
			{children}
			<div className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300">
				<CloseIcon
					aria-hidden
					className="hidden group-data-[state=open]:block"
				/>
				<RightArrow aria-hidden className="group-data-[state=open]:hidden" />
			</div>
		</Accordion.Trigger>
	</Accordion.Header>
));

export const AccordionContent = React.forwardRef<
	React.ElementRef<typeof Accordion.Content>,
	React.ComponentPropsWithoutRef<typeof Accordion.Content>
>(({ children, className, ...props }, forwardedRef) => (
	<Accordion.Content
		className={classNames(
			'data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden',
			className
		)}
		{...props}
		ref={forwardedRef}
	>
		<div>{children}</div>
	</Accordion.Content>
));
