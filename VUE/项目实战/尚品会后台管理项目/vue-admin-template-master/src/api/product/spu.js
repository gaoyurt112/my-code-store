//平台属性管理模块请求文件
import request from "@/utils/request";

//获取spu列表的接口
///admin/product/{page}/{limit} get page,limit,category3id
export const reqgetSpuList = (page, limit, category3Id) =>
  request({
    url: `/admin/product/${page}/${limit}`,
    method: "get",
    params: { category3Id },
  });

//获取spu基本信息
// /admin/product/getSpuById/{spuId}
export const reqSpu = (spuId) =>
  request({ url: `/admin/product/getSpuById/${spuId}`, method: "get" });

//获取品牌信息数据
// /admin/product/baseTrademark/getTrademarkList  get
export const reqTradeMarkList = () =>
  request({
    url: "/admin/product/baseTrademark/getTrademarkList",
    method: "get",
  });

//获取图片数据
// /admin/product/spuImageList/{spuId} get
export const reqSpuImageList = (spuId) =>
  request({ url: `/admin/product/spuImageList/${spuId}`, method: "get" });

//获取平台全部销售属性 一共三个
// /admin/product/baseSaleAttrList
export const reqbaseSaleAttrList = () =>
  request({ url: "/admin/product/baseSaleAttrList", method: "get" });

//修改或添加spu：对于修改或添加，携带给服务器的参数大致是一样的，唯一的区别就是携带的参数是否带有id
export const reqAddOrUpdateSpu = (spuInfo) => {
  //修改，携带的参数带id
  if (spuInfo.id) {
    return request({
      url: "/admin/product/updateSpuInfo",
      method: "post",
      data: spuInfo,
    });
  } else {
    //添加，不带id
    return request({
      url: "/admin/product/saveSpuInfo",
      method: "post",
      data: spuInfo,
    });
  }
};

//删除spu的请求
export const reqDeleteSpu = (spuId) =>
  request({ url: `/admin/product/deleteSpu/${spuId}`, method: "delete" });

//获取销售属性列表
export const reqSpuSaleAttrList = (spuId) =>
  request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: "get" });

//获取平台属性的接口
///admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}  get
export const reqAttrInfoList = (category1Id, category2Id, category3Id) =>
  request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get",
  });

//添加sku
// /admin/product/saveSkuInfo post
export const reqAddSku = (skuInfo) => request({
  url: "/admin/product/saveSkuInfo",
  method: "post",
  data: skuInfo,
});

//获取sku数据列表的接口
//admin/product/findBySpuId/{spuId}
export const reqSkuList = (spuId) => request({
    url: `/admin/product/findBySpuId/${spuId}`,
    method: "get",
})
