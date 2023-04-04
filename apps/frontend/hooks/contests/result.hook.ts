import { Contest, QuestionType } from '@/graphql/graphql';
import { ResultType } from '@/utils/types';

const calculateGaugeValues = (results: ResultType[], type: QuestionType) => {
  const typeLen = results.filter((e) => e.type === type);
  const trueLen = typeLen.filter((e) => e.isTrue);
  return Math.round((trueLen.length / typeLen.length) * 100);
};

const calculateTotalResult = (results: ResultType[]) => {
  const trueLen = results.filter((e) => e.isTrue);
  return Math.round((trueLen.length / results.length) * 100);
};

export const useGenerateResult = (contest: Contest) => {
  const { answers, questions } = contest;

  const results: ResultType[] = [];
  for (const q of questions) {
    const correctAnswer = q.correctAnswer.replace(/\r/, '').trim();
    let options = [];
    let isTrue = false;
    let selectedOption = null;

    answers[0].answers.some((ans) => {
      if (ans.questionId === q.id) {
        options = ans.options;
        isTrue = ans.option.trim() === correctAnswer;
        selectedOption = ans.option.trim();
        return true;
      }
      return false;
    });

    results.push({
      questionId: q.id,
      title: q.title,
      options,
      isTrue,
      selectedOption,
      correctAnswer,
      lesson: q.lesson,
      type: q.type,
    });
  }

  return {
    results,
    gaugeValues: {
      [QuestionType.Easy]: calculateGaugeValues(results, QuestionType.Easy),
      [QuestionType.Medium]: calculateGaugeValues(results, QuestionType.Medium),
      [QuestionType.Hard]: calculateGaugeValues(results, QuestionType.Hard),
      [QuestionType.Dictation]: calculateGaugeValues(
        results,
        QuestionType.Dictation
      ),
    },

    contestMeta: {
      title: contest.title,
      totalResult: calculateTotalResult(results),
      questionsCount: contest.questions.length,
      answersCount: results.filter((el) => !!el.options.length).length,
      truthyAnswersCount: results.filter((el) => el.isTrue).length,
      falsyAnswersCount: results.filter((el) => !el.isTrue).length,
      duration: contest.duration,
    },
  };
};
