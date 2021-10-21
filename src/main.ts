/*
 * @Author: jiangjin
 * @Date: 2021-10-21 14:52:52
 * @LastEditTime: 2021-10-21 17:54:51
 * @LastEditors: jiangjin
 * @Description:
 *
 */

import { getTokenList } from './services/api'
import { TokenList } from './types/tokenList'
import { parseUrls } from './utils/parseUrls'
import { downloadImg } from './utils'
import { checkAndMkdir, filterUpperAddress } from './utils/file'
import { rename } from 'fs/promises'
import path from 'node:path'

interface TokenListData {
  tokens: TokenList[]
}

;(async function main() {
  // await capatureTokenList()

  const filepath = path.resolve(__dirname, './images')
  await renameLower(filepath)

  async function capatureTokenList() {
    //get token list
    const tokenListData = (await getTokenList()) as unknown as TokenListData
    const tokenList = tokenListData.tokens as TokenList[]
    //parse
    const parsedUrls = parseUrls(tokenList)
    const targetPath = path.resolve(__dirname, `./images/images`)
    await checkAndMkdir(targetPath, true)
    //download and save to path
    await downloadImg(parsedUrls, targetPath)
  }

  async function renameLower(filepath: string) {
    const addresses = await filterUpperAddress(filepath)
    // const addresses = await filterLowerAddress(filepath)

    console.log('[](addresses):', addresses)

    const len = addresses.length
    for (let i = 0; i < len; ++i) {
      const address = addresses[i]
      const o = path.join(filepath, address)
      const n = path.join(filepath, address.toLowerCase())
      // const n = path.join(filepath, address.toUpperCase())

      try {
        await rename(o, n)
        console.log('[](命名成功):', `${address}=>${address.toLowerCase()}`, `当前第 ${i} / ${len}`)
        // console.log('[](命名成功):', `${address}=>${address.toUpperCase()}`, `当前第 ${i} / ${len}`)
      } catch (err) {
        console.log('[renameLower](err):', err)
      }
    }
  }
})()
