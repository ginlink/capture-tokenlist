/*
 * @Author: jiangjin
 * @Date: 2021-10-21 15:11:58
 * @LastEditTime: 2021-10-21 15:26:36
 * @LastEditors: jiangjin
 * @Description:
 *
 */

import { CAPTURE_CHAINID } from '../constants/misc'
import { TokenList } from '../types/tokenList'

export function parseUrls(tokenList: TokenList[]) {
  return tokenList.filter((item) => item.chainId == CAPTURE_CHAINID).map((item) => item.logoURI)
}
