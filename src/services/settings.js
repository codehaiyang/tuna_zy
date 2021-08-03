import request from '@/utils/request'


// 获取患者集合
export function patienttree(params) {
    return request('/api//usermgmt/users', {
        method: 'GET',
        params
    })
}