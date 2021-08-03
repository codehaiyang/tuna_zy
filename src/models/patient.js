import {patienttree, summaryinfo, taskprogress} from "@/services/patient";
import {patienttasks} from "@/services/dashboard";
import {getTime} from "@/utils/utils";

const Model = {
  namespace: 'patient',
  state: {
    patientList: [],
    searchList: [],
    patientViewList: [],
    demandProcess: true,
    taskProgressStatus: {},
  },
  effects: {
    * gainPatientList({payload}, {call, put}) {
      const {sitename} = payload;
      // 获取患者列表  {sitename,filter}
      const patientListRsp = yield call(patienttree, {sitename, filter: 'week'});


      yield put({
        type: 'setPatientList',
        payload: {
          patientList: patientListRsp.patientList,
        }
      });

      yield put({
        type: 'setSearchList',
        payload: {
          patientList: patientListRsp.patientList,
        }
      });
    },
    * gainPatientViewInit({payload}, {call, put}) {
      const {sitename, patientid} = payload;
      // 获取任务队列
      const patientTasksRsp = yield call(patienttasks, {sitename, patientid});
      // 如果符合 Mismatch，Octopus，angio
      const handlePatientTasks = patientTasksRsp.taskList.filter(item => {
        const moduleName = item.modulename;
        const {taskscode} = item;
        return (moduleName === 'Mismatch' || moduleName === 'Octopus' || moduleName === 'angio') && taskscode == 0;
      });

      // 给一个判断值 判断是否需要手动处理
      if (handlePatientTasks.length < 1) {
        yield put({
          type: 'setDemandProcess',
          payload: {
            demandProcess: false
          }
        });
        yield put({
          type: 'setPatientViewList',
          payload: {
            patientViewList: []
          }
        });
      } else {
        yield put({
          type: 'setDemandProcess',
          payload: {
            demandProcess: true
          }
        })
        // 排序，时间最近在前
        handlePatientTasks.sort((a, b) => {
          return getTime(b.enddatetime) - getTime(b.enddatetime);
        });
        // 遍历获取summaryinfo 信息
        for (let i = 0; i < handlePatientTasks.length; i += 1) {
          const {taskid, seriesInstanceUid} = handlePatientTasks[i];
          const summaryInfoRsp = yield call(summaryinfo, {sitename, taskid, seriesInstanceUid});
          handlePatientTasks[i].summaryInfo = summaryInfoRsp;
          // 设置当前患者的任务队列用于 tab渲染
        }
        yield put({
          type: 'setPatientViewList',
          payload: {
            patientViewList: handlePatientTasks
          }
        });
      }
    },
    * gainTaskProgressStatus({payload}, {call, put}) {
      const {sitename} = payload;
      const taskProgressRsp = yield call(taskprogress, {sitename});
      yield put(
        {
          type: 'setTaskProgressStatus',
          payload: {taskProgressStatus: taskProgressRsp}
        }
      )
    },
  },
  reducers: {
    setPatientList(state, {payload}) {
      return {
        ...state,
        patientList: payload.patientList,
      }
    },
    setSearchList(state, {payload}) {
      return {
        ...state,
        searchList: payload.patientList,
      }
    },
    setPatientViewList(state, {payload}) {
      return {
        ...state,
        patientViewList: payload.patientViewList,
      }
    },
    setDemandProcess(state, {payload}) {
      return {
        ...state,
        demandProcess: payload.demandProcess
      }
    },
    setTaskProgressStatus(state, {payload}) {
      return {
        ...state,
        taskProgressStatus: payload.taskProgressStatus
      }
    },
  },
};


export default Model;
