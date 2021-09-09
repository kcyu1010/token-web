import request from '@/utils/request'

export function getUserByName(params) {
  return request({
    url: '/token/'+params,
    method: 'get'
  })
}

export function updateToken(data) {
  return request({
    url: '/token/updateToken',
    method: 'post',
    data
  })
}
