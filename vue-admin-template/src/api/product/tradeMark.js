//主要获取品牌管理的数据模块
import request from '@/utils/request'
//获取品牌列表接口
///admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page,limit)=>{
    return request({
        url:`/admin/product/baseTrademark/${page}/${limit}`,
        method:'get'
    })
}

//处理相关品牌的操作
// /admin/product/baseTrademark/save   post  参数(品牌名称，logo)
// 新增的品牌 不需要传递id 由服务器生成


// /admin/product/baseTrademark/update  put   参数(id，品牌名称，logo)
// 告诉服务器修改哪个品牌（id）

export const reqAddOrUpdateTradeMark = (tradeMark)=>{
    if(tradeMark.id){
        return request({
            url:`/admin/product/baseTrademark/update`,
            method:'put',
            data:tradeMark
        })
    }else{
        return request({
            url:`/admin/product/baseTrademark/save`,
            method:'post',
            data:tradeMark
        })
    }
}

// 删除
// /admin/product/baseTrademark/remove/{id}

export const reqDeleteTradeMark = (id)=>{
    return request({
        url:`/admin/product/baseTrademark/remove/{id}`,
        method:'delete'
    })
}