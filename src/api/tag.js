/*
 * @Author: your name
 * @Date: 2021-01-27 14:54:00
 * @LastEditTime: 2021-01-29 11:11:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-blog-admin\src\api\tag.js
 */
import serve from '@/utils/request'

/**
 * @description: 创建类目
 * @param {string} categoryId 类目id (创建子类才传)
 * @param {string} name 类目名称
 * @param {string} type 1 为父类 2 为子类
 * @return {*}
 */
export function createCategory(data) {
  return serve({
    url: '/api/category/createCategory',
    method: 'POST',
    data
  })
}

// 获取标签列表
export function getCategoryList(params) {
  return serve({
    url: '/api/category/getCategory',
    method: 'GET',
    params
  })
}

// 根据一级标签获取二级标签
export function getTagChildList(personId) {
  return serve({
    url: '/api/tag/getTagChildList?personId=' + personId,
    method: 'GET'
  })
}
