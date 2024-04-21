import React, { useMemo } from 'react';

import { Flex } from '@labs/components';

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

let INDEX = 0;
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

	const _value = useMemo(() => {
		return Math.max(progress, value);
	}, [value, progress]);

	React.useEffect(() => {
		if (!duration) return;
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
		<Flex.Column
			gap={8}
			className={styles.ProgressWrap}
			fullWidth
			style={
				{
					'--progressPercent': `${_value}%`,
					'--progressColor': color,
					'--progressBackground': color + '20',
				} as React.CSSProperties
			}
		>
			{label && (
				<Flex.Row
					justifyContent="space-between"
					className={styles.ProgressLabel}
					gap={4}
					alignItems="center"
				>
					<label htmlFor={`progress-${INDEX + 1}`}>{label}</label>

					{showPercent && <span className="font-bold">{_value}%</span>}
				</Flex.Row>
			)}

			<progress
				value={_value}
				max={max}
				id={`progress-${INDEX + 1}`}
				{...rest}
				className={styles.Progress}
			/>
		</Flex.Column>
	);
};
