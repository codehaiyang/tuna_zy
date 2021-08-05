import request from '@/utils/request'


// 获取患者集合
export function patienttree(params) {
  return request('/api/patientmgmt/patienttree', {
    method: 'GET',
    params
  })
}


// 患者视图及配置信息
export function summaryinfo(params) {
  return request('/api/patientmgmt/summaryinfo', {
    method: 'GET',
    params
  })
}

// session: start
// sitename: huamedtechtest2
/**
 * 上传开始结束需要调用
 * @param params
 * @returns {Promise<any>}
 */
export function uploadfileStartAndEnd(params) {
  return request('/api/patientmgmt/uploadfile', {
    method: 'POST',
    params
  })
}

/**
 * 上传
 * @param data
 * @returns {Promise<any>}
 */
export function uploadfile(data) {
  return request('/api/patientmgmt/uploadfile', {
    method: 'POST',
    // headers: {
    //   'Accept': '*/*',
    //   'Content-Type': 'multipart/form-data',
    // },
    requestType: 'form',
    data
  })
}


export function taskprogress(params) {
  return request('/api/patientmgmt/taskprogress', {
    method: 'GET',
    params
  })
}


