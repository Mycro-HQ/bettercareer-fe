import {
	BtnBulletList,
	BtnNumberedList,
	ContentEditableEvent,
	Editor,
	EditorProvider,
	Separator,
	Toolbar,
	createButton,
} from 'react-simple-wysiwyg';

import Bold from '@labs/icons/dashboard/editor/bold.svg';
import Italic from '@labs/icons/dashboard/editor/italics.svg';
import Underline from '@labs/icons/dashboard/editor/underline.svg';
import Link from '@labs/icons/dashboard/editor/links.svg';
import Clear from '@labs/icons/dashboard/editor/clear.svg';
import Undo from '@labs/icons/dashboard/editor/undo.svg';
import Redo from '@labs/icons/dashboard/editor/redo.svg';
import { generateUUID } from '@labs/utils';
import { Flex } from '@labs/components';

export const BtnBold = createButton('Bold', <Bold />, 'bold');

export const BtnRedo = createButton(
	'Redo',
	<Redo className="rotate-[180deg]" height={18} />,
	'redo'
);
export const BtnUndo = createButton(
	'Undo',
	<Undo className="rotate-[180deg]" height={18} />,
	'undo'
);

export const BtnClearFormatting = createButton(
	'Clear formatting',
	<Clear />,
	'removeFormat'
);

export const BtnItalic = createButton('Italic', <Italic />, 'italic');

export const BtnStrikeThrough = createButton(
	'Strike through',
	<s>ab</s>,
	'strikeThrough'
);

export const BtnLink = createButton(
	'Link',
	<Link />,
	({ $selection, ...rest }) => {
		console.log('unlink', $selection, rest);
		if ($selection?.nodeName === 'A') {
			document.execCommand('unlink');
		} else {
			// eslint-disable-next-line no-alert
			document.execCommand('createLink', false, prompt('URL', '') || undefined);
		}
	}
);

export const BtnUnderline = createButton(
	'Underline',
	<Underline />,
	'underline'
);

export default function CustomEditor({
	value,
	onChange,
	label,

	toolbar = [
		'bold',
		'italic',
		'underline',
		'strikeThrough',
		'link',
		'divider',
		'numberedList',
		'bulletList',
		'divider',
		'clearFormatting',
	],
}: {
	value: string;
	onChange: (value: ContentEditableEvent) => void;
	label?: string;
	toolbar?: Array<
		| 'bold'
		| 'italic'
		| 'underline'
		| 'strikeThrough'
		| 'link'
		| 'divider'
		| 'clearFormatting'
		| 'numberedList'
		| 'bulletList'
	>;
}) {
	const fieldId = generateUUID();

	return (
		<Flex.Column fullWidth gap={8}>
			{label && (
				<label htmlFor={fieldId} className="rsw_label">
					{label}{' '}
				</label>
			)}
			<EditorProvider>
				<Editor value={value} onChange={onChange} id={fieldId}>
					<Toolbar>
						<BtnUndo />
						<BtnRedo />
						<Separator />

						{toolbar.map((item, index) => {
							const key = `${item}:${index}`;
							switch (item) {
								case 'bold':
									return <BtnBold key={key} />;
								case 'italic':
									return <BtnItalic key={key} />;
								case 'underline':
									return <BtnUnderline key={key} />;
								case 'strikeThrough':
									return <BtnStrikeThrough key={key} />;
								case 'link':
									return <BtnLink key={key} />;
								case 'divider':
									return <Separator key={key} />;
								case 'clearFormatting':
									return <BtnClearFormatting key={key} />;
								case 'numberedList':
									return <BtnNumberedList key={key} />;
								case 'bulletList':
									return <BtnBulletList key={key} />;
								default:
									return null;
							}
						})}
						{/* <BtnBold />
					<BtnUnderline />
					<BtnItalic />
					<BtnStrikeThrough />
					<BtnLink />

					<Separator />
					<BtnNumberedList />
					<BtnBulletList />

					<Separator />
					<BtnClearFormatting /> */}
					</Toolbar>
				</Editor>
			</EditorProvider>
		</Flex.Column>
	);
}
