/*
 * @Author: pwl
 * @Date: 2021-01-27 10:43:21
 * @LastEditTime: 2021-02-23 17:19:02
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
 * @description: 用户注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {string} gender 性别 1 男 2 女 3 保密
 * @param {string} nickName 昵称
 * @param {string} picture 头像
 * @return {*}
 */
export function registerUser(data) {
  return request({
    url: '/api/users/register',
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

/**
 * @description: 获取全部用户
 * @return {*}
 */
export function getUserList() {
  return request({
    url: '/api/users/getUserList',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
