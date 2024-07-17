export type JumbotronType = {
	key: number;
	icon: string;
	answer: string;
	Question: string;
};

export const jumbotrons: JumbotronType[] = [
	{
		key: 1,
		icon: '/images/landing/gradient-logo.png',
		answer:
			'Creating the best resume shouldn’t be hard. Effortlessly craft ATS-beating resumes with our AI-powered builder. Our intuitive tool helps you use the right keywords and format to bypass Applicant Tracking Systems (ATS) and reach hiring managers.',
		Question: 'Free ATS Resume Builder',
	},
	{
		key: 2,
		icon: '/images/landing/gradient-logo.png',
		answer:
			"BetterCareer's AI-powered job search & recommendations were so accurate and impressive, matching me perfectly with positions that aligned with my interests and skills",
		Question: 'AI-Powered Job Matching',
	},
	{
		key: 3,
		icon: '/images/landing/gradient-logo.png',
		answer:
			'Creating the best resume shouldn’t be hard. Effortlessly craft ATS-beating resumes with our AI-powered builder. Our intuitive tool helps you use the right keywords and format to bypass Applicant Tracking Systems (ATS) and reach hiring managers.',
		Question: 'Resume Optimization',
	},
	{
		key: 4,
		icon: '/images/landing/gradient-logo.png',
		answer:
			'The variety of opportunities available on BetterCareer is impressive.I landed a tech job thanks to their thorough listings.',
		Question: 'Real-Time Job Alerts',
	},
];
