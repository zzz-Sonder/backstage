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
///admin/product/get/category3/{id} 三级
export const reqCategory3List = (category2Id) => request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: "get"
})

// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} 平台属性信息
export const reqAttrList = (category1Id, category2Id, category3Id) => request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
})

// /admin/product/saveAttrInfo 添加属性与属性值
export const reqAddOrUpdateAttr = (data) => request({
    url: `/admin/product/saveAttrInfo`,
    method: 'post',
    data
})

//  {
//     "attrName": "string",
//     "attrValueList": [
//       {
//         "attrId": 0,
//         "id": 0,
//         "valueName": "string"
//       }
//     ],
//     "categoryId": 0,
//     "categoryLevel": 0,
//     "id": 0
//   }