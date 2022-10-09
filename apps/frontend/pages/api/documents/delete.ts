import { deleteFile } from '@/config/createMinioClient';
import { Logger } from '@/utils/app';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO Check user auth
  let status = 200;
  const resultBody = {
    status: 'ok',
    message: 'Deleted',
  };
  if (req.method !== 'DELETE') {
    return res
      .status(405)
      .json({ status: 'Method Not Allowed', message: 'Upload error' });
  }
  const { id, name } = req.query;
  if (!id || !name) {
    return res
      .status(422)
      .json({ status: 'Unprocessable Entity', message: 'Upload error' });
  }
  try {
    await deleteFile(String(id), String(name));
  } catch (error) {
    Logger.log(error);
    status = 400;
    resultBody.message = error.message;
  }

  res.status(status).json(resultBody);
};
export default handler;
