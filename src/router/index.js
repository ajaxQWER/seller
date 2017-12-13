const NotFound = r => require.ensure([],() => r(require('../views/404.vue')), 'NotFound');
const Login = r => require.ensure([],() => r(require('../views/Login.vue')), 'Login');
const Home = r => require.ensure([],() => r(require('../views/Home.vue')), 'Home');
const Index = r => require.ensure([],() => r(require('../views/Index.vue')), 'Index');
const Goods = r => require.ensure([],() => r(require('../views/Goods.vue')), 'Goods');
const Order = r => require.ensure([],() => r(require('../views/Order.vue')), 'Order');
let routes = [{
    path: '/login',
    component: Login,
    name: '',
    hidden: true
}, {
    path: '/404',
    component: NotFound,
    name: '404',
    hidden: true
}, {
    path: '/',
    component: Home,
    redirect: '/index',
    name: '',
    hidden: true
},  {
    path: '/',
    component: Home,
    leaf: true, //只有一个节点
    iconCls: 'fa fa-home',
    children: [
        { path: '/index', component: Index, name: '首页' }
    ]
}, {
    path: '/',
    component: Home,
    name: '',
    leaf: true, //只有一个节点
    iconCls: 'fa fa-shopping-bag',
    children: [
        { path: '/rider', component: Goods, name: '商品' }
    ]
},
{
    path: '/',
    component: Home,
    name: '',
    leaf: true, //只有一个节点
    iconCls: 'fa fa-shopping-cart',
    children: [
        { path: '/order', component: Order, name: '订单' },
    ]
},
 // {
//     path: '/',
//     component: Home,
//     name: '店铺管理',
//     iconCls: 'fa fa-shopping-bag', //图标样式class
//     children: [ {
//         path: '/shopAuditLogs',
//         component: ShopAuditLogs,
//         name: '审核日志'
//     }, {
//         path: '/shopAuditDetail',
//         component: ShopAuditDetail,
//         name: '店铺审核详情',
//         hidden: true
//     }]
// },
{
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
}];

export default routes;
