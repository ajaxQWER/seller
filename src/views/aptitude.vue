<template>
    <div class="store">
        <el-row class="row store-content">
            <h2>店铺绑定手机号:{{loginPhoneNumber}}</h2>
            <el-form :model="store" :rules="rules" ref="store" label-width="100px">
                <el-form-item class="normal-item" label="店铺名称" prop="shopName">
                    <el-input v-model="store.shopName"></el-input>
                </el-form-item>
                <el-form-item class="small-item" label="联系电话" prop="takeOutPhone">
                    <el-input v-model="store.takeOutPhone"></el-input>
                </el-form-item>
                <el-form-item class="small-item" label="联系人姓名" prop="name">
                    <el-input v-model="store.name"></el-input>
                </el-form-item>
                <el-form-item label="店铺分类" class="required">
                    <el-select class="normal-item" v-model="store.shopCategoryIdList" multiple :multiple-limit="5" placeholder="请选择店铺分类">
                        <el-option v-for="item in shopCategory" :key="item.shopCategoryId" :label="item.shopCategoryName" :value="item.shopCategoryId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="营业时间" class="required">
                    <el-radio class="radio" v-model="isAllDay" label="true">全天</el-radio>
                    <el-radio class="radio" v-model="isAllDay" label="false">自定义</el-radio>
                    <span v-if="isAllDay=='false'">
        <el-time-select v-model="store.busBeginTime" placeholder="营业开始时间" prop="busBeginTime" :picker-options="{start: '00:00',end: '23:30',step: '00:30'}"></el-time-select>
        <el-time-select v-model="store.busEndTime" placeholder="营业结束时间" prop="busEndTime" :picker-options="{start: '00:00',end: '23:30',step: '00:30'}"></el-time-select>
          <b><span style="color:red;">*</span>店铺营业时间如未包含,请自行输入</b>
          </span>
                </el-form-item>
                <el-form-item label="店铺类型" class="required">
                    <el-radio-group v-model="store.shopType">
                        <el-radio class="radio" label="RESERVE">预定</el-radio>
                        <el-radio class="radio" label="TAKEOUT">外卖</el-radio>
                        <el-radio class="radio" label="RESERVE_TAKEOUT">预定加外卖</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="配送信息" class="required">
                    <el-radio-group v-model="store.distributionType">
                        <el-radio class="radio" label="ANUBIS">蜂鸟配送</el-radio>
                        <el-radio class="radio" label="SELF_DELIVERY_BY_MERCHANTS">商家自送</el-radio>
                    </el-radio-group>
                    <span v-if="store.distributionType == 'SELF_DELIVERY_BY_MERCHANTS'">
            配送距离 <el-input class="small-input fee" v-model="store.distributionScope" placeholder="配送距离"></el-input>米
            配送费 <el-input class="small-input fee" v-model="store.fee" placeholder="配送费"></el-input>元
          </span>
                </el-form-item>
                <el-form-item label="店铺位置" class="required">
                    <el-select v-model.number="store.provinceId" filterable placeholder="省" prop="type" @change="selectCity">
                        <el-option v-for="item in provinceList" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId">
                        </el-option>
                    </el-select>
                    <el-select v-model.number="store.cityId" filterable placeholder="市" prop="type" @change="selectDistrict">
                        <el-option v-for="item in cityList" :key="item.cityId" :label="item.cityName" :value="item.cityId">
                        </el-option>
                    </el-select>
                    <el-select v-model.number="store.areaId" filterable placeholder="区/县" prop="type" ref="district">
                        <el-option v-for="item in districtList" :key="item.areaId" :label="item.areaName" :value="item.areaId">
                        </el-option>
                    </el-select>
                    <el-button type="primary" @click="position">定位</el-button>
                </el-form-item>
                <el-form-item class="large-item" label="详细地址" prop="address">
                    <el-input v-model="store.address" placeholder="详细至街道和门牌号"></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="amap-container">
                        <el-amap-search-box class="search-box" :on-search-result="onSearchResult"></el-amap-search-box>
                        <el-amap vid="amapDemo" :plugin="plugin" class="amap" :zoom="zoom" :center="mapCenter" :events="events">
                            <el-amap-marker v-for="(marker,index) in markers" :key="index" :position="marker.position" :events="marker.events"></el-amap-marker>
                        </el-amap>
                    </div>
                </el-form-item>
                <el-form-item label="照片信息" prop="type" class="required">
                    <div class="photo-info">
                        <div class="photo-title">店铺LOGO</div>
                        <div class="photo-upload">
                            <el-upload class="upload-demo" ref="logoUrl" action="" :auto-upload="false" :show-file-list="false" :on-change="uploadLogoUrl">
                                <img v-if="logo" :src="logo" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                    <div class="photo-info">
                        <div class="photo-title">门脸照</div>
                        <div class="photo-upload">
                            <el-upload class="upload-demo" ref="shopFaceUrl" action="" :auto-upload="false" :show-file-list="false" :on-change="uploadShopFaceUrl">
                                <img v-if="store.shopFaceUrl" :src="UPLOADURL + store.shopFaceUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                    <div class="photo-info">
                        <div class="photo-title">店内照片</div>
                        <div class="photo-upload">
                            <el-upload class="upload-demo" ref="shopInnerUrl" action="" :auto-upload="false" :show-file-list="false" :on-change="uploadShopInnerUrl">
                                <img v-if="store.shopInnerUrl" :src="UPLOADURL + store.shopInnerUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </el-row>
    </div>
