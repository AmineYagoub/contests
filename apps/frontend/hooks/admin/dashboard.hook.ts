import { useDashboardQuery, usePaginateContestsQuery } from '@/graphql/graphql';

export const useAdminDashboard = () => {
  const { data, loading } = useDashboardQuery();
  const { studentTeacher, students, levels, teachers } = data?.dashboard || {
    studentTeacher: 0,
    students: 0,
    teachers: 0,
    levels: [],
  };
  const { data: d, loading: l } = usePaginateContestsQuery({
    variables: { params: { take: 5 } },
  });
  const total = studentTeacher + students;
  return {
    studentsLevels: levels,
    teachersCount: teachers,
    studentsCount: students,
    studentsPercent: Math.round((students / total) * 100),
    studentTeacherCount: studentTeacher,
    studentTeacherPercent: Math.round((studentTeacher / total) * 100),
    contestsCount: d?.paginateContest.total,
    loading: loading || l,
  };
};
