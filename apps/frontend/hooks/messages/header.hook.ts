import {
  Message,
  useFindLastMessagesLazyQuery,
  useFindLastNotificationsLazyQuery,
  useUpdateMessagesCountMutation,
} from '@/graphql/graphql';
import { Logger } from '@/utils/app';
import { AuthActions, AuthState } from '@/valtio/auth.state';
import { useState } from 'react';
import { useSnapshot } from 'valtio';

export const useHeaderNotification = () => {
  const user = useSnapshot(AuthState).user;
  const countMessages = user?.countAllMessages - user?.messagesCount;
  const countNotification =
    user?.countAllNotifications - user?.notificationsCount;

  const [data, setData] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [FindLastNotificationsQuery] = useFindLastNotificationsLazyQuery({
    variables: {
      id: user?.id,
    },
  });

  const [FindLastMessagesQuery] = useFindLastMessagesLazyQuery({
    variables: {
      id: user?.id,
    },
  });

  const [UpdateMessagesCountMutation] = useUpdateMessagesCountMutation();

  const openDropdown = async (visible: boolean, name: 'n' | 'm') => {
    try {
      setLoading(true);
      if (name === 'm' && visible) {
        const { data } = await FindLastMessagesQuery();
        await UpdateMessagesCountMutation({
          variables: {
            id: user.id,
            count: countMessages,
            isMessage: true,
          },
        });
        setData(data.findLastMessages as Message[]);
        AuthActions.resetMessagesCounter();
      }
      if (name === 'n' && visible) {
        const { data } = await FindLastNotificationsQuery();
        await UpdateMessagesCountMutation({
          variables: {
            id: user.id,
            count: countNotification,
            isMessage: false,
          },
        });
        setData(data.findLastNotifications as Message[]);
        AuthActions.resetNotificationsCounter();
      }
    } catch (error) {
      Logger.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    data,
    loading,
    openDropdown,
    countMessages,
    countNotification,
  };
};
