import { useSnapshot } from 'valtio';

import {
  PermissionTitle,
  Student,
  usePaginateNotificationsQuery,
  User,
} from '@/graphql/graphql';
import ProfileLayout from '@/layout/ProfileLayout';
import { NextPageWithLayout } from '@/utils/types';
import { AuthState } from '@/valtio/auth.state';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

import { List, Empty, Button, Comment, Divider, Space } from 'antd';

import {
  BellOutlined,
  DeleteOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import DOMPurify from 'isomorphic-dompurify';
import { withAuth } from '@/components/common/withAuth';
import moment from 'moment-timezone';
import ViewUserPopover from '@/components/messages/ViewUserPopover';
import DeleteMessage from '@/components/messages/DeleteMessage';
import AcceptStudent from '@/components/messages/AcceptStudent';

const TeacherNotifications: NextPageWithLayout = () => {
  const user = useSnapshot(AuthState).user as User;
  const { data, loading, refetch } = usePaginateNotificationsQuery({
    variables: {
      params: {
        where: {
          recipientId: user?.profile.id,
        },
      },
    },
    skip: !user,
  });

  return (
    <section>
      {data?.paginateNotifications.data.length > 0 ? (
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={data?.paginateNotifications.data}
          renderItem={(item) => (
            <>
              <Comment
                actions={[
                  <Space key={item.id}>
                    <AcceptStudent
                      id={item.recipientId.id}
                      studentId={item.authorId.id}
                      messageId={item.id}
                      onSuccess={() => refetch()}
                    />
                    <DeleteMessage id={item.id} onSuccess={() => refetch()} />
                  </Space>,
                ]}
                author={
                  <ViewUserPopover user={item.authorId.profile as Student} />
                }
                avatar={item.authorId.profile.personalImage}
                datetime={moment(item.created).calendar()}
                content={DOMPurify.sanitize(item.content)}
              />
              <div
                style={{
                  width: '75%',
                  margin: '0 auto',
                }}
              >
                <Divider />
              </div>
            </>
          )}
        />
      ) : (
        <Empty
          imageStyle={{
            height: 160,
          }}
          image={<BellOutlined style={{ fontSize: '8rem', color: 'gray' }} />}
          description={<span>لم تصلك أي إشعارات حتى اللحظة</span>}
        />
      )}
    </section>
  );
};
TeacherNotifications.getLayout = (page: EmotionJSX.Element) => (
  <ProfileLayout isTeacher={true}>{page}</ProfileLayout>
);
export default withAuth(TeacherNotifications, [
  PermissionTitle.AccessTeacherDashboard,
]);
