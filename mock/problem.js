import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    chapter: '@integer(1, 12)',
    'type|1': ['选择题', '填空题', '简答题'],
    title: '@csentence(30, 100)'
  }]
})

export default [
  {
    url: '/problem/list',
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
