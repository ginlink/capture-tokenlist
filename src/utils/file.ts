/*
 * @Author: jiangjin
 * @Date: 2021-10-21 16:27:44
 * @LastEditTime: 2021-10-21 17:53:20
 * @LastEditors: jiangjin
 * @Description:
 *
 */

import { existsSync } from 'fs'
import { mkdir as mkdirFs, opendir } from 'fs/promises'

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

export async function filterUpperAddress(filepath: string) {
  const upperReg = /^[0-9a-z\.]+$/
  return filterAddress(filepath, upperReg)
}
export async function filterLowerAddress(filepath: string) {
  const lowerReg = /^[0-9A-Z\.]+$/
  return filterAddress(filepath, lowerReg)
}
export async function filterAddress(filepath: string, reg: RegExp) {
  try {
    const dir = await opendir(filepath)
    const upperAddresses: string[] = []

    for await (const dirent of dir) {
      if (!reg.test(dirent.name)) {
        // console.log(dirent.name)

        upperAddresses.push(dirent.name)
      }
    }

    return upperAddresses
  } catch (err) {
    console.error(err)
    return undefined
  }
}
