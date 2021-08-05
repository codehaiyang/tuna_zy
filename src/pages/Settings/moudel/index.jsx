import {Button, Col, Divider, Form, Input, Row, Space, Tabs, Typography, Switch, Select} from 'antd';
import styles from "@/pages/Settings/moudel/index.less";
import {PageContainer} from '@ant-design/pro-layout';
import QueueAnim from "rc-queue-anim";
import React from "react";

const {TabPane} = Tabs;
const {Title} = Typography;
const {Option} = Select;

function callback(key) {
  console.log(key);
}

const CTForm = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div className={styles.form_div}>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="包含规则"
            name="inclusion"
            labelCol={{span: 3}}
            rules={[
              {
                required: true,
                message: '请输入包含的规则',
              },
            ]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="排斥规则"
            name="hostName"
            labelCol={{span: 3}}
            rules={[
              {
                required: true,
                message: '请输入排斥规则',
              },
            ]}
          >
            <Input className={styles.input_width_long}/>
          </Form.Item>


          <Form.Item
            label="最小图片数量"
            name="smtpServer"
            labelCol={{span: 3}}
            rules={[
              {
                required: true,
                message: '请输入最小图片数量',
              },
            ]}
          >
            <Input className={styles.input_width}/>
          </Form.Item>

          <Form.Item
            label="最大图片数量"
            name="smtpScriptPath"
            labelCol={{span: 3}}
            rules={[
              {
                required: true,
                message: '请输入最大图片数量',
              },
            ]}
          >
            <Input className={styles.input_width}/>
          </Form.Item>
        </Form>
      </div>
    </>

  );
}


const MISMATCHForm = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div className={styles.form_div}>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="PWI序列接受规则"
            name="acceptPWIReg"
            labelCol={{span: 4}}
            rules={[
              {
                required: true,
                message: '请输入PWI序列接受规则',
              },
            ]}
          >
            <Input className={styles.input_width_long}/>
          </Form.Item>


          <Form.Item
            label="PWI序列排斥规则"
            name="rejectPWIReg"
            labelCol={{span: 4}}
            rules={[
              {
                required: true,
                message: '请输入PWI序列排斥规则',
              },
            ]}
          >
            <Input className={styles.input_width_long}/>
          </Form.Item>

          <Form.Item
            label="PWI最小图片数量"
            name="minImgPWI"
            labelCol={{span: 4}}
            rules={[
              {
                required: true,
                message: '请输入PWI序列最小图片数量',
              },
            ]}
          >
            <Input className={styles.input_width}/>
          </Form.Item>

          <Divider></Divider>

          <Form.Item
            label="DWI序列接受规则"
            name="acceptDWIReg"
            labelCol={{span: 4}}
            rules={[
              {
                required: true,
                message: '请输入DWI序列接受规则',
              },
            ]}
          >
            <Input className={styles.input_width_long}/>
          </Form.Item>

          <Form.Item
            label="DWI序列排斥规则"
            name="rejectDWIReg"
            labelCol={{span: 4}}
            rules={[
              {
                required: true,
                message: '请输入DWI序列排斥规则',
              },
            ]}
          >
            <Input className={styles.input_width_long}/>
          </Form.Item>

          <Form.Item
            label="DWI最小图片数量"
            name="minImgDWI"
            labelCol={{span: 4}}
            rules={[
              {
                required: true,
                message: '请输入DWI序列最小图片数量',
              },
            ]}
          >
            <Input className={styles.input_width}/>
          </Form.Item>

          <Divider></Divider>

          <Form.Item
            label="b=0 序列接受规则"
            name="acceptB0Reg"
            labelCol={{span: 4}}
            rules={[
              {
                required: true,
                message: '请输入b=0序列接受规则',
              },
            ]}
          >
            <Input className={styles.input_width_long}/>
          </Form.Item>

          <Form.Item
            label="b=0 序列排斥规则"
            name="rejectB0Reg"
            labelCol={{span: 4}}
            rules={[
              {
                required: true,
                message: '请输入b=0序列排斥规则',
              },
            ]}
          >
            <Input className={styles.input_width_long}/>
          </Form.Item>

          <Form.Item
            label="b=0最小图片数量"
            name="minImgB0"
            labelCol={{span: 4}}
            rules={[
              {
                required: true,
                message: '请输入b=0序列最小图片数量',
              },
            ]}
          >
            <Input className={styles.input_width}/>
          </Form.Item>

          <Divider></Divider>

          <Form.Item
            label="CTP序列接受规则"
            name="acceptCTPReg"
            labelCol={{span: 4}}
            rules={[
              {
                required: true,
                message: '请输入CTP序列接受规则',
              },
            ]}
          >
            <Input className={styles.input_width_long}/>
          </Form.Item>

          <Form.Item
            label="CTP序列排斥规则"
            name="rejectCTPReg"
            labelCol={{span: 4}}
            rules={[
              {
                required: true,
                message: '请输入CTP序列排斥规则',
              },
            ]}
          >
            <Input className={styles.input_width_long}/>
          </Form.Item>

          <Form.Item
            label="CTP最小图片数量"
            name="minImgCTP"
            labelCol={{span: 4}}
            rules={[
              {
                required: true,
                message: '请输入CTP序列最小图片数量',
              },
            ]}
          >
            <Input className={styles.input_width}/>
          </Form.Item>

          <Divider></Divider>

          <Form.Item
            label="最小时间点"
            name="minOfTimePoints"
            labelCol={{span: 3}}
            rules={[
              {
                required: true,
                message: '请输入最小时间点',
              },
            ]}
          >
            <Input className={styles.input_width_long} addonAfter="需要有效的灌注序列"/>
          </Form.Item>

          <Form.Item
            label="CTP最小厚度"
            name="minCTPSlabs"
            labelCol={{span: 3}}
            rules={[
              {
                required: true,
                message: '请输入有效的CTP最小厚度',
              },
            ]}
          >
            <Input className={styles.input_width_long} addonAfter="需要有效的灌CTP序列"/>
          </Form.Item>


          <Form.Item
            label="DWI/PWI/MISMATCH 模式"
            name="mode"
            labelCol={{span: 6}}
            rules={[
              {
                required: true,
                message: '请选择有效的模式',
              },
            ]}
          >
            <Select defaultValue="Optional" style={{width: 120}}>
              <Option value="Optional">Optional</Option>
              <Option value="Strict">Strict</Option>
              <Option value="Separate">Separate</Option>
            </Select>

          </Form.Item>
        </Form>
      </div>
    </>

  );
}


