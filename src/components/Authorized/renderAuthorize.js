/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable import/no-mutable-exports */
let CURRENT = 'NULL';

/**
 * Use authority or getAuthority
 * 第一个参数是在Authorized中传递的Authorized组件,第二个参数是在设置权限的传入
 * @param {string|()=>String} currentAuthority
 */
const renderAuthorize = (Authorized) => (currentAuthority) => {
  if (currentAuthority) {
    if (typeof currentAuthority === 'function') {
      CURRENT = currentAuthority();
    }

    if (
      Object.prototype.toString.call(currentAuthority) === '[object String]' ||
      Array.isArray(currentAuthority)
    ) {
      CURRENT = currentAuthority;
    }
  } else {
    CURRENT = 'NULL';
  }

  return Authorized;
};

export { CURRENT };
export default (Authorized) => renderAuthorize(Authorized);
