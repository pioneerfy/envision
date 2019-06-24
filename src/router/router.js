import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import router_s from '../router/router-s.js'
import router_z from '../router/router-z.js'
import router_x from '../router/router-x.js'
import router_d from '../router/router-d.js'
import router_l from '../router/router-l.js'

Vue.use(Router)

const router= new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
          path: '/',
          name: 'home',
          component: Home
      },
      {
          path: '/refundQequest',
          name: 'refundQequest',
          component: () => import('../views/refundQequest.vue'),
          children:[
              {
                  path:"",
                  name:'refundQequest',
                  component:()=>import('../views/refundQuestDetail.vue'),
                  meta:{
                      auth:true
                  }
              },
              {
                  path:"refundWaitting",
                  name:'refundWaitting',
                  component:()=>import('../views/refundWaitting.vue'),
                  meta:{
                      auth:true
                  }
              },
          ]
      },
      {
          path: '/shopCart',
          name: 'shopCart',
          component: ()=>import('../views/shoppingCart.vue'),
          meta:{
              auth:true
          }
      },{
          path: '/order',
          name: 'order',
          component: ()=>import('../views/order.vue'),
          meta:{
              auth:true
          }
      },
      {
          path:'/pay',
          name:'pay',
          component:()=>import('../views/pay.vue'),
          meta:{
              auth:true
          }
      },
      {
          path:'/paySuccess',
          name:'paySuccess',
          component:()=>import('../views/paySuccess.vue'),
          meta:{
              auth:true
          }
      },
      {
          path:'/manage',
          name:'manage',
          component:()=>import('../views/manage.vue'),
          children:[
              {
                  path:'',
                  name:'backStage_Itemhome',
                  component:()=>import('../views/backStage_Itemhome.vue'),
                  meta: {
                      auth: true
                  }
              },
              {
                  path:'goodsList',
                  name:'goodsList',
                  component:()=>import('../components/manage/goodsList.vue')
              } ,
              {
                  path:'editGoods',
                  name:'editGoods',
                  component:()=>import('../components/manage/editGoods.vue')
              } ,
              {
                  path:'HOrder',
                  name:'h-Order',
                  component: () => import('../views/h-Order.vue')
              },
              {
                  path:'/dia',
                  name:'dia',
                  component: () => import('../views/dia.vue')
              },
              {
                  path:'/dia2',
                  name:'dia2',
                  component: () => import('../views/dia2.vue')
              },
              {
                  path:'/dia3',
                  name:'dia3',
                  component: () => import('../views/dia3.vue')
              },

              //评价管理
              {
                  path:'backStage_Itemevaluate',
                  name:'backStage_Itemevaluate',
                  component:()=>import('../views/backStage_Itemevaluate.vue')
              },
              //评论回复
              {
                  path:'comment_reply',
                  name:'comment_reply',
                  component:()=>import('../views/backStage_commentReply.vue')
              },
              //评论详情
              {
                  path:'comment_Info',
                  name:'comment_Info',
                  component:()=>import('../views/backStage_commentInfo.vue')
              },
              {
                  path:'changePwd',
                  name:'changePwd',
                  component:()=>import('../components/manage/changePwd.vue'),
                  meta: {
                      auth: true
                  }
              },
          ]
      },
      // 管理
      {
          path: '/help',
          name: 'help',
          component: () => import('../components/help.vue')
      },
      {
          path: '/findway',
          name: 'findway',
          component: () => import('../components/findway.vue')
      },
      {
          path: '/confirm',
          name: 'confirm',
          component: () => import('../components/confirm.vue')
      }
      ,
      {
          path: '/resetpw',
          name: 'resetpw',
          component: () => import('../components/resetpw.vue')
      }
      ,
      {
          path: '/setsuccess',
          name: 'setsuccess',
          component: () => import('../components/setsuccess.vue')
      }
      ,
      {
          path: '/chanel',
          name: 'chanel',
          component: () => import('../views/chanel.vue')
      }
      ,
      {
          path: '/armani',
          name: 'armani',
          component: () => import('../views/armani.vue')
      },
      // x
      {
          path: '/dior',
          name: 'dior',
          component: Dior
      },
      {
          path: '/search',
          name: 'search',
          component: searchPage
      },
      {
          path: '/loginReg',
          name: 'loginReg',
          component: loginReg
      },
      {
          path: '/howBuy',
          name: 'howBuy',
          component: singlepro
      },
      // z
      {
          path:'/point',
          name:'point',
          component: () => import('../views/point.vue')
      },
      {
          path:'/givenchy',
          name:'givenchy',
          component:() =>import('../views/givenchy.vue')
      },
      {
          path: '/account',
          name: 'account',
          component: Account,
          children:[
              {
                  path:'',
                  name:'userInfo',
                  component: userInfo,
                  meta:{
                      auth:true
                  }
              },
              {
                  path:'/personalInfo',
                  name:'personalInfo',
                  component: personalInfo,
                  meta:{
                      auth:true
                  }
              },
              {
                  path:'/accountSafe',
                  name:'accountSafe',
                  component:accountSafe,
                  meta:{
                      auth:true
                  }
              },
              {
                  path:'/myOrders',
                  name:'myOrders',
                  component:myOrders,
                  children:[
                      {
                          path:'',
                          name:'allOrders',
                          component: allOrders,
                          meta:{
                              auth:true
                          }
                      },
                      {
                          path:'/myOrders/orders1',
                          name:'orders1',
                          component: orders1,
                          meta:{
                              auth:true
                          }
                      },
                      {
                          path:'/myOrders/orders2',
                          name:'orders2',
                          component: orders2,
                          meta:{
                              auth:true
                          }
                      },
                      {
                          path:'/myOrders/orders3',
                          name:'orders3',
                          component: orders3,
                          meta:{
                              auth:true
                          }
                      },
                      {
                          path:'/myOrders/orders4',
                          name:'orders4',
                          component: orders4,
                          meta:{
                              auth:true
                          }
                      },
                      {
                          path:'/myOrders/orders5',
                          name:'orders5',
                          component: orders5,
                          meta:{
                              auth:true
                          }
                      },
                      {
                          path:'/myOrders/orders6',
                          name:'orders6',
                          component: orders6,
                          meta:{
                              auth:true
                          }
                      },
                  ]
              },
              {
                  path:'/refund',
                  name:'refund',
                  component:refund,
                  children:[
                      {
                          path:'',
                          name:'allRefund',
                          component: allRefund,
                          meta:{
                              auth:true
                          }
                      },
                      {
                          path:'/refund/refund1',
                          name:'refund1',
                          component: refund1,
                          meta:{
                              auth:true
                          }
                      },
                      {
                          path:'/refund/refund2',
                          name:'refund2',
                          component: refund2,
                          meta:{
                              auth:true
                          }
                      }
                  ]
              },
              {
                  path:'/foot',
                  name:'foot',
                  component:foot,
                  meta:{
                      auth:true
                  }
              },
              {
                  path:'/myAddress',
                  name:'myAddress',
                  component:myAddress,
                  meta:{
                      auth:true
                  }
              },
              {
                  path:'/myCous',
                  name:'myCous',
                  component:myCous,
                  meta:{
                      auth:true
                  }
              },
              {
                  path:'/fav',
                  name:'fav',
                  component:fav,
                  meta:{
                      auth:true
                  }
              }
          ]
      }
      ...router_d
  ]
})
router.beforeEach((to, from, next) => {
    let userinfo = localStorage.getItem('userinfo');

    if (to.meta.auth) { // 需要权限的
        if (userinfo) {
            next()
        } else {
            next('/lg') // 无权限回到登陆页
        }
    } else {
        next()
    }
});

export default router
