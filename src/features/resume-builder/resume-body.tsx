import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Accordion from './accordion';
import styles from './resume.module.scss';
import AddIcon from '@labs/icons/misc/add.svg';
import { Flex } from '@labs/components';
import Heading from './builder-element/Heading';
import RichTextEditor from './builder-element/RichText';
import Skills from './builder-element/Skills';

const reorder = (
	list: Iterable<unknown> | ArrayLike<unknown>,
	startIndex: number,
	endIndex: number
) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const panels = [
	{ title: 'Heading', content: <Heading /> },
	{ title: 'Summary', content: <RichTextEditor />},
	{ title: 'Skills', content:  <Skills /> },
];
const ResumeBody = () => {
	const [items, setItems] = useState<any>(panels);

	const onDragEnd = (result: any) => {
		console.log('DDD');
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		const it = reorder(items, result.source.index, result.destination.index);

		setItems(it);
	};

	return (
		<>
			<DragDropContext onDragEnd={onDragEnd}>
				<Accordion>
					{items.map(
						(
							panel: {
								title: string;
								content:
									| string
									| number
									| boolean
									| React.ReactElement<
											any,
											string | React.JSXElementConstructor<any>
									  >
									| Iterable<React.ReactNode>
									| React.ReactPortal
									| Promise<React.AwaitedReactNode>
									| null
									| undefined;
							},
							index: number
						) => (
							<Accordion.Panel key={index} title={panel.title} index={index}>
								<Accordion.Content>{panel.content}</Accordion.Content>
							</Accordion.Panel>
						)
					)}
				</Accordion>
			</DragDropContext>

			<button className={styles.AccordionPanel}>
				<Flex.Row
					className="text-neutral-600 font-semibold"
					alignItems="center"
				>
					<AddIcon />

					<div className="ml-2">New Section</div>
				</Flex.Row>
			</button>
		</>
	);
};

export default ResumeBody;
