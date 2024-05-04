import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { pdf } from '@react-pdf/renderer';
import { Document, Page, pdfjs } from 'react-pdf';
import { ScrollArea } from '@radix-ui/themes';
import { motion } from 'framer-motion';

import File from '@labs/icons/dashboard/file_2.svg';
import { useBuildStore } from '@/store/z-store/builder';
import { isEmpty, useDebounce, wait } from '@labs/utils';
import { Spinner } from '@labs/components/spinner';
import { Flex, Heading, Text, useToast } from '@labs/components';

import styles from './resume-blocks.module.scss';

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

import { MOCK, registerFonts, templateMaps } from './utils';
import classNames from 'classnames';
import { APP_URL } from '@lib/config';

pdfjs.GlobalWorkerOptions.workerSrc = `/assets/js/pdf-worker.js`;

registerFonts();

export const Resume = (props: any) => {
	const template = props.template;
	const Comp =
		templateMaps[template.name as keyof typeof templateMaps] ||
		templateMaps['classic'];

	return <Comp {...props} />;
};

export const ResumePreview = ({
	scale = 1,
	setScale,
	template: _temp,
	useDefault = false,
}: {
	scale: number;
	setScale?: (scale: number) => void;
	template?: any;
	useDefault?: boolean;
}) => {
	const {
		modules: userData,
		template: temp,
		resumeBlob,
		setResumeBlob,
	} = useBuildStore();

	const [numPages, setNumPages] = useState(1);
	const template = useMemo(() => {
		if (_temp) return _temp;
		return temp;
	}, [temp, _temp]);

	const blobToBase64 = (blob: Blob) => {
		return new Promise((resolve, _) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.readAsDataURL(blob);
		});
	};

	const inputRef = useRef(null);
	const [pdfUrl, setPdfUrl] = useState(null);
	const canvasRef = useRef([]);
	const [canvasImage, setCanvasImage] = useState<Array<string>>([]);
	const [generateImage, setGenerateImage] = useState(false);

	const modules = useDebounce(userData, 300);

	const hasData = modules.find(
		(module: any) =>
			!isEmpty(module.data) &&
			Object.values(module.data || {}).reduce(
				(a: any, b: any) => a?.toString() + b?.toString(),
				''
			)
	);

	useEffect(() => {
		let isCancelled = false;
		let RETRY = 0;

		if (!isCancelled) {
			const generatePdf = async () => {
				// Please don't remove this line it fixes a funny SendWithPromise error
				// await wait(100);
				try {
					const _blob = await pdf(
						Resume({
							modules: useDefault && !hasData ? MOCK : modules,
							template,
						})
					).toBlob();

					// Vercel id behaving funny
					// const _blob = await fetch(`${APP_URL}/api/generate`, {
					// 	method: 'POST',
					// 	body: JSON.stringify({
					// 		modules: useDefault && !hasData ? MOCK : modules,
					// 		template,
					// 		name: 'resume',
					// 	}),
					// }).then((res) => res.blob());

					const base64 = (await blobToBase64(_blob)) as string;

					const binaryString = window.atob(base64.split(',')[1]);
					const bytes = new Uint8Array(binaryString.length);
					for (let i = 0; i < binaryString.length; i++) {
						bytes[i] = binaryString.charCodeAt(i);
					}
					const blob = new Blob([bytes], { type: 'application/pdf' });

					setPdfUrl(blob as unknown as any);
					setResumeBlob({
						blob: blob as unknown as string,
					});
					setGenerateImage(true);
				} catch (error) {
					if (RETRY < 2) {
						RETRY++;
						generatePdf();
					} else {
						setPdfUrl(null);
					}
				}
			};

			generatePdf();
		}

		return () => {
			isCancelled = true;
		};
	}, [modules, template, setResumeBlob, hasData, useDefault]);

	useEffect(() => {
		return () => {
			setNumPages(0);
			setPdfUrl(null);
			setCanvasImage([]);
			setResumeBlob({
				raw: '',
				thumbnail: '',
				blob: '',
				snapshots: [],
			});
			canvasRef.current = [];
		};
	}, []);

	const onDocumentLoadSuccess = useCallback(
		({ numPages }: { numPages: number }) => {
			setNumPages(numPages);
		},
		[]
	);

	function formatText(text: any) {
		let textFinal = '';
		for (let i = 0; i < text.items.length; i++) {
			const item = text.items[i] as any;
			textFinal += `\n ${item.str}`;
		}

		setResumeBlob({
			raw: textFinal as unknown as string,
		});
	}

	const handleBuildCanvas = useCallback(
		async (index: number) => {
			if (!canvasRef.current.length) return;

			let thumbnailImage = '';
			let snapshots = [] as string[];

			await new Promise((resolve, reject) => {
				for (let i = 0; i < canvasRef.current.length; i++) {
					if (i !== index) {
						resolve(true);
						continue;
					}
					const canvas = canvasRef.current[i] as HTMLCanvasElement;

					const ctx = (canvas as any).getContext('2d', {
						alpha: false,
					});

					const img = new Image();
					img.src = (canvas as any).toDataURL('image/png', 0.9);

					img.onload = () => {
						ctx.drawImage(img, 0, 0);
						setCanvasImage((prev) => {
							if (!prev) return Array.from({ length: numPages }, () => '');
							const newCanvasImages = [...prev].slice(0, numPages);
							newCanvasImages[index] = img.src;

							return newCanvasImages;
						});

						resolve(true);
					};

					if (i === 0) {
						thumbnailImage = canvas.toDataURL('image/jpeg', 0.15);
					}

					snapshots[i] = canvas.toDataURL('image/jpeg', 0.2);

					img.crossOrigin = 'anonymous';
					img.onerror = (e) => {
						setPdfUrl(null);
						reject(e);
					};
				}
			});

			setResumeBlob({
				thumbnail: thumbnailImage,
				snapshots,
			});
		},
		[canvasRef, setResumeBlob, numPages]
	);

	const canShowImage = useMemo(
		() => (hasData && canvasImage.length > 0) || useDefault,
		[canvasImage, hasData, useDefault]
	);

	return (
		<Flex.Column
			className={classNames([
				styles.Preview,
				'w-full h-full m-auto rounded-[8px] h-full ',
			])}
		>
			<Flex.Column
				alignItems="center"
				justifyContent="flex-start"
				style={
					(canShowImage && {
						transform: `scale(${scale}) translate(0px, 0px)`,
						transformOrigin: 'top center',
					}) ||
					{}
				}
				gap={18}
			>
				{pdfUrl ? (
					<>
						{canShowImage ? (
							<>
								{canvasImage.map((src, index) => (
									<img
										src={src}
										key={index}
										className="rounded-[12px]"
										alt="resume"
										onClick={() => {
											setScale?.(1);
										}}
									/>
								))}
							</>
						) : (
							<>
								{hasData && !canvasImage.length && generateImage ? (
									<div className={styles.PreviewPage}>
										<Flex.Column
											gap={4}
											alignContent="center"
											justifyContent="center"
											className="h-full"
										>
											<Spinner center />
										</Flex.Column>
									</div>
								) : (
									<div className={styles.PreviewPage}>
										<motion.div
											key="preview"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ duration: 0.2 }}
										>
											<Flex.Column
												gap={12}
												alignItems="center"
												justifyContent="center"
												className="h-full max-w-[400px] m-auto text-center p-4"
											>
												<File className="w-[32px] h-[32px]" />
												<Heading.h4
													fontSize="18px"
													className="-mb-2"
													weight={400}
												>
													Your Resume Preview will appear here
												</Heading.h4>
												<Heading.h6 fontSize="14px" color="var(--text-gray)">
													Your resume is almost ready! Start building your
													resume to see the preview
												</Heading.h6>
											</Flex.Column>
										</motion.div>
									</div>
								)}
							</>
						)}

						{generateImage && (
							<div className="hidden">
								<Document
									file={pdfUrl}
									key={`pdf_${pdfUrl}`}
									renderMode="canvas"
									inputRef={inputRef}
									onLoadSuccess={onDocumentLoadSuccess}
								>
									{!!numPages &&
										Array.from(new Array(numPages), (el, index) => (
											<Page
												key={`page_${index + 1}`}
												pageNumber={index + 1}
												scale={1.5}
												renderMode="canvas"
												canvasRef={
													(canvasRef as any)[index] ||
													((el) => ((canvasRef.current as any)[index] = el))
												}
												onGetTextSuccess={(text: any) => {
													formatText(text);
												}}
												onRenderSuccess={(e) => {
													return handleBuildCanvas(index);
												}}
											/>
										))}
								</Document>
							</div>
						)}
					</>
				) : (
					<div className={styles.PreviewPage}>
						<Flex.Column
							gap={4}
							alignContent="center"
							justifyContent="center"
							className="h-full"
						>
							<Spinner center />
						</Flex.Column>
					</div>
				)}
			</Flex.Column>
		</Flex.Column>
	);
};

