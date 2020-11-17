import axios from 'axios';
import router from '../router'
import { Message, Loading } from 'element-ui'
// 创建axios实例

const service = axios.create({
  timeout: 10000 // 请求超时时间
})

service.defaults.baseURL = 'http://192.168.0.195:8081'
// service.defaults.baseURL = 'http://192.168.0.104:8081'
// service.defaults.baseURL = 'http://193.112.76.40:7071'
service.defaults.withCredentials = true

// 添加request拦截器
service.interceptors.request.use(config => {
  // console.log(config)
  if (sessionStorage.token) {
    config.headers.Authorization = sessionStorage.token
  }
  return config
}, error => {
  Promise.reject(error)
})

// 添加respone拦截器
service.interceptors.response.use(
  response => {
    // loading.close();
    if (response && response.status === 700) {
      if (!response.data) {
        Message.error('登录已失效或账号在其他地方登录，请刷新页面重新登录！')
      }
      sessionStorage.clear()
      this.$store.commit("SET_LAYOUT", '');
      router.push('/login')
      return Promise.reject(response);
    } else if (response) {
      const headers = response.headers
      if (headers['content-type'] === 'application/octet-stream;charset=utf-8') {
        let res = {}
        res = response.data
        return response.data
      }
      let res = {}
      res = response.data
      return res
    } else {
      Message.error(response.data.info)
      return Promise.reject(response);
    }

  },
  error => {
    if (error.response && error.response.status === 404) {
      Message.error(error.response.data.status + '，' + error.response.data.error + '，' + error.response.data.message)
    } else
      if (error.response && error.response.status === 700) {
        Message.error('登录已失效或账号在其他地方登录，请刷新页面重新登录！')
        sessionStorage.clear()
        this.$store.commit("SET_LAYOUT", '');
        router.push('/login')
      }
    return Promise.reject(error.response)
  }
)
//post导出
export function derive(url, params = {}) {
  return service({
    url: url,
    method: 'post',
    data: params,
    responseType: 'blob'
  })
}

export function get(url, params = {}) {
  params.t = new Date().getTime(); //get方法加一个时间参数,解决ie下可能缓存问题.
  return service({
    url: url,
    method: 'get',
    headers: {
    },
    params
  })
}

//封装form-data请求
export function form(url, data) {
  const formData = new FormData();
  // console.log(data)
  //对象转数组
  Object.keys(data).forEach((key) => {
    // console.log(key)
    // console.log(Object.keys(data))
    // 参数为空就后端就失败，只能去掉空值
    if (data[key]) {
      formData.append(key, data[key]);
    }
  });
  //默认配置
  let sendObject = {
    url: url,
    method: 'post',
    data: formData
  };
  // sendObject.data=JSON.stringify(data);
  return service(sendObject)
}

//封装post请求
export function post(url, data = {}) {
  //默认配置
  let sendObject = {
    url: url,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: data
  };
  sendObject.data = JSON.stringify(data);
  return service(sendObject)
}

//封装put方法 (resfulAPI常用)
export function put(url, data = {}) {
  return service({
    url: url,
    method: 'put',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: JSON.stringify(data)
  })
}
//删除方法(resfulAPI常用)
export function deletes(url) {
  return service({
    url: url,
    method: 'delete',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
  })
}

//不要忘记export
export {
  service
}
