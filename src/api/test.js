import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/exam/getAllExaminfos',
    method: 'get',
    params
  })
}
