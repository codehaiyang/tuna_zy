// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {
    dark: true, // 开启暗色主题
  },
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  // locale: false,
  // locale: {
  //   // default zh-CN
  //   default: 'zh-CN',
  //   antd: true,
  //   // default true, when it is true, will use `navigator.language` overwrite default
  //   baseNavigator: true,
  // },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [

    {
      path: '/user',
      // component: '../layouts/UserLayout',
      routes: [
        {
          path: '/user/login',
          name: 'login',
          component: './User/login',
        },
        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          name: 'register-result',
          icon: 'smile',
          path: '/user/register-result',
          component: './user/register-result',
        },
        {
          name: 'register',
          icon: 'smile',
          path: '/user/register',
          component: './user/register',
        },
        {
          component: '404',
        },
      ],
    },
    {
      component: '../layouts/BasicLayout',
      // Routes: ['src/pages/Authorized'],
      routes: [
        {
          path: '/',
          redirect: '/patient/list',
        },
        {
          name: '患者列表',
          icon: 'menu',
          path: '/patient/list',
          component: './Patient/list/index',
          authority: ['clinical', 'admin', 'superAdmin', 'service'],
        },
        {
          name: 'Tuna影像处理结果',
          hideInMenu: true,
          path: '/patient/analysis',
          component: './Patient/analysis/index',
          authority: ['clinical', 'admin', 'superAdmin', 'service'],
        },
        // {
        //   path: '/patient',
        //   name: '患者',
        //   icon: 'menu',
        //   authority: ['clinical', 'admin', 'superAdmin', 'service'],
        //   routes: [
        //     {
        //       name: '患者列表',
        //       icon: 'orderList',
        //       path: '/patient/list',
        //       component: './Patient/list/index',
        //       authority: ['clinical', 'admin', 'superAdmin', 'service'],
        //     },
        //     {
        //       name: '分析影像',
        //       hideInMenu: true,
        //       icon: 'smile',
        //       path: '/patient/analysis',
        //       component: './Patient/analysis/index',
        //       authority: ['clinical', 'admin', 'superAdmin', 'service'],
        //     },
        //   ]
        // },
        {
          path: '/dashboard/index',
          name: '仪表数据中心',
          icon: 'dashboard',
          component: './Dashboard/index',
          authority: ['clinical', 'admin', 'superAdmin', 'service'],
        },
        {
          path: '/settings',
          icon: 'form',
          name: '系统设置',
          authority: ['admin', 'superAdmin', 'service'],//如果想要显示也是需要加上authority
          routes: [
            {
              path: '/',
              redirect: '/settings/userPermission',
            },
            {
              name: '用户及权限',
              icon: 'smile',
              path: '/settings/userPermission',
              component: './settings/userPermission',
              authority: ['admin', 'superAdmin', 'service'],
            },
            {
              name: '影像通讯及服务',
              icon: 'smile',
              path: '/settings/dicomServer',
              component: './settings/dicomServer',
              authority: ['admin', 'superAdmin', 'service'],
            },
            {
              name: '模块参数设置',
              icon: 'smile',
              path: '/settings/moudel',
              component: './settings/moudel',
              authority: ['admin', 'superAdmin', 'service'],
            },
          ]
        },
        // {
        //   path: '/form',
        //   icon: 'form',
        //   name: 'form',
        //   routes: [
        //     {
        //       path: '/',
        //       redirect: '/form/basic-form',
        //     },
        //     {
        //       name: 'basic-form',
        //       icon: 'smile',
        //       path: '/form/basic-form',
        //       component: './form/basic-form',
        //     },
        //     {
        //       name: 'step-form',
        //       icon: 'smile',
        //       path: '/form/step-form',
        //       component: './form/step-form',
        //     },
        //     {
        //       name: 'advanced-form',
        //       icon: 'smile',
        //       path: '/form/advanced-form',
        //       component: './form/advanced-form',
        //     },
        //   ],
        // },
        // {
        //   path: '/list',
        //   icon: 'table',
        //   name: 'list',
        //   routes: [
        //     {
        //       path: '/list/search',
        //       name: 'search-list',
        //       component: './list/search',
        //       routes: [
        //         {
        //           path: '/list/search',
        //           redirect: '/list/search/articles',
        //         },
        //         {
        //           name: 'articles',
        //           icon: 'smile',
        //           path: '/list/search/articles',
        //           component: './list/search/articles',
        //         },
        //         {
        //           name: 'projects',
        //           icon: 'smile',
        //           path: '/list/search/projects',
        //           component: './list/search/projects',
        //         },
        //         {
        //           name: 'applications',
        //           icon: 'smile',
        //           path: '/list/search/applications',
        //           component: './list/search/applications',
        //         },
        //       ],
        //     },
        //     {
        //       path: '/',
        //       redirect: '/list/table-list',
        //     },
        //     {
        //       name: 'table-list',
        //       icon: 'smile',
        //       path: '/list/table-list',
        //       component: './list/table-list',
        //     },
        //     {
        //       name: 'basic-list',
        //       icon: 'smile',
        //       path: '/list/basic-list',
        //       component: './list/basic-list',
        //     },
        //     {
        //       name: 'card-list',
        //       icon: 'smile',
        //       path: '/list/card-list',
        //       component: './list/card-list',
        //     },
        //   ],
        // },
        // {
        //   path: '/profile',
        //   name: 'profile',
        //   icon: 'profile',
        //   routes: [
        //     {
        //       path: '/',
        //       redirect: '/profile/basic',
        //     },
        //     {
        //       name: 'basic',
        //       icon: 'smile',
        //       path: '/profile/basic',
        //       component: './profile/basic',
        //     },
        //     {
        //       name: 'advanced',
        //       icon: 'smile',
        //       path: '/profile/advanced',
        //       component: './profile/advanced',
        //     },
        //   ],
        // },
        // {
        //   name: 'result',
        //   icon: 'CheckCircleOutlined',
        //   path: '/result',
        //   routes: [
        //     {
        //       path: '/',
        //       redirect: '/result/success',
        //     },
        //     {
        //       name: 'success',
        //       icon: 'smile',
        //       path: '/result/success',
        //       component: './result/success',
        //     },
        //     {
        //       name: 'fail',
        //       icon: 'smile',
        //       path: '/result/fail',
        //       component: './result/fail',
        //     },
        //   ],
        // },
        // {
        //   name: 'exception',
        //   icon: 'warning',
        //   path: '/exception',
        //   routes: [
        //     {
        //       path: '/',
        //       redirect: '/exception/403',
        //     },
        //     {
        //       name: '403',
        //       icon: 'smile',
        //       path: '/exception/403',
        //       component: './exception/403',
        //     },
        //     {
        //       name: '404',
        //       icon: 'smile',
        //       path: '/exception/404',
        //       component: './exception/404',
        //     },
        //     {
        //       name: '500',
        //       icon: 'smile',
        //       path: '/exception/500',
        //       component: './exception/500',
        //     },
        //   ],
        // },
        // {
        //   name: 'account',
        //   icon: 'user',
        //   path: '/account',
        //   routes: [
        //     {
        //       path: '/',
        //       redirect: '/account/center',
        //     },
        //     {
        //       name: 'center',
        //       icon: 'smile',
        //       path: '/account/center',
        //       component: './account/center',
        //     },
        //     {
        //       name: 'settings',
        //       icon: 'smile',
        //       path: '/account/settings',
        //       component: './account/settings',
        //     },
        //   ],
        // },
        // {
        //   name: 'editor',
        //   icon: 'highlight',
        //   path: '/editor',
        //   routes: [
        //     {
        //       path: '/',
        //       redirect: '/editor/flow',
        //     },
        //     {
        //       name: 'flow',
        //       icon: 'smile',
        //       path: '/editor/flow',
        //       component: './editor/flow',
        //     },
        //     {
        //       name: 'mind',
        //       icon: 'smile',
        //       path: '/editor/mind',
        //       component: './editor/mind',
        //     },
        //     {
        //       name: 'koni',
        //       icon: 'smile',
        //       path: '/editor/koni',
        //       component: './editor/koni',
        //     },
        //   ],
        // },
        {
          component: '404',
        },
      ],
    }
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
    'font-size-base': '18px'
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  esbuild: {},
});
