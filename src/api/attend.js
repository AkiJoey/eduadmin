import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/attend/getAttendInfo/0/100',
    method: 'get',
    params
  })
}
