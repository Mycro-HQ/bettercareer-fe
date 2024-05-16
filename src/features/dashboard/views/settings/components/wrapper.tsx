import classNames from 'classnames';

import { Text } from '@labs/components';

type WrapperProps = {
	title: string;
	subTitle: string;
} & React.ComponentPropsWithoutRef<'div'>;

export default function Wrapper(props: WrapperProps) {
	return (
		<div
			{...props}
			className={classNames(
				'p-8 rounded-2xl bg-white border-[#F3F4F4] border border-solid flex flex-col xl:flex-row justify-between',
				props.className
			)}
		>
			<div className="xl:flex-[5_5_0] mb-8 xl:mb-0">
				<Text fontSize="18px" weight={600} lineHeight="26px" className="mb-1">
					{props.title}
				</Text>
				<Text color="#3F4C58" lineHeight="24px">
					{props.subTitle}
				</Text>
			</div>
			<div className="xl:flex-[7_7_0]">{props.children}</div>
		</div>
	);
}
