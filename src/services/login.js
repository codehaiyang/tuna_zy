import request from '@/utils/request';

/**
 * 登录
 * @param params
 * @returns {Promise<any>}
 */
export async function loginx(params) {
  return request('/api/authenticate/loginx', {
    method: 'POST',
    data: JSON.stringify(params)
  })
}

/**
 * 验证session是否有效
 * @param params
 * @returns {Promise<any>}
 */
export async function session(params) {
  return request('/api/information/session', {
    method: "GET",
    params
  })
}


export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
