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
  StudentLevel,
} from '@/graphql/graphql';
import { getLevelsValues } from '@/utils/mapper';

/* Don't miss that! */
export const config = {
  api: {
    bodyParser: false,
  },
};

type ProcessedFiles = Array<[string, File]>;

const range = (start: string, end: number) => {
  const result = [];
  for (let i = Number(start); i <= end; i++) {
    result.push(i);
  }
  return result;
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
    const [, tag, entry, type] = relativePath.split('/');
    if (entry && !zipEntry.dir) {
      const data = await zip.file(relativePath).async('string');
      const questions = data.split(/\n\s/g);
      questions.forEach((question) => {
        let levels = [];
        if (entry === '13') {
          levels = [entry];
        } else {
          levels = range(entry, 19);
        }
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
          level: levels.map((level) =>
            getLevelsValues(String(level))
          ) as StudentLevel[],
          type: getQuestionType(type),
        };
        result.push(questionObject);
      });
    }
  }
  console.log(result);
  return result;
};

const saveQuestions = async (questions: CreateQuestionDto[]) => {
  const client = initializeApollo({});
  try {
    for (const question of questions) {
      const data = await client.mutate<
        CreateQuestionMutation,
        CreateQuestionMutationVariables
      >({
        mutation: CreateQuestionDocument,
        variables: {
          input: question,
        },
      });
      console.log(data);
    }
  } catch (error) {
    console.error(error);
  }
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
    console.log(e);
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
