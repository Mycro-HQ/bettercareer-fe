import { createPersistMiddleware } from '../middleware/persist';

import { UserData } from '@/queries/types/user';

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
