import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import { EphemeralPortal, memoWrapper, generateUUID } from '@labs';

import styles from './pace-loader.module.scss';

const PopChild_ID = generateUUID();
export const PaceLoader = memoWrapper('PaceLoader', () => {
	const router = useRouter();

	const [loadingProgress, setLoadingProgress] = useState(0);
	const [showLoader, setShowLoader] = useState(false);

	const getFade = () => ({
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	});

	useEffect(() => {
		let timeout: NodeJS.Timeout;
		const isSSGPage = router.isFallback === false;

		if (typeof window === 'undefined' || isSSGPage) {
			let loadingTimer: NodeJS.Timeout;
			const startLoadingProgress = () => {
				setLoadingProgress(0);
				setShowLoader(true);

				loadingTimer = setInterval(() => {
					setLoadingProgress((oldProgress) => {
						const newProgress =
							oldProgress + Math.max(Math.random() * 0.1, 0.01);
						return Math.round(newProgress * 100) / 100;
					});
				}, 100);
			};

			const stopLoadingProgress = () => {
				clearInterval(loadingTimer);
				setLoadingProgress(1);

				timeout = setTimeout(() => {
					setShowLoader(false);
				}, 500);
			};

			router.events.on('routeChangeStart', startLoadingProgress);
			router.events.on('routeChangeComplete', stopLoadingProgress);
			router.events.on('routeChangeError', stopLoadingProgress);

			return () => {
				clearInterval(loadingTimer);
				clearTimeout(timeout);

				router.events.off('routeChangeStart', startLoadingProgress);
				router.events.off('routeChangeComplete', stopLoadingProgress);
				router.events.off('routeChangeError', stopLoadingProgress);
			};
		}
	}, [router]);

	return (
		<>
			{showLoader && (
				<EphemeralPortal>
					<motion.div
						key={PopChild_ID}
						{...getFade()}
						className={`${styles.paceLoader} `}
					>
						<div
							className={styles.paceProgress}
							style={{
								width: `${loadingProgress * 100}%`,
							}}
						/>
					</motion.div>
				</EphemeralPortal>
			)}
		</>
	);
});
