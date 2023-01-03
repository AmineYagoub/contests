import {
  RoleTitle,
  Student,
  useFindAdminAndTeacherLazyQuery,
  usePaginateUsersQuery,
  User,
  useSearchUsersLazyQuery,
} from '@/graphql/graphql';
import { Logger } from '@/utils/app';
import { AuthState } from '@/valtio/auth.state';
import { MessageActions, MessageState } from '@/valtio/message.state';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';

export const alwaysTake = 7;

export const useContactList = (role: RoleTitle, teacherId?: string) => {
  const userSnap = useSnapshot(AuthState).user;
  const [searchValue, setSearchValue] = useState<string>(null);
  const roles =
    role === RoleTitle.Teacher
      ? [RoleTitle.StudentTeacher]
      : role === RoleTitle.Student
      ? [RoleTitle.Teacher, RoleTitle.GoldenTeacher]
      : [
          RoleTitle.Teacher,
          RoleTitle.GoldenTeacher,
          RoleTitle.Student,
          RoleTitle.StudentTeacher,
        ];
  const messageSnap = useSnapshot(MessageState);
  const [SearchUsersQuery] = useSearchUsersLazyQuery();
  const [FindAdminAndTeacherQuery] = useFindAdminAndTeacherLazyQuery();

  const getPaginationParams = (skip = 0) => ({
    skip,
    take: alwaysTake,
    where: {
      teacherId: role === RoleTitle.Teacher ? teacherId : undefined,
      role: roles,
    },
  });

  const { data, fetchMore } = usePaginateUsersQuery({
    variables: {
      params: getPaginationParams(),
    },
    ssr: false,
    skip: role === RoleTitle.Student,
  });

  const loadMoreData = async (reset = false) => {
    try {
      MessageActions.setContactLoading(true);
      const { data } = await fetchMore({
        variables: {
          params: getPaginationParams(messageSnap.contactList.length),
        },
      });
      if (data) {
        const list = reset
          ? data.paginateUsers.data
          : [...messageSnap.contactList, ...data.paginateUsers.data];
        MessageActions.setContactList(list as User[]);
      }
    } catch (error) {
      Logger.log(error);
    } finally {
      MessageActions.setContactLoading(false);
    }
  };

  const onSearch = async (value: string) => {
    setSearchValue(value);
    try {
      if (!value) {
        return await loadMoreData(true);
      }
      MessageActions.setContactLoading(true);
      const { data } = await SearchUsersQuery({
        variables: {
          params: {
            skip: 0,
            take: 100,
            where: {
              role: roles,
              firstName: value,
              teacherId: role === RoleTitle.Teacher ? teacherId : undefined,
            },
          },
        },
      });
      if (data) {
        MessageActions.setContactList(
          data.searchUsers.map(
            (el) =>
              ({
                id: el.userId,
                profile: {
                  firstName: el.firstName,
                  lastName: el.lastName,
                  personalImage: el.personalImage,
                },
                role: {
                  title: null,
                },
              } as User)
          )
        );
      }
    } catch (error) {
      Logger.log(error);
    } finally {
      MessageActions.setContactLoading(false);
    }
  };

  useEffect(() => {
    if (RoleTitle.Teacher === role) {
      MessageActions.setContactLoading(true);
      FindAdminAndTeacherQuery()
        .then(({ data }) => {
          if (data) {
            MessageActions.setContactList([
              ...data.findAdminAndTeacher,
              ...messageSnap.contactList,
            ] as User[]);
          }
        })
        .finally(() => {
          MessageActions.setContactLoading(false);
        });
    }
    if (RoleTitle.Student === role) {
      MessageActions.setContactLoading(true);
      FindAdminAndTeacherQuery({
        variables: {
          id: (userSnap.profile as Student).teacher.id,
        },
      })
        .then(({ data }) => {
          if (data) {
            MessageActions.setContactList([
              ...data.findAdminAndTeacher,
              ...messageSnap.contactList,
            ] as User[]);
          }
        })
        .finally(() => {
          MessageActions.setContactLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    MessageActions.setContactLoading(true);
    if (data) {
      MessageActions.setContactLoading(false);
      MessageActions.setContactList(data?.paginateUsers?.data as User[]);
    }
    return () => {
      MessageActions.setMessages([]);
      MessageActions.setContactList([]);
      MessageActions.setContactLoading(false);
      MessageActions.setCurrentContact(null);
    };
  }, [data]);

  return { loadMoreData, onSearch, searchValue };
};
