// 首页所有的请求都放在一个单独的文件里面,统一管理
import {request} from "network/request";



export function getHomeMultidata(){
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type,page){
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
