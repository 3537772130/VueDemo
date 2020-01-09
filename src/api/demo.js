import request from '@/utils/request'

export function page(data) {
  return request({
    url: '/demo/page',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: '/demo/save',
    method: 'post',
    data
  })
}
