/*
 * @Author: pwl
 * @Date: 2021-01-27 10:43:21
 * @LastEditTime: 2021-01-28 17:26:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-blog-admin\src\api\user.js
 */
import request from '@/utils/request'

/**
 * @description: 用户登录
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @return {*}
 */
export function login(data) {
  return request({
    url: '/api/users/login',
    method: 'post',
    data
  })
}

/**
 * @description: 获取用户信息
 * @param {userId} userId
 * @return {*}
 */
export function getInfo(userId) {
  return request({
    url: '/api/users/getUserInfo?userId=' + userId,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
