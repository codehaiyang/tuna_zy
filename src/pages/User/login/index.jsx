import {
  AlipayCircleOutlined,
  LockOutlined,
  MailOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {Alert, Space, message, Row, Col, Typography, Card, Button} from 'antd';
import React, {useState} from 'react';
import ProForm, {ProFormCaptcha, ProFormCheckbox, ProFormText} from '@ant-design/pro-form';
import {useIntl, connect, FormattedMessage} from 'umi';
import {getFakeCaptcha} from '@/services/login';
import styles from './index.less';
import loginBGIMG from '../../../assets/loginBG.jpg';

const {Title, Paragraph, Text} = Typography;

const LoginMessage = ({content}) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = (props) => {
  console.log(props);
  const {userLogin = {}, submitting} = props;
  const {status, type: loginType} = userLogin;
  const [type, setType] = useState('account');
  // const intl = useIntl();

  const handleSubmit = (values) => {
    const {dispatch} = props;
    dispatch({
      type: 'login/login',
      payload: {...values},
    });
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.cardContainer}>
        <Row>
          <Col span={14}>
            <div className={styles.bgContainer}>
              <div className={styles.innerBgContainer}>
                <div className={styles.titleContainer}>
                  <p className={styles.titleSize}>脑卒中分析影像</p>
                  <p className={styles.subtitleSize}>急性缺血性卒中,全流程影像管理人工智能系统</p>
                </div>
              </div>
            </div>
          </Col>
          <Col span={10}>
            <div className={styles.loginContainer}>
              <div className={styles.main}>
                <Title style={{color: "white"}} className={styles.title} level={4}>
                  <p>欢迎登录</p>
                </Title>
                <ProForm
                  autoComplete={'off'}
                  initialValues={{
                    autoLogin: true,
                  }}
                  submitter={{
                    searchConfig: {
                      submitText: '登录',
                    },
                    render: (_, dom) => dom.pop(),
                    submitButtonProps: {
                      loading: submitting,
                      size: 'large',
                      style: {
                        width: '100%',
                      },
                    },
                  }}
                  onFinish={(values) => {
                    handleSubmit(values);
                    return Promise.resolve();
                  }}
                >

                  {status === 'error' && loginType === 'account' && !submitting && (
                    <LoginMessage
                      content={'账户或密码错误'}
                    />
                  )}
                  {type === 'account' && (
                    <>
                      <ProFormText
                        name="username"
                        bordered={false}
                        placeholder="请输入用户名"
                        fieldProps={{
                          size: 'large',
                          prefix: <UserOutlined className={styles.prefixIcon}/>,
                        }}
                        rules={[
                          {
                            required: true,
                            message: '用户名是必填项！',
                          },
                        ]}
                      />
                      <ProFormText.Password
                        name="password"
                        placeholder="请输入密码"
                        fieldProps={{
                          size: 'large',
                          prefix: <LockOutlined className={styles.prefixIcon}/>,
                        }}
                        rules={[
                          {
                            required: true,
                            message: '密码是必填项！',
                          },
                        ]}
                      />
                    </>
                  )}
                </ProForm>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default connect(({login, loading}) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
