import { UploadProps } from 'antd';
import JSZip from 'jszip';
import {
  CreateQuestionDto,
  QuestionType,
  StudentLevel,
  useCreateQuestionMutation,
} from '@/graphql/graphql';
import { getLevelsValues } from '@/utils/mapper';
import { QuestionActions } from '@/valtio/question.state';
import { useState } from 'react';

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

const percentOf = (value: number, total: number) => {
  const result = Math.round((value / total) * 100);
  return result <= 5 ? 5 : result;
};

export const useImportQuestions = () => {
  const [CreateQuestionMutation] = useCreateQuestionMutation();
  const [results, setResults] = useState([]);

  const uploadProps: UploadProps = {
    name: 'file',
    beforeUpload(file, FileList) {
      QuestionActions.setImportProgress(5);
      JSZip.loadAsync(file) // read the Blob
        .then((zip) => {
          zip.forEach(function (relativePath, zipEntry) {
            const [, tag, entry, type] = relativePath.split('/');
            if (entry && !zipEntry.dir) {
              zip
                .file(relativePath)
                .async('string')
                .then(function (data) {
                  const questions = data.split('\n\r');
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
                    setResults((prev) => [questionObject, ...prev]);
                  });
                });
            }
          });
        })
        .finally(() => {
          let i = 0;
          results.forEach((record: CreateQuestionDto) => {
            CreateQuestionMutation({
              variables: {
                input: record,
              },
            })
              .catch(() => {
                console.log('catch', record.title);
                QuestionActions.setImportItemsFails(record.title);
              })
              .finally(() => {
                i++;
                QuestionActions.setImportProgress(percentOf(i, results.length));
              });
          });
        });
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  return {
    uploadProps,
  };
};
