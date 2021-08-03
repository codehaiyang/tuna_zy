import {stringify} from 'querystring';
import {history} from 'umi';
import {loginx, session} from '@/services/login';
import {setAuthority} from '@/utils/authority';
import {getPageQuery} from '@/utils/utils';
import {message} from 'antd';

function logoutx() {
  // 清除state中的用户信息
  localStorage.removeItem('IsvSelectedSite')
  localStorage.removeItem('IsvUserProfile')
  localStorage.removeItem('tuna-authority')
  localStorage.removeItem('token')
  if (window.location.pathname !== '/user/login') {
    history.replace({
      pathname: '/user/login',
      // search: stringify({
      //   redirect: window.location.href,
      // }),
    });
  }
}


const Model = {
  namespace: 'login',
  state: {
    userInfo: undefined,
    timer: undefined
  },
  effects: {
    * login({payload}, {call, put}) {
      const response = yield call(loginx, payload);
      // 登录成功
      if (response.username) {

        // 存入用户信息
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });

        // 同时调用currentuser
        yield put({type: 'user/saveCurrentUser', payload: response});


      // 调用session接口
        yield  put({type: 'sessionValid', payload: response})


        message.success(' 登录成功！');

        // const urlParams = new URL(window.location.href);
        // const params = getPageQuery();
        //
        // let {redirect} = params;
        //
        // if (redirect) {
        //   const redirectUrlParams = new URL(redirect);
        //
        //   if (redirectUrlParams.origin === urlParams.origin) {
        //     redirect = redirect.substr(urlParams.origin.length);
        //
        //     if (redirect.match(/^\/.*#/)) {
        //       redirect = redirect.substr(redirect.indexOf('#') + 1);
        //     }
        //   } else {
        //     window.location.href = '/';
        //     return;
        //   }
        // }

        history.replace('/patient/list');
      } else {
        message.error('用户名或密码有误，请重新检查再次输入!');
      }
    },
    * sessionValid({payload}, {put}) {
      yield put({type: 'changeTimer', payload: true});
      const sessionTimer = setInterval(() => {
        session({sitename: payload.usersite[0].sitename}).then(rsp => {
          if (!rsp.isv_response || rsp.isv_response.code != 0) {
            // 如果失效退出登录，清除localstorage
            logoutx();
            clearInterval(sessionTimer);
          }
        })
      }, 1000 * 10)
    },
    logout() {
      return logoutx();
    },
  },
  reducers: {
    changeLoginStatus(state, {payload}) {
      let authority;
      switch (Number(payload.usersite[0].usertype)) {
        case 0:
          authority = 'clinical';
          break;
        case 1:
          authority = 'admin';
          break;
        case 2:
          authority = ['superAdmin', 'service'];
          break;
        default:
          authority = 'clinical';
      }
      // 设置过期时间
      // localStorage.setItem('ExpirationTime', new Date().getTime().toString())
      setAuthority(authority);
      localStorage.setItem('IsvSelectedSite', JSON.stringify(payload.usersite[0]))
      localStorage.setItem('IsvUserProfile', JSON.stringify(payload))
      return {...state, userInfo: payload};
    },
    changeTimer(state, {payload}) {
      return {...state, timer: payload};
    }
  },
};

export default Model;
