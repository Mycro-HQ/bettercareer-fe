export type AdviceType = {
	key: number;
	image: string;
	title: string;
	subtitle: string;
	dataURL: string;
	path: string;
};

export const advice: AdviceType[] = [
	{
		key: 1,
		image: '/images/landing/advice-1.png',
		title: 'Mastering the Art of Resume Writing',
		subtitle:
			"Learn to craft a standout resume with expert advice and insight ensuring your skills capture employers' attention.",
		dataURL: 'LFIr1_%3?^.90JadVs-;8^%Nx^Rj',
		path: '/blog/1',
	},
	{
		key: 2,
		image: '/images/landing/advice-2.png',
		title: 'Ace Your Job Interview',
		subtitle:
			'Discover effective techniques to confidently navigate job interviews and leave a lasting impression that sets you apart from other candidates.',
		dataURL: 'LdJ*en~qE1xt?HM{RjWB%g-p%2IU',
		path: '/blog/2',
	},
	{
		key: 3,
		image: '/images/landing/advice-3.png',
		title: 'Networking 101',
		subtitle:
			'Explore essential networking strategies to develop meaningful professional connections and advance your career.',
		dataURL: 'LDG+RK.T.T-o$v%$r;?v0grVW=R.',
		path: '/blog/3',
	},
];
