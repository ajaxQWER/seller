<template>
    <div class="store">
        <el-row class="row store-content">
            <el-form :model="store" ref="store" label-width="100px">
                <!-- <el-form-item label="配送信息" class="required">
                    <el-radio-group v-model="store.distributionType">
                        <el-radio class="radio" label="ANUBIS" value="ANUBIS">蜂鸟配送</el-radio>
                        <el-radio class="radio" label="SELF_DELIVERY_BY_MERCHANTS" value="SELF_DELIVERY_BY_MERCHANTS">商家自送</el-radio>
                        <el-radio class="radio" label="ARES" value="ARES">蜂鹰配送</el-radio>
                    </el-radio-group>
                    <span v-if="store.distributionType == 'SELF_DELIVERY_BY_MERCHANTS'">
                        配送距离 <el-input class="small-input fee" v-model="store.distributionScope" placeholder="配送距离"></el-input>米
                        配送费 <el-input class="small-input fee" v-model="store.fee" placeholder="配送费"></el-input>元
                      </span>
                </el-form-item> -->
                <el-form-item label="店铺位置" class="required">
                    <el-select ref="province" v-model.number="store.provinceId" filterable placeholder="省" prop="type" @change="selectCity">
                        <el-option v-for="item in provinceList" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId">
                        </el-option>
                    </el-select>
                    <el-select ref="city" v-model.number="store.cityId" filterable placeholder="市" prop="type" @change="selectDistrict">
                        <el-option v-for="item in cityList" :key="item.cityId" :label="item.cityName" :value="item.cityId">
                        </el-option>
                    </el-select>
                    <el-select v-model.number="store.areaId" filterable placeholder="区/县" prop="type" ref="district">
                        <el-option v-for="item in districtList" :key="item.areaId" :label="item.areaName" :value="item.areaId">
                        </el-option>
                    </el-select>
                    <el-button type="primary" @click="position">定位</el-button>
                </el-form-item>
                <el-form-item label="详细地址" class="required">
                    <el-input class="detail-input inline-block" v-model="store.address" placeholder="详细至街道和门牌号"></el-input>
                    <el-button class="inline-block" type="primary" @click="searchKeywords">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <div class="amap-container">
                        <el-amap ref="amap" vid="amapDemo" :plugin="plugin" class="amap" :zoom="zoom" :center="mapCenter" :events="events">
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
                                <img v-if="store.shopFaceUrl" :src="UPLOADURL + store.shopFaceUrl + '/shopDetail.png'" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                    <div class="photo-info">
                        <div class="photo-title">店内照片</div>
                        <div class="photo-upload">
                            <el-upload class="upload-demo" ref="shopInnerUrl" action="" :auto-upload="false" :show-file-list="false" :on-change="uploadShopInnerUrl">
                                <img v-if="store.shopInnerUrl" :src="UPLOADURL + store.shopInnerUrl +'/shopDetail.png'" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                </el-form-item>
                <el-button type="primary" size="large" @click="showStore" class="saveBase">保存</el-button>
            </el-form>
        </el-row>
    </div>
