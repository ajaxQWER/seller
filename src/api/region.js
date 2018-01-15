import ElementUI from 'element-ui'
import axios from 'axios';

var ajax = axios.create({
    baseURL: '//region.gongxiangdiancan.com', //测试
    headers: {},
    withCredentials: true, //cookie
    crossDomain: true //跨域
});

//添加一个响应拦截器
ajax.interceptors.response.use(function(res) {
    //在这里对返回的数据进行处理
    if (!res.data.status) {
        ElementUI.Message.error({
            message: res.data.message,
            type: 'error'
        });
        throw new Error(res.data.message);
    }

    return (res.data.data ? res.data.data : res.data.status);
}, function(err) {
    console.error(err);
    ElementUI.Message.error({
        message: '网络错误,请稍后再试!',
        type: 'error'
    });
    //Do something with response error
    return Promise.reject(err);
})

//获取省列表
export const getProvinceList = () => {
    return ajax.get('commons/region/province');
};
//获取市列表
export const getAllCityList = () => {
    return ajax.get('commons/region/city');
};
//获取区列表
export const getDistrictList = cityId => {
    return ajax.get('commons/region/area/' + cityId);
};
//根据省id获取市列表
export const getCityListByProvinceId = provinceId => {
    return ajax.get('commons/region/city/' + provinceId);
};
