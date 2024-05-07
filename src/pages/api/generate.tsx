// import { renderToStream } from '@react-pdf/renderer';
import { NextApiRequest, NextApiResponse } from 'next';
import { renderToStream } from '@react-pdf/renderer';
import { Resume } from '@/features/build-resume/view/build-resume-preview/view/resume-blocks';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const props = JSON.parse(req.body);

	const file = await renderToStream(
		<Resume modules={props.modules} template={props.template} />
	);

	res.setHeader('Content-Type', 'application/pdf');
	res.setHeader(
		'Content-Disposition',
		`attachment; filename="${props.name}.pdf"`
	);

	res.send(file);
};

export default handler;