const ImgZoom = ({
	src,
	scale,
	setScale,
}: {
	src: string;
	scale: number;
	setScale: (scale: number) => void;
}) => {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });

	const handleWheel = (e: MouseEvent | any) => {
		const delta = e.deltaY * -0.01;
		const newZoom = Math.min(Math.max(scale + delta, 0.5), 1);
		// on set zoom when the scroll bar is at the top or bottom of the page
		// if (newZoom < 1) {
		// 	setScale(newZoom);
		// 	setPosition({ x: 0, y: 0 });
		// }
	};

	useEffect(() => {
		if (scale <= 1) {
			setPosition({ x: 0, y: 0 });
		}
	}, [scale]);

	const handleMouseDown = (e: MouseEvent | any) => {
		if (scale <= 1) {
			return;
		}

		setIsDragging(true);
		setStartDrag({
			x: Math.max(0, e.clientX - position.x),
			y: Math.max(0, e.clientY - position.y),
		});
	};

	const handleMouseMove = (e: MouseEvent | any) => {
		if (!isDragging) return;

		setPosition({
			x: Math.max(0, e.clientX - startDrag.x),
			y: Math.max(0, e.clientY - startDrag.y),
		});
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	return (
		<ScrollArea type="scroll">
			<div
				className={`w-full max-h-[88vh] h-full ${
					isDragging ? 'cursor-grabbing' : 'cursor-grab'
				} `}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp} // To handle the case when the mouse leaves the component while dragging
			>
				<img
					src={src}
					className={styles.PreviewPageImage}
					style={
						{
							transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
							transition: 'transform 0.1s',
							transformOrigin: 'top center',
							willChange: 'transform',
						} as any
					}
					onWheel={handleWheel}
					onMouseDown={handleMouseDown}
					onMouseMove={handleMouseMove}
				/>
			</div>
		</ScrollArea>
	);
};
export default ResumePreview;
