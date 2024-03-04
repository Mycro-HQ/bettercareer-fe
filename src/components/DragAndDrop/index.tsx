import React, { useState, DragEvent } from 'react';
import { Flex, Box, Text } from '@radix-ui/themes';
import styles from './DragAndDrop.module.scss';
import Image from 'next/image';
import { generateUUID } from '@labs/utils';
import { FileWithKey } from '@labs/utils/types/utility';

interface DragAndDrop {
	multiple: boolean;
	accept: 'application/pdf';
	// | 'image/gif'
	// | 'image/jpeg'
	// | 'image/png'
	// | 'image/svg+xml'
	// | 'image/tiff'
	// | 'image/webp';
	onDrop: (files: File[]) => void;
	onDragOver: () => void;
	setFiles: React.Dispatch<React.SetStateAction<FileWithKey[]>>;
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
 *
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
	accept,
	onDrop,
	onDragOver,
	setFiles,
}: DragAndDrop) {
	const [dragIsOver, setDragIsOver] = useState(false);

	function addKeysToFiles(files: File[]) {
		const filesWithKeys = files.map((file) => ({
			blob: file,
			key: generateUUID(),
		}));

		setFiles((prev) => [...prev, ...filesWithKeys]);
	}

	function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
		const files = Array.from(e.target.files!);
		addKeysToFiles(files);
		onDrop(files);
	}

	const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setDragIsOver(true);
		onDragOver();
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
		onDrop(droppedFiles);
	};

	return (
		<Flex
			grow="1"
			direction="column"
			align="center"
			gap="4"
			className={styles.DragAndDrop}
			style={{
				backgroundColor: dragIsOver ? '#E7F3FE' : '#f9fcff',
			}}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
			<Flex direction="column" align="center" grow="1">
				<Image
					src="/dragAndDrop.svg"
					alt="Drag-and-drop zone for file upload."
					width={70}
					height={44.75}
					style={{
						transform: !dragIsOver ? 'scale(1)' : 'scale(1.4)',
						transition: 'transform 0.3s ease-in-out',
					}}
				/>
				<Box>
					{dragIsOver ? (
						<Text as="span">Drop your file here</Text>
					) : (
						<>
							<Text as="span">Drag and drop file or </Text>
							<Text as="label" htmlFor="DragAndDrop">
								Browse
							</Text>
						</>
					)}

					<input
						type="file"
						id="DragAndDrop"
						name="DragAndDrop"
						accept={accept}
						multiple={multiple}
						style={{ opacity: 0, width: 0, height: 0 }}
						onChange={handleFileUpload}
					/>
				</Box>
			</Flex>
		</Flex>
	);
}
