import {Divider, Space, Table, Typography, Button, Form, Input, Row, Col, notification} from "antd";
import {PageContainer} from '@ant-design/pro-layout';

const {Title} = Typography;

import styles from './index.less'
import QueueAnim from "rc-queue-anim";
import React from "react";

const openNotificationWithIcon = type => {
  notification[type]({
    message: '消息通知',
    description:
      'ECHO成功！',
  });
};



const LocalTable = () => {



  const columns = [
    {
      title: '应用标题',
      dataIndex: 'ae',
      key: 'ae',
      // render: text => <a>{text}</a>,
    },
    {
      title: '应用描述',
      dataIndex: 'aeDesc',
      key: 'aeDesc',
    },
    {
      title: 'ip',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: 'port',
      dataIndex: 'port',
      key: 'port',
    },
    {
      title: 'ECHO',
      dataIndex: 'ECHO',
      key: 'ECHO',
      render: () => (
        <Button type="primary" onClick={() => openNotificationWithIcon('success')}>
          ECHO
        </Button>
      )
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
      ae: 'RAPID',
      aeDesc: 'BACKUP',
      ip: '127.0.0.1',
      port: '4114'
    },
    {
      key: '1',
      ae: 'RAPID',
      aeDesc: 'MAIN',
      ip: '127.0.0.1',
      port: '4124'
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data}/>
    </>
  );
}


const RemoteTable = () => {


  const columns = [
    {
      title: '应用标题',
      dataIndex: 'ae',
      key: 'ae',
      // render: text => <a>{text}</a>,
    },
    {
      title: '应用描述',
      dataIndex: 'aeDesc',
      key: 'aeDesc',
    },
    {
      title: 'ip',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: 'port',
      dataIndex: 'port',
      key: 'port',
    },
    {
      title: 'PING',
      dataIndex: 'PING',
      key: 'PING',
      render: () => (
        <Button type="primary">
          PING
        </Button>
      )
    },
    {
      title: 'ECHO',
      dataIndex: 'ECHO',
      key: 'ECHO',
      render: () => (
        <Button type="primary" onClick={() => openNotificationWithIcon('success')}>
          ECHO
        </Button>
      )
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
      ae: 'RAPID',
      aeDesc: 'BACKUP',
      ip: '127.0.0.1',
      port: '4114'
    },
    {
      key: '1',
      ae: 'RAPID',
      aeDesc: 'MAIN',
      ip: '127.0.0.1',
      port: '4124'
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data}></Table>
    </>

  );
}


const ServerForm = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="服务IP地址"
        name="ip"
        labelCol={{span: 3}}
        rules={[
          {
            required: true,
            message: '请输入服务ip地址',
          },
        ]}
      >
        <Input className={styles.input_width}/>
      </Form.Item>

      <Form.Item
        label="主机名称"
        name="hostName"
        labelCol={{span: 3}}
        rules={[
          {
            required: true,
            message: '请输入主机名',
          },
        ]}
      >
        <Input className={styles.input_width}/>
      </Form.Item>


      <Form.Item
        label="发信服务"
        name="smtpServer"
        labelCol={{span: 3}}
        rules={[
          {
            required: true,
            message: '请输入发信服务地址',
          },
        ]}
      >
        <Input className={styles.input_width}/>
      </Form.Item>

      <Form.Item
        label="发信脚本地址"
        name="smtpScriptPath"
        labelCol={{span: 3}}
        rules={[
          {
            required: true,
            message: '请输入发信脚本地址',
          },
        ]}
      >
        <Input/>
      </Form.Item>


      <Form.Item
        label="数据存储地址"
        name="dataStored"
        labelCol={{span: 3}}
        rules={[
          {
            required: true,
            message: '请输入数据存储地址',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="数据清除上限"
        name="dataUpper"
        labelCol={{span: 3}}
        rules={[
          {
            required: true,
            message: '请输入数据清除上限',
          },
        ]}
      >
        <Row>
          <Col span={12}>
            <Input addonBefore="如果可用磁盘空间大于" addonAfter="则定期清除"/>
          </Col>


          <Col span={12}>
            <Input addonAfter="天以上的数据" className={styles.input_width}/>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item
        label="数据清除下限"
        name="dataLower"
        labelCol={{span: 3}}
        rules={[
          {
            required: true,
            message: '请输入数据清除下限',
          },
        ]}
      >
        <Row>
          <Col span={12}>
            <Input addonBefore="如果可用磁盘空间小于" addonAfter="则定期清除"/>
          </Col>
          <Col span={12}>
            <Input addonAfter="天以上的数据" className={styles.input_width}/>
          </Col>
        </Row>


      </Form.Item>


      {/*<Form.Item>*/}
      {/*  <Button type="primary" htmlType="submit">*/}
      {/*    Submit*/}
      {/*  </Button>*/}
      {/*</Form.Item>*/}
    </Form>
  );
}


const CommonTable = () => {
  return (
    <PageContainer>
      <QueueAnim duration={500}>
        <div key="dicomServerContent">
          <Title level={3}>本地DICOM设置</Title>
          <Space style={{marginBottom: 16}}>
            <Button type="primary">新增</Button>
          </Space>
          <Divider></Divider>
          <LocalTable/>
          <Title level={3}>远程DICOM设置</Title>
          <Space style={{marginBottom: 16}}>
            <Button type="primary">新增</Button>
          </Space>
          <Divider></Divider>
          <RemoteTable></RemoteTable>
          <Title level={3}>服务设置</Title>
          <Space style={{marginBottom: 16}}>
            <Button type="primary">修改</Button>
            <Divider type="vertical"></Divider>
            <Button type="primary">发送邮件</Button>
          </Space>
          <Divider></Divider>
          <div className={styles.form_div}>
            <ServerForm></ServerForm>
          </div>
        </div>
      </QueueAnim>
    </PageContainer>
  );
}


export default CommonTable
