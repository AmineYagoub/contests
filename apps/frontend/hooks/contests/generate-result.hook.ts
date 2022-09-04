import { Contest, QuestionType } from '@/graphql/graphql';
import { ResultType } from '@/utils/types';

const calculateGaugeValues = (results: ResultType[], type: QuestionType) => {
  const typeLen = results.filter((e) => e.type === type);
  const trueLen = typeLen.filter((e) => e.isTrue);
  return Math.round((trueLen.length / typeLen.length) * 100);
};

export const useGenerateResult = (contest: Contest) => {
  const { answers, questions } = contest;

  const results: ResultType[] = [];
  for (const q of questions) {
    const correctAnswer = q.correctAnswer.replace(/\r/, '').trim();
    let options = [];
    let isTrue = false;
    const answer = answers[0].answers.some((ans) => {
      if (ans.questionId === q.id) {
        options = ans.options;
        isTrue = ans.option.trim() === correctAnswer;
        return true;
      }
      return false;
    });

    // TODO return option
    results.push({
      questionId: q.id,
      title: q.title,
      options,
      isTrue,
      correctAnswer,
      type: q.type,
    });
  }
  const gaugeValues = {
    [QuestionType.Easy]: calculateGaugeValues(results, QuestionType.Easy),
    [QuestionType.Medium]: calculateGaugeValues(results, QuestionType.Medium),
    [QuestionType.Hard]: calculateGaugeValues(results, QuestionType.Hard),
  };
  return { results, gaugeValues };
};
