import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },

  {
    path: '/index',
    name: 'index',
    meta: {title:'首页'},
    redirect: '/index/index',
    component: () => import('../views/index/index.vue'),
    children:[
      {
        path: '/index/index',
        name: '首页',
        meta: {title:'首页'},
        component: () => import('../views/index/index/index.vue'),
      },
      {
        path: '/index/login',
        name: 'login',
        component: () => import('../views/index/login.vue')
      },
      {
        path: '/index/about',
        name: 'about',
        component: () => import('../views/index/about.vue')
      },
      {
        path: '/index/detail/:id',
        name: 'detail',
        component: () => import('../views/index/detail.vue')
      },
    ]
  },
  
  {
    path: '/home',
    name: 'home',
    meta: {title:'admin首页'},
    redirect: '/home/index',
    component: () => import('../views/home/home.vue'),
    children:[
      {
        path: '/home/index',
        name: '首页',
        meta: {title:'首页'},
        component: () => import('../views/home/index/index.vue'),
      },
      {
        path: '/home/statis',
        name: '数据统计',
        meta: {title:'数据统计'},
        component: () => import('../views/home/statis/index.vue'),
      },
      {
        path: '/home/electron',
        name: '电子产品',
        meta: {title:'电子产品'},
        component: () => import('../views/home/electron/index.vue'),
      },
      {
        path: '/home/vcard',
        name: '显卡',
        meta: {title:'显卡'},
        component: () => import('../views/home/electron/vcard.vue'),
      },
    ]
  },
  {
    path: '/tour',
    name: 'tour',
    meta: {title:'旅游景点'},
    redirect: '/tour/index',
    component: () => import('../views/home/home.vue'),
    children:[
      {
        path: '/tour/index',
        name: '景点首页',
        meta: {title:'景点首页'},
        component: () => import('../views/home/tour/index.vue'),
      },
      {
        path: '/tour/list',
        name: '景点列表',
        meta: {title:'景点列表'},
        component: () => import('../views/home/tour/list.vue'),
      },
      {
        path: '/tour/add',
        name: '添加景点',
        meta: {title:'添加景点'},
        component: () => import('../views/home/tour/add.vue'),
      },
      
    ]
  },
  
  
]

const router = new VueRouter({
  routes
})

//路由拦截
router.beforeEach(function(to,from,next){
  if(!sessionStorage.getItem('username')){
    if(to.path !== '/index/login'){
      next('/index/login')
    }
  }
  next()
})

export default router
