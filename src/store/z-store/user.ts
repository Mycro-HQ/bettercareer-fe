import { createReportableStore } from '../middleware/report';

interface UserStore {
	loading: boolean;
	user: any;
	error: string;
	setUser?: (user: any) => void;
}

const initialState: UserStore = {
	loading: false,
	user: null,
	error: '',
};

const useUserStore = createReportableStore<UserStore>((set) => ({
	...initialState,
	setUser: (user) => set({ user }),
}));

export { useUserStore };
