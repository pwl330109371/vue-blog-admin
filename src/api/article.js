/*
 * @Author: your name
 * @Date: 2021-01-27 14:54:44
 * @LastEditTime: 2021-04-29 15:05:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-blog-admin\src\api\article.js
 */
import serve from '@/utils/request'

// 发布文章
export function createArticle(data) {
  return serve({
    url: '/api/article/addArticle',
    method: 'POST',
    data
  })
}

// 编辑文章
export function editArticle(data) {
  return serve({
    url: '/api/article/editArticle',
    method: 'PUT',
    data
  })
}

// 删除文章
export function delArticle(id) {
  return serve({
    url: '/api/article/delArticle?articleId=' + id,
    method: 'DELETE'
  })
}

// 获取文章列表
export function getArticleList(params) {
  return serve({
    url: '/api/article/getArticleList',
    method: 'GET',
    params
  })
}

// 获取文章详情 登录状态
export function getArticleDetail(id) {
  return serve({
    url: '/api/article/detail?id=' + id,
    method: 'GET'
  })
}

// 获取文章详情 未登录状态
export function getArticle(id) {
  return serve({
    url: '/api/article/getDetail?id=' + id,
    method: 'GET'
  })
}

// 是否点赞
export function isPraise(articleId) {
  return serve({
    url: '/api/praise/isPraise?articleId=' + articleId,
    method: 'GET'
  })
}

// 点赞
export function addPraise(data) {
  return serve({
    url: '/api/praise/addPraise',
    method: 'POST',
    data
  })
}

// 取消点赞
export function canclPraise(data) {
  return serve({
    url: '/api/praise/canclPraise',
    method: 'POST',
    data
  })
}

// 收藏
export function addFavorite(data) {
  return serve({
    url: '/api/favorite/addFavorite',
    method: 'POST',
    data
  })
}

// 取消收藏
export function canclFavorite(data) {
  return serve({
    url: '/api/favorite/canclFavorite',
    method: 'POST',
    data
  })
}

// 是否收藏
export function isFavorite(params) {
  return serve({
    url: '/api/favorite/isFavorite',
    method: 'GET',
    params
  })
}
