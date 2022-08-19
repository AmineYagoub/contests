import { Form, UploadProps } from 'antd';
import JSZip from 'jszip';
import { useSnapshot } from 'valtio';

import { TagValue } from '@/components/common/SelectTags';
import {
  CreateQuestionDto,
  Question,
  QuestionType,
  StudentLevel,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
} from '@/graphql/graphql';
import { getLevelsValues } from '@/utils/mapper';
import { QuestionActions, QuestionState } from '@/valtio/question.state';

export interface CreateQuestionsProps {
  visible?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
  record?: Question;
}

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

export const useCreateQuestions = ({
  record,
  onClose,
  onSuccess,
}: CreateQuestionsProps) => {
  const [form] = Form.useForm();
  const [CreateQuestionMutation, { loading, error }] =
    useCreateQuestionMutation();
  const [
    UpdateQuestionMutation,
    { loading: loadingUpdate, error: errorUpdate },
  ] = useUpdateQuestionMutation();

  const onFinish = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        ...values,
        authorId: 1,
        correctAnswer: values.options.shift(),
        tags: {
          connectOrCreate: values.tags?.map((tag: TagValue) => {
            return {
              where: { title: tag.value },
              create: { title: tag.value },
            };
          }),
        },
      };

      const data = record
        ? await UpdateQuestionMutation({
            variables: {
              input: payload,
              id: Number(record.id),
            },
          })
        : await CreateQuestionMutation({
            variables: {
              input: payload,
            },
          });
      if (data) {
        form.resetFields();
        onClose();
        onSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const questionsSnap = useSnapshot(QuestionState, { sync: true });

  const results = [];
  const uploadProps: UploadProps = {
    name: 'file',
    beforeUpload(file, FileList) {
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
                    results.push(questionObject);
                  });
                });
            }
          });
        });
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        const percentOf = (value: number, total: number) =>
          Math.round((value / total) * 100);
        let i = 0;
        results.forEach((record: CreateQuestionDto) => {
          // console.log(record);
          CreateQuestionMutation({
            variables: {
              input: record,
            },
          })
            .then(console.log)
            .catch(() => {
              QuestionActions.addToCreateManyRecordsFail(record);
            })
            .finally(() => {
              i++;
              QuestionActions.incProgress(percentOf(i, results.length));
            });
        });
      }
      if (status === 'done') {
        console.log(results);
        console.log('done');
      } else if (status === 'error') {
        console.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return {
    onFinish,
    uploadProps,
    progress: questionsSnap?.createManyProgression,
    form,
    loading,
    error,
    loadingUpdate,
    errorUpdate,
  };
};
