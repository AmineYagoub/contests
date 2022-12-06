import { RoleTitle, usePaginateUsersQuery, User } from '@/graphql/graphql';
import { Logger } from '@/utils/app';
import { MessageActions, MessageState } from '@/valtio/message.state';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';

const alwaysTake = 7;

export const useContactList = (role: RoleTitle, teacherId?: string) => {
  const roles =
    role === RoleTitle.Teacher
      ? [RoleTitle.StudentTeacher]
      : [RoleTitle.Teacher, RoleTitle.GoldenTeacher];
  const messageSnap = useSnapshot(MessageState);

  const { data, fetchMore } = usePaginateUsersQuery({
    variables: {
      params: {
        take: alwaysTake,
        skip: 0,
        where: {
          teacherId,
          role: roles,
        },
      },
    },
    ssr: false,
  });

  const loadMoreData = async () => {
    try {
      MessageActions.setContactLoading(true);
      const { data } = await fetchMore({
        variables: {
          params: {
            skip: messageSnap.contactList.length,
            take: alwaysTake,
          },
        },
      });
      if (data) {
        MessageActions.setContactList([
          ...messageSnap.contactList,
          ...data.paginateUsers.data,
        ] as User[]);
      }
    } catch (error) {
      Logger.log(error);
    } finally {
      MessageActions.setContactLoading(false);
    }
  };

  useEffect(() => {
    MessageActions.setContactLoading(true);
    if (data) {
      MessageActions.setContactLoading(false);

      MessageActions.setContactList(data?.paginateUsers?.data as User[]);
    }
    return () => {
      MessageActions.setContactList([]);
      MessageActions.setContactLoading(false);
    };
  }, [data]);

  return { loadMoreData };
};
