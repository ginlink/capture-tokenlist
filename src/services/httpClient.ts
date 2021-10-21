import axios from 'axios'
import { BASE_URL } from './config'

/**
 * 二次封装axios
 * @param {String} method Ajax请求类型 'POST'|'PUT'|'GET'|'DELETE'
 * @param {String} url 请求地址
 * @param {Object} params  参数
 * @returns Promise<T>
 */
function apiAxios(method: string, url: string, params: any) {
  return new Promise((resolve, reject) => {
    // axios.defaults.headers.common.Authorization = localStorage.getItem('accessToken')
    // 设置默认头部

    const instance: any = axios.create({
      baseURL: BASE_URL,
      timeout: 60000,
    })

    instance[method.toLowerCase()](url, {
      data: method === 'POST' || method === 'PUT' ? params : null,
      params: method === 'GET' || method === 'DELETE' || method === 'PATCH' ? params : null,
      withCredentials: false,
    })
      .then((res: any) => {
        if (res?.status === 200) {
          resolve(res.data)
        } else {
          reject('Axios返回状态不对，查看请求处理过程．．．．')
        }
      })
      .catch((err: any) => {
        const errCode = err?.response?.status
        switch (errCode) {
          case 400:
            console.log('错误请求')
            break
          case 401:
            // 权限处理 重新登录 清空token
            // window.location.href = '#/login'
            console.log('请求错误,权限问题')
            break
          case 403:
            // window.location.href = '#/login'
            console.log('请求错误,权限问题')
            break
          case 404:
            console.log('请求错误,未找到该资源')
            break
          case 405:
            console.log('请求方法未允许')
            break
          case 408:
            console.log('请求超时')
            break
          case 500:
            console.log('服务器端出错')
            break
          case 501:
            console.log('网络未实现')
            break
          case 502:
            console.log('网络错误')
            break
          case 503:
            console.log('服务不可用')
            break
          case 504:
            console.log('网络超时')
            break
          default:
            console.log('未知错误')
        }

        // 由于请求接口较少，业务层不再处理错误
        // 抓取所有异常，统一处理
        console.log('[httpClient-err]:', err)

        // if (true) {
        //   // 只处理我需要处理的
        //   console.log('[httpClient-err]:', err)
        // } else {
        //   // 如果需要业务层处理，则再抛出去
        //   throw err
        // }
      })
  })
}
export default {
  get: (url: string, params: any = {}) => {
    return apiAxios('GET', url, params)
  },
  post: (url: string, params: any) => {
    return apiAxios('POST', url, params)
  },
  put: (url: string, params: any) => {
    return apiAxios('PUT', url, params)
  },
  delete: (url: string, params: any) => {
    return apiAxios('DELETE', url, params)
  },
  patch: (url: string, params: any) => {
    return apiAxios('PATCH', url, params)
  },
}
