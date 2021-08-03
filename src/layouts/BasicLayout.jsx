/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 *
 * @see You can view component api by: https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, {DefaultFooter, SettingDrawer} from '@ant-design/pro-layout';
import React, {useEffect, useMemo, useRef} from 'react';
import {Link/*, useIntl*/, connect, history} from 'umi';
// import { GithubOutlined } from '@ant-design/icons';
import {Result, Button, message} from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import {getMatchMenu} from '@umijs/route-utils';
import logo from '../assets/logo.svg';
import {getAuthority} from "@/utils/authority";
import {stringify} from "querystring";
import {session} from "@/services/login";

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="对不起，您没有权限访问此页面！"
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);


const menuDataRender = (menuList) => {
  return menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    return Authorized.check(item.authority, localItem, null);
  });
}

const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} 技术部出品`}
    links={
      [
        // {
        //   key: 'Ant Design Pro',
        //   title: 'Ant Design Pro',
        //   href: 'https://pro.ant.design',
        //   blankTarget: true,
        // },
        // {
        //   key: 'github',
        //   title: <GithubOutlined />,
        //   href: 'https://github.com/ant-design/ant-design-pro',
        //   blankTarget: true,
        // },
        // {
        //   key: 'Ant Design',
        //   title: 'Ant Design',
        //   href: 'https://ant.design',
        //   blankTarget: true,
        // },
      ]
    }
  />
);

const BasicLayout = (props) => {
  const {
    dispatch,
    children,
    settings,
    timer,
    location = {
      pathname: '/',
    },
    route,
    routes
  } = props;
  const menuDataRef = useRef([]);//  返回的是一个ref对象，但是里面current属性可以改变值，不会触发像state一样重新渲染的情况，类似于一个盒子外边不会变，保存current里边的值可以变不会触发渲染
  // useEffect(() => {
  //   if (dispatch) {
  //     dispatch({
  //       type: 'user/fetchCurrent',
  //     });
  //   }
  // }, []);
  /** Init variables */

  const handleMenuCollapse = (payload) => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  /**
   * 403无权限如果点击了登录，也是清除所有的信息
   * 算一下tuna接口session 多久到期，到期自动清除
   * @type {unknown}
   */
  // react hook   性能优化  创建函数会在渲染期间执行，依赖数组。如果依赖数组发生变化才会重新计算
  /**
   * 每次跳转页面都会触发，相当于路由守卫
   * @type {unknown}
   */
  const authorized = useMemo(
    () => {
      // 判断是否已经登录，如果没有返回登录清除缓存
      if (getAuthority() === undefined || !getAuthority()) {
        dispatch({
          type: 'login/logout'
        })
      } else      // 获取session轮询是否在进行
      if (!timer) {
        session({sitename: JSON.parse(localStorage.getItem('IsvUserProfile')).usersite[0].sitename}).then(rsp => {
          if (!rsp.isv_response || rsp.isv_response.code != 0) {
            // 提示
            message.error('当前会话已过期，请重新登录!');
            // 如果失效退出登录，清除localstorage
            dispatch({
              type: 'login/logout'
            });
          } else {
            // 如果没有重新调用
            dispatch({type: 'login/sessionValid', payload: JSON.parse(localStorage.getItem('IsvUserProfile'))});
          }
        }).catch(()=>{
          message.error('当前会话已过期，请重新登录!');
          dispatch({
            type: 'login/logout'
          });
        })

      }

      let menuData;

      function customizeMatchMenu(menuList, pathName) {
        return menuList.filter(item => {
          if (item.children) {
            customizeMatchMenu(item.children, pathName);
          }
          if (item.path === pathName) {
            menuData = item;
          }
          return item.path === pathName;
        })
      }

      // if (history.action === 'POP') {
      //   customizeMatchMenu(route.routes,location.pathname);
      //   return menuData;
      // }

      // customizeMatchMenu(route.routes,location.pathname);
      // return menuData;

      customizeMatchMenu(route.routes, location.pathname);
      // 返回当前路由的权限设置
      return menuData ? menuData : {authority: undefined};

      // return getMatchMenu(location.pathname || '/', menuDataRef.current).pop() || {
      //   authority: undefined,
      // }
    },
    [location.pathname],
  );
  // const {} = useIntl();
  return (
    <>
      <ProLayout
        logo={logo}
        {...props}
        {...settings}
        onCollapse={handleMenuCollapse}
        onMenuHeaderClick={() => history.push('/')}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (
            menuItemProps.isUrl ||
            !menuItemProps.path ||
            location.pathname === menuItemProps.path
          ) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: '首页',
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        footerRender={() => {
          if (settings.footerRender || settings.footerRender === undefined) {
            return defaultFooterDom;
          }
          return null;
        }}
        menuDataRender={menuDataRender}
        rightContentRender={() => <RightContent/>}
        postMenuData={(menuData) => {
          menuDataRef.current = menuData || [];
          return menuData || [];
        }}
      >
        {/* 每次改变路径会触发Authorized */}
        <Authorized authority={authorized.authority} noMatch={noMatch}>
          {children}
        </Authorized>
      </ProLayout>
      {/*<SettingDrawer*/}
      {/* settings={settings}*/}
      {/* onSettingChange={(config) =>*/}
      {/*   dispatch({*/}
      {/*     type: 'settings/changeSetting',*/}
      {/*     payload: config,*/}
      {/*   })*/}
      {/* }*/}
      {/*/>*/}
    </>
  );
};

export default connect(({global, settings, login}) => ({
  collapsed: global.collapsed,
  settings,
  timer: login.timer
}))(BasicLayout);
