import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    name: '@csentence(5, 15)',
    college: '@csentence(4, 8)',
    subject: '@csentence(4, 8)',
    'type|1': ['课堂练习', '自主练习'],
    author: '@cname',
    time: '@datetime',
    'status|1': ['开放', '未开放', '已完成'],
    grade: '@integer(60, 100)'
  }]
})

export default [
  {
    url: '/test/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
