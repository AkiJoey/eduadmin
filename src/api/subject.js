import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/question/getAllSubjects/1/100',
    method: 'get',
    params
  })
}
