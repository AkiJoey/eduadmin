import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/test/list',
    method: 'get',
    params
  })
}
