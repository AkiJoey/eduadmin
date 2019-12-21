import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/university/getAllUserDetails/1/30',
    method: 'get',
    params
  })
}
