type LabelProps = {
	text: string;
} & React.ComponentPropsWithoutRef<'label'>;

export default function Label({ text, ...props }: LabelProps) {
	return (
		<label htmlFor={props.htmlFor} className={props.className} {...props}>
			{text}
		</label>
	);
}
