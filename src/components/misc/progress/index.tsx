import React, { useMemo } from 'react';

import { Flex } from '@labs/components';
import { generateUUID } from '@labs/utils';

import styles from './progress.module.scss';

interface ProgressProps extends React.HTMLProps<HTMLProgressElement> {
	value: number;
	max?: number;
	color?: string;
	label?: string;
	showPercent?: boolean;
	duration?: number;
	onDone?: () => void;
}

export const Progress = ({
	value,
	label,
	showPercent,
	max,
	color,
	duration,
	onDone,
	...rest
}: ProgressProps) => {
	const [progress, setProgress] = React.useState(value);
	const progressId = useMemo(() => generateUUID(), []);
	React.useEffect(() => {
		const timer = setInterval(
			() => setProgress((prev) => (prev + Math.random() * 10) % 100),
			duration
		);

		if (progress === 100) {
			clearInterval(timer);
			onDone?.();
		}

		return () => clearInterval(timer);
	}, [progress, onDone, duration]);

	return (
		<Flex.Column gap={8} className={styles.ProgressLabel}>
			{label && (
				<Flex.Row
					justifyContent="space-between"
					className={styles.ProgressLabel}
					gap={4}
					alignItems="center"
				>
					<label htmlFor={progressId}>{label}</label>

					{showPercent && <span>{progress}%</span>}
				</Flex.Row>
			)}
			<progress
				value={progress}
				max={max}
				id={progressId}
				style={
					{
						'--progressPercent': `${value}%`,
						'--progressColor': color,
						'--progressBackground': color + '20',
					} as React.CSSProperties
				}
				{...rest}
				className={styles.Progress}
			/>
		</Flex.Column>
	);
};
