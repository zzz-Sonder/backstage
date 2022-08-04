import request from '@/utils/request';

//获取SPU列表数据的接口
// /admin/product/{page}/{limit}     get   page limit category3Id

export const reqSpuList = (page, limit, category3Id) => request({
    url: `/admin/product/${page}/${limit}`,
    method: 'get',
    params: { category3Id }
});

// 获取spuid
export const reqSpu = (spuId) => request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: 'get',
});

// 获取品牌信息
export const reqTradeMarkList = () => request({
    url: `/admin/product/baseTrademark/getTrademarkList`,
    method: 'get'
});

// 获取品牌图片
export const reqSpuImageList = (spuId) => request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get',
});

// 获取全部销售属性 最多三个
export const reqBaseSaleAttrList = () => request({
    url: `/admin/product/baseSaleAttrList`,
    method: 'get',
});


//修改SPU||添加SPU：对于修改或者添加，携带给服务器参数大致一样的，唯一的区别就是携带的参数是否带id 
export const reqAddOrUpdateSpu = (spuInfo) => {
    if (spuInfo.id) {
        return request({
            url: `/admin/product/updateSpuInfo`,
            method: 'post',
            data: spuInfo
        })
    } else {
        //携带的参数不带id---添加SPU
        return request({
            url: '/admin/product/saveSpuInfo',
            method: 'post',
            data: spuInfo
        });
    }
}

//删除SPU
///admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) => request({
    url: `/admin/product/deleteSpu/${spuId}`,
    method: 'delete'
});


//获取图片的数据
///admin/product/spuImageList/{spuId}  get
export const reqSpuImageLIst = (spuId) => request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
});


//获取销售属性的数据
///admin/product/spuSaleAttrList/{spuId}  get
export const reqSpuSaleAttrList = (spuId) => request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: 'get'
});


//获取平台属性的数据
//GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} 
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
});


//添加SKU
///admin/product/saveSkuInfo  post
export const reqAddSku = (skuInfo) => request({
    url: '/admin/product/saveSkuInfo', method: 'post',
    data: skuInfo
});


//获取SKU列表数据的接口
//GET /admin/product/findBySpuId/{spuId}  
export const reqSkuList = (spuId) => request({
    url: `/admin/product/findBySpuId/${spuId}`,
    method: 'get'
});
