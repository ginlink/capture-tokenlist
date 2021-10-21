/*
 * @Author: jiangjin
 * @Date: 2021-10-21 16:27:44
 * @LastEditTime: 2021-10-21 16:44:07
 * @LastEditors: jiangjin
 * @Description:
 *
 */

import * as fs from 'fs'
import { existsSync } from 'fs'

import { mkdir as mkdirFs } from 'fs/promises'

// export function isFileExisted(path_way) {
//   return new Promise((resolve, reject) => {
//     fs.access(path_way, (err) => {
//       if (err) {
//         reject(false) //"不存在"
//       } else {
//         resolve(true) //"存在"
//       }
//     })
//   })
// }

export function pathExist(path: string) {
  return existsSync(path)
}

export function mkdir(path: string) {
  return mkdirFs(path)
}

export async function checkAndMkdir(path: string, recursive = true) {
  if (!existsSync(path)) await mkdirFs(path, { recursive })
}
