import React from 'react';
import Router from 'next/router';

import { Flex, Heading, Text } from '@labs/components';
import { useGetResumeAnalysisMutation } from '@/queries/resume';
import { useBuildStore } from '@/store/z-store/builder';
import { Modal } from '@labs/components/modal';
import { ProgressLoader } from '@/components/misc/loader';

import { AnalysisHistory } from './view/analysis-history';
import { Analysis } from './view/analysis';

export const ResumeAnalysis = ({
	show,
	onClose,
	isAnalysis,
}: {
	show: boolean;
	onClose: () => void;
	isAnalysis?: boolean;
}) => {
	const [screen, setScreen] = React.useState(
		isAnalysis ? 'analysis' : 'all-analysis'
	);
	const [analysisData, setAnalysisData] = React.useState<any>(null);
	const { resumeBlob } = useBuildStore();

	const handleClose = () => {
		setScreen('all-analysis');
		setAnalysisData(null);
		onClose();
	};
	const {
		mutateAsync: getResumeAnalysis,
		isPending,
		data: resume,
	} = useGetResumeAnalysisMutation({
		onSuccess: (data) => {
			setAnalysisData(data?.data?.analysis);
		},
	});

	React.useEffect(() => {
		if (isAnalysis) {
			setScreen('analysis');
		}
	}, [isAnalysis]);

	React.useEffect(() => {
		if (show && isAnalysis && resumeBlob?.raw) {
			getResumeAnalysis({
				id: Router.query.slug as string,
				resume: resumeBlob.raw || '',
				snapshots: resumeBlob.snapshots || [],
			});
		}
	}, [show, isAnalysis]);

	if (screen === 'all-analysis') {
		return (
			<Modal onClose={handleClose} in={show} size={'lg'}>
				<AnalysisHistory
					setAnalysisData={setAnalysisData}
					setScreen={setScreen}
				/>
			</Modal>
		);
	}

	return (
		<Modal onClose={handleClose} in={show} size={analysisData ? 'xlg' : 'md'}>
			{isAnalysis && (!resume?.data?.analysis || isPending) ? (
				<Flex.Column
					gap={24}
					alignItems="center"
					className="min-h-[35vh]"
					justifyContent="center"
				>
					<img src="/images/misc/loading.gif" alt="placeholder" width={45} />
					<Flex.Column gap={8} alignItems="center">
						<Heading.h5 weight={700}>Analyzing your resume</Heading.h5>
						<Text size="sm" color="var(--text-gray)">
							Please wait while we analyze your resume
						</Text>
					</Flex.Column>
					<ProgressLoader />
				</Flex.Column>
			) : (
				<Analysis
					seeAllAnalysis={() => setScreen('all-analysis')}
					data={analysisData}
				/>
			)}
		</Modal>
	);
};
