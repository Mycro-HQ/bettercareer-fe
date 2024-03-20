import { CallToAction } from '@labs/components';
import React, { ReactNode } from 'react';

const ResumeSecondaryButton: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	return <CallToAction.button>{children}</CallToAction.button>;
};

export default ResumeSecondaryButton;
