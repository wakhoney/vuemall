export function /*防抖函数*/
  debounce(func,delay){/*func等会要执行的函数;delay给个时间等多久*//*es6参数都要给默认值的*/
    let timer = null/*用timer来记录下有没有定时器*/
    /*函数本身会返回个新函数*/
    return function (...args) {
      /*判断timer有没有值,有就清除掉*/
      if(timer) clearTimeout(timer)
      /*清除后重新计时*/
      timer = setTimeout(()=>{
        func.apply(this,args)/*执行这函数*/
      },delay)
    }
}
/*正则表达式是干什么的: 字符串匹配利器*/
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};
