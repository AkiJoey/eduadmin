import request from '@/utils/request'

export function getAllSubject(params) {
  return request({
    url: '/question/getOneSchoolSubjects/' + params + '/1/100',
    method: 'get',
    params
  })
}
