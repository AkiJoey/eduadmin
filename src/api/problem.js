import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/problem/list',
    method: 'get',
    params
  })
}
