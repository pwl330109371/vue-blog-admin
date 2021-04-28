/*
 * @Author: your name
 * @Date: 2021-01-27 10:43:21
 * @LastEditTime: 2021-04-21 16:44:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-blog-admin\src\utils\validate.js
 */
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['pwl201314', 'editor', 'wff201314']
  return valid_map.indexOf(str.trim()) >= 0
}
