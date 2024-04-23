import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import { CallToAction, Flex, Text } from '@labs/components';
import ZoomIn from '@labs/icons/dashboard/zoom-in.svg';
import ZoomOut from '@labs/icons/dashboard/zoom-out.svg';
import { useBuildStore } from '@/store/z-store/builder';

import styles from './build-resume-preview.module.scss';
import { TemplateModal } from './view/template-modal/template-modal';

const ResumePreview = dynamic(
	() => import('./view/resume-blocks').then((md) => md.ResumePreview),
	{
		ssr: false,
	}
);

export const BuildResumePreview = ({ previewRef }: { previewRef: any }) => {
	const { template, setTemplate } = useBuildStore();
	const [zoomLevel, setZoomLevel] = useState(1);
	const [showTemplateModal, setShowTemplateModal] = useState(false);
	const handleZoomChange = (newZoom: number) => {
		setZoomLevel(Math.min(Math.max(newZoom, 0.5), 2));
	};

	const handleZoomToFit = useCallback(() => {
		if (!previewRef?.current) return;
		const container = previewRef.current;
		if (!container) return;
		const { height } = (container as any).getBoundingClientRect();
		const standardA4Size = { width: 595, height: 842 };

		const zoom = Math.min(
			0.75,
			Math.min(height, standardA4Size.height) / standardA4Size.height / 1.2
		);

		handleZoomChange(zoom);
	}, [previewRef]);

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
		<>
			<div className={styles.Preview}>
				<div className="relative w-full h-full">
					<ResumePreview
						scale={zoomLevel}
						setScale={(scale: number) => {
							setZoomLevel(scale);
						}}
					/>
				</div>
				<div className={styles.PreviewSnarkBar} data-zoomed={zoomLevel >= 1}>
					<Flex
						justifyContent="space-between"
						className={styles.PreviewSnarkBar__inner}
					>
						<CallToAction.button
							variant="secondary"
							size="sm"
							onClick={() => {
								setShowTemplateModal(true);
							}}
						>
							Change Template
						</CallToAction.button>
						<Text size="sm" weight={800}>
							{' '}
							{template.title}
						</Text>
						<Flex gap={12}>
							<button
								onClick={() => {
									handleZoomChange(zoomLevel + 0.1);
								}}
								className="hidden xl:block"
							>
								<ZoomIn />
							</button>
							<Text size="sm" className="hidden xl:block">
								{' '}
								{Math.round(zoomLevel * 100)}%
							</Text>
							<button
								onClick={() => {
									handleZoomChange(zoomLevel - 0.1);
								}}
								className="hidden xl:block"
							>
								<ZoomOut />
							</button>
							<button onClick={() => handleZoomChange(1)}>
								<Text size="sm">Scale</Text>
							</button>
							<button onClick={handleZoomToFit}>
								<Text size="sm">Fit</Text>
							</button>
							<span className="block xl:hidden" />
						</Flex>
					</Flex>
				</div>
			</div>
			<TemplateModal
				template={template}
				setTemplate={setTemplate}
				show={showTemplateModal}
				onClose={() => setShowTemplateModal(false)}
			/>
		</>
	);
};
