import { CallToAction, Flex, Text } from '@labs/components';
import React, { useState, useRef, useEffect, useCallback, use } from 'react';
import dynamic from 'next/dynamic';

import ZoomIn from '@labs/icons/dashboard/zoom-in.svg';
import ZoomOut from '@labs/icons/dashboard/zoom-out.svg';
import Settings from '@labs/icons/dashboard/settings.svg';

import styles from './build-resume-preview.module.scss';

const Resume = dynamic(
	() => import('./view/resume-blocks').then((md) => md.ResumeApp),
	{
		ssr: false,
	}
);

export const BuildResumePreview = () => {
	const [zoomLevel, setZoomLevel] = useState(1);
	const previewRef = useRef(null);

	const handleZoomChange = (newZoom: number) => {
		setZoomLevel(Math.min(Math.max(newZoom, 0.5), 2));
	};

	const handleZoomToFit = useCallback(() => {
		const container = previewRef.current;
		if (!container) return;
		const { width } = (container as any).getBoundingClientRect();
		const zoom = width / 842;

		handleZoomChange(zoom);
	}, []);

	useEffect(() => {
		window.addEventListener('resize', handleZoomToFit);

		handleZoomToFit();
		return () => {
			window.removeEventListener('resize', handleZoomToFit);
		};
	}, [handleZoomToFit]);

	useEffect(() => {
		if (process.env.NODE_ENV === 'development') return;
		// show the confirmation dialog when the user tries to leave the page
		window.onbeforeunload = () => true;
		return () => {
			window.onbeforeunload = null;
		};
	}, []);

	return (
		<div className={styles.Preview}>
			<div ref={previewRef} style={{ position: 'relative' }}>
				<Resume
					scale={zoomLevel}
					setScale={(scale: number) => {
						setZoomLevel(scale);
					}}
				/>
			</div>
			<div className={styles.PreviewSnarkBar}>
				<Flex
					justifyContent="space-between"
					className={styles.PreviewSnarkBar__inner}
				>
					<CallToAction.button
						variant="secondary"
						size="sm"
						onClick={() => {
							console.log('Change Template');
						}}
					>
						Change Template
					</CallToAction.button>

					<Flex gap={12}>
						<button
							onClick={() => {
								handleZoomChange(zoomLevel + 0.1);
							}}
						>
							<ZoomIn />
						</button>
						<Text size="sm"> {Math.round(zoomLevel * 100)}%</Text>
						<button
							onClick={() => {
								handleZoomChange(zoomLevel - 0.1);
							}}
						>
							<ZoomOut />
						</button>
						<button onClick={handleZoomToFit}>
							<Text size="sm">Zoom to fit</Text>
						</button>
						<button>
							<Settings />
						</button>
					</Flex>
				</Flex>
			</div>
		</div>
	);
};
