import styled from '@emotion/styled';
import { Avatar, List, Tag } from 'antd';

const StyledTag = styled(Tag)({
  padding: '2px !important',
  width: 50,
  textAlign: 'center',
  fontSize: '0.9rem !important',
});

const data = [
  {
    title: 'المسابقة رقم 1',
    desc: 'قريبا',
    level: 'المستوى 13',
  },
  {
    title: 'المسابقة رقم 2',
    desc: 'قريبا',
    level: 'المستوى 15',
  },
  {
    title: 'المسابقة رقم 3',
    desc: 'بدأت',
    level: 'المستوى 18',
  },
  {
    title: 'المسابقة رقم 4',
    desc: 'بدأت',
    level: 'المستوى 13',
  },
  {
    title: 'المسابقة رقم 5',
    desc: 'إنتهت',
    level: 'المستوى 13',
  },
];

const LatestContests = () => {
  return (
    <List
      style={{ height: 350 }}
      bordered
      size="small"
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => {
        let color = item.desc === 'قريبا' ? 'blue' : 'green';
        if (item.desc === 'إنتهت') {
          color = 'volcano';
        }
        return (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="/icons/dashboard/trophy.png" />}
              title={<a href="#">{item.title}</a>}
              description={<StyledTag color={color}>{item.desc}</StyledTag>}
            />
            <div>{item.level}</div>
          </List.Item>
        );
      }}
    />
  );
};

export default LatestContests;
