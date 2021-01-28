/*
 * @文件描述: 文件描述
 * @作者: L
 * @Date: 2020-09-25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-27 14:57:52
 * @Description: 图片上传
 * @Author: L
 */
import serve from '@/utils/request'
// 图片上传
export function uploadImgs(params) {
  return serve({
    url: '/api/file/upload',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: params
  })
}
