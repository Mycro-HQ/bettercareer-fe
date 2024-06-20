import React, { Dispatch, SetStateAction } from 'react';

import { CallToAction, Flex, Text, useFeedback } from '@labs/components';
import { useCreateJobApplicationMutation } from '@/queries/job';

export default function JobAppliedModal({
	setModalVisibility,
	jobId,
}: {
	setModalVisibility: Dispatch<SetStateAction<boolean>>;
	jobId: string;
}) {
	const { mutateAsync: appliedForJob, isPending } =
		useCreateJobApplicationMutation({});
	const { createToast } = useFeedback();

	const handleSubmission = async () => {
		try {
			await appliedForJob({ jobId });
			createToast({
				message: 'Successful! Job application added to profile',
			});
			setModalVisibility(false);
		} catch (e) {
			const err = e as any;
			createToast({
				message: err?.message || 'An error occurred, please try again!',
				variant: 'error',
			});
		}
	};

	return (
		<Flex.Column gap={12}>
			<Flex.Row justifyContent="space-between">
				<Flex.Row gap={18}>
					<Flex.Column gap={4} className="font-[Figtree]">
						<Text as="span" weight={600} fontSize="18px" inheritFont>
							Did you apply?
						</Text>
						<Text
							color="var(--text-gray)"
							weight={500}
							lineHeight="24px"
							inheritFont
						>
							This helps you manage job applications easily
						</Text>
					</Flex.Column>
				</Flex.Row>
			</Flex.Row>
			<Flex.Column gap={2}>
				<Flex.Row gap={8} className="my-2">
					<CallToAction
						size="md"
						isLoading={isPending}
						onClick={handleSubmission}
					>
						Yes I did
					</CallToAction>
					<CallToAction
						outline
						size="md"
						onClick={() => {
							if (isPending) return;
							setModalVisibility(false);
						}}
					>
						No!
					</CallToAction>
				</Flex.Row>
			</Flex.Column>
		</Flex.Column>
	);
}
