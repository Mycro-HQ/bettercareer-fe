import { createReportableStore } from '../middleware/report';

type State = {
	NewJobMatches: boolean;
	WeeklyJobDigest: boolean;
	SavedSearchUpdates: boolean;
	ResumeOptimizationTips: boolean;
	ProfileCompletionReminders: boolean;
	KeywordMatchInsights: boolean;
	NewFeaturesAndTools: boolean;
	ExpertCareerAdvice: boolean;
	ImportantAnnouncements: boolean;
};

type Actions = {
	toggleNewJobMatches: () => void;
	toggleWeeklyJobDigest: () => void;
	toggleSavedSearchUpdates: () => void;
	toggleResumeOptimizationTips: () => void;
	toggleProfileCompletionReminders: () => void;
	toggleKeywordMatchInsights: () => void;
	toggleNewFeaturesAndTools: () => void;
	toggleExpertCareerAdvice: () => void;
	toggleImportantAnnouncements: () => void;
};

type Store = State & Actions;

const useSettingsStore = createReportableStore<Store>((set) => ({
	NewJobMatches: true,
	WeeklyJobDigest: true,
	SavedSearchUpdates: true,
	ResumeOptimizationTips: false,
	ProfileCompletionReminders: false,
	KeywordMatchInsights: true,
	NewFeaturesAndTools: false,
	ExpertCareerAdvice: true,
	ImportantAnnouncements: false,
	toggleNewJobMatches: () =>
		set((store: Store) => ({
			...store,
			NewJobMatches: !store.NewJobMatches,
		})),
	toggleWeeklyJobDigest: () =>
		set((store: Store) => ({
			...store,
			WeeklyJobDigest: !store.WeeklyJobDigest,
		})),
	toggleSavedSearchUpdates: () =>
		set((store: Store) => ({
			...store,
			SavedSearchUpdates: !store.SavedSearchUpdates,
		})),
	toggleResumeOptimizationTips: () =>
		set((store: Store) => ({
			...store,
			ResumeOptimizationTips: !store.ResumeOptimizationTips,
		})),
	toggleProfileCompletionReminders: () =>
		set((store: Store) => ({
			...store,
			ProfileCompletionReminders: !store.ProfileCompletionReminders,
		})),
	toggleKeywordMatchInsights: () =>
		set((store: Store) => ({
			...store,
			KeywordMatchInsights: !store.KeywordMatchInsights,
		})),
	toggleNewFeaturesAndTools: () =>
		set((store: Store) => ({
			...store,
			NewFeaturesAndTools: !store.NewFeaturesAndTools,
		})),
	toggleExpertCareerAdvice: () =>
		set((store: Store) => ({
			...store,
			ExpertCareerAdvice: !store.ExpertCareerAdvice,
		})),
	toggleImportantAnnouncements: () =>
		set((store: Store) => ({
			...store,
			ImportantAnnouncements: !store.ImportantAnnouncements,
		})),
}));

export { useSettingsStore };
