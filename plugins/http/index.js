'use strict'
import axios from './api'

/* 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 *
 */

// 单独倒出
export const verificationCodes = data => {
  return axios({
    url: 'verificationCodes',
    method: 'POST',
    data: data

  })
}
export const getCaptcha = () => {
  return axios({
    url: 'getCaptcha',
    method: 'POST'
  })
}
export const register = data => {
  return axios({
    url: 'auth/register',
    method: 'POST',
    data: data
  })
}
export const login = data => {
  return axios({
    url: 'auth/login',
    method: 'POST',
    data: data
  })
}
export const loginViaCode = data => {
  return axios({
    url: 'auth/loginViaCode',
    method: 'POST',
    data: data
  })
}
export const logout = () => {
  return axios({
    url: 'auth/logout',
    method: 'delete'
  })
}
export const userMe = () => {
  return axios({
    url: 'user/me',
    method: 'post',
    data: {
      mustAuth: true
    }
  })
}
export const userUpdate = data => {
  return axios({
    url: 'user/update',
    method: 'put',
    data: data
  })
}
export const userPasswordReset = data => {
  return axios({
    url: 'user/passwordReset',
    method: 'put',
    data: data
  })
}

export const products = (params) => {
  return axios({
    url: 'products',
    method: 'get',
    params: params
  })
}
export const product = (id, params) => {
  return axios({
    url: 'products/' + id,
    method: 'get',
    params: params
  })
}

export const productCategories = (params) => {
  return axios({
    url: 'product_categories',
    method: 'get',
    params: params
  })
}
export const productCategoryTree = (params) => {
  return axios({
    url: 'product_category_trees',
    method: 'get',
    params: params
  })
}
export const productCategory = (id, params) => {
  return axios({
    url: 'product_categories/' + id,
    method: 'get',
    params: params
  })
}

export const storeMsg = (data) => {
  // 请求刷新接口
  return axios({
    url: 'messages',
    method: 'POST',
    data: data
  })
}
export const articles = (params) => {
  return axios({
    url: 'articles',
    method: 'get',
    params: params
  })
}
export const article = (id, params) => {
  return axios({
    url: 'articles/' + id,
    method: 'get',
    params: params
  })
}
export const samples = (params) => {
  return axios({
    url: 'samples',
    method: 'get',
    params: params
  })
}
export const sample = (id, params) => {
  return axios({
    url: 'samples/' + id,
    method: 'get',
    params: params
  })
}

// 默认全部导出
// 根据需要进行
export default {
  products,
  product,
  productCategory,
  productCategories,
  productCategoryTree,
  article,
  articles,
  samples,
  sample,
  storeMsg
}

