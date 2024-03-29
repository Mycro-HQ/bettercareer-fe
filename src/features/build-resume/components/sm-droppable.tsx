import { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';

export const StrictModeDroppable = ({
	children,
	droppableId,
	...props
}: {
	children: React.ReactNode | React.ReactNode[] | ((args: any) => any) | any;
	droppableId: string;
}) => {
	const [enabled, setEnabled] = useState(false);

	useEffect(() => {
		const animation = requestAnimationFrame(() => setEnabled(true));
		return () => {
			cancelAnimationFrame(animation);
			setEnabled(false);
		};
	}, []);

	if (!enabled) {
		return null;
	}
	return (
		<Droppable droppableId={droppableId} {...props}>
			{children}
		</Droppable>
	);
};
