//平台属性管理模块请求文件
import request from '@/utils/request'

//获取商品sku列表的请求
///admin/product/list/{page}/{limit} get
export const reqSkuList = (page,limit) => request({url:`/admin/product/list/${page}/${limit}`,method:'get'})

//上架的请求
///admin/product/onSale/{skuId} get
export const reqOnSale = (skuId) => request({url:`/admin/product/onSale/${skuId}`,method:'get'})

//下架的请求
///admin/product/cancelSale/{skuId} get
export const reqCancelSale = (skuId) => request({url:`/admin/product/cancelSale/${skuId}`,method:'get'})

//获取sku详情的请求
//admin/product/getSkuById/{skuId}
export const reqSkuInfo = (skuId) => request({url:`/admin/product/getSkuById/${skuId}`,method:'get'})
