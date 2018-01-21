<template>
    <div class="store">
        <el-row class="row store-content">
            <el-form :model="store.store" ref="store" label-width="100px">
                <el-form-item label="店铺位置" class="required">
                    <el-select ref="province" v-model.number="store.store.provinceId" filterable placeholder="省" prop="type" @change="selectCity">
                        <el-option v-for="item in store.provinceList" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId">
                        </el-option>
                    </el-select>
                    <el-select ref="city" v-model.number="store.store.cityId" filterable placeholder="市" prop="type" @change="selectDistrict">
                        <el-option v-for="item in store.cityList" :key="item.cityId" :label="item.cityName" :value="item.cityId">
                        </el-option>
                    </el-select>
                    <el-select v-model.number="store.store.areaId" filterable placeholder="区/县" prop="type" ref="district">
                        <el-option v-for="item in store.districtList" :key="item.areaId" :label="item.areaName" :value="item.areaId">
                        </el-option>
                    </el-select>
                    <el-button type="primary" @click="position">定位</el-button>
                </el-form-item>
                <el-form-item label="详细地址" class="required">
                    <el-input class="detail-input inline-block" v-model="store.store.address" placeholder="详细至街道和门牌号"></el-input>
                    <el-button class="inline-block" type="primary" @click="searchKeywords">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <div class="amap-container">
                        <el-amap ref="amap" vid="amapDemo" :plugin="store.plugin" class="amap" :zoom="store.zoom" :center="store.mapCenter" :events="store.events">
                            <el-amap-marker v-for="(marker,index) in store.markers" :key="index" :position="marker.position" :events="marker.events"></el-amap-marker>
                        </el-amap>
                    </div>
                </el-form-item>
                <el-form-item label="照片信息" prop="type" class="required">
                    <div class="photo-info">
                        <div class="photo-title">店铺LOGO</div>
                        <div class="photo-upload">
                            <el-upload class="upload-demo" ref="logoUrl" action="" :auto-upload="false" :show-file-list="false" :on-change="uploadLogoUrl">
                                <img v-if="store.logo" :src="store.logo" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                    <div class="photo-info">
                        <div class="photo-title">门脸照</div>
                        <div class="photo-upload">
                            <el-upload class="upload-demo" ref="shopFaceUrl" action="" :auto-upload="false" :show-file-list="false" :on-change="uploadShopFaceUrl">
                                <img v-if="store.store.shopFaceUrl" :src="UPLOADURL + store.store.shopFaceUrl + '/shopDetail.png'" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                    <div class="photo-info">
                        <div class="photo-title">店内照片</div>
                        <div class="photo-upload">
                            <el-upload class="upload-demo" ref="shopInnerUrl" action="" :auto-upload="false" :show-file-list="false" :on-change="uploadShopInnerUrl">
                                <img v-if="store.store.shopInnerUrl" :src="UPLOADURL + store.store.shopInnerUrl +'/shopDetail.png'" class="avatar">
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
    props:["store"],
    methods: {
        selectCity: function() {
            getCityListByProvinceId(this.store.store.provinceId).then(res => {
                this.store.cityList = res;
            })
        },
        selectDistrict: function() {
            getDistrictList(this.store.store.cityId).then(res => {
                this.store.districtList = res;
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
                                            that.store.store.address = result.regeocode.formattedAddress
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
                this.store.store.mapCenter = [center.lng, center.lat];
            }
        },
        position: function() {
            var that = this;
            if (!that.store.store.cityId) {
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
            if (!that.store.store.cityId) {
                console.log('no cityId')
                that.$message({
                    type: 'error',
                    message: '请选择店铺所在省-市-区后再搜索'
                })
                return;
            }
            var placeSearch= new AMap.PlaceSearch({
                city: that.store.store.cityId
            });
            placeSearch.search(that.store.store.address,function(status, result){
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
                                                that.store.store.address = result.regeocode.formattedAddress
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
            if(this.store.store.distributionType == 'SELF_DELIVERY_BY_MERCHANTS' && this.store.store.distributionScope == 0){
                this.$message({
                    type: 'error',
                    message: '配送距离不能为0米'
                })
                return;
            }
            if (this.store.store.latitude == null && this.store.store.longitude == null) {
                this.$message({
                    type: 'error',
                    message: '请地图上选择店铺位置'
                })
                return;
            }
            if (!this.store.store.areaId) {
                this.$message({
                    type: 'error',
                    message: '请选择店铺所在省-市-区'
                })
                return;
            }
            if (!this.store.store.address) {
                this.$message({
                    type: 'error',
                    message: '请输入详细地址'
                })
                return;
            }
            if (!this.store.store.logoUrl) {
                this.$message({
                    type: 'error',
                    message: '请上传店铺logo'
                })
                return;
            }
            if (!this.store.store.shopFaceUrl) {
                this.$message({
                    type: 'error',
                    message: '请上传店铺门脸照'
                })
                return;
            }
            if (!this.store.store.shopInnerUrl) {
                this.$message({
                    type: 'error',
                    message: '请上传店内照片'
                })
                return;
            }
            
            this.store.store.provinceName = this.$refs.province.query;
            this.store.store.cityName = this.$refs.city.query;
            this.store.store.areaName = this.$refs.district.query;
            // return
            saveShopBaseInfo(this.store.store).then(res => {
                this.$message({
                    type: 'success',
                    message: '保存成功!'
                });
            })
        },
        uploadLogoUrl: function(e) {
            var file = e.raw;
            var fd = new FormData();
            fd.append('file', file);
            setShopLogo(fd).then(data => {
                this.store.logo = e.url;
                this.store.store.logoUrl = data;
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
                this.store.store.shopFaceUrl = data.originalUrl;
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
                this.store.store.shopInnerUrl = data.originalUrl;
            }).catch(err => {
                console.log(err)
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
