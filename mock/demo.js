export default [
  {
    url: '/demo/page',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        success: true,
        result: {
          totalCount: 30,
          dataSource: [
            { name: '钢铁侠', age: 10 },
            { name: '猪猪侠', age: 20 }
          ]
        }
      }
    }
  },
  {
    url: '/demo/save',
    type: 'post',
    response: _ => {
      return {
        code: 'S0000',
        message: '保存成功',
        success: true,
        result: null
      }
    }
  }
]
