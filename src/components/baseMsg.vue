<template>
    <div class="store">
        <el-row class="row store-content">
            <el-form :model="store" ref="store" label-width="100px">
                <el-form-item class="normal-item required" label="店铺名称">
                    <el-input v-model="store.shopName"></el-input>
                </el-form-item>
                <el-form-item class="small-item required" label="联系电话">
                    <el-input v-model.number="store.takeOutPhone" :maxlength="11"></el-input>
                </el-form-item>
                <el-form-item class="small-item required" label="联系人姓名">
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
                    <div class="inline-block" v-if="isAllDay=='false'">
                        <span>营业开始时间
                        </span>
                        <el-select v-model="beginHour" placeholder="小时" filterable :clearable="true" class="time-select">
                            <el-option
                                  v-for="(item,index) in timeStartArr"
                                  :key="index"
                                  :label="item"
                                  :value="item">
                                </el-option>
                        </el-select>
                        <el-select v-model="beginMin" placeholder="分钟" filterable :clearable="true" class="time-select">
                            <el-option
                              v-for="(item,index) in timeEndArr"
                              :key="index"
                              :label="item"
                              :value="item">
                            </el-option>
                        </el-select>-
                        <span>营业结束时间</span>
                        <el-select v-model="endHour" placeholder="小时" filterable :clearable="true" class="time-select">
                            <el-option
                                  v-for="(item,index) in timeStartArr"
                                  :key="index"
                                  :label="item"
                                  :value="item">
                                </el-option>
                        </el-select>
                        <el-select v-model="endMin" placeholder="分钟" filterable :clearable="true" class="time-select">
                            <el-option
                              v-for="(item,index) in timeEndArr"
                              :key="index"
                              :label="item"
                              :value="item">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="店铺类型" class="required">
                    <el-radio-group v-model="store.shopType">
                        <el-radio class="radio" label="RESERVE">预定</el-radio>
                        <el-radio class="radio" label="TAKEOUT">外卖</el-radio>
                        <el-radio class="radio" label="RESERVE_TAKEOUT">预定加外卖</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="主体资质" class="required" v-if="addShop">
                    <el-select v-model="store.subjectDocument" placeholder="请选择主体资质类型" class="select">
                        <el-option v-for="(item,index) in subjectDocumentList" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="注册号" class="required" v-if="addShop">
                    <!-- <div class="modal-input"> -->
                        <el-input class="small-item" v-model="store.regNumber" placeholder="请输入主体资质注册号"></el-input>
                    <!-- </div> -->
                </el-form-item>
            </el-form>
        </el-row>
    </div>
</template>
<script>
import { shopCategoryList, saveShopBaseInfo, getShopBaseInfo, addShopBaseInfo } from '@/api/api'
export default {
    name: 'baseMsg',
    data() {
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
                latitude: 0,
                logoUrl: null,
                longitude: 0,
                name: null,
                provinceId: null,
                provinceName: null,
                shopCategoryIdList: [],
                shopFaceUrl: null,
                shopInnerUrl: null,
                shopName: null,
                shopType: null,
                distributionType: 'ANUBIS',
                takeOutPhone: null,
                subjectDocument: null,
                regNumber: null
            },
            beginHour: '',
            beginMin: '',
            endHour: '',
            endMin: '',
            shopId: null,
            isAllDay: 'true',
            timeStartArr: [],
            timeEndArr: [],
            shopCategory: [],
            subjectDocumentList: [{
                label: '营业执照',
                value: 'BUSINESS_LICENSE'
            }, {
                label: '事业单位法人证书',
                value: 'LEGAL_PERSON_CERTIFICATE_OF_INSTITUTION'
            }, {
                label: '民办非企业单位登记证书',
                value: 'REGISTRATION_CERTIFICATE_OF_PRIVATE_NON_ENTERPRISE_UNITS'
            }, {
                label: '社会团体法人登记证书',
                value: 'SOCIAL_ORGANIZATION_LEGAL_PERSON_REGISTRATION_CERTIFICATE'
            }, {
                label: '其他',
                value: 'OTHER'
            }],
            addShop: true
        };
    },
    methods: {
        isAllDayChange: function(val){
            if (val == 'true') {
                this.store.busBeginTime = '00:00';
                this.store.busEndTime = '23:59';
            }else{
                this.store.busBeginTime = null;
                this.store.busEndTime = null;
            }
        }
    },
    created: function() {
        var shopId = localStorage.getItem('shopId');

        shopCategoryList().then(res => {
            console.log(res)
            this.shopCategory = res.list;
        })

        for(var i = 0; i < 24; i++){
            this.timeStartArr.push(i<10?'0'+i:i)
        }
        for(var i = 0; i < 60; i++){
            this.timeEndArr.push(i<10?'0'+i:i)
        }
        if(shopId){
            this.shopId = shopId;
            this.addShop = false;
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
                    latitude: res.detail.latitude || 0,
                    logoUrl: res.detail.logoUrl || null,
                    longitude: res.detail.longitude || 0,
                    name: res.detail.name || null,
                    provinceId: res.detail.provinceId || null,
                    shopCategoryIdList: res.shopCategoryIdList || [],
                    shopFaceUrl: res.detail.shopFaceUrl || null,
                    shopInnerUrl: res.detail.shopInnerUrl || null,
                    shopName: res.detail.shopName || null,
                    shopType: res.detail.shopType,
                    distributionType: res.detail.distributionType,
                    takeOutPhone: res.detail.takeOutPhone || null
                }
                if (res.detail.busBeginTime.slice(0,5) == '00:00' && res.detail.busEndTime.slice(0,5) == '23:59') {
                    this.isAllDay = 'true';
                } else {
                    this.isAllDay = 'false';
                }
                var beginTime = res.detail.busBeginTime.slice(0,5).split(':');
                var endTime = res.detail.busEndTime.slice(0,5).split(':');
                this.beginHour = beginTime[0];
                this.beginMin = beginTime[1];
                this.endHour = endTime[0];
                this.endMin = endTime[1];
            })
        }
    }
}

</script>
<style scoped>
.store {
    background-color: #ebebeb;
}

.store-content {
    background-color: #fff;
    padding: 40px 50px 0;
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
