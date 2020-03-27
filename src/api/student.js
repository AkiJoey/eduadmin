import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/student/list',
    method: 'get',
    params
  })
}
