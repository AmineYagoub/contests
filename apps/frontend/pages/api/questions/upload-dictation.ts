import {
  CreateQuestionDto,
  CreateQuestionMutation,
  CreateQuestionDocument,
  CreateQuestionMutationVariables,
  DictationQuestionLevel,
  QuestionType,
} from '@/graphql/graphql';
import JSZip from 'jszip';
import multiparty from 'multiparty';
import { promises as fs } from 'fs';
import { socket } from '@/utils/app';
import { unlink } from 'node:fs/promises';
import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeApollo } from '@/config/createGraphQLClient';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { dictationMappedLevels, getMapperValue } from '@/utils/mapper';

export const config = {
  api: {
    bodyParser: false,
  },
};

const percentOf = (value: number, total: number) => {
  const result = Math.round((value / total) * 100);
  return result <= 5 ? 5 : result;
};

const processFiles = async (path: string, authorId: string) => {
  const result = [];
  const entries: { zipEntry: JSZip.JSZipObject; relativePath: string }[] = [];
  const file = await fs.readFile(path);
  const zip = await JSZip.loadAsync(file);

  zip.forEach((relativePath, zipEntry) =>
    entries.push({ relativePath, zipEntry })
  );

  for (const en of entries) {
    const { relativePath, zipEntry } = en;
    const [name, _] = zipEntry.name.split('.');
    if (name && !zipEntry.dir) {
      const data = await zip.file(relativePath).async('string');
      const questions = data.split(/\n\s/g);
      questions.forEach((question) => {
        const [title, ...options] = question.trim().split('\n');
        const correctAnswer = options.shift();
        const lesson = options.pop();
        const questionObject: CreateQuestionDto = {
          title,
          lesson,
          options,
          authorId,
          correctAnswer,
          type: QuestionType.Dictation,
          dictationLevel: getMapperValue(
            dictationMappedLevels,
            name
          ) as DictationQuestionLevel,
        };
        result.push(questionObject);
      });
    }
  }

  return result;
};

const saveQuestions = async (
  questions: CreateQuestionDto[],
  client: ApolloClient<NormalizedCacheObject>
) => {
  let i = 1;
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
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ status: 'Method Not Allowed', message: 'Upload error' });
  }
  const authorId = req.query?.authorId || '1';
  const client = initializeApollo({});
  const status = 200,
    resultBody = { status: 'ok', message: 'Files were uploaded successfully' };

  const form = new multiparty.Form();
  form.parse(req, async (err, fields, files) => {
    socket.connect();
    for (const [, file] of Object.entries(files)) {
      const questions = await processFiles(file[0].path, String(authorId));
      await saveQuestions(questions, client);
      // await unlink(file[0].path);
    }
    socket.disconnect();
  });
  res.status(status).json(resultBody);
};

export default handler;