const CTAForm = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div className={styles.form_div}>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="包含规则"
            name="inclusion"
            labelCol={{span: 3}}
            rules={[
              {
                required: true,
                message: '请输入包含的规则',
              },
            ]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="排斥规则"
            name="hostName"
            labelCol={{span: 3}}
            rules={[
              {
                required: true,
                message: '请输入排斥规则',
              },
            ]}
          >
            <Input className={styles.input_width_long}/>
          </Form.Item>


          <Form.Item
            label="最小图片数量"
            name="smtpServer"
            labelCol={{span: 3}}
            rules={[
              {
                required: true,
                message: '请输入最小图片数量',
              },
            ]}
          >
            <Input className={styles.input_width}/>
          </Form.Item>

          <Form.Item
            label="最大图片数量"
            name="smtpScriptPath"
            labelCol={{span: 3}}
            rules={[
              {
                required: true,
                message: '请输入最大图片数量',
              },
            ]}
          >
            <Input className={styles.input_width}/>
          </Form.Item>
        </Form>
      </div>
    </>

  );
}


const CommonForm = () => (
  <PageContainer>
    <QueueAnim duration={500}>
      <Tabs defaultActiveKey="1" onChange={callback} key="moudelTabs" animated={true}>
        <TabPane tab="CT设置" key="1">
          <Title level={3}>设置</Title>
          <Space style={{marginBottom: 16}}>
            <Button type="primary">修改</Button>
          </Space>
          <Divider></Divider>
          <CTForm></CTForm>
          <Title level={3}>ASPECTS发送结果</Title>
          <Space style={{marginBottom: 16}}>
          </Space>
          <Divider></Divider>
          <div className={styles.form_div}>
            <Form
              name="basic1"
              initialValues={{
                remember: true,
              }}
            >
              <Form.Item
                label="发送结果到NEUPACS"
                name="resultForward"
                labelCol={{span: 4}}
              >
                <Switch checkedChildren="开启" unCheckedChildren="关闭"></Switch>
              </Form.Item>
            </Form>
          </div>
        </TabPane>
        <TabPane tab="MISMATCH设置" key="2">
            <Title level={3}>设置</Title>
            <Space style={{marginBottom: 16}}>
              <Button>输入数据</Button>
              <Button>灌注</Button>
              <Button>扩散</Button>
              <Button>阈值</Button>
              <Button>发送结果</Button>
            </Space>
            <Divider></Divider>
            <MISMATCHForm></MISMATCHForm>
        </TabPane>
        <TabPane tab="CTA设置" key="3">
          <Title level={3}>设置</Title>
          <Space style={{marginBottom: 16}}>
            <Button type="primary">编辑</Button>
          </Space>
          <Divider></Divider>
          <CTAForm></CTAForm>
          <Title level={3}>CTA发送结果</Title>
          <Space style={{marginBottom: 16}}>
          </Space>
          <Divider></Divider>
          <div className={styles.form_div}>
            <Form
              name="basic1"
              initialValues={{
                remember: true,
              }}
            >
              <Form.Item
                label="发送结果到NEUPACS"
                name="resultForward"
                labelCol={{span: 4}}
              >
                <Switch checkedChildren="开启" unCheckedChildren="关闭"></Switch>
              </Form.Item>
            </Form>
          </div>
        </TabPane>
      </Tabs>
    </QueueAnim>
  </PageContainer>
);


export default CommonForm