</template>
<script>
    import { shopCategoryList, getProvinceList, getDistrictList, getCityListByProvinceId, saveShopBaseInfo, getShopBaseInfo, uploadFiles, setShopLogo } from '@/api/api'
    export default {
        data() {
            var that = this;
            return {
                store: {
                    address: "",
                    areaId: '',
                    audit: "WAIT_AUDIT",
                    busBeginTime: '',
                    busEndTime: '',
                    cityId: '',
                    fee: 0,
                    distributionScope: 0,
                    latitude: 0,
                    logoUrl: "",
                    longitude: 0,
                    name: "",
                    provinceId: '',
                    shopCategoryIdList: [],
                    shopFaceUrl: "",
                    shopInnerUrl: "",
                    shopName: "",
                    shopType: "",
                    distributionType: 'ANUBIS',
                    takeOutPhone: ""
                },
                logo: '',
                loginPhoneNumber: '',
                isAllDay: 'true',
                province: [],
                city: [],
                district: [],
                zoom: 14,
                mapCenter: [0, 0],
                markers: [],
                plugin: [{
                    pName: 'ToolBar',
                    position: 'RT'
                }, {
                    pName: 'Geolocation',
                    events: {
                        init(o) {
                            o.getCityInfo((status, result) => {
                                that.mapCenter = result.center;
                                that.$nextTick();
                            })
                        }
                    }
                }],
                events: {
                    click: function(e) {
                        var lnglat = e.lnglat;
                        that.store.longitude = lnglat.lng;
                        that.store.latitude = lnglat.lat;
                        that.markers = [{
                            position: [e.lnglat.lng, e.lnglat.lat],
                            events: {
                                click: function(e) {
                                    var geocoder = new AMap.Geocoder({
                                        city: that.store.cityId
                                    });
                                    geocoder.getAddress([e.lnglat.lng, e.lnglat.lat], function(status, result) {
                                        if (status === 'complete' && result.info === 'OK') {
                                            if (result && result.regeocode) {
                                                that.store.address = result.regeocode.formattedAddress
                                            }
                                        }
                                    });
                                }
                            }
                        }];
                        var geocoder = new AMap.Geocoder({
                            city: that.store.cityId
                        });
                        geocoder.getAddress([e.lnglat.lng, e.lnglat.lat], function(status, result) {
                            if (status === 'complete' && result.info === 'OK') {
                                if (result && result.regeocode) {
                                    that.store.address = result.regeocode.formattedAddress
                                }
                            }
                        });
                    }
                },
                shopCategory: [],
                provinceList: [],
                cityList: [],
                districtList: [],
                rules: {
                    shopName: [
                        { required: true, message: '请输入店铺名称' }
                    ],
                    takeOutPhone: [
                        { required: true, message: '请输入店铺联系电话' }
                    ],
                    name: [
                        { required: true, message: '请输入店铺联系人' }
                    ],
                    busBeginTime: [
                        { required: true, message: '请选择营业开始时间' }
                    ],
                    busEndTime: [
                        { required: true, message: '请选择营业结束时间' }
                    ],
                    address: [
                        { required: true, message: '请输入详细地址' }
                    ]
                }
            };
        },
        methods: {
            selectCity: function() {
                getCityListByProvinceId(this.store.provinceId).then(res => {
                    this.cityList = res;
                })
            },
            selectDistrict: function() {
                getDistrictList(this.store.cityId).then(res => {
                    this.districtList = res;
                })
            },
            onSearchResult: function(pois) {
                var that = this;
                let latSum = 0;
                let lngSum = 0;
                if (pois.length > 0) {
                    pois.forEach(poi => {
                        let { lng, lat } = poi;
                        lngSum += lng;
                        latSum += lat;
                        that.markers.push({
                            position: [lng, lat],
                            events: {
                                click: function(e) {
                                    var geocoder = new AMap.Geocoder();
                                    geocoder.getAddress([e.lnglat.lng, e.lnglat.lat], function(status, result) {
                                        if (status === 'complete' && result.info === 'OK') {
                                            if (result && result.regeocode) {
                                                that.store.address = result.regeocode.formattedAddress
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    });
                    let center = {
                        lng: lngSum / pois.length,
                        lat: latSum / pois.length
                    };
                    this.mapCenter = [center.lng, center.lat];
                }
            },
            position: function() {
                var that = this;
                if (!that.store.cityId) {
                    console.log('no cityId')
                    that.$message({
                        type: 'error',
                        message: '请选择店铺所在省-市-区后再搜索'
                    })
                    return;
                }
                //行政区域搜索
                var district = new AMap.DistrictSearch({
                    level: 'district',
                    subdistrict: 0,
                    showbiz: false
                });

                district.search(that.$refs.district.query, function(status, result) {
                    console.log(result)
                    if (status === 'complete' && result.info === 'OK') {
                        var districtList = result.districtList;
                        that.mapCenter = [districtList[0]['center'].lng, districtList[0]['center'].lat];
                    }
                });
            },
            showStore: function() {
                if (this.isAllDay == 'true') {
                    this.store.busBeginTime = '00:00:00';
                    this.store.busEndTime = '23:59:59';
                }
                if(this.store.latitude == 0 && this.store.longitude == 0){
                    this.$message({
                        type: 'error',
                        message: '请地图上选择店铺位置'
                    })
                    return;
                }
                saveShopBaseInfo(this.store).then(res => {
                    console.log(res)
                    this.$router.push({ path: 'qualification', query: { step: '1' } })
                })

            },
            uploadLogoUrl: function(e) {
                var file = e.raw;
                var fd = new FormData();
                fd.append('file', file);
                setShopLogo(fd).then(data => {
                    this.logo = e.url;
                    this.store.logoUrl = "/shopLogo/" + this.store.shopId + '.png';
                }).catch(err => {
                    console.log(err)
                })
            },
            uploadShopFaceUrl: function(e) {
                var file = e.raw;
                var fd = new FormData();
                fd.append('file', file);
                fd.path = '/store';
                uploadFiles(fd).then(data => {
                    console.log(data)
                    this.store.shopFaceUrl = data.originalUrl;
                }).catch(err => {
                    console.log(err)
                })
            },
            uploadShopInnerUrl: function(e) {
                var file = e.raw;
                var fd = new FormData();
                fd.append('file', file);
                fd.path = '/store';
                uploadFiles(fd).then(data => {
                    console.log(data)
                    this.store.shopInnerUrl = data.originalUrl;
                }).catch(err => {
                    console.log(err)
                })
            }

        },
        created: function() {
            this.loginPhoneNumber = sessionStorage.getItem('user')
            shopCategoryList().then(res => {
                console.log(res)
                this.shopCategory = res.list;
            })
            getProvinceList().then(res => {
                this.provinceList = res;
            })
            getShopBaseInfo().then(res => {
                console.log(res)
                this.store = {
                    address: res.detail.address || '',
                    areaId: res.detail.areaId || '',
                    audit: res.detail.audit,
                    busBeginTime: res.detail.busBeginTime || '',
                    busEndTime: res.detail.busEndTime || '',
                    cityId: res.detail.cityId || '',
                    fee: res.detail.fee || 0,
                    distributionScope:  res.detail.distributionScope || 0,
                    latitude: res.detail.latitude || 0,
                    logoUrl: res.detail.logoUrl,
                    longitude: res.detail.longitude || 0,
                    name: res.detail.name || '',
                    provinceId: res.detail.provinceId || '',
                    shopCategoryIdList: res.shopCategoryIdList || [],
                    shopFaceUrl: res.detail.shopFaceUrl || '',
                    shopInnerUrl: res.detail.shopInnerUrl || '',
                    shopName: res.detail.shopName || '',
                    shopType: res.detail.shopType,
                    distributionType: res.detail.distributionType,
                    takeOutPhone: res.detail.takeOutPhone || ''
                }
                this.logo = this.UPLOADURL + '/shopLogo/' + res.shopId + '.png'
                if (res.detail.busBeginTime == '00:00' & res.detail.busEndTime == '23:59:59') {
                    this.isAllDay = 'true';
                } else {
                    this.isAllDay = 'false';
                }
                if (res.detail.latitude && res.detail.longitude) {
                    this.mapCenter = [res.detail.longitude, res.detail.latitude]
                    this.markers = [{
                        position: [res.detail.longitude, res.detail.latitude]
                    }];
                }
            })
        }
    }

</script>
<style scoped>
    .store {
        background-color: #ebebeb;
    }

    .store-content {
        background-color: #fff;
        padding: 40px 50px;
        min-height: 650px;
    }

    .fee {
        width: 300px;
    }

    .amap-container {
        position: relative;
        height: 500px;
    }

    .search-box {
        position: absolute;
        top: 15px;
        left: 10px;
    }

    .photo-info {
        width: 600px;
        /* height: 80px; */
        border-bottom: 1px solid #eee;
    }

    .photo-title,
    .photo-upload {
        display: inline-block;
        vertical-align: middle;
    }

    .photo-title {
        width: 90px;
        height: 100%;
        line-height: 90px;
        text-align: center;
        font-size: 12px;
        background-color: #dedede;
        color: #666;
    }

    .upload-demo {
        width: 100px;
        height: 60px;
        /* height: 90px; */
        margin-left: 10px;
        background-color: #dedede;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        vertical-align: middle;
    }

    .avatar {
        width: 100%;
        height: 100%;
        display: block;
    }
    .small-input{
        width: 80px;
    }
</style>
