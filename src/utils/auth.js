/*
 * @Author: pwl
 * @Date: 2021-01-27 10:43:21
 * @LastEditTime: 2021-04-28 11:01:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-blog-admin\src\utils\auth.js
 */
import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setCookie(key, value) {
  return Cookies.set(key, value)
}

export function getCookie(key) {
  return Cookies.get(key)
}
