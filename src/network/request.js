import axios from "axios";

export function request(config){

  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout:5000
  })

  instance.interceptors.request.use(config=>{//是我们请求的config
    return config
  },err=>{

  })

  instance.interceptors.response.use(res=>{//这里的res是result简写,结果的意思
    return res.data//这里的data是返回结果中只要data-12
  },err=>{

  })

  return instance(config)//这个的东西返回的是promise(),因为axios实例instance是个函数,调用它了,必须return,不然报错

}

