import React, { useState, useEffect, DragEvent, useCallback } from 'react';
import classNames from 'classnames';
import { Flex, Text } from '@labs/components';

import { generateUUID, getSizeFormat } from '@labs/utils';
import { FileWithKey } from '@labs/utils/types/utility';

import DragAndDropImage from '@labs/icons/dragAndDrop.svg';
import DocumentImage from '@labs/icons/document.svg';
import DeleteImage from '@labs/icons/delete.svg';

import styles from './drag-and-drop.module.scss';

interface DragAndDrop
	extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrop'> {
	multiple?: boolean;
	accept?: 'application/pdf';
	onDrop: (files: File[]) => void;
	onDragOver?: () => void;
	maxSize?: number;
	size?: 'md' | 'lg';
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
	maxSize = 10,
	size = 'lg',
	...rest
}: Readonly<DragAndDrop>) {
	const [dragIsOver, setDragIsOver] = useState(false);
	const [files, setFiles] = useState<FileWithKey[]>([]);

	function handleDeleteClick(indexToRemove: number) {
		setFiles((prev) => {
			const newFiles = [...prev];
			newFiles.splice(indexToRemove, 1);
			return newFiles;
		});
	}

	const filesWithError = files.filter((file) => file.status.length !== 0);
	const filesWithoutError =
		files && files.filter((file) => file.status.length === 0);

	useEffect(() => {
		const interval = setInterval(() => {
			if (filesWithError.length > 0) {
				setFiles((prev) => {
					const firstErrorIndex = prev.findIndex(
						(file) => file.status.length !== 0
					);
					if (firstErrorIndex !== -1) {
						return [
							...prev.slice(0, firstErrorIndex),
							...prev.slice(firstErrorIndex + 1),
						];
					}
					return prev;
				});
			}
		}, 3000);

		return () => clearInterval(interval);
	}, [files]);

	const validateFile = (file: File) => {
		const errors = [];
		if (file.size > maxSize * 1024 * 1024) {
			errors.push(`File ${file.name}'s size should be less than ${maxSize}MB`);
		} else if (file.type !== accept) {
			errors.push(`File ${file.name}'s type should be ${accept.split('/')[1]}`);
		}
		return errors;
	};

	const addFiles = (filesToAdd: File[]) => {
		const newFiles = filesToAdd.map((file) => ({
			blob: file,
			key: generateUUID(),
			status: validateFile(file),
		}));

		setFiles((prev) => [...prev, ...newFiles]);

		const validFiles = newFiles
			.filter((file) => file.status.length === 0)
			.map((file) => file.blob);
		if (validFiles.length > 0) {
			onDrop(validFiles);
		}
	};

	const handleFileUpload = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const files = Array.from(event.target.files! || []);
			addFiles(files);
		},
		[]
	);

	const handleDragOver = useCallback(
		(event: DragEvent<HTMLDivElement>) => {
			event.preventDefault();
			setDragIsOver(true);
			onDragOver?.();
		},
		[onDragOver]
	);

	const handleDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setDragIsOver(false);
	}, []);

	const handleDrop = useCallback(
		(event: DragEvent<HTMLDivElement>) => {
			event.preventDefault();
			setDragIsOver(false);

			let droppedFiles = Array.from(event.dataTransfer.files).filter(
				(file) => file.type === accept
			);
			if (!multiple) droppedFiles = droppedFiles.slice(0, 1);

			addFiles(droppedFiles);
		},
		[multiple, accept]
	);

	return (
		<Flex.Column
			gap={14}
			className={classNames(['py-4', rest.className])}
			{...rest}
		>
			{(!files || files.length !== 1) && (
				<Flex.Column
					alignItems="center"
					gap="4"
					className={classNames(
						styles.DragAndDrop,
						dragIsOver ? 'bg-[#E7F3FE]' : 'bg-[#f9fcff]',
						size && styles[size]
					)}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
				>
					<Flex.Column alignItems="center">
						<DragAndDropImage
							className={classNames([
								`transition-transform mb-[4px]`,
								!dragIsOver ? 'scale-100' : 'scale-150',
								size === 'md' ? 'h-[40px]' : '',
							])}
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
			)}

			<Flex.Column gap={8}>
				{files &&
					filesWithError.map((file) => (
						<Text
							key={file.key}
							className="mb-2"
							color="var(--primary-red)"
							size="sm"
						>
							{file.status.map((status) => status + '\n')}
						</Text>
					))}
				{filesWithoutError.map((file, index) => {
					return (
						<Flex
							direction="row"
							alignItems="center"
							justifyContent="space-between"
							key={file.key}
							className={`${styles.FileListItem}`}
						>
							<Flex>
								<DocumentImage className={styles.FileListDocumentIcon} />
								<Flex.Column gap={4}>
									<Text
										className={styles.FileListItemTitle}
										fontSize="var(--font-p)"
										weight={600}
										lineHeight="18px"
									>
										{file.blob.name}
									</Text>
									<Text color="var(--text-gray)" size="sm">
										{getSizeFormat(file.blob.size)}
									</Text>
								</Flex.Column>
							</Flex>
							<button onClick={() => handleDeleteClick(index)}>
								<DeleteImage />
							</button>
						</Flex>
					);
				})}
			</Flex.Column>
		</Flex.Column>
	);
}
