
const NotFound = r => require.ensure([],() => r(require('../views/404.vue')), 'NotFound'); //404
const Login = r => require.ensure([],() => r(require('../views/Login.vue')), 'Login'); //登录
const Home = r => require.ensure([],() => r(require('../views/Home.vue')), 'Home'); //Home
const Index = r => require.ensure([],() => r(require('../views/Index.vue')), 'Index'); //首页
const settleAccountsDetail = r => require.ensure([],() => r(require('../views/settleAccountsDetail.vue')), 'Index'); //首页
const Goods = r => require.ensure([],() => r(require('../views/Goods.vue')), 'Goods'); //商品
const editGoods = r => require.ensure([],() => r(require('../views/editGoods.vue')), 'editGoods'); //商品编辑
const Order = r => require.ensure([],() => r(require('../views/Order.vue')), 'Order'); //订单
const OrderDetail = r => require.ensure([],() => r(require('../views/OrderDetail.vue')), 'OrderDetail'); //订单详情
const Appraisement = r => require.ensure([],() => r(require('../views/Appraisement.vue')), 'Appraisement'); //评价
const BusinessAnalysis = r => require.ensure([],() => r(require('../views/BusinessAnalysis.vue')), 'BusinessAnalysis'); //营业分析
const ShopDetail = r => require.ensure([],() => r(require('../views/ShopDetail.vue')), 'ShopDetail'); //门店信息
const Activity = r => require.ensure([],() => r(require('../views/Activity.vue')), 'Activity'); //门店活动
const GoodsCategory = r => require.ensure([],() => r(require('../views/GoodsCategory.vue')), 'GoodsCategory'); //商品分类
const Setting = r => require.ensure([],() => r(require('../views/Setting.vue')), 'Setting'); //设置
const Notice = r => require.ensure([],() => r(require('../views/Notice.vue')), 'Notice'); //通知中心
const Bonus = r => require.ensure([],() => r(require('../views/Bonus.vue')), 'Bonus'); //红包设置
const Printer = r => require.ensure([],() => r(require('../views/Printer.vue')), 'Printer'); //打印机设置
const aptitude = r => require.ensure([],() => r(require('../views/aptitude.vue')), 'aptitude '); //资质
const SettlementList = r => require.ensure([],() => r(require('../views/SettlementList.vue')), 'aptitude '); //对账单
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
},
    {
    path: '/',
    component: Home,
    leaf: true, //只有一个节点
    iconCls: 'i-icon i-icon-shouye',
    children: [
        { path: '/index', component: Index, name: '首页' },
        { path: '/settleAccountsDetail', component: settleAccountsDetail, name: '结算明细' }
    ]
},
    {
    path: '/',
    component: Home,
    name: '',
    leaf: true, //只有一个节点
    iconCls: 'i-icon i-icon-shangpin',
    children: [
        { path: '/goods', component: Goods, name: '商品' },
        { path: '/editGoods', component: editGoods, name: '商品编辑' }
    ]
}, {
    path: '/',
    component: Home,
    name: '',
    leaf: true, //只有一个节点
    iconCls: 'i-icon i-icon-dingdan',
    children: [
        { path: '/order', component: Order, name: '订单' },
        { path: '/OrderDetail', component: OrderDetail, name: '订单详情' },
    ]

}, {
    path: '/',
    component: Home,
    name: '',
    leaf: true, //只有一个节点
    iconCls: 'i-icon i-icon-pingjia',
    children: [
        { path: '/appraisement', component: Appraisement, name: '评价' },
    ]
}, {
    path: '/',
    component: Home,
    name: '',
    leaf: true, //只有一个节点
    iconCls: 'i-icon i-icon-yingyefenxi',
    children: [
        { path: '/businessAnalysis', component: BusinessAnalysis, name: '营业分析' },
    ]
}, {
    path: '/',
    component: Home,
    name: '',
    leaf: true, //只有一个节点
    iconCls: 'i-icon i-icon-mendianxinxi',
    children: [
        { path: '/shopDetail', component: ShopDetail, name: '门店信息' },
    ]
}, {
    path: '/',
    component: Home,
    name: '',
    leaf: true, //只有一个节点
    iconCls: 'i-icon i-icon-huodong',
    children: [
        { path: '/activity', component: Activity, name: '门店活动' },
    ]
},
// {
//     path: '/',
//     component: Home,
//     name: '',
//     leaf: true, //只有一个节点
//     iconCls: 'i-icon i-icon-fenleishangpin',
//     children: [
//         { path: '/goodsCategory', component: GoodsCategory, name: '商品分类' },
//     ]
// }, 
{
    path: '/',
    component: Home,
    name: '',
    leaf: true, //只有一个节点
    iconCls: 'i-icon i-icon-shezhi',
    children: [
        // { path: '/setting', component: Setting, name: '设置' },
    ]
}, {
    path: '/',
    component: Home,
    name: '',
    leaf: true, //只有一个节点
    iconCls: 'i-icon i-icon-tongzhizhongxin',
    children: [
        { path: '/notice', component: Notice, name: '通知中心' },
    ]
}, {
    path: '/',
    component: Home,
    name: '',
    leaf: true, //只有一个节点
    iconCls: 'i-icon i-icon-hongbaoshezhi',
    children: [
        { path: '/bonus', component: Bonus, name: '红包设置' },
    ]
},
    {
    path: '/',
    component: Home,
    name: '',
    leaf: true, //只有一个节点
    iconCls: 'i-icon i-icon-dayinji',
    children: [
        { path: '/Printer', component: Printer, name: '打印机设置' },
    ]
},
    {
        path: '/',
        component: Home,
        name: '',
        leaf: true, //只有一个节点
        iconCls: 'i-icon i-icon-dayinji',
        children: [
            { path: '/SettlementList', component: SettlementList, name: '对账单' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        leaf: true, //只有一个节点
        iconCls: 'i-icon i-icon-shezhi',
        children: [
            { path: '/aptitude', component: aptitude, name: '资质' },
        ]
    },
    {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
}];

export default routes;