</template>
<script>
import { shopCategoryList, saveShopBaseInfo, getShopBaseInfo, uploadFiles, setShopLogo } from '@/api/api'
import { getProvinceList, getDistrictList, getCityListByProvinceId } from '@/api/region'
export default {
    data() {
        var that = this;
        return {
            store: {
                address: null,
                areaId: null,
                areaName: null,
                busBeginTime: null,
                busEndTime: null,
                cityId: null,
                cityName: null,
                fee: null,
                distributionScope: null,
                latitude: null,
                logoUrl: null,
                longitude: null,
                name: null,
                provinceId: null,
                provinceName: null,
                shopCategoryIdList: [],
                shopFaceUrl: null,
                shopInnerUrl: null,
                shopName: null,
                shopType: null,
                // distributionType: 'ANUBIS',
                takeOutPhone: null,
                subjectDocument: null,
                regNumber: null
            },
            logo: '',
            shopId: null,
            // loginPhoneNumber: '',
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
            provinceList: [],
            cityList: [],
            districtList: []
        };
    },
    methods: {
        back: function () {
            this.$router.back()
        },
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

            var geocoder = new AMap.Geocoder();

            geocoder.getLocation(that.$refs.province.query+that.$refs.city.query+that.$refs.district.query, function(status, result) {
                console.log(result)
                if (status === 'complete' && result.info === 'OK') {
                    var districtList = result.geocodes;
                    that.mapCenter = [districtList[0]['location'].lng, districtList[0]['location'].lat];
                }
            });
        },
        searchKeywords: function(){
            var that = this;
            if (!that.store.cityId) {
                console.log('no cityId')
                that.$message({
                    type: 'error',
                    message: '请选择店铺所在省-市-区后再搜索'
                })
                return;
            }
            var placeSearch= new AMap.PlaceSearch({
                city: that.store.cityId
            });
            placeSearch.search(that.store.address,function(status, result){
                //TODO : 按照自己需求处理查询结果
                console.log(status,result)
                if (status === 'complete' && result.info === 'OK') {
                    var poiList = result.poiList.pois;
                    var amap = that.$refs.amap.$$getInstance();
                    amap.setZoomAndCenter(16,[poiList[0]['location'].lng, poiList[0]['location'].lat]);
                    that.markers = [];
                    poiList.forEach((item,index) => {
                        that.markers.push({
                            position: [item.location.lng, item.location.lat],
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
                    })
                }
            })
        },
        showStore: function() {
            if(this.store.distributionType == 'SELF_DELIVERY_BY_MERCHANTS' && this.store.distributionScope == 0){
                this.$message({
                    type: 'error',
                    message: '配送距离不能为0米'
                })
                return;
            }
            if (this.store.latitude == null && this.store.longitude == null) {
                this.$message({
                    type: 'error',
                    message: '请地图上选择店铺位置'
                })
                return;
            }
            if (!this.store.areaId) {
                this.$message({
                    type: 'error',
                    message: '请选择店铺所在省-市-区'
                })
                return;
            }
            if (!this.store.address) {
                this.$message({
                    type: 'error',
                    message: '请输入详细地址'
                })
                return;
            }
            if (!this.store.logoUrl) {
                this.$message({
                    type: 'error',
                    message: '请上传店铺logo'
                })
                return;
            }
            if (!this.store.shopFaceUrl) {
                this.$message({
                    type: 'error',
                    message: '请上传店铺门脸照'
                })
                return;
            }
            if (!this.store.shopInnerUrl) {
                this.$message({
                    type: 'error',
                    message: '请上传店内照片'
                })
                return;
            }
            
            this.store.provinceName = this.$refs.province.query;
            this.store.cityName = this.$refs.city.query;
            this.store.areaName = this.$refs.district.query;
            console.log(this.store)
            // return
            saveShopBaseInfo(this.store).then(res => {
                console.log(res)
            })

        },
        uploadLogoUrl: function(e) {
            var file = e.raw;
            var fd = new FormData();
            fd.append('file', file);
            setShopLogo(fd).then(data => {
                this.logo = e.url;
                this.store.logoUrl = data;
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
        var shopId = localStorage.getItem('shopId');
        this.shopId = shopId;
        
        shopCategoryList().then(res => {
            console.log(res)
            this.shopCategory = res.list;
        })
        getProvinceList().then(res => {
            this.provinceList = res;
        })
        if(shopId){
            getShopBaseInfo().then(res => {
                console.log(res)
                this.store = {
                    address: res.detail.address || null,
                    areaId: res.detail.areaId || null,
                    busBeginTime: res.detail.busBeginTime.slice(0,5) || null,
                    busEndTime: res.detail.busEndTime.slice(0,5) || null,
                    cityId: res.detail.cityId || null,
                    fee: res.detail.fee || 0,
                    distributionScope: res.detail.distributionScope || 0,
                    latitude: res.detail.latitude != 0 ? res.detail.latitude : null,
                    logoUrl: res.detail.logoUrl || null,
                    longitude: res.detail.longitude != 0 ? res.detail.longitude : null,
                    name: res.detail.name || null,
                    provinceId: res.detail.provinceId || null,
                    shopCategoryIdList: res.shopCategoryIdList || null,
                    shopFaceUrl: res.detail.shopFaceUrl || null,
                    shopInnerUrl: res.detail.shopInnerUrl || null,
                    shopName: res.detail.shopName || null,
                    shopType: res.detail.shopType,
                    // distributionType: res.detail.distributionType,
                    takeOutPhone: res.detail.takeOutPhone || null
                }
                this.logo = res.detail.logoUrl ? this.UPLOADURL + res.detail.logoUrl : null
                // console.log(this.logo)
                if (res.detail.latitude && res.detail.longitude) {
                    this.mapCenter = [res.detail.longitude, res.detail.latitude]
                    this.markers = [{
                        position: [res.detail.longitude, res.detail.latitude]
                    }];
                }
            })
        }
    }
}

</script>
<style scoped>
.saveBase{
    margin-left: 40px
}
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
    width: 100px;
    height: 60px;
    display: block;
}

.small-input {
    width: 80px;
}
.detail-input{
    width: 500px;
    display: inline-block;
}
.inline-block{
    display: inline-block;
}
.time-select{
    width: 100px;
}
</style>
