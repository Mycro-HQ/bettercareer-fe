import React, { useState, DragEvent } from 'react';
import { Flex, Text } from '@labs/components';
import styles from './DragAndDrop.module.scss';
import { generateUUID } from '@labs/utils';
import { FileWithKey } from '@labs/utils/types/utility';
import classNames from 'classnames';
import DragAndDropImage from '@labs/icons/dragAndDrop.svg';

interface DragAndDrop {
	multiple?: boolean;
	accept?: 'application/pdf';
	onDrop: (files: File[]) => void;
	onDragOver?: () => void;
	setFiles?: React.Dispatch<React.SetStateAction<FileWithKey[]>>;
	maxSize?: number;
}

/**
 * The DragAndDrop component provides a user interface for drag-and-drop file uploads.
 * It supports both drag-and-drop and file selection through a file input. The component
 * can be configured to accept multiple files or a single file, and to accept specific
 * MIME types.
 *
 * @param {boolean} multiple - Determines whether multiple files can be uploaded.
 * @param {'application/pdf'} accept - Specifies the MIME types of files that can be uploaded.
 * @param {(files: File[]) => void} onDrop - A callback function that is called when files are dropped/inputted onto the component. It receives an array of `File` objects.
 * @param {() => void} onDragOver - A callback function that is called when a drag event is detected over the component.
 * @param {React.Dispatch<React.SetStateAction<FileWithKey[]>>} setFiles - A function to update the state with the uploaded files. It should be a state setter function from the `useState` hook.
 * @param {number} maxSize - A number representing the maxSixe in bytes.
 * @example
 * import React, { useState } from 'react';
 * import DragAndDrop from './DragAndDrop';
 *
 * function MyComponent() {
 *  const [files, setFiles] = useState([]);
 *
 *  const handleDrop = (droppedFiles: File[]) => {
 *       console.log('Files dropped:', droppedFiles);
 *       // Process dropped files...
 *  };
 *
 *  return (
 *       <DragAndDrop
 *         multiple={true}
 *         accept="application/pdf"
 *         onDrop={handleDrop}
 *         onDragOver={() => console.log('Drag over')}
 *         setFiles={setFiles}
 *       />
 *   );
 * }
 */
export default function DragAndDrop({
	multiple,
	accept = 'application/pdf',
	onDrop,
	onDragOver,
	setFiles = () => {},
	maxSize = 10,
}: Readonly<DragAndDrop>) {
	const [dragIsOver, setDragIsOver] = useState(false);

	function validateFile(file: File) {
		const errors: string[] = [];

		if (file.size > maxSize * 1024 * 1024) {
			errors.push(`File ${file.name}'s size should be less than ${maxSize}MB`);
		} else if (file.type !== accept) {
			errors.push(`File ${file.name}'s type should be ${accept.split('/')[1]}`);
		}

		return errors;
	}

	function addKeysToFiles(files: File[]) {
		const filesWithKeys = files.map((file) => ({
			blob: file,
			key: generateUUID(),
			status: [],
		}));

		setFiles((prev) => [...prev, ...filesWithKeys]);
	}

	function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
		const files = Array.from(e.target.files!);
		addKeysToFiles(files);
		setFiles((prev) =>
			prev.map((file) => ({
				...file,
				status: validateFile(file.blob),
			}))
		);
		onDrop(files);
	}

	const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setDragIsOver(true);
		if (onDragOver) {
			onDragOver();
		}
	};

	const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setDragIsOver(false);
	};

	const handleDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setDragIsOver(false);

		let droppedFiles = Array.from(event.dataTransfer.files);

		droppedFiles = droppedFiles.filter((file) => file.type === accept);

		if (!multiple) {
			droppedFiles = droppedFiles.slice(0, 1);
		}

		addKeysToFiles(droppedFiles);
		setFiles((prev) =>
			prev.map((file) => ({
				...file,
				status: validateFile(file.blob),
			}))
		);
		onDrop(droppedFiles);
	};

	return (
		<Flex.Column
			alignItems="center"
			gap="4"
			className={classNames(
				styles.DragAndDrop,
				dragIsOver ? 'bg-[#E7F3FE]' : 'bg-[#f9fcff]',
				'mt-9 mb-9'
			)}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
			<Flex.Column alignItems="center">
				<DragAndDropImage
					style={{
						transform: !dragIsOver ? 'scale(1)' : 'scale(1.4)',
						transition: 'transform 0.3s ease-in-out',
					}}
				/>
				<Flex.Column alignItems="center">
					{dragIsOver ? (
						<Text as="span">Drop your file here</Text>
					) : (
						<>
							<Flex gap="2" alignItems="center">
								<Text as="span">Drag and drop file or </Text>
								<label
									htmlFor="DragAndDrop"
									role="button"
									className="cursor-pointer"
								>
									Browse
								</label>
							</Flex>
							<Text className="mt-[2px]" size="sm" color="var(--text-gray)">
								Up to 10MB in PDF
							</Text>
						</>
					)}

					<input
						type="file"
						id="DragAndDrop"
						name="DragAndDrop"
						accept={accept}
						multiple={multiple}
						className="opacity-0 w-0 h-0"
						onChange={handleFileUpload}
					/>
				</Flex.Column>
			</Flex.Column>
		</Flex.Column>
	);
}
