/*
 * @文件描述: 文件描述
 * @作者: L
 * @Date: 2020-09-25
 * @LastEditors: Peng wenlei
 * @LastEditTime: 2021-01-29 22:53:06
 * @Description: 图片上传
 * @Author: L
 */
import serve from '@/utils/request'
// 图片上传
export function uploadImgs(params) {
  return serve({
    url: '/api/upload/uploadImg',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: params
  })
}
