import React, { useCallback, useEffect, useRef, useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { Document, Page, pdfjs } from 'react-pdf';
import { ScrollArea } from '@radix-ui/themes';
import { motion } from 'framer-motion';

import File from '@labs/icons/dashboard/file_2.svg';
import { useBuildStore } from '@/store/z-store/builder';
import { isEmpty, useDebounce } from '@labs/utils';
import { Spinner } from '@labs/components/spinner';
import { Flex, Heading } from '@labs/components';

import styles from './resume-blocks.module.scss';

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

import { registerFonts, templateMaps } from './utils';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

registerFonts();

export const Resume = (props: any) => {
	const template = props.template;
	const Comp =
		templateMaps[template.name as keyof typeof templateMaps] ||
		templateMaps['classic'];

	return <Comp {...props} />;
};

export const ResumeApp = ({
	scale = 1,
	setScale,
}: {
	scale: number;
	setScale: (scale: number) => void;
}) => {
	const { modules: userData, template, setResumeBlob } = useBuildStore();
	const [numPages, setNumPages] = useState(1);

	const blobToBase64 = (blob: Blob) => {
		return new Promise((resolve, _) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.readAsDataURL(blob);
		});
	};

	const [pdfUrl, setPdfUrl] = useState(null);
	const canvasRef = useRef(null);
	const [canvasImage, setCanvasImage] = useState('');
	const [generateImage, setGenerateImage] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const modules = useDebounce(userData, 200);

	useEffect(() => {
		let isCancelled = false;

		if (!isCancelled) {
			const generatePdf = async () => {
				const _blob = await pdf(
					Resume({
						modules,
						template,
					})
				).toBlob();

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
			};

			generatePdf();
		}
		return () => {
			isCancelled = true;
		};
	}, [modules, template, setResumeBlob]);

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
	const hasData = modules.find((module: any) => !isEmpty(module.data));
	const hasValueInData = Object.values(hasData?.data || {}).reduce(
		(a: any, b: any) => a?.toString() + b?.toString(),
		''
	) as string;

	return (
		<Flex.Column
			className="w-full h-full m-auto rounded-[12px] h-full overflow-hidden"
			alignItems="center"
			justifyContent="center"
		>
			{pdfUrl ? (
				<>
					{hasData && hasValueInData?.trim() && canvasImage ? (
						<ImgZoom src={canvasImage} scale={scale} setScale={setScale} />
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
									<Heading.h4 fontSize="18px" className="-mb-2" weight={400}>
										Your Resume Preview will appear here
									</Heading.h4>
									<Heading.h6 fontSize="14px" color="var(--text-gray)">
										Your resume is almost ready! Start building your resume to
										see the preview
									</Heading.h6>
								</Flex.Column>
							</motion.div>
						</div>
					)}

					{generateImage ? (
						<div className="hidden">
							<Document
								file={pdfUrl}
								key={`pdf_${pdfUrl}`}
								renderMode="canvas"
								onLoadSuccess={onDocumentLoadSuccess}
							>
								{Array.from(new Array(numPages), (el, index) => (
									<article
										key={`page_${index + 1}`}
										data-page-number={index + 1}
									>
										<Page
											pageNumber={index + 1}
											scale={3}
											renderMode="canvas"
											canvasRef={
												index + 1 === currentPage ? canvasRef : undefined
											}
											onGetTextSuccess={(text: any) => {
												formatText(text);
											}}
											onRenderSuccess={() => {
												if (!canvasRef.current) return;
												const canvas = canvasRef.current as HTMLCanvasElement;
												const ctx = (canvas as any).getContext('2d', {
													alpha: false,
												});
												const img = new Image();
												img.src = (canvas as any).toDataURL('image/png');
												img.onload = () => {
													ctx.drawImage(img, 0, 0);
													setCanvasImage(
														(canvas as any).toDataURL('image/png')
													);
												};

												img.crossOrigin = 'anonymous';
												img.onerror = (e) => {
													setPdfUrl(null);
												};
												setGenerateImage(false);
											}}
										/>
									</article>
								))}
							</Document>
						</div>
					) : null}
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
export default ResumeApp;
