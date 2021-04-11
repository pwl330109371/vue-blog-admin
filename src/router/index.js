/*
 * @Author: your name
 * @Date: 2021-01-27 10:43:21
 * @LastEditTime: 2021-04-11 17:26:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-blog-admin\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index1'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/userManage',
    component: Layout,
    redirect: '/userManage/userList',
    name: 'userManage',
    meta: { title: '用户管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'userList',
        name: 'userList',
        component: () => import('@/views/userManage/userList/'),
        meta: { title: '用户列表', icon: 'table' }
      },
      {
        path: 'userMessage',
        name: 'userMessage',
        component: () => import('@/views/userManage/userMessage/'),
        meta: { title: '用户留言', icon: 'tree' }
      }
    ]
  },
  {
    path: '/articleManage',
    component: Layout,
    redirect: '/articleManage/articleList',
    name: 'articleManage',
    meta: { title: '文章管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'articleList',
        name: 'articleList',
        component: () => import('@/views/articleManage/articleList/'),
        meta: { title: '文章列表', icon: 'table' }
      },
      {
        path: 'articleComment',
        name: 'articleComment',
        component: () => import('@/views/articleManage/articleComment/'),
        meta: { title: '文章评论', icon: 'tree' }
      },
      {
        path: 'createArticle',
        name: 'createArticle',
        component: () => import('@/views/articleManage/createArticle/'),
        meta: { title: '发布文章', icon: 'tree' }
      }
    ]
  },
  {
    path: '/imgManage',
    component: Layout,
    redirect: '/imgManage/imgList',
    name: 'imgManage',
    meta: { title: '图片管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'imgList',
        name: 'imgList',
        component: () => import('@/views/imgManage/'),
        meta: { title: '图片列表', icon: 'table' }
      },
      {
        path: 'createImg',
        name: 'createImg',
        component: () => import('@/views/imgManage/create'),
        meta: { title: '添加图片', icon: 'tree' }
      }
    ]
  },
  {
    path: '/tagManage',
    component: Layout,
    redirect: '/tagManage/tagList',
    name: 'tagManage',
    meta: { title: '用户管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'tagList',
        name: 'tagList',
        component: () => import('@/views/tagManage/tagList/'),
        meta: { title: '标签列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/aboutMe',
    component: Layout,
    redirect: '/aboutMe',
    children: [{
      path: 'aboutMe',
      name: 'AboutMe',
      component: () => import('@/views/aboutMe/index'),
      meta: { title: '关于我', icon: 'dashboard' }
    }]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
