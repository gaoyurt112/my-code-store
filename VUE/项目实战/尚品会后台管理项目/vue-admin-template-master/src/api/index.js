//将四个模块请求的接口函数统一暴漏
import * as trademark from './product/tradeMark'
import * as attr from './product/attr'
import * as sku from './product/sku'
import * as spu from './product/spu'


//引入权限相关的接口问文件
import * as permission from './acl/permission'
import * as role from './acl/role'
import * as user from './acl/user'
export default {
    trademark,
    attr,
    sku,
    spu,
    permission,
    role,
    user
}