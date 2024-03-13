import { UserData } from '@/queries/types/user';
import { createReportableStore } from '../middleware/report';
import { createPersistMiddleware } from '../middleware/persist';

interface UserStore {
	loading: boolean;
	profile?: UserData | null;
	error: string;
	setUser: (user: any) => void;
}

const initialState: UserStore = {
	loading: false,
	profile: null,
	error: '',
	setUser: () => {},
};

const useUserStore = createPersistMiddleware<UserStore>('user', (set) => ({
	...initialState,
	setUser: (user) => set({ profile: user }),
}));

export { useUserStore };
