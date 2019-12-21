import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: /^1[385][1-9]\d{8}/,
    name: '@cname',
    college: '@csentence(4, 8)',
    major: '@csentence(4, 8)',
    class: '@csentence(6, 12)'
  }]
})

export default [
  {
    url: '/student/list',
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
