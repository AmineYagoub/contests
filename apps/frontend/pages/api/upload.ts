import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import { promises as fs } from 'fs';
import JSZip from 'jszip';
import path from 'path';

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

type ProcessedFiles = Array<[string, File]>;

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
          authorId: 1,
          title,
          options,
          correctAnswer,
          lesson,
          tags: {
            connectOrCreate: [
              {
                create: { title: tag },
                where: { title: tag },
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
  socket.disconnect();
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let status = 200,
    resultBody = { status: 'ok', message: 'Files were uploaded successfully' };

  /* Get files using formidable */
  const files = await new Promise<ProcessedFiles | undefined>(
    (resolve, reject) => {
      const form = new formidable.IncomingForm();
      const files: ProcessedFiles = [];
      form.on('file', function (field, file) {
        files.push([field, file]);
      });
      form.on('end', () => resolve(files));
      form.on('error', (err) => reject(err));
      form.parse(req, () => {
        //
      });
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
    /* Create directory for uploads */
    const targetPath = path.join(process.cwd(), `/uploads/`);
    try {
      await fs.access(targetPath);
    } catch (e) {
      await fs.mkdir(targetPath);
    }

    /* Move uploaded files to directory */
    for (const [, file] of files) {
      const tempPath = file.filepath;
      const newPath = targetPath + file.originalFilename;
      await fs.copyFile(tempPath, newPath);
      const questions = await processFiles(newPath);
      await saveQuestions(questions);
    }
  }

  res.status(status).json(resultBody);
};

export default handler;
