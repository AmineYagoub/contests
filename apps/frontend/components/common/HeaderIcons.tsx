import { Avatar, Badge, Button, Col, Layout, Row, Space } from 'antd';
import Image from 'next/image';

import { createElement, useState } from 'react';

import theme from '@/config/theme';

import {
  BellOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import styled from '@emotion/styled';

const { Header } = Layout;

const StyledHeader = styled(Header)({
  backgroundColor: `${theme.primaryColor} !important`,
  padding: '0 !important',
  boxShadow:
    'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
});

const HeaderIcons = ({ avatar }: { avatar: string }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <StyledHeader>
      <Row justify="space-between">
        <Col span={2}>
          {createElement(!collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Col>

        <Col span={4}>
          <Space size={8}>
            <Button
              icon={<MailOutlined style={{ color: theme.infoColor }} />}
              shape="circle"
              type="ghost"
            />
            <Badge count={5}>
              <Button
                icon={<BellOutlined style={{ color: theme.infoColor }} />}
                shape="circle"
                type="ghost"
              />
            </Badge>

            <Avatar
              src={<Image src={avatar} width={32} height={32} alt="avatar" />}
            />
          </Space>
        </Col>
      </Row>
    </StyledHeader>
  );
};

export default HeaderIcons;
