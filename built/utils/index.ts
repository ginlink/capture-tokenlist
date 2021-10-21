import path from 'path'

/*
 * @Author: jiangjin
 * @Date: 2021-10-21 15:39:28
 * @LastEditTime: 2021-10-21 15:59:48
 * @LastEditors: jiangjin
 * @Description:
 *
 */
const fs = require('fs')
const request = require('request')

export function downloadImg(imgs: string[]) {
  imgs.forEach(async (src) => {
    const target_path = path.resolve(__dirname, `./images/${src.split('/').pop()}`)
    var writeStream = fs.createWriteStream(target_path)

    var readStream = request(src)
    readStream.pipe(writeStream)
    readStream.on('end', function () {
      console.log('文件下载成功')
    })
    readStream.on('error', function (err) {
      // console.log(1)
      console.log('错误信息:' + err)
    })
    writeStream.on('finish', function () {
      console.log('文件写入成功')
      writeStream.end()
    })
  })
}
