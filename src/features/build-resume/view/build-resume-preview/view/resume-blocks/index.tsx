import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Font, pdf } from '@react-pdf/renderer';
import { Document, Page, pdfjs } from 'react-pdf';
import { ScrollArea } from '@radix-ui/themes';
import { useMutation } from '@tanstack/react-query';

import File from '@labs/icons/dashboard/file_2.svg';
import { useBuildStore } from '@/store/z-store/builder';
import { isEmpty, useDebounce } from '@labs/utils';
import { Spinner } from '@labs/components/spinner';
import { Flex, Heading } from '@labs/components';

import styles from './resume-blocks.module.scss';
import { ClassicTemplate } from './classic';

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

Font.register({
	family: 'Domine',
	src: 'https://fonts.gstatic.com/s/domine/v20/L0xhDFMnlVwD4h3Lt9JWnbX3jG-2X0DAI10VErGuW8Q.ttf',
});

Font.register({
	family: 'Open Sans',
	fonts: [
		{
			src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFW50e.ttf`,
			fontWeight: 400,
		},
		{
			src: `https://fonts.gstatic.com/s/opensans/v17/mem5YaGs126MiZpBA-UNirkOUuhs.ttf`,
			fontWeight: 600,
		},
	],
});

Font.register({
	family: 'Lato Body',
	fonts: [
		{
			src: `https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHvxk6XweuBCY.ttf`,
			fontWeight: 400,
		},
		{
			src: `https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh6UVSwiPHA3q5d0N7w.ttf`,
			fontWeight: 700,
		},
		{
			src: `https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh6UVSwiPHA3q5d0N7w.ttf`,
			fontWeight: 800,
		},
		{
			src: `https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh6UVSwiPHA3q5d0N7w.ttf`,
			fontWeight: 900,
		},
	],
});

export const Resume = (props: any) => {
	return <ClassicTemplate {...props} />;
};

export const ResumeApp = ({
	scale = 1,
	setScale,
}: {
	scale: number;
	setScale: (scale: number) => void;
}) => {
	const { modules: userData, setResumeBlob } = useBuildStore();
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
	const modules = useDebounce(userData, 500);

	// server implementation
	// const { mutateAsync: mutate } = useMutation({
	// 	mutationFn: async ({ modules }: { modules: any }) => {
	// 		const response = await fetch(`${window.location.origin}/api/generate`, {
	// 			method: 'POST',
	// 			body: JSON.stringify({ modules }),
	// 		});
	// 		const _base64 = await response.blob();
	// 		const base64 = (await blobToBase64(_base64)) as string;

	// 		const binaryString = window.atob(base64.split(',')[1]);
	// 		const bytes = new Uint8Array(binaryString.length);
	// 		for (let i = 0; i < binaryString.length; i++) {
	// 			bytes[i] = binaryString.charCodeAt(i);
	// 		}
	// 		const blob = new Blob([bytes], { type: 'application/pdf' });

	// 		return {
	// 			blob,
	// 			raw: base64,
	// 		};
	// 	},
	// 	onSuccess: (data: any) => {
	// 		setPdfUrl(data?.blob);
	// 		setResumeBlob({
	// 			blob: data?.blob as unknown as string,
	// 		});
	// 		setGenerateImage(true);
	// 	},
	// });

	// useEffect(() => {
	// 	let isCancelled = false;

	// 	if (!isCancelled) mutate({ modules });
	// 	return () => {
	// 		isCancelled = true;
	// 	};
	// }, [modules]);

	useEffect(() => {
		let isCancelled = false;

		if (!isCancelled) {
			const generatePdf = async () => {
				const _blob = await pdf(<Resume modules={modules} />).toBlob();

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
	}, [modules]);

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
			textFinal += item.str;
		}

		setResumeBlob({
			raw: textFinal as unknown as string,
		});
	}

	return (
		<ScrollArea type="scroll">
			<div className="w-fit m-auto max-h-[86vh] rounded-[12px] overflow-hidden">
				{pdfUrl ? (
					<>
						{modules.find((module: any) => !isEmpty(module.data)) &&
						canvasImage ? (
							<ImgZoom src={canvasImage} scale={scale} setScale={setScale} />
						) : (
							<div className={styles.PreviewPage}>
								<Flex.Column
									gap={12}
									alignItems="center"
									justifyContent="center"
									className="h-full max-w-[400px] m-auto text-center p-4"
								>
									<File className="w-[32px] h-[32px]" />
									<Heading.h4 fontSize="16px" className="-mb-3">
										Start Creating Your Resume
									</Heading.h4>
									<Heading.h6 fontSize="14px" color="var(--text-gray)">
										Your resume is almost ready! Fill in the missing details to
										get started.
									</Heading.h6>
								</Flex.Column>
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
												scale={2}
												renderMode="canvas"
												canvasRef={canvasRef}
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
			</div>
		</ScrollArea>
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
		const newZoom = Math.min(Math.max(scale + delta, 1), 3);
		setScale(newZoom);
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
		<div
			style={{
				overflow: 'hidden',
				cursor: isDragging ? 'grabbing' : 'grab',
				width: '100%',
				height: '100%',
			}}
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
					} as any
				}
				onWheel={handleWheel}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
			/>
		</div>
	);
};
export default ResumeApp;
