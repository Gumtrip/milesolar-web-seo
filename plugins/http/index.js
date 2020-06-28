'use strict'
// import axios from './api'
import axios from 'axios'
import config from '@/plugins/http/config'
import qs from 'qs' // 序列化请求数据，视服务端的要求

/* 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 *
 */
const instance = axios.create({
  baseURL: config.baseURL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json;charset=UTF-8'
  },
  responseType: 'json',
  paramsSerializer: function(params) {
    return qs.stringify(params, { arrayFormat: 'brackets' })
  }
}
)
// 单独倒出
export const verificationCodes = data => {
  return instance({
    url: 'verificationCodes',
    method: 'POST',
    data: data

  })
}
export const getCaptcha = () => {
  return instance({
    url: 'getCaptcha',
    method: 'POST'
  })
}
export const register = data => {
  return instance({
    url: 'auth/register',
    method: 'POST',
    data: data
  })
}
export const login = data => {
  return instance({
    url: 'auth/login',
    method: 'POST',
    data: data
  })
}
export const loginViaCode = data => {
  return instance({
    url: 'auth/loginViaCode',
    method: 'POST',
    data: data
  })
}
export const logout = () => {
  return instance({
    url: 'auth/logout',
    method: 'delete'
  })
}
export const userMe = () => {
  return instance({
    url: 'user/me',
    method: 'post',
    data: {
      mustAuth: true
    }
  })
}
export const userUpdate = data => {
  return instance({
    url: 'user/update',
    method: 'put',
    data: data
  })
}
export const userPasswordReset = data => {
  return instance({
    url: 'user/passwordReset',
    method: 'put',
    data: data
  })
}

export const products = (params) => {
  return instance({
    url: 'products',
    method: 'post',
    params: params
  })
}
export const product = (id, params) => {
  return instance({
    url: 'products/' + id,
    method: 'post',
    params: params
  })
}

export const productCategories = (params) => {
  return instance({
    url: 'product_categories',
    method: 'get',
    params: params
  })
}
export const productCategoryTree = (params) => {
  return instance({
    url: 'product_category_trees',
    method: 'get',
    params: params
  })
}
export const productCategory = (id, params) => {
  return instance({
    url: 'product_categories/' + id,
    method: 'get',
    params: params
  })
}

export const storeMsg = (data) => {
  // 请求刷新接口
  return instance({
    url: 'messages',
    method: 'POST',
    data: data
  })
}
export const articles = (params) => {
  return instance({
    url: 'articles',
    method: 'get',
    params: params
  })
}
export const article = (id, params) => {
  return instance({
    url: 'articles/' + id,
    method: 'get',
    params: params
  })
}
export const samples = (params) => {
  return instance({
    url: 'samples',
    method: 'get',
    params: params
  })
}
export const sample = (id, params) => {
  return instance({
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

