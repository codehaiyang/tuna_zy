import {
  InfoCircleTwoTone, ClockCircleTwoTone, FileImageTwoTone, ManOutlined,
  WomanOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Input, Tooltip, Table, Row, Col } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

// import CreateForm from './components/CreateForm';
// import UpdateForm from './components/UpdateForm';
// import 'moment/locale/zh-cn';


import { history, connect } from 'umi';

import { useEffect } from 'react';

import { getIsvSelectedSite } from '@/utils/utils';


const TableList = (props) => {

  const { loading, patientList, searchList, dispatch } = props;
  const { sitename } = getIsvSelectedSite();
  useEffect(() => {

    dispatch({
      type: 'patient/gainPatientList',
      payload: {
        sitename
      }
    });
  }, []);

  function handleSearch(param) {
    const searchText = param.target.value.replace(/\s*/g, "");

    const newPatientList = searchList.filter(item => {

      if (item.patientName.indexOf(searchText) !== -1) {
        return item;
      }
      if (item.patientId.indexOf(searchText) !== -1) {
        return item;
      }

    })

    dispatch({
      type: 'patient/setPatientList',
      payload: {
        patientList: newPatientList
      }
    })

  }
  const columns = [
    {
      title: '患者姓名',
      dataIndex: 'patientName',
      key: 'patientName',
      align: 'center'
    },
    {
      title: '患者标识',
      dataIndex: 'patientId',
      key: 'patientId',
      align: 'center'
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      render: (current) => {
        return (current === 'M' ?
          <Tooltip placement="right" title={'男性'} ><ManOutlined /></Tooltip> :
          <Tooltip placement="right" title={'女性'}> <WomanOutlined /></Tooltip>
        )
      },
      align: 'center'
    },
    {
      title: '系统标识',
      dataIndex: 'anonymizedPatientId',
      key: 'anonymizedPatientId',
      align: 'center'
    },
    {
      title: '时间',
      dataIndex: 'lastModified',
      key: 'lastModified',
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'lastModified',
      render: (current) => {
        if (new Date(current).getTime() + 1000 * 60 * 60 * 24 < new Date().getTime()) {
          return (<Tooltip placement="top" title={'最近24小时未做修改'}><InfoCircleTwoTone twoToneColor={'#434343'} /></Tooltip>)
        }
        return (<Tooltip placement="top" title={'最近24小时有做修改'}><ClockCircleTwoTone twoToneColor={'#003a8c'} /></Tooltip>);
      },
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, entity) => (
        <Button onClick={() => {
          history.push({
            pathname: '/patient/analysis',
            query: {
              patientid: entity.patientId,
            },
          })
        }}>
          <FileImageTwoTone />
          结果影像
        </Button>
      ),
      align: 'center'
    }
  ];
  return (
    <PageContainer>
      <Row>
        <Col span={24}>
          <Input size="large" placeholder="请输入患者姓名或ID编号进行查询" prefix={<UserOutlined />} onChange={handleSearch}
            style={{ width: 200 }} />
        </Col>
      </Row>
      <Row style={{ marginTop: '18px' }}>
        <Col span={24}>
          <Table columns={columns} dataSource={patientList} loading={loading} rowKey={'anonymizedPatientId'} />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default connect(({ patient, loading }) => {
  return {
    patientList: patient.patientList,
    searchList: patient.searchList,
    loading: loading.effects['patient/gainPatientList']
  }
})(TableList);
