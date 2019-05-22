import axios from 'axios'
import { Message } from 'mint-ui'
// 创建axios实例
const service = axios.create({
  // baseURL: 'http://10.0.2.2/',
  timeout: 10000,
  method: 'get'
})

// request 请求收到后 拦截器设置
service.interceptors.request.use(
  request => {
    if (localStorage.JWT_TOKEN) {
      request.headers.Authorization = localStorage.JWT_TOKEN
    }
    return request
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    if (response) {
      switch (response.status) {
        case 200:
          break
        default:
          Message.error(
            response.data.data.msg ? response.data.data.msg : '返回状态非200'
          )
      }
      return response
    } else {
      Message.error('响应成功，但是响应信息不存在！')
    }
  },
  error => {
    return Promise.reject(error) // 返回接口返回的错误信息
  }
)

export default service
