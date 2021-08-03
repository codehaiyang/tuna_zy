import { PageContainer } from "@ant-design/pro-layout";
import { Row, Col, Input, Card, Table, Progress, Button, Divider, Tooltip, Modal } from "antd";
import { useEffect, useState } from "react";
import styles from './index.less';
import {
  InfoCircleTwoTone,
  SyncOutlined,
  DeleteFilled,
  CheckCircleTwoTone,
  LoadingOutlined,
  CloseCircleTwoTone,
  ClockCircleTwoTone,
  WomanOutlined,
  ManOutlined,
  UploadOutlined, UserOutlined,
} from "@ant-design/icons";
import { connect } from "dva";
import { getIsvSelectedSite, valid2Null } from "@/utils/utils";
import _ from 'lodash';

const Dashboard = (props) => {

  const { dispatch, dashboard, patientLoading, dicomqueueLoading } = props;
  const {
    studyList,
    expandedRowKeys,
    seriesList,
    series2ExpandedRowKeys,
    detailShow,
    patientTasksInfo,
    dicomqueueShow,
    dicomQueue,
    receiveQueue,
    patientList,
    searchList
  } = dashboard;

  const [count, setCount] = useState(0);
  // const [dicomCount, setDicomCount] = useState(0);
  // 获取硬件信息
  useEffect(() => {
    const { sitename } = getIsvSelectedSite();
    dispatch({
      type: 'dashboard/initDashboard',
      payload: { sitename }
    });
  }, [count]);


  const jobs = {
    SCHEDULED: [],
    RUNNING: [],
    FAILED: []
  };
  const status = [];


  // 处理JOB显示  dashboard.timelineList
  const localTimelineList = _.cloneDeep(valid2Null(dashboard.timelineList, []));
  localTimelineList.forEach(item => {
    item.patienttasklist.forEach(taskItem => {
      if (taskItem.modulename === 'Octopus' || taskItem.modulename === 'Mismatch' || taskItem.modulename === 'angio') {
        jobs[taskItem.taskstatus].push(taskItem.taskstatus);
        status.push({ taskstatus: taskItem.taskstatus, patientId: item.patient.patientId })
      }
    })
  });

  console.log(status)

  const dicomCardInfo = {
    FAILED: 0,
    SUCCESS: 0
  }


  // 处理图像推送
  // dicomQueue.forEach(item => {
  //   item.retryList.forEach(cItem => {
  //     if (cItem.statuscode !== 0) {
  //       // setDicomCount(dicomCount + 1);
  //       if ((new Date().getTime() - new Date(cItem.retryenddatetime).getTime()) < 1000 * 60 * 60 * 2) {
  //         dicomCardInfo.FAILED += 1;
  //       }
  //       // retrystartdatetime

  //     } else {
  //       dicomCardInfo.SUCCESS += 1;
  //     }
  //   })

  // });

  let dicomReceiveCardInfo = 0;
  // 处理图像接收
  receiveQueue.forEach(() => {
    dicomReceiveCardInfo += 1;
  });

  function handleFlush() {
    setCount(count + 1);
    dispatch({
      type: 'dashboard/setDicomqueueShow',
      payload: {
        show: false,
        info: 'dicomsend'
      }
    });
  }

  // 节流
  // function throttle(fn, delay, param) {
  //   console.log(param)
  //   let isAvail = true
  //   return function () {
  //     if (isAvail) {
  //       fn(param);
  //       isAvail = false // delay时间之后，任务开关打开
  //       setTimeout(function () { isAvail = true }, delay)
  //     }
  //   }
  // }


  function handleSearch(param) {
    const searchText = param.target.value;
    const newPatientList = searchList.filter(item => {
      return item.patientName.indexOf(searchText.replace(/\s*/g, "")) !== -1;
    })
    dispatch({
      type: 'dashboard/setPatientList',
      payload: newPatientList
    })

  }

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    // setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  /**
   * 删除确定
   * @param {} param 
   */
  const confirm = (param) => {
    console.log(param);
  }


  const defaultExpand = (item) => {
    const { sitename } = getIsvSelectedSite();
    dispatch({
      type: 'dashboard/setSeriesList',
      payload: item.seriesList
    });
    dispatch({
      type: 'dashboard/gainImageCount',
      payload: {
        sitename,
        seriesList: _.cloneDeep(item.seriesList)
      }
    });
    dispatch({
      type: 'dashboard/setSeries2ExpandedRowKeys',
      payload: [item.accessionNumber]
    });
  }


  /**
   * 点击图标展开触发  获取行中studyList 用于展示子列
   * @param expanded
   * @param record
   */
  const handleExpand = (expanded, record, category) => {
    if (expanded) {
      if (!category) {
        dispatch({
          type: 'dashboard/setStudyList',
          payload: record.studyList
        });
      } else {
        dispatch({
          type: 'dashboard/setSeriesList',
          payload: record.seriesList
        });
      }
      // 默认展开序列行
      record.studyList.map(item => {
        defaultExpand(item)
      })

      // 表格只保留打开的这一行
      // dataSource.splice()
      dispatch({
        type: 'dashboard/setPatientList',
        payload: [record]
      });

      // 顶部日志替换
      /**
       * 明天：
       * 3.删除 停止处理 查看dicom send receive 表格（用另一个表格，这个表格有展开操作）
       * 4.刷新
       * 5.类型筛选
       * 6.导入（先不做，估计不好调试）先把其他细节调试好
       */

      const { sitename } = getIsvSelectedSite();

      // 顶部日志 获取患者任务列表数据
      dispatch({
        type: 'dashboard/gainPatienttasksInfo',
        payload: {
          sitename,
          patientId: record.patientId,

        }
      });

      dispatch({
        type: 'dashboard/setDetailShow',
        payload: false
      });

      console.log(sitename, patientTasksInfo)
    } else {
      setCount(count + 1);
      dispatch({
        type: 'dashboard/setDetailShow',
        payload: true
      });
    }
  }


  console.log(dashboard)

  /**
   * 列变动时触发，获取最后一列row key   action给控制行展开属性
   * @param expandedRows
   */
  const handleExpandedRowsChange = (expandedRows, category) => {
    dispatch({
      type: !category ? 'dashboard/setExpandedRowKeys' : 'dashboard/setSeries2ExpandedRowKeys',
      payload: [expandedRows[expandedRows.length - 1]]
    });
  }


  // const dataSource = _.cloneDeep(dashboard.patientList);
  const dataSource = patientList;


  const seriesList2ExpandedRowRender = () => {
    const columns = [
      { title: '序列描述', dataIndex: 'seriesDescription', key: 'seriesDescription' },
      { title: '序列编号', dataIndex: 'seriesNumber', key: 'seriesNumber', align: 'center' },
      {
        title: '时间',
        key: 'seriesDateTime',
        dataIndex: 'seriesDateTime',
        render: (current) => {
          return current.substr(0, current.indexOf('.'));
        }, align: 'center'
      },
      {
        title: '图片数量',
        key: 'imageCount',
        dataIndex: 'imageCount', align: 'center'
      },
      {
        title: '类型',
        key: 'modality',
        dataIndex: 'modality', align: 'center'
      },
    ];

    return <Table columns={columns} dataSource={seriesList} pagination={false} />;
  };


  const expandedRowRender = () => {
    const columns = [
      { title: '协议描述', dataIndex: 'studyDescription', key: 'studyDescription', align: 'center' },
      { title: '协议编号', dataIndex: 'accessionNumber', key: 'accessionNumber', align: 'center' },
      {
        title: '时间',
        key: 'studyDateTime',
        dataIndex: 'studyDateTime',
        render: (current) => {
          return current.substr(0, current.indexOf('.'));
        }, align: 'center'
      },
    ];

    return <Table columns={columns}
      rowKey={'accessionNumber'}
      dataSource={studyList}
      pagination={false}
      expandable={{
        // defaultExpandAllRows: true,
        expandedRowRender: seriesList2ExpandedRowRender,
        onExpand: (expanded, record) => handleExpand(expanded, record, 'studyExpandable'),
        expandedRowKeys: series2ExpandedRowKeys,
        onExpandedRowsChange: (expandedRows) => handleExpandedRowsChange(expandedRows, 'studyExpandable')
      }}
    // expandable={{seriesList2ExpandedRowRender}}
    // onExpand={(expanded, record) => handleExpand(expanded, record, 'studyExpandable')}
    // expandedRowKeys={series2ExpandedRowKeys}
    // onExpandedRowsChange={(expandedRows) => handleExpandedRowsChange(expandedRows, 'studyExpandable')}

    />;
  };


  const columns = [
    {
      title: '患者姓名',
      dataIndex: 'patientName',
      key: 'patientName', align: 'center'
    },
    {
      title: '患者ID',
      dataIndex: 'patientId',
      key: 'patientId', align: 'center'
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      render: (current) => {
        return (current === 'M' ?
          <Tooltip placement="right" title={'男性'}><ManOutlined /></Tooltip> :
          <Tooltip placement="right" title={'女性'}> <WomanOutlined /></Tooltip>
        )
      }, align: 'center'
    },
    {
      title: '系统标识',
      dataIndex: 'anonymizedPatientId',
      key: 'anonymizedPatientId', align: 'center'
    },
    {
      title: '时间',
      dataIndex: 'lastModified',
      key: 'lastModified',
      render: (current) => {
        return current.substr(0, current.indexOf('.'));
      }, align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (current, record) => {
        return <Button danger onClick={showModal}><DeleteFilled />删除</Button>
      }, align: 'center'
    },
    {
      title: '状态',
      // dataIndex: 'address',
      key: 'status',
      render: (current, record) => {
        let text = '最近24小时内未做更改';
        let el = <InfoCircleTwoTone twoToneColor={'#434343'} />;
        if (status.length > 0) {
          status.map(item => {
            if (item.patientId === record.patientId) {
              switch (item.taskstatus) {
                case 'SUCCESS': {
                  text = '处理成功';
                  el = <CheckCircleTwoTone twoToneColor={'#3f6600'} key={item.patientId} />;
                  break;
                }
                case 'RUNNING': {
                  text = '正在处理';
                  el = <LoadingOutlined key={item.patientId} />;
                  break;
                }
                case 'FAILED': {
                  text = '处理失败';
                  el = <CloseCircleTwoTone twoToneColor={'#820014'} key={item.patientId} />;
                  break;
                }
                case 'SCHEDULED': {
                  text = '等候处理';
                  el = <ClockCircleTwoTone twoToneColor={'#003a8c'} key={item.patientId} />
                  break;
                }
                default: {
                  el = <InfoCircleTwoTone twoToneColor={'#434343'} />;
                }
              }
            }
            return (
              <Tooltip key={item.patientId} placement="top" title={text}>{el}</Tooltip>)
          })
        }
        return (
          <Tooltip placement="top" title={text}>{el}</Tooltip>
        );
      }, align: 'center'
    }
    ,
  ];


  /**
   * TODO:dicom按钮点击 动态设置dicomtable列及数据
   * 刷新按钮设置动态，分类
   */
  const dicomSendColumns = [
    { title: '患者ID', dataIndex: 'patientId', key: 'patientId', align: 'center' },
    { title: '患者姓名', dataIndex: 'patientName', key: 'patientName', align: 'center' },
    { title: '任务标识', dataIndex: 'taskId', key: 'taskId', align: 'center' },
    {
      title: '序列时间',
      key: 'seriesDateTime',
      dataIndex: 'seriesDateTime',
      render: (current) => {
        return current.substr(0, current.indexOf('.'));
      }, align: 'center'
    },
    {
      title: '模块', dataIndex: 'modulename', key: 'modulename',
      render: (current) => {
        let taskName = '';
        switch (current) {
          case 'Mismatch': {
            taskName = 'CTP模块';
            break;
          }
          case 'Octopus': {
            taskName = 'ASPECTS模块';
            break;
          }
          default: {
            taskName = 'CTA模块';
          }
        }
        return taskName;
      }, align: 'center'
    },
    { title: '本地节点 AE', dataIndex: 'localAET', key: 'localAET', align: 'center' },
    { title: '远程节点 AE', dataIndex: 'remoteAET', key: 'remoteAET', align: 'center' },
    {
      title: '状态', dataIndex: 'retryList', key: 'retryList',
      render: (current) => {
        let el = null;
        if (current) {
          current.forEach(element => {
            if (element.statuscode == 0) {
              el = <CheckCircleTwoTone key={element.retryenddatetime} twoToneColor={'#3f6600'} />;
            } else {
              el = <CloseCircleTwoTone key={element.retryenddatetime} twoToneColor={'#820014'} />;
            }
          });
        }
        return el;
      }, align: 'center'
    },
  ];
  const dicomReceiveColumns = [
    { title: '患者ID', dataIndex: 'patientId', key: 'patientId', align: 'center' },
    { title: '患者姓名', dataIndex: 'patientName', key: 'patientName', align: 'center' },
    { title: '序列号', dataIndex: 'seriesNumber', key: 'seriesNumber', align: 'center' },
    { title: '序列描述', dataIndex: 'seriesDescription', key: 'seriesDescription', align: 'center' },
    { title: '远程 AET', dataIndex: 'remoteAET', key: 'remoteAET', align: 'center' },
  ];
  const dicomSendDataSource = dicomQueue;
  const dicomReceiveDataSource = receiveQueue;
  // ========================rowKey
  // const handleGetQueue = (category) => {
  function handleGetQueue(category) {
    // 数据节流优化
    const { sitename } = getIsvSelectedSite();

    if (category === 'send') {
      // 获取send 队列
      // dicomQueue
      // console.log(dicomQueue)

      dispatch({
        type: 'dashboard/gainDicomQueue',
        payload: {
          sitename,
          show: true,
          info: 'dicomsend'
        }
      });
    } else {
      // receiveQueue
      dispatch({
        type: 'dashboard/gainDicomQueue',
        payload: {
          sitename,
          show: true,
          info: 'dicomreceive'
        }
      });
    }
  }

  return (
    <>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <PageContainer>
        {
          detailShow ?
            (<Row gutter={16}>
              <Col span={6}>
                <Card title="磁盘空间" bordered={true} className={styles.dashboard_InformationCard}>
                  <div className={styles.content}>
                    <div className={styles.content_info}>
                      <span className={styles.FAILED}>已使用:{dashboard.diskSpace.DataDiskUsedGB}</span>
                    </div>
                    <Divider />
                    <div className={styles.content_info}>
                      <span className={styles.SCHEDULED}>未使用:{dashboard.diskSpace.DataDiskFreeGB}</span>
                    </div>
                  </div>
                  <div className={styles.action_toolbar}>
                    <Progress percent={30} strokeWidth={10} strokeColor="green" trailColor="red" showInfo={false} />
                  </div>
                </Card>
              </Col>
              <Col span={6}>
                <Card title="任务队列" bordered={true} className={styles.dashboard_InformationCard}>
                  <div className={styles.content}>
                    <div className={styles.content_info}>
                      <span className={styles.FAILED}>处理失败:{jobs.FAILED.length}</span>
                    </div>
                    <div className={styles.content_info}>
                      <span className={styles.SCHEDULED}>正在排队:{jobs.SCHEDULED.length}</span>
                    </div>
                    <div className={styles.content_info}>
                      <span className={styles.RUNNING}>正在处理:{jobs.RUNNING.length}</span>
                    </div>
                  </div>
                  <div className={styles.action_toolbar}>
                    <Button block danger>停止处理</Button>
                  </div>
                </Card>
              </Col>
              <Col span={6}>
                <Card title="图像推送" bordered={true} className={styles.dashboard_InformationCard}>
                  <div className={styles.content}>
                    <div className={styles.content_info}>
                      <span className={styles.FAILED}>失败:{dicomCardInfo.FAILED}次</span>
                    </div>
                    <Divider />
                    <div className={styles.content_info}>
                      <span className={styles.SCHEDULED}>成功:{dicomCardInfo.SUCCESS}次</span>
                    </div>
                  </div>
                  <div className={styles.action_toolbar}>
                    <Button block onClick={() => handleGetQueue('send')}>查看队列</Button>
                  </div>
                </Card>
              </Col>
              <Col span={6}>
                <Card title="图像接收" bordered={true} className={styles.dashboard_InformationCard}>
                  <div className={styles.content}>
                    <div className={styles.content_info}>
                      <span className={styles.SCHEDULED}>已接收:{dicomReceiveCardInfo}</span>
                    </div>
                    <Divider />
                  </div>
                  <div className={styles.action_toolbar}>
                    <Button block onClick={() => handleGetQueue('receive')}>查看队列</Button>
                  </div>
                </Card>
              </Col>
            </Row>) :
            (<Row gutter={16}>
              {
                patientTasksInfo.map(item => {

                  let color = '#52c41a';
                  let taskName = '';
                  let taskStatusText = '成功';
                  if (item.taskstatus === `FAILED`) {
                    color = '#820014';
                    taskStatusText = '失败';
                  } else if (item.taskstatus === `RUNNING` || item.taskstatus === `SCHEDULED`) {
                    color = '#1890ff';
                    taskStatusText = '处理中';
                  }


                  switch (item.modulename) {
                    case 'angio': {
                      taskName = 'CTA模块';
                      break;
                    }
                    case 'Mismatch': {
                      taskName = 'CTP模块';
                      break;
                    }
                    case 'Octopus': {
                      taskName = 'ASPECTS模块';
                      break;
                    }
                    case 'DicomSend': {
                      taskName = '发送模块';
                      break;
                    }
                    case 'emailSend': {
                      taskName = '邮箱模块';
                      break;
                    }
                    case 'DicomReceive': {
                      taskName = '接收模块';
                      break;
                    }
                    default: {
                      taskName = '计算模块';
                    }
                  }
                  const time = item.startdatetime ? item.startdatetime.substr(0, item.startdatetime.indexOf('.')) : '1970-01-01 00:00:00';
                  const el = <Card bodyStyle={{ backgroundColor: color }} key={item.scheduleddatetime}>
                    <div className={styles.content}>
                      <div className={styles.content_info}>
                        <span>{taskName}</span>
                      </div>
                      {/* <Divider /> */}
                      <div className={styles.content_info}>
                        <span>{taskStatusText}</span>
                      </div>
                      <div className={styles.content_info}>
                        <span>{time}</span>
                      </div>
                    </div>
                  </Card>
                  return (
                    <Col span={6} key={item.scheduleddatetime}>
                      {el}
                    </Col>
                  )
                })}
            </Row>)
        }
        {
          detailShow && <Row className={styles.dashboard_toolBar}>
            <Col span={24}>
              <Button><UploadOutlined />导入图像</Button>
              <Divider type="vertical" />
              <Button onClick={handleFlush}><SyncOutlined spin={patientLoading} />患者列表</Button>
              <Divider type="vertical" />
              {
                (!dicomqueueShow.show) &&
                <Input size="large" placeholder="请输入患者姓名" prefix={<UserOutlined />} onChange={handleSearch}
                  style={{ width: 200 }} />
              }
            </Col>
          </Row>}
        <Row>
          <Col span={24}>
            {
              dicomqueueShow.show ? <Table className={styles.dashboard_dataList}
                rowKey={'key'}
                dataSource={dicomqueueShow.info === 'dicomsend' ? dicomSendDataSource : dicomReceiveDataSource}
                columns={dicomqueueShow.info === 'dicomsend' ? dicomSendColumns : dicomReceiveColumns}
                loading={dicomqueueLoading}
              />
                : <Table className={styles.dashboard_dataList} rowKey={'patientId'} expandable={{ expandedRowRender }}
                  dataSource={dataSource} columns={columns} onExpand={handleExpand}
                  expandedRowKeys={expandedRowKeys}
                  onExpandedRowsChange={handleExpandedRowsChange} loading={patientLoading}>

                </Table>

            }

          </Col>
        </Row>
      </PageContainer>
    </>
  );
}


export default connect((
  {
    dashboard,
    loading
  }
) => (
  {
    dashboard,
    patientLoading: loading.effects['dashboard/initDashboard'],
    dicomqueueLoading: loading.effects['dashboard/gainDicomQueue'],
  }
))(Dashboard);
