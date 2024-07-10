import React from 'react';

import { Seo } from '@/components/seo';
import LandingPage from '@/features/marketing/landing';

export const Home = () => {
	return (
		<>
			<Seo title="Boost your job search with AI-resumes. Get hired!" />
			<LandingPage />
		</>
	);
};

export default Home;
