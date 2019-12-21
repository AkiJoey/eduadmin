import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/university/allClassDetails/1/100',
    method: 'get',
    params
  })
}
