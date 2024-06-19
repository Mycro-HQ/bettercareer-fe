import React from 'react';

import { Wrapper } from '../components';

import {
	useCheckoutSessionMutation,
	useGetPlansQuery,
	usePortalSessionMutation,
} from '@/queries/billing';
import { CallToAction, Spinner, useFeedback } from '@labs/components';
import { useUserStore } from '@/store/z-store/user';

export default function BillingTab() {
	const { createToast } = useFeedback();

	const { profile } = useUserStore();
	const { data: plans, isPending } = useGetPlansQuery({});
	const { mutateAsync: portalSession, isPending: isLoading } =
		usePortalSessionMutation({});

	const { mutateAsync: checkoutSession, isPending: isPendingPlan } =
		useCheckoutSessionMutation();

	const handleChoice = async (id: string) => {
		try {
			const { data } = await checkoutSession(id);
			window.open(data.url);
		} catch (error) {
			const err = error as any;
			createToast({
				message: err?.message || 'An error occurred while deleting the resume',
				variant: 'error',
			});
		}
	};

	const managePlans = async () => {
		try {
			const { data } = await portalSession({});
			window.open(data.url);
		} catch (error) {
			const err = error as any;
			createToast({
				message: err?.message || 'An error occurred while deleting the resume',
				variant: 'error',
			});
		}
	};

	if (profile?.subscription) {
		return (
			<div className="mt-6">
				<Wrapper
					title="Manage Plan"
					subTitle="Control your subscription and payment information"
				>
					<div className="w-full mt-4 xl:mt-0 flex justify-start xl:justify-end ">
						<CallToAction
							onClick={managePlans}
							type="button"
							size="sm"
							outline
							className="!border-[var(--primary-blue)] !text-[var(--primary-blue)]"
						>
							Manage plan
						</CallToAction>
					</div>
				</Wrapper>
			</div>
		);
	}

	return (
		<div className="my-6 flex flex-col gap-y-6">
			{(isPendingPlan || isLoading) && <Spinner fullPage text="Loading…" />}
			<div className="relative bg-gray-300  lg:bg-transparent flex flex-col lg:flex-row justify-center px-5 xl:px-0 py-8 lg:py-0 w-full gap-6 items-center lg:items-stretch">
				{/* first portion */}
				<div className="flex flex-col flex-wrap max-w-[360px] md:w-[384px] min-h-[572px] p-6 bg-[#365CCE] group rounded-2xl relative overflow-hidden">
					<div className="text-start text-white">
						<span className="font-light text-3xl ">Our Plans</span>
						<br />

						<br />
						<div className="text-lg leading-7">
							Choose a plan and get onboard in minutes. Then get access to all
							the tools you need.
						</div>
						<RightArrow />
					</div>
					<div className="absolute bottom-0 h-[300px]">
						<img
							src="https://freepngimg.com/thumb/girl/168680-woman-young-free-clipart-hd.png"
							alt="girl image for promot pricing plan"
						/>
					</div>
				</div>
				{/* middle portion  */}
				{isPending
					? [0, 1].map((index) => (
							<div
								key={index}
								className="flex flex-col max-w-[360px] md:w-[384px] min-h-[518px] md:min-h-[572px] p-6 bg-white group rounded-2xl border xl:border-none border-[#0B0641] relative"
							>
								<Skeleton />
							</div>
						))
					: plans?.data?.map((data, index) => (
							<div
								key={index}
								className="flex flex-col max-w-[360px] md:w-[384px] min-h-[518px] md:min-h-[572px] p-6 bg-white group rounded-2xl border xl:border-none border-[#0B0641] relative"
							>
								<div className="flex flex-row gap-5 items-center">
									<span className="text-3xl  font-['Recoleta']">
										{data.product.name}
									</span>
								</div>
								<span className="flex mt-4 text-[#A9A9AA] text-[18px]">
									What You&apos;ll Get
								</span>
								{data.product.description?.split(',').map((myData, index) => (
									<div
										key={index}
										className="flex flex-row gap-3 items-start mt-6 text-left text-lg"
									>
										<div className="pt-1 shrink-0 ">
											<RightIcon />
										</div>
										<span>{myData}</span>
									</div>
								))}
								<div className="border border-dashed border-[#A9A9AA] tracking-widest my-4" />
								<div className="h-28 ">
									<div className="flex flex-col gap-4 justify-between absolute left-6 right-6 bottom-6">
										<div className="flex items-baseline">
											<span className="text-4xl font-[900] ">
												${data.amount.toFixed(2)}
											</span>
											<span>/Monthly</span>
											{/* <span>{data.duration}</span> */}
										</div>
										<div className="flex align-bottom">
											<button
												onClick={() => handleChoice(data.lookup_key)}
												className="w-full rounded-xl font-semibold text-xl px-4 py-3 bg-[#365CCE] text-white"
											>
												Choose
											</button>
										</div>
									</div>
								</div>
							</div>
						))}
			</div>
		</div>
	);
}

const Skeleton = () => (
	<div className="animate-pulse space-y-4">
		<div className="h-6 w-20 bg-slate-700 rounded"></div>
		<div className="flex-1 space-y-6 py-1">
			<div className="h-2 bg-slate-700 rounded"></div>
			<div className="space-y-8">
				<div className="flex gap-2 justify-center items-center">
					<div className="rounded-full bg-slate-700 h-5 w-5"></div>
					<div className="h-2 bg-slate-700 rounded flex-1"></div>
				</div>

				<div className="flex gap-2 justify-center items-center">
					<div className="rounded-full bg-slate-700 h-5 w-5"></div>
					<div className="h-2 bg-slate-700 rounded flex-1"></div>
				</div>

				<div className="flex gap-2 justify-center items-center">
					<div className="rounded-full bg-slate-700 h-5 w-5"></div>
					<div className="h-2 bg-slate-700 rounded flex-1"></div>
				</div>
				<div className="h-1 bg-slate-700 rounded"></div>
			</div>
			<div className="h-6 w-20 bg-slate-700 rounded"></div>
			<div className="h-12 bg-slate-700 rounded"></div>
		</div>
	</div>
);

const RightArrow = () => (
	<svg
		className="mt-5"
		width="30"
		height="29"
		viewBox="0 0 30 29"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M22.9187 12.7757L13.1821 3.03919L15.7488 0.472548L29.8671 14.5909L15.7488 28.7092L13.1821 26.1426L22.9187 16.406H0.824509V12.7757H22.9187Z"
			fill="white"
		/>
	</svg>
);
const RightIcon = () => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 20 20"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M10.0001 0.00012207C4.48608 0.00012207 7.62939e-05 4.48612 7.62939e-05 10.0001C7.62939e-05 15.5141 4.48608 20.0001 10.0001 20.0001C15.5141 20.0001 20.0001 15.5141 20.0001 10.0001C20.0001 4.48612 15.5141 0.00012207 10.0001 0.00012207ZM8.00108 14.4131L4.28808 10.7081L5.70008 9.29212L7.99908 11.5871L13.2931 6.29312L14.7071 7.70712L8.00108 14.4131Z"
			fill="#35353F"
		/>
	</svg>
);
