interface ScoreCounterProps {
	className?: string;
	score: number;
}

export function ScoreCounter({ className, score }: ScoreCounterProps) {
	return (
		<svg
			width="228"
			height="115"
			viewBox="0 0 228 115"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				d="M217.047 114.701C223.023 114.701 227.92 109.846 227.354 103.897C226.282 92.6166 223.533 81.5383 219.181 71.0324C213.446 57.1878 205.041 44.6083 194.445 34.0121C183.849 23.416 171.269 15.0106 157.424 9.27601C143.58 3.54141 128.741 0.589843 113.756 0.589844C98.7709 0.589844 83.9324 3.54141 70.0878 9.27602C56.2432 15.0106 43.6637 23.416 33.0676 34.0121C22.4714 44.6083 14.0661 57.1878 8.33144 71.0324C3.97975 81.5383 1.23067 92.6166 0.157852 103.897C-0.407904 109.846 4.48946 114.701 10.4651 114.701C16.4407 114.701 21.2195 109.84 21.9172 103.905C22.9088 95.4694 25.0601 87.1928 28.3238 79.3135C32.9709 68.0944 39.7823 57.9004 48.3691 49.3137C56.9558 40.7269 67.1498 33.9155 78.3689 29.2684C89.588 24.6213 101.613 22.2294 113.756 22.2294C125.9 22.2294 137.924 24.6213 149.143 29.2684C160.362 33.9155 170.556 40.7269 179.143 49.3136C187.73 57.9004 194.541 68.0944 199.188 79.3135C202.452 87.1928 204.604 95.4694 205.595 103.905C206.293 109.84 211.072 114.701 217.047 114.701Z"
				fill="#E7F3FE"
			/>
			<path
				d="M165.322 24.9859C168.284 19.7957 166.494 13.1359 161.047 10.6792C146.208 3.98703 130.068 0.529472 113.707 0.590641C93.7291 0.665332 74.121 5.98366 56.8433 16.0138C39.5656 26.0439 25.224 40.4344 15.2527 57.746C7.0864 71.9237 2.0857 87.6538 0.539029 103.858C-0.0287485 109.807 4.86698 114.663 10.8426 114.665C16.8182 114.668 21.5987 109.809 22.2983 103.874C23.7614 91.4638 27.7297 79.4398 34.0041 68.5467C42.0845 54.518 53.7065 42.8565 67.7076 34.7285C81.7088 26.6004 97.5986 22.2906 113.788 22.2301C126.359 22.1831 138.768 24.6994 150.271 29.5828C155.771 31.918 162.361 30.1761 165.322 24.9859Z"
				fill="url(#paint0_linear_2481_19151)"
			/>
			<defs>
				<linearGradient
					id="paint0_linear_2481_19151"
					x1="116.384"
					y1="0.589837"
					x2="92.6086"
					y2="114.01"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset={`${score}%`} stopColor="#339DFF" />
					<stop offset="1" stopColor="#2783D8" />
				</linearGradient>
			</defs>
		</svg>
	);
}
