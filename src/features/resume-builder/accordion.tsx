import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flex } from '@labs/components';
import { Droppable, Draggable } from 'react-beautiful-dnd'; // Import Draggable and Droppable
import styles from './resume.module.scss';
import DragAndDropIcon from '@labs/icons/misc/DragAndDropIcon.svg';
import DownArrowIcon from '@labs/icons/misc/arrow-down.svg';

interface AccordionProps {
	children: ReactNode;
}

interface PanelProps {
	children: ReactNode;
	title: string;
	index: number; // Add index prop to PanelProps
}

interface TitleProps {
	children: ReactNode;
}

interface ContentProps {
	children: ReactNode;
}

const Accordion: React.FC<AccordionProps> & {
	Panel: React.FC<PanelProps>;
	Title: React.FC<TitleProps>;
	Content: React.FC<ContentProps>;
} = ({ children }) => {
	const [selected, setSelected] = useState<number | null>(null);

	const togglePanel = (index: number) => {
		setSelected(selected === index ? null : index);
	};

	return (
		<Droppable droppableId="accordion">
			{(provided) => (
				<div
					className="accordion"
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					{React.Children.map(children, (child, index) => {
						if (!React.isValidElement(child)) {
							return null;
						}

						return (
							<Draggable
								key={index}
								draggableId={`panel-${index}`}
								index={index}
							>
								{(provided) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										<div className={styles.AccordionPanel}>
											<Flex.Row
												onClick={() => togglePanel(index)}
												className="text-neutral-600 font-semibold"
												alignItems="center"
												justifyContent="space-between"
											>
												<Flex.Row alignItems="center">
													<DragAndDropIcon />
													<div className="ml-2">
														{child.props.title || 'Untitled'}
													</div>
												</Flex.Row>

												<motion.div
													animate={{ rotate: selected === index ? 180 : 0 }}
													transition={{ duration: 0.3 }}
												>
													<DownArrowIcon />
												</motion.div>
											</Flex.Row>
											<AnimatePresence>
												{selected === index && (
													<motion.div
														key="content"
														initial="collapsed"
														animate="open"
														exit="collapsed"
														variants={{
															open: {
																opacity: 1,
																height: 'auto',
																overflow: 'hidden',
															},
															collapsed: {
																opacity: 0,
																height: 0,
																overflow: 'hidden',
															},
														}}
														transition={{ duration: 0.3 }}
														className={styles.AccordionContent}
													>
														{child.props.children}
													</motion.div>
												)}
											</AnimatePresence>
										</div>
									</div>
								)}
							</Draggable>
						);
					})}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

const Panel: React.FC<PanelProps> = ({ children }) => {
	return <>{children}</>;
};

const Title: React.FC<TitleProps> = ({ children }) => {
	return <div className="accordion-title">{children}</div>;
};

const Content: React.FC<ContentProps> = ({ children }) => {
	return <div className="accordion-content">{children}</div>;
};

Accordion.Panel = Panel;
Accordion.Title = Title;
Accordion.Content = Content;

export default Accordion;
