import { RoleTitle, usePaginateUsersQuery, User } from '@/graphql/graphql';
import { Logger } from '@/utils/app';
import { getMapperLabel, rolesMappedTypes } from '@/utils/mapper';
import { Avatar, Button, List, Skeleton } from 'antd';
import { useEffect, useState } from 'react';

interface DataType {
  gender?: string;
  name: {
    title?: string;
    first?: string;
    last?: string;
  };
  email?: string;
  picture: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  nat?: string;
  loading: boolean;
}

const alwaysTake = 15;

const ViewTeacherStudents = ({ teacherId }: { teacherId: string }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<User[]>([]);

  const getPaginationParams = (skip = 0) => ({
    skip,
    take: alwaysTake,
    where: {
      teacherId,
      role: [RoleTitle.StudentTeacher],
    },
  });

  const { data, fetchMore } = usePaginateUsersQuery({
    variables: {
      params: getPaginationParams(),
    },
    ssr: false,
  });

  const loadMoreData = async () => {
    try {
      setLoading(true);
      const { data } = await fetchMore({
        variables: {
          params: getPaginationParams(result.length),
        },
      });
      if (data) {
        setResult([...result, ...(data.paginateUsers.data as User[])]);
      }
    } catch (error) {
      Logger.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      setResult(data.paginateUsers.data as User[]);
    }
  }, [data]);

  const loadMore =
    !loading && result.length ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={loadMoreData}> تحميل أكثر</Button>
      </div>
    ) : null;

  return (
    <List
      header={<h2>الطلبة المشرف عليهم</h2>}
      loading={loading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={result}
      renderItem={(item) => (
        <List.Item>
          <Skeleton avatar title={false} loading={loading} active>
            <List.Item.Meta
              avatar={<Avatar src={item.profile.personalImage} />}
              title={
                <a href="#">
                  {`${item.profile?.firstName} ${item.profile?.lastName}`}
                </a>
              }
              description={getMapperLabel(rolesMappedTypes, item.role.title)}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default ViewTeacherStudents;
