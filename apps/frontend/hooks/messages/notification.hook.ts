import {
  Message,
  RoleTitle,
  usePaginateNotificationsQuery,
} from '@/graphql/graphql';
import { Logger } from '@/utils/app';
import { AuthState } from '@/valtio/auth.state';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';

export const useNotificationHook = () => {
  const user = useSnapshot(AuthState).user;
  const getPaginationParams = (skip = 0) => ({
    skip,
    take: 15,
    where: {
      recipientId: user.role.title === RoleTitle.Admin ? null : user.id,
    },
  });
  const [data, setData] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const {
    data: d,
    refetch,
    fetchMore,
  } = usePaginateNotificationsQuery({
    variables: {
      params: getPaginationParams(),
    },
  });

  useEffect(() => {
    setLoading(true);
    if (d) {
      setData(d?.paginateNotifications.data as Message[]);
      setHasMore(d.paginateNotifications.total > data.length);
      setLoading(false);
    }

    return () => {
      setData([]);
    };
  }, [d]);

  const onLoadMore = async () => {
    try {
      setLoading(true);
      const { data: d } = await fetchMore({
        variables: {
          params: getPaginationParams(data.length),
        },
      });
      if (d) {
        setData([...data, ...(d?.paginateNotifications.data as Message[])]);
      }
    } catch (error) {
      Logger.log(error);
    } finally {
      setLoading(false);
      setHasMore(d?.paginateNotifications.total > data.length);
    }
  };

  return {
    onLoadMore,
    data,
    refetch,
    loading,
    hasMore,
  };
};
