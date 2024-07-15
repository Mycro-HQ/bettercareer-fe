import React from 'react';
import * as Switch from '@radix-ui/react-switch';

import { Label, Wrapper } from '../components';

import { Text, Flex } from '@labs/components';
import { useSettingsStore } from '@/store/z-store/settings';

export default function NotificationPreferencesTab() {
	const {
		NewJobMatches,
		WeeklyJobDigest,
		SavedSearchUpdates,
		ResumeOptimizationTips,
		ProfileCompletionReminders,
		KeywordMatchInsights,
		NewFeaturesAndTools,
		ExpertCareerAdvice,
		ImportantAnnouncements,
		toggleNewJobMatches,
		toggleWeeklyJobDigest,
		toggleSavedSearchUpdates,
		toggleResumeOptimizationTips,
		toggleProfileCompletionReminders,
		toggleKeywordMatchInsights,
		toggleNewFeaturesAndTools,
		toggleExpertCareerAdvice,
		toggleImportantAnnouncements,
	} = useSettingsStore();

	return (
		<div className="my-6 flex flex-col gap-y-6">
			<Wrapper
				title="Email Notifications"
				subTitle="Send notifications to it******05@gmail.com"
			>
				<Flex.Column gap={40}>
					<NotificationOptions
						title="New Job Matches (AI Powered)"
						subTitle="Get notified for job openings that perfectly match your skills and experience."
						checked={NewJobMatches}
						setChecked={toggleNewJobMatches}
					/>
					<NotificationOptions
						title="Weekly Job Digest"
						subTitle="Receive a curated list of relevant job openings delivered to your email weekly."
						checked={WeeklyJobDigest}
						setChecked={toggleWeeklyJobDigest}
					/>
					<NotificationOptions
						title="Saved Search Updates"
						subTitle="Be notified when there are new job postings that match your saved job searches."
						checked={SavedSearchUpdates}
						setChecked={toggleSavedSearchUpdates}
					/>
					<NotificationOptions
						title="Resume Optimization Tips"
						subTitle="Get actionable tips from our AI to further improve your resume's effectiveness and beat ATS filters."
						checked={ResumeOptimizationTips}
						setChecked={toggleResumeOptimizationTips}
					/>
					<NotificationOptions
						title="Profile Completion Reminders"
						subTitle="Be notified if there are missing sections in your profile that could strengthen your job search presence."
						checked={ProfileCompletionReminders}
						setChecked={toggleProfileCompletionReminders}
					/>
					<NotificationOptions
						title="Keyword Match Insights"
						subTitle="Receive updates on how well your resume keywords align with trending job descriptions."
						checked={KeywordMatchInsights}
						setChecked={toggleKeywordMatchInsights}
					/>
					<NotificationOptions
						title="New Features & Tools"
						subTitle="Stay informed about exciting new features and tools added to the BetterCareer"
						checked={NewFeaturesAndTools}
						setChecked={toggleNewFeaturesAndTools}
					/>
					<NotificationOptions
						title="Expert Career Advice"
						subTitle="Get notified when new expert career advice articles or webinars are available on the platform."
						checked={ExpertCareerAdvice}
						setChecked={toggleExpertCareerAdvice}
					/>
					<NotificationOptions
						title="Important Announcements"
						subTitle="Receive updates about policy changes, or any important announcements from BetterCareer."
						checked={ImportantAnnouncements}
						setChecked={toggleImportantAnnouncements}
					/>
				</Flex.Column>
			</Wrapper>
		</div>
	);
}

function NotificationOptions({
	title,
	subTitle,
	checked,
	setChecked,
}: {
	title: string;
	subTitle: string;
	checked: boolean;
	setChecked: () => void;
}) {
	const id = title.replace(/\s/g, '-').toLowerCase();

	return (
		<div>
			<div className="flex justify-between mb-1">
				<Label
					htmlFor={id}
					text={title}
					className="text-[#273643] text-base font-semibold"
				/>
				<Switch.Root
					name={id}
					id={id}
					checked={checked}
					onCheckedChange={setChecked}
					className="bg-[#F3F4F4] rounded-xl w-9 h-5 data-[state=checked]:bg-[#1388F2] transition-colors"
				>
					<Switch.Thumb className="block size-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
				</Switch.Root>
			</div>
			<Text
				size="sm"
				color="var(--text-gray)"
				className="w-10/12"
				weight={500}
				lineHeight="20px"
			>
				{subTitle}
			</Text>
		</div>
	);
}
