import { proxy } from 'valtio';

import { User } from '@/graphql/graphql';
import { cloneDeep } from '@apollo/client/utilities';

interface StudentStorage {
  student: User;
  students: User[];
  queryLoading: boolean;
  mutationLoading: boolean;
}

const init: StudentStorage = {
  student: null,
  students: [],
  mutationLoading: false,
  queryLoading: false,
};

export const StudentState = proxy<StudentStorage>(init);

export const StudentActions = {
  setStudent: (student: User) => {
    StudentState.student = student;
  },
  setStudentsData: (students: User[]) => {
    StudentState.students = students;
  },
  setQueryLoading: (loading: boolean) => {
    StudentState.queryLoading = loading;
  },
  setMutationLoading: (loading: boolean) => {
    StudentState.mutationLoading = loading;
  },
  resetState: () => {
    const resetObj = cloneDeep(init);
    Object.keys(resetObj).forEach((key) => {
      StudentState[key] = resetObj[key];
    });
  },
};
