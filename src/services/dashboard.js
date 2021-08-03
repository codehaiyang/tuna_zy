import request from '@/utils/request'


// 获取当前设备信息
export function sysInfo(params) {
  return request('/api/information/sysinfo', {
    method: 'GET',
    headers: {'authorization': localStorage.getItem('token')},
    params
  })
}


// 获取当前DICOM节点信息
export function aetentries(params) {
  return request('/api/configmgmt/aetentries', {
    method: 'GET',
    headers: {'authorization': localStorage.getItem('token')},
    params
  })
}

// 获取对应DICOM节点是否处于激活状态
export function dicomping(params) {
  return request('/api/configmgmt/dicomping', {
    method: 'GET',
    headers: {'authorization': localStorage.getItem('token')},
    params
  })
}


// 获取患者列表（树结构）
export function patienttree(params) {
  return request('/api/patientmgmt/patienttree', {
    method: 'GET',
    headers: {'authorization': localStorage.getItem('token')},
    params
  })
}




// 获取某个时间线的患者列表状态
export function timeline(params) {
  return request('/api/patientmgmt/timeline', {
    method: 'GET',
    headers: {'authorization': localStorage.getItem('token')},
    params
  })
}



// 获取对应患者处理列表信息
export function patienttasks(params) {
  return request('/api/patientmgmt/patienttasks', {
    method: 'GET',
    headers: {'authorization': localStorage.getItem('token')},
    params
  })
}



// 获取对应序列的图像数量
export function imagecount(params) {
  return request('/api/patientmgmt/imagecount', {
    method: 'GET',
    headers: {'authorization': localStorage.getItem('token')},
    params
  })
}


// 获取对应任务及子任务 用于显示
export function childtasks(params) {
  return request('/api/patientmgmt/childtasks', {
    method: 'GET',
    headers: {'authorization': localStorage.getItem('token')},
    params
  })
}



// 获取DICOM发送队列
export function dicomqueue(params) {
  return request('/api/patientmgmt/dicomqueue', {
    method: 'GET',
    headers: {'authorization': localStorage.getItem('token')},
    params
  })
}


// 获取DICOM发送队列
export function receivequeue(params) {
  return request('/api/patientmgmt/receivequeue', {
    method: 'GET',
    headers: {'authorization': localStorage.getItem('token')},
    params
  })
}




// 删除患者信息
export function patient(params) {
  return request('/api/patientmgmt/patient', {
    method: 'DELETE',
    headers: {'authorization': localStorage.getItem('token')},
    params
  })
}


// 删除患者协议名称
export function study(params) {
  return request('/api/patientmgmt/study', {
    method: 'DELETE',
    headers: {'authorization': localStorage.getItem('token')},
    params
  })
}


// 删除患者序列
export function series(params) {
  return request('/api/patientmgmt/series', {
    method: 'DELETE',
    headers: {'authorization': localStorage.getItem('token')},
    params
  })
}

// 暂停所有等待处理队列
export function clearqueue(params) {
  return request('/api/patientmgmt/clearqueue', {
    method: 'DELETE',
    headers: {'authorization': localStorage.getItem('token')},
    params
  })
}
