import Ysl from '../views/Ysl.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Detail from '../views/Detail.vue'
import Comment from '../views/Comment.vue'
import CashDelivery from '../views/CashDelivery.vue'
import OnPay from '../views/OnPay.vue'
import SendTime from '../views/SendTime.vue'


export default [
    {
        //圣罗兰界面
        path: '/ysl',
        name: 'ysl',
        component: Ysl
    },{
        // 登录界面
        path: '/lg',
        name: 'lg',
        component: Login

    },{
        // 用户名登录
        path: '/login1',
        name: 'login1'
    },{
        // 手机验证登录
        path: 'login2',
        name: 'login2'
    },
    {
        // 注册界面
        path: '/rg',
        name: 'rg',
        component: Register
    },{
        // 注册时判断手机号是否存在
        path: 'isPhone',
        name: 'isPhone'
    },{
        // 商品详情
        path: '/detail',  //"/detail/ + article.id"
        name: 'detail',
        component: Detail
    },{
        // 评论页面
        path: '/comment',
        name: 'comment',
        component: Comment,
        meta: {
            auth: true
        }
    },
    {
        // CashDelivery 货到付款
        path: '/CashDelivery',
        name: 'CashDelivery',
        component: CashDelivery
    },{
        // OnPay 在线支付
        path: '/OnPay',
        name: 'OnPay',
        component: OnPay
    },{
        // SendTime 配送时间
        path: '/SendTime',
        name: 'SendTime',
        component: SendTime
    }

    /*
    * meta: {
        auth: true
      }
    * */
]