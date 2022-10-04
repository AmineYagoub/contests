import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query);

  return res.status(200).json({ query: 'ok' });
};
export default handler;
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
