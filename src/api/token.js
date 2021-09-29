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

export function getHistory(name) {
  return request({
    url: '/historyTable/getHistoryByname/'+name,
    method: 'get'
  })
}

export function updateIsCheck(data) {
  return request({
    url: '/token/updateIsCheck',
    method: 'post',
    data
  })
}


export function verifyToken(token,who) {
  return request({
    url: '/token/verifyToken/'+token+'/'+who,
    method: 'get'
  })
}

export function addToken(data) {
  return request({
    url: '/token/save',
    method: 'post',
    data
  })
}

export function getAllToken() {
  return request({
    url: '/token/getAll',
    method: 'get'
  })
}

export function getRecordsRow() {
  return request({
    url: '/checkTable/getRecordsRow',
    method: 'get'
  })
}

export function getRecordsByName(data) {
  return request({
    url: '/checkTable/getRecordsByName/'+data,
    method: 'get'
  })
}
