import type { NextApiRequest, NextApiResponse } from 'next';
import multiparty from 'multiparty';
import { promises as fs } from 'fs';
import JSZip from 'jszip';
import { unlink } from 'node:fs/promises';

import { initializeApollo } from '@/config/createGraphQLClient';
import {
  CreateQuestionDocument,
  CreateQuestionDto,
  CreateQuestionMutation,
  CreateQuestionMutationVariables,
  QuestionType,
} from '@/graphql/graphql';
import { socket } from '@/utils/app';

export const config = {
  api: {
    bodyParser: false,
  },
};

const getQuestionType = (type: string) => {
  switch (true) {
    case type.includes('السهل'):
      return QuestionType.Easy;
    case type.includes('متوسط'):
      return QuestionType.Medium;
    default:
      return QuestionType.Hard;
  }
};

const percentOf = (value: number, total: number) => {
  const result = Math.round((value / total) * 100);
  return result <= 5 ? 5 : result;
};

const processFiles = async (path: string) => {
  const result: CreateQuestionDto[] = [];
  const entries: { zipEntry: JSZip.JSZipObject; relativePath: string }[] = [];
  const file = await fs.readFile(path);
  const zip = await JSZip.loadAsync(file);

  zip.forEach((relativePath, zipEntry) =>
    entries.push({ relativePath, zipEntry })
  );

  for (const en of entries) {
    const { relativePath, zipEntry } = en;
    const [, tag, type] = relativePath.split('/');
    if (tag && !zipEntry.dir) {
      const data = await zip.file(relativePath).async('string');
      const questions = data.split(/\n\s/g);
      questions.forEach((question) => {
        const [title, ...options] = question.trim().split('\n');
        const correctAnswer = options.shift();
        const lesson = options.pop();
        const questionObject: CreateQuestionDto = {
          authorId: '1',
          title,
          options,
          correctAnswer,
          lesson,
          topics: {
            connect: [
              {
                title: tag,
              },
            ],
          },
          type: getQuestionType(type),
        };
        result.push(questionObject);
      });
    }
  }

  return result;
};

const saveQuestions = async (questions: CreateQuestionDto[]) => {
  socket.connect();
  const client = initializeApollo({});
  let i = 0;
  for (const question of questions) {
    try {
      await client.mutate<
        CreateQuestionMutation,
        CreateQuestionMutationVariables
      >({
        mutation: CreateQuestionDocument,
        variables: {
          input: question,
        },
      });
      i++;
      socket.emit('saveQuestionsProgress', percentOf(i, questions.length));
    } catch (error) {
      console.error(error);
    }
  }
  socket.emit('saveQuestionsProgress', 100);
  socket.disconnect();
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ status: 'Method Not Allowed', message: 'Upload error' });
  }
  let status = 200,
    resultBody = { status: 'ok', message: 'Files were uploaded successfully' };

  const form = new multiparty.Form();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      status = 500;
      resultBody = {
        status: 'fail',
        message: 'Upload error',
      };
    } else {
      for (const [, file] of Object.entries(files)) {
        console.log(file[0].path);
        const questions = await processFiles(file[0].path);
        await saveQuestions(questions);
        await unlink(file[0].path);
      }
      // res.status(status).json(resultBody);
    }
  });

  /*   const files = await new Promise<ProcessedFiles | undefined>(
    (resolve, reject) => {
      const form = new formidable.IncomingForm();
      const files: ProcessedFiles = [];
      form.on('file', function (field, file) {
        files.push([field, file]);
      });
      form.on('end', () => resolve(files));
      form.on('error', (err) => reject(err));
    }
  ).catch((e) => {
    console.error(e);
    status = 500;
    resultBody = {
      status: 'fail',
      message: 'Upload error',
    };
  });

  if (files) {
    const targetPath = path.join(process.cwd(), `/uploads/`);
    try {
      await fs.access(targetPath);
    } catch (e) {
      await fs.mkdir(targetPath);
    }


    for (const [, file] of files) {
      const tempPath = file.filepath;
      const newPath = targetPath + file.originalFilename;
      await fs.copyFile(tempPath, newPath);
      const questions = await processFiles(newPath);
      await saveQuestions(questions);
    }
  } */

  res.status(status).json(resultBody);
};

export default handler;
