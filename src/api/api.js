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
export const updateBonusById = (id,params) => {
    return ajax.post('seller/coupon/' + id, params);
//查询商品分类列表
export const getGoodsCategory = params => {
    return ajax.get('/seller/goodsCategory', params);
};
//添加商品分类
export const addGoodsCategory = params => {
    return ajax.put('/seller/goodsCategory', params);
};
//删除商品分类
export const deleteGoodsCategoryById = goodsCategoryId => {
    return ajax.delete('/seller/goodsCategory/' + goodsCategoryId);
}
