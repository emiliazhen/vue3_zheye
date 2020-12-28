import fetch from '@/utils/fetch'
interface IdStringParamsInterface {
  id: string;
}
// 用户 - 登录;
export const API_USER_LOGIN = (parameters = {}) => {
  return fetch({
    url: '/api/user/login',
    method: 'post',
    data: parameters
  })
}
// 用户 - 注册;
export const API_USER_CREATE = (parameters = {}) => {
  return fetch({
    url: '/api/users',
    method: 'post',
    data: parameters
  })
}
// 用户 - 获取登录信息;
export const API_USER_CURRENT = (parameters = {}) => {
  return fetch({
    url: '/api/user/current',
    method: 'get',
    params: parameters
  })
}
// 用户 - 更新用户信息;
export const API_USER_UPDATE = (parameters: IdStringParamsInterface) => {
  return fetch({
    url: `/api/user/${parameters.id}`,
    method: 'patch',
    data: parameters
  })
}
// 专栏 - 列表;
export const API_COLUMN_GETS = (parameters = {}) => {
  return fetch({
    url: '/api/columns',
    method: 'get',
    params: parameters
  })
}
// 专栏 - 详情;
export const API_COLUMN_GET = (parameters: IdStringParamsInterface) => {
  return fetch({
    url: `/api/columns/${parameters.id}`,
    method: 'get',
    params: parameters
  })
}
// 专栏 - 更新;
export const API_COLUMN_UPDATE = (parameters: IdStringParamsInterface) => {
  return fetch({
    url: `/api/columns/${parameters.id}`,
    method: 'patch',
    data: parameters
  })
}
// 文章 - 新建;
export const API_POST_CREATE = (parameters = {}) => {
  return fetch({
    url: '/api/posts',
    method: 'post',
    data: parameters
  })
}
// 文章 - 详情;
export const API_POST_GET = (parameters: IdStringParamsInterface) => {
  return fetch({
    url: `/api/posts/${parameters.id}`,
    method: 'get',
    params: parameters
  })
}
// 文章 - 更新;
export const API_POST_UPDATE = (parameters: IdStringParamsInterface) => {
  return fetch({
    url: `/api/posts/${parameters.id}`,
    method: 'patch',
    data: parameters
  })
}
// 文章 - 删除;
export const API_POST_DELETE = (parameters: IdStringParamsInterface) => {
  return fetch({
    url: `/api/posts/${parameters.id}`,
    method: 'delete',
    data: parameters
  })
}
// 文章 - 专栏文章列表;
export const API_POST_COLUMNS_GETS = (parameters: IdStringParamsInterface) => {
  return fetch({
    url: `/api/columns/${parameters.id}/posts`,
    method: 'get',
    params: parameters
  })
}
// 文章 - 新建;
export const API_FILE_UPLOAD = (parameters = {}) => {
  return fetch({
    url: '/api/upload',
    method: 'post',
    data: parameters,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
