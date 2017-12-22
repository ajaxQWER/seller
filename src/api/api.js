import ElementUI from 'element-ui'
import axios from 'axios';

// console.log(process.env)
var ajax = axios.create({
    baseURL: process.env.BASE_URL, //根据环境选择地址
    headers: {},
    timeout: 10000, //超时设置
    withCredentials: true, //cookie
    crossDomain: true //跨域
});
//添加一个请求拦截器
ajax.interceptors.request.use(function(config) {
    //在请求发出之前进行一些操作
    if (localStorage.getItem('jwt')) {
        config.headers.TOKEN = localStorage.getItem('jwt');
    }
    return config;
}, function(err) {
    console.error(err);
    ElementUI.Message.error({
        message: '请求发生错误,请稍后再试!',
        type: 'error'
    });
    //Do something with request error
    return Promise.reject(err);
});
//添加一个响应拦截器
ajax.interceptors.response.use(function(res) {
    //在这里对返回的数据进行处理
    if (!res.data.status) {
        ElementUI.Message.error({
            message: res.data.message,
            type: 'error'
        });
        if (res.data.errorCode == 401) {
            console.log('请登录')
            location.href = '/login'
        }
        throw new Error(res.data.message);
    }

    return (res.data.data ? res.data.data : res.data.status);
}, function(err) {
    console.error(err);
    ElementUI.Message.error({
        message: '响应发生错误,请稍后再试!',
        type: 'error'
    });
    //Do something with response error
    return Promise.reject(err);
});

//商家登录
export const userLogin = params => {
    return ajax.post('seller/seller/loginByCode', params);
};
//获取验证码
export const getPhoneCode = phoneNumber => {
    return ajax.post('commons/phoneCode/' + phoneNumber);
};
//首页数据
export const getRealtimestatistics = params => {
    return ajax.get('seller/realtimestatistics', params);
};
//获取订单列表
export const getOrderList = params => {
    return ajax.get('seller/order/', params);
};
//获取订单详情
export const getOrderById = orderId => {
    return ajax.get('seller/order/' + orderId);
};
//取消订单
export const cancelOrderById = params => {
    return ajax.put('seller/order/orderCancel', params);
};
//店铺总评
export const getShopAppraiseHead = () => {
    return ajax.get('seller/shopAppraise/shopAppriseStatistics');
};
//店铺评价
export const getShopAppraise = params => {
    return ajax.get('seller/shopAppraise', params);
};
//店家回复
export const commentReply = params => {
    return ajax.put('seller/reply', params);
};
//通知中心
export const getNoticeLists = params => {
    return ajax.get('seller/notice', params);
};
//删除某条通知
export const deleteNoticeById = id => {
    return ajax.delete('seller/notice/' + id);
};
//获取红包列表
export const getBonusLists = params => {
    return ajax.get('seller/coupon', params);
};
//添加红包
export const addBonus = params => {
    return ajax.put('seller/coupon', params);
};
//删除红包
export const deleteBonusById = id => {
    return ajax.delete('seller/coupon/' + id);
};
//查询红包详情
export const getBonusById = id => {
    return ajax.get('seller/coupon/' + id);
};
//编辑红包
export const updateBonusById = (params) => {
    return ajax.post('seller/coupon/' + params.couponId, params);
}


//查询商品分类列表
export const getGoodsCategory = params => {
    return ajax.get('/seller/goodsCategory', params);
}

//添加商品分类
export const addGoodsCategory = params => {
    return ajax.put('seller/goodsCategory', params);
};
//删除商品分类
export const deleteGoodsCategoryById = goodsCategoryId => {
    return ajax.delete('/seller/goodsCategory/' + goodsCategoryId);
}
//商品分类
export const getGoodsCategoryLists = params => {
    return ajax.get('seller/goodsCategory', params);
};
//获取商品列表
export const getGoodsLists = params => {
    return ajax.get('seller/goods', params);
};
//删除商品
export const deleteGoodsById = id => {
    return ajax.delete('seller/goods/' + id);
};
//下架商品
export const soldOutGoods = paramas => {
    return ajax.post('seller/goods/soldOut', paramas);
};
//上架商品
export const putAwayGoods = paramas => {
    return ajax.post('seller/goods/putaway', paramas);
};
//查询商品详情
export const getGoodsById = id => {
    return ajax.get('seller/goods/' + id);
};
//修改商品
export const updateGoodsById = (goodsId,params) => {
    return ajax.post('seller/goods/' + goodsId, params);
};
//添加商品
export const addGoods = params => {
    return ajax.put('seller/goods', params);
};
//编辑商品分类
export const updateGoodsCategoryById = params => {
    return ajax.post('seller/goodsCategory/' + params.goodsCategoryId , params);
};
//获取商品分类详情
export const getGoodsCategoryDetail = goodsCategoryId => {
    return ajax.get('seller/goodsCategory/' + goodsCategoryId);
};
//文件上传 前台文件需要设置一个path属性
export const uploadFiles = params => {
    return ajax.post('commons/upload' + params.path, params);
};
//获取打印机列表
export const getPrinterLists = params => {
    return ajax.get('seller/printer', params);
};
//获取打印机详情
export const getPrinterById = printerId => {
    return ajax.get('seller/printer/' + printerId);
};
//添加打印机
export const addPrinter = params => {
    return ajax.put('seller/printer', params);
};
//删除打印机
export const deletePrinterById = printerId => {
    return ajax.delete('seller/printer/' + printerId);
};
//编辑打印机
export const updatePrinter = (params) => {
    return ajax.post('seller/printer/' + params.printerId, params);
};
//获取活动列表
export const getActivity = params => {
    return ajax.get('seller/activity', params);
};
//删除活动列表
export const deleteActivity = activityId => {
    return ajax.delete('seller/activity/' + activityId);
};
//添加活动列表
export const addActivity = params => {
    return ajax.put('seller/activity/' , params);
};
//查询活动详情
export const getActivityDetails = activityId => {
    return ajax.get('seller/activity/' + activityId);
};
//修改活动内容
export const updateActivityDetails = params => {
    return ajax.post('seller/activity/' + params.activityId , params);
};
