import React, { memo, useCallback, useState } from 'react';

import { Text, useStyles } from '@labs/index';

interface ReadMoreProps extends React.HTMLAttributes<HTMLSpanElement> {
	text: string;
	limit?: number;
}
export const ReadMore = memo(
	({ text, limit = 100, ...rest }: ReadMoreProps) => {
		const [expanded, setExpanded] = useState(false);

		const _styles = useStyles({
			color: 'var(--primary-blue)',
		});
		const toggleExpand = useCallback(() => {
			setExpanded(!expanded);
		}, [expanded]);

		const truncated =
			text && `${text}`.length <= limit
				? text
				: `${text}`?.slice(0, limit)?.trim() + '...';
		const shouldShowReadMore = text?.length > limit && !expanded;

		if (!text) return null;

		return (
			<span aria-expanded={expanded} aria-label={text} {...rest}>
				<Text>{expanded ? text : truncated}</Text>{' '}
				{(shouldShowReadMore || expanded) && (
					<button className="read-more-link" onClick={toggleExpand}>
						<Text inheritFont weight={600} style={_styles}>
							Read {expanded ? 'less' : 'more'}
						</Text>
					</button>
				)}
			</span>
		);
	}
);

export default ReadMore;

ReadMore.displayName = 'ReadMore';
