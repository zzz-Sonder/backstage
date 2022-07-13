import request from '@/utils/request'

export function getList(params) {
    return request({
        // url: '/vue-admin-template/table/list',
        url: '/admin/acl/index/menu',
        method: 'get',
        params
    })
}