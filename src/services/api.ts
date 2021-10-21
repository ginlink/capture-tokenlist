/*
 * @Author: jiangjin
 * @Date: 2021-10-21 15:04:49
 * @LastEditTime: 2021-10-21 15:09:59
 * @LastEditors: jiangjin
 * @Description: 
 * 
 */
import httpClient from './httpClient'
interface HttpResponse {
  code: number
  data: Array<any>
}

export const getTokenList = (): Promise<HttpResponse> => {
  return httpClient.get('/getTokenList') as Promise<HttpResponse>
}
