import {Table, Space, Switch, List, Card, Form, Typography, Divider} from 'antd';
import {PageContainer} from '@ant-design/pro-layout';
import QueueAnim from "rc-queue-anim";
import React from "react";

const {Title} = Typography;
// import styles from './index.less';

const PermissionCard = () => {
  const data = [
    {
      title: '临床用户',
    },
    {
      title: '超级管理员',
    },
    {
      title: '管理员',
    },
  ];

  return (
    <List
      grid={{gutter: 16, column: 3}}
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <Card title={item.title}>
            <Form
              layout="inline"
            >
              <Form.Item label="上传权限">
                <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked/>
              </Form.Item>
              <Form.Item label="下载权限">
                <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked/>
              </Form.Item>
              <Form.Item label="日志权限">
                <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked/>
              </Form.Item>
            </Form>


          </Card>
        </List.Item>
      )}
    />
  );
}

const SitesTable = () => {

  const columns = [
    {
      title: '站点ID',
      dataIndex: 'id',
      key: 'id',
      // render: text => <a>{text}</a>,
    },
    {
      title: '当前站点',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '电子邮件',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '站点描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          {/*{record.name}*/}
          <a>删除</a>
          <a>编辑</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      id: '2999',
      name: 'isvadmin',
      email: 'test@gmail.com',
      description: 'test'
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data}/>
    </>
  );
}


const userPermissionTable = () => {

  const columns = [
    {
      title: '用户名称',
      dataIndex: 'name',
      key: 'name',
      // render: text => <a>{text}</a>,
    },
    {
      title: '电子邮件',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '当前站点',
      dataIndex: 'assignedSite',
      key: 'assignedSite',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          {/*{record.name}*/}
          <a>删除</a>
          <a>编辑</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'isvadmin',
      email: 'test@gmail.com',
      assignedSite: 'test'
    },
    {
      key: '2',
      name: 'aiy',
      email: 'hapi_zyhealth@163.com',
      assignedSite: 'test'
    },

  ];

  return (
    <PageContainer >
      <QueueAnim duration={500}>
        <div key="userPermissionContent">
          <Title level={3}>权限设置</Title>
          <Divider></Divider>
          <PermissionCard></PermissionCard>
          <Title level={3}>用户设置</Title>
          <Divider></Divider>
          <Table columns={columns} dataSource={data}/>
          <Title level={3}>站点设置</Title>
          <Divider></Divider>
          <SitesTable></SitesTable>
        </div>
      </QueueAnim>
    </PageContainer>
  );
}


export default userPermissionTable
