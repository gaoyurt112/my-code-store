//引入登录|退出|获取用户信息的接口函数
import { login, logout, getInfo } from '@/api/user'
//获取token|设置token|删除token的函数
import { getToken, setToken, removeToken } from '@/utils/auth'
//路由模块中重置路由的方法
import { anyRoutes, resetRouter , asyncRoutes ,constantRoutes} from '@/router'
//引进router
import router from '@/router'

const getDefaultState = () => {
    return {
        //获取token
        token: getToken(),
        //存储用户名
        name: '',
        //存储用户头像
        avatar: '',
        //服务器返回的菜单信息【根据不同的角色，返回的标记信息，数组里面的元素是字符串】
        routes:[],
        roles:[],
        buttons:[],
        //对比之后【项目中已有的异步路由，与服务器返回的标记信息进行对比最终需要展示的路由】
        resultAsyncRoutes:[],
        resultAllRoutes:[]
    }
}

const state = getDefaultState()

const mutations = {
    //重置state
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    //存储token
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    //存储用户信息
    SET_USERINFO:(state,userInfo)=>{
       state.name = userInfo.name
       state.avatar = userInfo.avatar
       state.routes = userInfo.routes
       state.buttons = userInfo.buttons
       state.roles = userInfo.roles
    },
    //最终计算出的异步路由
    SET_RESULTASYNCROUTES:(state,asyncRoutes)=>{
        state.resultAsyncRoutes = asyncRoutes;
        //计算出当前用户需要展示的所有路由
       state.resultAllRoutes = constantRoutes.concat(state.resultAsyncRoutes,anyRoutes)
       //给路由器添加新的路由
       router.addRoutes(state.resultAllRoutes)
    }
}

//定义一个函数，两个数组进行对比，对比出当前用户到底显示哪些异步路由
const computedAsyncRoutes = (asyncRoutes,routes)=>{
    // console.log(asyncRoutes,1111);
    // console.log(routes,2222);
    //过滤出当前用户【超级管理员|普通员工】需要展示的异步路由
    return asyncRoutes.filter(item=>{
        // console.log(item);
        //数组当中没有这个元素返回索引值-1,如果有这个元素返回的索引值不一定是-1
        if(routes.indexOf(item.name) != -1){
            //递归：别忘记还有2，3，4，5级路由
            if(item.children&&item.children.length){
               item.children = computedAsyncRoutes(item.children,routes)
            }
            return true
        }
    })
}



const actions = {
    // user login
    //这里处理用户登录业务
    async login({ commit }, userInfo) {
        //解构出用户名与密码
        const { username, password } = userInfo;
        let result = await login({ username: username.trim(), password: password });
        //注意当前登录请求使用的是mock数据，mock数据的code是20000
        if (result.code == 20000) {
            //vuex存储token
            commit('SET_TOKEN', result.data.token)
            //本地持久化token
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }

        //     return new Promise((resolve, reject) => {
        //         login({ username: username.trim(), password: password }).then(response => {
        //             const { data } = response
        //             commit('SET_TOKEN', data.token)
        //             setToken(data.token)
        //             resolve()
        //         }).catch(error => {
        //             reject(error)
        //         })
        //     })
    },

    // get user info
    //获取用户信息
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                //获取用户信息，返回数据包括用户名，用户头像，routes[返回的标志：不同的用户应该展示哪些菜单的标志]，roles(用户角色信息),buttons:[按钮信息，按钮权限用的标记]
                const { data } = response
                // console.log(data);
                commit('SET_USERINFO',data)
                commit('SET_RESULTASYNCROUTES',computedAsyncRoutes(asyncRoutes,data.routes))
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                removeToken() // must remove  token  first
                resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}