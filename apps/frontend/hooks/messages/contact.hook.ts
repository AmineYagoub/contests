import {
  RoleTitle,
  usePaginateUsersQuery,
  User,
  useSearchUsersLazyQuery,
} from '@/graphql/graphql';
import { Logger } from '@/utils/app';
import { MessageActions, MessageState } from '@/valtio/message.state';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';

export const alwaysTake = 7;

export const useContactList = (role: RoleTitle, teacherId?: string) => {
  const [searchValue, setSearchValue] = useState<string>(null);
  const roles =
    role === RoleTitle.Teacher
      ? [RoleTitle.StudentTeacher]
      : [
          RoleTitle.Teacher,
          RoleTitle.GoldenTeacher,
          RoleTitle.Student,
          RoleTitle.StudentTeacher,
        ];
  const messageSnap = useSnapshot(MessageState);

  const [SearchUsersQuery] = useSearchUsersLazyQuery();

  const { data, fetchMore, refetch } = usePaginateUsersQuery({
    variables: {
      params: {
        take: alwaysTake,
        skip: 0,
        where: {
          teacherId: role === RoleTitle.Teacher ? teacherId : undefined,
          role: roles,
        },
      },
    },
    ssr: false,
  });

  const loadMoreData = async (reset = false) => {
    try {
      MessageActions.setContactLoading(true);
      const { data } = await fetchMore({
        variables: {
          params: {
            skip: messageSnap.contactList.length,
            take: alwaysTake,
            where: {
              teacherId: role === RoleTitle.Teacher ? teacherId : undefined,
              role: roles,
            },
          },
        },
      });
      if (data) {
        const list = reset
          ? data.paginateUsers.data
          : [...messageSnap.contactList, ...data.paginateUsers.data];
        console.log(list, reset);
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
    if ([RoleTitle.Teacher].includes(role)) {
      MessageActions.setContactLoading(true);
      refetch({
        params: {
          where: {
            role: [RoleTitle.Admin],
          },
        },
      })
        .then(({ data }) => {
          if (data) {
            MessageActions.setContactList([
              ...data.paginateUsers.data,
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
