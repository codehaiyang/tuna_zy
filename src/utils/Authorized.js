import RenderAuthorize from '@/components/Authorized';
import { getAuthority } from './authority';
/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable import/no-mutable-exports */

/**
 * 调用组件模块中的Authorized组件,传入当前用户的权限
 */
let Authorized = RenderAuthorize(getAuthority()); // Reload the rights component

const reloadAuthorized = () => {
  Authorized = RenderAuthorize(getAuthority());
};
/** Hard code block need it。 */

window.reloadAuthorized = reloadAuthorized;
export { reloadAuthorized };
export default Authorized;
