import { Heading as LabsHeading } from '@labs/components';

export const LandingHeading = ({
	mainText,
	afterLineBreak,
	highlightedText,
}: {
	mainText: string;
	afterLineBreak: string;
	highlightedText: string;
}) => (
	<LabsHeading lineHeight="58px" weight={500} align="center" className="mb-20">
		{mainText}
		<br className="hidden md:block" /> {afterLineBreak}{' '}
		<span className="text-[#6F7982]">{highlightedText}</span>
	</LabsHeading>
);
