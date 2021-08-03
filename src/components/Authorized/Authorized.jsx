import React from 'react';
import { Result } from 'antd';
import check from './CheckPermissions';
import RenderAuthorize from "@/components/Authorized/index";

const Authorized = ({
  children,
  authority,
  noMatch = (
    <Result
      status="403"
      title="403"
      subTitle="对不起，您没有权限访问此页面！"
    />
  ),
}) => {
  const childrenRender = typeof children === 'undefined' ? null : children;
  const dom = check(authority, childrenRender, noMatch);
  return <>{dom}</>;
};

export default Authorized;
