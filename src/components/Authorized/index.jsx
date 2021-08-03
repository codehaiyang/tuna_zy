import Authorized from './Authorized';
import Secured from './Secured';
import check from './CheckPermissions';
import renderAuthorize from './renderAuthorize';
Authorized.Secured = Secured;
Authorized.check = check;
/**
 * 实际使用的是renderAuthorize
 * Authorized则是把Utils中的Authorized的getAuthority函数传递传递到 ./Authorized组件中
 * @type {*|(function(*=): *)}
 */
const RenderAuthorize = renderAuthorize(Authorized);

export default RenderAuthorize;
