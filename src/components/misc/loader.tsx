import React from 'react';

import * as Progress from '@radix-ui/react-progress';
import { useRouter } from 'next/router';

export const ProgressLoader = () => {
	const router = useRouter();
	const [progress, setProgress] = React.useState(0);

	React.useEffect(() => {
		const timer = setInterval(
			() =>
				setProgress((prev) => {
					if (prev >= 100) {
						clearInterval(timer);
						return 100;
					}

					return prev + 5;
				}),
			500
		);

		return () => clearInterval(timer);
	}, [progress, router]);

	return (
		<Progress.Root
			className="relative overflow-hidden bg-[#F3F4F4] rounded-full w-[300px] h-[8px]"
			style={{
				transform: 'translateZ(0)',
			}}
			value={progress}
		>
			<Progress.Indicator
				className="bg-[#1388F2] w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
				style={{ transform: `translateX(-${100 - progress}%)` }}
			/>
		</Progress.Root>
	);
};
