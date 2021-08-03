import {parse} from 'querystring';
/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const {NODE_ENV} = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};

/**
 * 获取当前sitename
 * @returns {boolean|any}
 */
export function getIsvSelectedSite() {
  if (!localStorage && !localStorage.getItem('IsvSelectedSite')) {
    window.location.replace('/user/login');
    return false;
  }
  return JSON.parse(localStorage.getItem('IsvSelectedSite'))
}

/**
 * 判断是否为空
 * @param {} obj
 * @param {*} ret
 * @returns
 */
export function valid2Null(obj, ret) {
  if (obj === undefined || obj === null || typeof (obj) === "undefined") {
    return ret;
  }
  return obj;
}

/**
 * 原型链  时间格式化函数
 * @param formatStr
 * @returns {*}
 * @constructor
 */
Date.prototype.Format = function (formatStr) {
  let str = formatStr;
  const Week = ['日', '一', '二', '三', '四', '五', '六'];

  str = str.replace(/yyyy|YYYY/, this.getFullYear());
  str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));

  str = str.replace(/MM/, this.getMonth() > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
  str = str.replace(/M/g, this.getMonth());

  str = str.replace(/w|W/g, Week[this.getDay()]);

  str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
  str = str.replace(/d|D/g, this.getDate());

  str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
  str = str.replace(/h|H/g, this.getHours());
  str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
  str = str.replace(/m/g, this.getMinutes());

  str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
  str = str.replace(/s|S/g, this.getSeconds());

  return str;
}

/**
 * 转换时间格式
 * @param {*} date
 * @returns
 */
export function dateFormat(date) {
  return new Date(date).Format('yyyy/MM/dd HH:mm')
}

/**
 * 获取时间戳 带毫秒
 * @param {} dateStr
 * @returns
 */
export function getTime(dateStr) {
  return new Date(dateStr).getTime();
}


/**
 * 模块汉化名称
 * @param rawName
 * @returns {string}
 */
export function moduleNameFormat(rawName) {
  let formatName = '';
  switch (rawName) {
    case 'Octopus':
      formatName = 'ASPECTS';
      break;
    case 'angio':
      formatName = 'CTA';
      break;
    default:
      formatName = 'CTP';
  }
  return formatName;
}


export const getPageQuery = () => parse(window.location.href.split('?')[1]);
