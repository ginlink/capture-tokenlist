/*
 * @Author: jiangjin
 * @Date: 2021-10-21 14:52:52
 * @LastEditTime: 2021-10-21 16:46:43
 * @LastEditors: jiangjin
 * @Description:
 *
 */

import path = require('path')
import fs = require('fs')
import { getTokenList } from './services/api'
import { TokenList } from './types/tokenList'
import { parseUrls } from './utils/parseUrls'
import axios from 'axios'
import { downloadImg } from './utils'
import { checkAndMkdir } from './utils/file'

interface TokenListData {
  tokens: TokenList[]
}

;(async function main() {
  //get token list
  const tokenListData = (await getTokenList()) as unknown as TokenListData
  const tokenList = tokenListData.tokens as TokenList[]

  //parse
  const parsedUrls = parseUrls(tokenList)

  const targetPath = path.resolve(__dirname, `./images/images`)
  await checkAndMkdir(targetPath, true)

  //download and save to path
  await downloadImg(parsedUrls, targetPath)
})()
