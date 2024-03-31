import {
	createButton,
	Editor,
	EditorProvider,
	BtnBulletList,
	BtnNumberedList,
	Separator,
	Toolbar,
	ContentEditableEvent,
} from 'react-simple-wysiwyg';

import Bold from '@labs/icons/dashboard/editor/bold.svg';
import Italic from '@labs/icons/dashboard/editor/italics.svg';
import Underline from '@labs/icons/dashboard/editor/underline.svg';
import Link from '@labs/icons/dashboard/editor/links.svg';
import Clear from '@labs/icons/dashboard/editor/clear.svg';
import Undo from '@labs/icons/dashboard/editor/undo.svg';
import Redo from '@labs/icons/dashboard/editor/redo.svg';

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
}: {
	value: string;
	onChange: (value: ContentEditableEvent) => void;
}) {
	return (
		<EditorProvider>
			<Editor value={value} onChange={onChange}>
				<Toolbar>
					<BtnUndo />
					<BtnRedo />
					<Separator />

					<BtnBold />
					<BtnUnderline />
					<BtnItalic />
					<BtnStrikeThrough />
					<BtnLink />

					<Separator />
					<BtnNumberedList />
					<BtnBulletList />

					<Separator />
					<BtnClearFormatting />
				</Toolbar>
			</Editor>
		</EditorProvider>
	);
}
