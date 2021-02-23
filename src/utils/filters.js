/*
 * @Author: your name
 * @Date: 2020-12-29 09:55:16
 * @LastEditTime: 2021-01-04 18:27:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \portalSite\src\utils\filters.js
 */
import { formatDate } from '@/utils/index'

function formatTime(value, format) {
  if (value) {
    const timeVal = formatDate(value, format)
    return timeVal
  }
}

export {
  formatTime
}
