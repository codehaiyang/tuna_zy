import request from '@/utils/request'


// 获取患者集合
export  function patienttree(params) {
  return request('/api/patientmgmt/patienttree', {
    method: 'GET',
    params
  })
}


// 患者视图及配置信息
export function summaryinfo(params){
  return request('/api/patientmgmt/summaryinfo', {
    method: 'GET',
    params
  })
}

export function taskprogress(params){
  return request('/api/patientmgmt/taskprogress', {
    method: 'GET',
    params
  })
}


