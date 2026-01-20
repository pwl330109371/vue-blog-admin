/**
 * Author: pengwenlei 330109371@qq.com
 * Date: 2025-12-12 14:54:36
 * LastEditors: pengwenlei 330109371@qq.com
 * LastEditTime: 2026-01-14 14:18:52
 */
/*
 * @Author: your name
 * @Date: 2021-04-10 15:05:22
 * @LastEditTime: 2021-04-10 15:06:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-blog-admin\src\api\img.js
 */
import serve from '@/utils/request'

// 创建图片
export function createImg(data) {
  return serve({
    url: '/api/img/createImg',
    method: 'POST',
    data
  })
}

// 获取图片列表
export function getImgList(params) {
  return serve({
    url: '/api/img/getImgList',
    method: 'GET',
    params
  })
}