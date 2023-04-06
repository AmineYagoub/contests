import multiparty from 'multiparty';
import { NextApiRequest, NextApiResponse } from 'next';
import { unlink } from 'node:fs/promises';
import { config as appConfig } from '@/config/index';
import { createBucket, uploadFile } from '@/config/createMinioClient';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let status = 200,
    resultBody = {
      status: 'ok',
      message: 'Files were uploaded successfully',
      docName: null,
    };
  const { id } = req.query;
  if (!id) {
    res
      .status(422)
      .json({ status: 'Unprocessable Entity', message: 'Upload error' });
  }

  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ status: 'Method Not Allowed', message: 'Upload error' });
  }
  const form = new multiparty.Form();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      status = 500;
      resultBody = {
        status: 'fail',
        message: 'Upload error',
        docName: null,
      };
    } else {
      const bucketName = await createBucket(String(id));
      for (const [name, file] of Object.entries(files)) {
        await uploadFile(bucketName, file[0].path, name);
        await unlink(file[0].path);
        const url = `https://${appConfig.minio.minioHost}/${bucketName}/${name}`;
        resultBody.message = url;
        resultBody.docName = name;
      }
      res.status(status).json(resultBody);
    }
  });
};
export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};
