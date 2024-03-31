import { renderToStream } from '@react-pdf/renderer';
import { NextApiRequest, NextApiResponse } from 'next';

import { Resume } from '@/features/build-resume/view/build-resume-preview/view/resume-blocks';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const props = JSON.parse(req.body);

	const stream = await renderToStream(<Resume modules={props.modules} />);

	res.setHeader('Content-Type', 'application/pdf');
	res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');

	stream.pipe(res);
};

export default handler;
