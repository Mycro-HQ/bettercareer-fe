import React from 'react';

import { Seo } from '@/components/seo';
import { Waitlist } from '@/features/marketing/waitlist';

export const Home = () => {
	return (
		<>
			<Seo title="Boost your job search with AI-resumes. Get hired!" />
			<Waitlist />
		</>
	);
};

export default Home;
