import {
  sysInfo,
  aetentries,
  dicomping,
  dicomqueue,
  receivequeue,
  timeline,
  patienttree,
  patienttasks,
  imagecount,
  // childtasks,
} from "@/services/dashboard";

const Model = {
  namespace: 'dashboard',
  state: {
    patientList: [],
    timelineList: [],
    diskSpace: {},
    dicomQueue: [],
    receiveQueue: [],
    dicomInfo: {},
    dicomStatusInfo: [],

    studyList: [],
    expandedRowKeys: [],

    seriesList: [],
    series2ExpandedRowKeys: [],

    detailShow: true,
    patientTasksInfo: [],

    dicomqueueShow: {
      show: false,
      info: 'dicomsend'
    },

    spinning: false,
    searchList: []

  },
  effects: {
    * initDashboard({payload}, {call, put}) {
      // 获取患者列表  {sitename,filter}
      const patientListRsp = yield call(patienttree, {sitename: payload.sitename, filter: 'week'});
      // 获取过滤时间的处理任务信息  {sitename,filter}
      const timeLineRsp = yield call(timeline, {sitename: payload.sitename, filter: 'today'});
      // 获取硬件信息 {sitename}
      const sysInfoRsp = yield call(sysInfo, {sitename: payload.sitename});
      // dicom send列表  {sitename}
      const dicomSendRsp = yield call(dicomqueue, {sitename: payload.sitename});
      // dicom receive   {sitename}
      const dicomReceiveRsp = yield call(receivequeue, {sitename: payload.sitename});
      yield put({
        type: 'init',
        payload: {
          patientList: patientListRsp.patientList,
          timelineList: timeLineRsp.patientList,
          diskSpace: {
            DataDiskFreeGB: sysInfoRsp.DataDiskFreeGB,
            DataDiskUsedGB: sysInfoRsp.DataDiskUsedGB
          },
          dicomQueue: dicomSendRsp.dicomTaskList,
          receiveQueue: dicomReceiveRsp.importlog
        }
      })
    },
    /**
     * 获取dicom节点列表
     * @param payload {sitename}
     * @param call
     * @param put
     * @returns {Generator<*, void, *>}
     */
    * gainDicomInfo({payload}, {call, put}) {
      // 获取dicom集合
      const aetentriesRsp = yield call(aetentries, {sitename: payload});
      // 获取dicom 集合
      const {aetentrylist} = aetentriesRsp;
      // 声明远程节点状态集合
      const aetindexs = [];
      // 获取dicom集合中远程节点的状态
      for (let i = 0; i < aetentrylist.length; i += 1) {
        if (aetentrylist[i].linkedaetindex === 1) {
          aetindexs.push(yield call(dicomping, {
            sitename: payload,
            aetindex: aetentrylist[i].aetindex
          }));
        }
      }
      // 调用reducers 设置state dicom信息
      yield put({
        type: 'setDicomInfo',
        payload: {
          ...aetentrylist
        }
      });
      // 调用reducers 设置state 远程dicom状态
      yield put({
        type: 'setDicomStatusInfo',
        payload: aetindexs
      });
    },
    /**
     * 获取对应患者处理列表信息
     * @param {*} param0
     * @param {*} param1
     */
    * gainPatienttasksInfo({payload}, {call, put}) {

      const patienttasksRsp = yield call(patienttasks, {
        sitename: payload.sitename,
        patientid: payload.patientId
      });

      const {taskList} = patienttasksRsp;
      yield put({
        type: 'setPatienttasksInfo',
        payload:
        taskList
      })
      // console.log(taskList);
      // const handleTaskList = [];

      // // taskList
      // if (taskList) {
      //   for (let i = 0; i < taskList.length; i += 1) {
      //     // DicomSend
      //     // if (taskList[i].modulename === 'angio' || taskList[i].modulename === 'Mismatch' || taskList[i].modulename === 'Octopus') {
      //     if (taskList[i].modulename !== 'CatchAll') {
      //       console.log(taskList[i].modulename)
      //       const childtasksRsp = yield call(childtasks, {
      //         sitename: payload.sitename,
      //         taskid: taskList[i].taskid
      //       });
      //       handleTaskList.push(taskList[i]);
      //       const { childTasks } = childtasksRsp;
      //       console.log(childtasksRsp, handleTaskList);
      //       if (childTasks) {
      //           taskList.forEach(item => {
      //             childTasks.forEach(element => {
      //             console.log(element.taskId, item.taskid, element.taskId == item.taskid);
      //             if (element.taskId == item.taskid) {
      //               console.log(element, item);
      //               handleTaskList.push(item)
      //             }
      //           });
      //         })
      //       }
      //     }
      //   }
      //   // 设置值
      //   console.log(handleTaskList);
      //   yield put({
      //     type: 'setPatienttasksInfo',
      //     payload:
      //       handleTaskList
      //   })
      // }


    },
    * gainImageCount({payload}, {call, put}) {
      const {seriesList} = payload;
      for (let i = 0; i < seriesList.length; i += 1) {
        const imagecountRsp = yield call(imagecount, {
          sitename: payload.sitename,
          rapidseriesid: seriesList[i].rapidseriesid
        });
        seriesList[i]['imageCount'] = imagecountRsp.count;
        yield put({
          type: 'setSeriesList',
          payload:
          seriesList

        });
      }

    },
    * gainDicomQueue({payload}, {call, put}) {
      // dicom send列表  {sitename}
      const dicomSendRsp = yield call(dicomqueue, {sitename: payload.sitename});
      // dicom receive   {sitename}
      const dicomReceiveRsp = yield call(receivequeue, {sitename: payload.sitename});
      const handledicomQueue = dicomSendRsp.dicomTaskList.map(item => {
        // eslint-disable-next-line no-param-reassign
        item['key'] = `${item.patientId}-${item.taskScheduledDateTime}`;
        return item;
      });

      const handlereceiveQueue = dicomReceiveRsp.importlog.map(item => {
        // eslint-disable-next-line no-param-reassign
        item['key'] = `${item.patientId}-${item.selectionDateTime}`;
        return item;
      });


      yield put({
        type: 'setDicomQueue',
        payload: {
          dicomQueue: handledicomQueue,
          receiveQueue: handlereceiveQueue
        }
      });

      const {show, info} = payload;
      yield put({
        type: 'setDicomqueueShow',
        payload: {
          show,
          info
        }
      });


    },
  },
  reducers: {
    init(state, {payload}) {
      const {
        patientList,
        timelineList,
        diskSpace,
        dicomQueue,
        receiveQueue
      } = payload;
      return {
        ...state,
        patientList,
        timelineList,
        diskSpace,
        searchList: patientList,
        dicomQueue,
        receiveQueue
      }
    },
    setStudyList(state, {payload}) {
      return {...state, studyList: payload}
    },
    setExpandedRowKeys(state, {payload}) {
      return {...state, expandedRowKeys: payload}
    },
    setSeriesList(state, {payload}) {
      return {...state, seriesList: payload}
    },
    setSeries2ExpandedRowKeys(state, {payload}) {
      return {...state, series2ExpandedRowKeys: payload}
    },
    setPatientList(state, {payload}) {
      return {...state, patientList: payload}
    },
    setSearchList(state, {payload}) {
      return {...state, searchList: payload}
    },
    setDetailShow(state, {payload}) {
      return {...state, detailShow: payload}
    },
    setPatienttasksInfo(state, {payload}) {
      // const { patientTasksInfo } = payload;
      console.log(payload, '=========设置值');
      return {...state, patientTasksInfo: payload}
    },
    setDicomqueueShow(state, {payload}) {
      console.log('================设置表格', payload)
      return {...state, dicomqueueShow: payload}
    },
    setDicomQueue(state, {payload}) {
      console.log('===============设置dicom、queue', payload)
      const {
        dicomQueue,
        receiveQueue
      } = payload;
      return {
        ...state, dicomQueue,
        receiveQueue
      }
    },
    // setSpinning(state, { payload }) {
    //   return {
    //     ...state, spinning: payload

    //   }
    // }
  },
  // 随应用整个生命周期
  // subscriptions: {
  //   initDashboard({dispatch}) {
  //     // alert('测试subscriptions ');
  //     // sysInfo()
  //     console.log('侧式')
  //     // const {sitename} = getIsvSelectedSite;
  //     // dispatch({
  //     //   type: 'dashboard/gainSysInfo',
  //     //   payload: {sitename}
  //     // });
  //   }
  // }

}


export default Model;
