import Cookies from 'js-cookie';

import { createPersistMiddleware } from '../middleware/persist';

import { authApiCreator } from '@/queries/user';
import { UserData } from '@/queries/types/user';

interface UserStore {
	loading: boolean;
	profile?: UserData | null;
	error: string;
	setUser: (user: any) => void;
	logOut: (option?: { soft?: boolean }) => void;
}

const initialState: UserStore = {
	loading: false,
	profile: null,
	error: '',
	setUser: () => {},
	logOut: () => {},
};

const useUserStore = createPersistMiddleware<UserStore>(
	'user',
	(set, get, store) => ({
		...initialState,
		setUser: (user) => set({ profile: user }),
		logOut: async (option?: { soft?: boolean }) => {
			if (!option?.soft) {
			}

			try {
				if (!option?.soft) await authApiCreator.logOut({});
			} catch {
			} finally {
				if (!option?.soft) {
					await Cookies.set('bc_token', '', { expires: 0 });
					window.location.replace('/login');
					window.localStorage.removeItem('user');
				}

				set({ profile: initialState.profile });
			}
		},
	})
);

export { useUserStore };
