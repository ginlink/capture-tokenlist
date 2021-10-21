/*
 * @Author: jiangjin
 * @Date: 2021-10-21 15:39:28
 * @LastEditTime: 2021-10-21 17:54:37
 * @LastEditors: jiangjin
 * @Description:
 *
 */
import { createWriteStream } from 'node:fs'
import { request } from 'node:http'
import path from 'node:path'
let imgCounter = 0

export async function downloadImg(imgs: string[], targetPath: string) {
  const len = imgs.length
  for (let i = 0; i < len; ++i) {
    // const target_path = path.resolve(__dirname, `../images/${src.split('/').pop()}`)
    const src = imgs[i]

    await new Promise((re) =>
      setTimeout(() => {
        re(void 0)
      }, 1000)
    )

    const filename = src.split('/').pop()
    const targetFile = path.join(targetPath, filename?.toLowerCase())
    var writeStream = createWriteStream(targetFile)

    var readStream = request(src)
    readStream.pipe(writeStream)
    readStream.on('end', function () {
      console.log(`文件下载成功`)
    })
    readStream.on('error', function (err) {
      // console.log(1)
      console.log('错误信息:' + err)
    })
    writeStream.on('finish', function () {
      console.log(`文件写入成功[${filename}]，当前第${++imgCounter} / ${len}`)
      writeStream.end()
    })
  }

  // imgs.forEach(async (src) => {
  //   // const target_path = path.resolve(__dirname, `../images/${src.split('/').pop()}`)

  //   await new Promise((re) =>
  //     setTimeout(() => {
  //       re(void 0)
  //     }, 3000)
  //   )

  //   const targetFile = path.join(targetPath, src.split('/').pop())
  //   var writeStream = fs.createWriteStream(targetFile)

  //   var readStream = request(src)
  //   readStream.pipe(writeStream)
  //   readStream.on('end', function () {
  //     console.log('文件下载成功')
  //   })
  //   readStream.on('error', function (err) {
  //     // console.log(1)
  //     console.log('错误信息:' + err)
  //   })
  //   writeStream.on('finish', function () {
  //     console.log('文件写入成功')
  //     writeStream.end()
  //   })
  // })
}
