//这个模块主要获取的是品牌管理的数据的模块
import request from '@/utils/request'
//获取品牌列表接口
///admin/product/baseTrademark/{page}/{limit}  需要给服务器带两个参数，一个是当前页码page 一个是每页记录数
export const reqTradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' });

//添加品牌的操作
// /admin/product/baseTrademark/save  ‘post’ 参数： 品牌名称，品牌logo  "logoUrl": "string","tmName": "string"
//切记：对于新增的品牌，给服务器传递数据，不需要传递id,id是由服务器生成


//修改品牌的操作
///admin/product/baseTrademark/update   put  参数： id 品牌名称，品牌logo  "id": 0 "logoUrl": "string","tmName": "string"
//切记，对于修改一个品牌的操作，前端携带的参数需要带上id，你需要告诉服务器修改的是那一个品牌

export const reqAddOrUpdateTradeMarkList = (tradMark) => {
    //如果带给服务器的参数携带id-----修改
    if (tradMark.id) {
        return request({ url: `/admin/product/baseTrademark/update`, method: 'put', data: tradMark })
    } else {
        //新增品牌
        return request({ url: `/admin/product/baseTrademark/save`, method: 'post', data: tradMark })
    }
};


//删除品牌的接口
///admin/product/baseTrademark/remove/{id}  delete 参数id
export const reqDeleteTradMark = (id) => request({ url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete' });