import request from '@/utils/request'

///admin/product/get/category1 一级分类地址
export const reqCategory1List = () => request({
    url: '/admin/product/getCategory1',
    method: "get"
})

///admin/product/get/category2/{id} 二级
export const reqCategory2List = (category1Id) => request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: "get"
})
///admin/product/get/category3/{id} 二级
export const reqCategory3List = (category2Id) => request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: "get"
})
