<template>
    <div class="store">
        <el-tabs v-model="activeTab" @tab-click="tabClick">
            <el-tab-pane label="基本信息" name="0">
                <BaseMessage :baseMessage="baseMessage" />
            </el-tab-pane>
            <el-tab-pane label="配送信息" name="1">
                <DistributionMessage :distributionMessage="distributionMessage" />
            </el-tab-pane>
            <el-tab-pane label="位置信息" name="2">
                <Store :store="store" />
            </el-tab-pane>
            <el-tab-pane label="资质信息" name="3">
                <Qualification :qualification="qualification" />
            </el-tab-pane>
            <el-tab-pane label="结算信息" name="4">
                <Settlement :settlement="settlement" />
            </el-tab-pane>
        </el-tabs> 
    </div>
</template>
<script>
    import BaseMessage from '../components/baseMessage.vue'
    import Qualification from '../components/qualification.vue'
    import Store from '../components/store.vue'
    import Settlement from '../components/settlement.vue'
    import DistributionMessage from '../components/distributionMessage.vue'
    import { getShopDistributionInfo , getShopBaseInfo ,getShopSettleInfo , getShopQualificationInfo , shopCategoryList } from '@/api/api'
    import { getProvinceList, getDistrictList, getCityListByProvinceId } from '@/api/region'
    export default {
        components:{
            BaseMessage,
            Store,
            Qualification,
            Settlement,
            DistributionMessage
        },
        created(){
            shopCategoryList().then(res => {
                console.log(res)
                this.baseMessage.shopCategory = res.list;
            })

            for(var i = 0; i < 24; i++){
                this.baseMessage.timeStartArr.push(i<10?'0'+i:i)
            }
            for(var i = 0; i < 60; i++){
                this.baseMessage.timeEndArr.push(i<10?'0'+i:i)
            }
            getShopBaseInfo().then(res => {
                console.log(res)
                this.baseMessage.store = {
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
                    // distributionType: res.detail.distributionType,
                    takeOutPhone: res.detail.takeOutPhone || null
                }
                if (res.detail.busBeginTime.slice(0,5) == '00:00' && res.detail.busEndTime.slice(0,5) == '23:59') {
                    this.baseMessage.isAllDay = 'true';
                } else {
                    this.baseMessage.isAllDay = 'false';
                }
                var beginTime = res.detail.busBeginTime.slice(0,5).split(':');
                var endTime = res.detail.busEndTime.slice(0,5).split(':');
                this.baseMessage.beginHour = beginTime[0];
                this.baseMessage.beginMin = beginTime[1];
                this.baseMessage.endHour = endTime[0];
                this.baseMessage.endMin = endTime[1];
            })

            getShopDistributionInfo().then(res => {
                this.distributionMessage.distribution = res
            })
            getShopBaseInfo().then(res => {
                if(res.detail.shopType == "RESERVE"){
                    this.distributionMessage.shopTypeCheck = true
                }else{
                    this.distributionMessage.shopTypeCheck = false
                }
            })

            getShopSettleInfo().then(res => {
                console.log(res)
                if (res.openName) {
                    this.settlement.settlement.openName = res.openName
                }
                if (res.bankHouse) {
                    this.settlement.settlement.bankHouse = res.bankHouse
                }
                if (res.bankNumber) {
                    this.settlement.settlement.bankNumber = res.bankNumber
                }
                if (res.openBank) {
                    this.settlement.settlement.openBank = res.openBank
                }
                if (res.provinceId) {
                    this.settlement.settlement.provinceId = res.provinceId
                }
                if (res.cityId) {
                    this.settlement.settlement.cityId = res.cityId
                }
                if (res.attachmentUrl) {
                    this.settlement.settlement.attachmentUrl = res.attachmentUrl
                }
            })
            getProvinceList().then(res => {
                console.log(res)
                this.settlement.province = res;
            })
            if(this.settlement.settlement.provinceId){
                getCityListByProvinceId(this.settlement.settlement.provinceId).then(res => {
                    this.settlement.city = res;
                })
            }
            getShopQualificationInfo().then(res => {
                console.log(res)
                if (res.document) {
                    this.qualification.document = {
                        documentNum: res.document.documentNum || '',
                        documentType: res.document.documentType || '',
                        fullFacePhotoUrl: res.document.fullFacePhotoUrl || '',
                        handFullFacePhotoUrl: res.document.handFullFacePhotoUrl || '',
                        readyName: res.document.readyName || '',
                        reverseSideAsUrl: res.document.reverseSideAsUrl || '',
                        attachmentUrl: res.document.attachmentUrl || null,
                    }
                }
                if (res.industry) {
                    this.qualification.industry = {
                        beginTime: res.industry.beginTime || '',
                        endTime: res.industry.endTime || '',
                        foodUrl: res.industry.foodUrl || '',
                        intelligence: res.industry.intelligence || null,
                        legal: res.industry.legal || '',
                        licenseAddress: res.industry.licenseAddress || '',
                        licenseNumber: res.industry.licenseNumber || '',
                        longTerm: res.industry.longTerm || true,
                        unitName: res.industry.unitName || '',
                        attachmentUrl: res.industry.attachmentUrl || null,
                    }
                }
                if (res.subject) {
                    this.qualification.subject = {
                        beginTime: res.subject.beginTime || '',
                        businessUrl: res.subject.businessUrl || '',
                        endTime: res.subject.endTime || '',
                        legal: res.subject.legal || '',
                        longTerm: res.subject.longTerm || true,
                        regAddress: res.subject.regAddress || '',
                        regNumber: res.subject.regNumber || '',
                        subjectDocument: res.subject.subjectDocument || '',
                        unitName: res.subject.unitName || '',
                        attachmentUrl: res.subject.attachmentUrl || null,
                    }
                }
            })
            shopCategoryList().then(res => {
                console.log(res)
                this.store.shopCategory = res.list;
            })
            getProvinceList().then(res => {
                this.store.provinceList = res;
            })
            getShopBaseInfo().then(res => {
                console.log(res)
                this.store.store = {
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
                this.store.logo = res.detail.logoUrl ? this.UPLOADURL + res.detail.logoUrl : null
                // console.log(this.logo)
                if (res.detail.latitude && res.detail.longitude) {
                    this.store.mapCenter = [res.detail.longitude, res.detail.latitude]
                    this.store.markers = [{
                        position: [res.detail.longitude, res.detail.latitude]
                    }];
                }
            })
        },
        data(){
            var that = this;
            return{
                baseMessage:{
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
                        // distributionType: 'ANUBIS',
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
                    shopCategory: []
                },
                distributionMessage:{
                    distribution:{
                        distributionScope: 0,
                        distributionType: "SELF_DELIVERY_BY_MERCHANTS",
                        fee: 0,
                        minDeliveryPrice: 0,
                        shopId: 0
                    },
                    shopTypeCheck:false
                },
                store:{
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
                },
                qualification:{
                    document: {
                        documentNum: "",
                        documentType: "",
                        fullFacePhotoUrl: "",
                        handFullFacePhotoUrl: "",
                        readyName: "",
                        reverseSideAsUrl: "",
                        attachmentUrl: null
                    },
                    industry: {
                        beginTime: '',
                        endTime: '',
                        foodUrl: "",
                        intelligence: null,
                        legal: "",
                        licenseAddress: "",
                        licenseNumber: "",
                        longTerm: true,
                        unitName: "",
                        attachmentUrl: null
                    },
                    subject: {
                        beginTime: '',
                        businessUrl: '',
                        endTime: "",
                        legal: "",
                        longTerm: true,
                        regAddress: "",
                        regNumber: "",
                        subjectDocument: "",
                        unitName: "",
                        attachmentUrl: null
                    }
                },
                settlement:{
                    settlement: {
                        bankHouse: "",
                        bankNumber: "",
                        openBank: "",
                        provinceId: '',
                        cityId: '',
                        openName: '',
                        attachmentUrl: ''
                    },
                    province: [],
                    city: [],
                    uploadsLoding: false
                },
                activeTab: '0'
            }
        },
        methods:{
            tabClick(tab) {
                console.log(tab.index);
                switch (tab.index) {
                    case "0":
                        shopCategoryList().then(res => {
                            console.log(res)
                            this.baseMessage.shopCategory = res.list;
                        })

                        for(var i = 0; i < 24; i++){
                            this.baseMessage.timeStartArr.push(i<10?'0'+i:i)
                        }
                        for(var i = 0; i < 60; i++){
                            this.baseMessage.timeEndArr.push(i<10?'0'+i:i)
                        }
                        getShopBaseInfo().then(res => {
                            console.log(res)
                            this.baseMessage.store = {
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
                                // distributionType: res.detail.distributionType,
                                takeOutPhone: res.detail.takeOutPhone || null
                            }
                            if (res.detail.busBeginTime.slice(0,5) == '00:00' && res.detail.busEndTime.slice(0,5) == '23:59') {
                                this.baseMessage.isAllDay = 'true';
                            } else {
                                this.baseMessage.isAllDay = 'false';
                            }
                            var beginTime = res.detail.busBeginTime.slice(0,5).split(':');
                            var endTime = res.detail.busEndTime.slice(0,5).split(':');
                            this.baseMessage.beginHour = beginTime[0];
                            this.baseMessage.beginMin = beginTime[1];
                            this.baseMessage.endHour = endTime[0];
                            this.baseMessage.endMin = endTime[1];
                        })
                        break;
                    case "1":
                        getShopDistributionInfo().then(res => {
                            console.log(res)
                            this.distributionMessage.distribution = res
                        })
                        getShopBaseInfo().then(res => {
                            if(res.detail.shopType == "RESERVE"){
                                this.distributionMessage.shopTypeCheck = true
                            }else{
                                this.distributionMessage.shopTypeCheck = false
                            }
                        })
                        break;
                    case "2":
                        shopCategoryList().then(res => {
                            console.log(res)
                            this.store.shopCategory = res.list;
                        })
                        getProvinceList().then(res => {
                            this.store.provinceList = res;
                        })
                        getShopBaseInfo().then(res => {
                            console.log(res)
                            this.store.store = {
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
                            this.store.logo = res.detail.logoUrl ? this.UPLOADURL + res.detail.logoUrl : null
                            // console.log(this.logo)
                            if (res.detail.latitude && res.detail.longitude) {
                                this.store.mapCenter = [res.detail.longitude, res.detail.latitude]
                                this.store.markers = [{
                                    position: [res.detail.longitude, res.detail.latitude]
                                }];
                            }
                        })
                        break;
                    case "3":
                        getShopQualificationInfo().then(res => {
                            console.log(res)
                            if (res.document) {
                                this.qualification.document = {
                                    documentNum: res.document.documentNum || '',
                                    documentType: res.document.documentType || '',
                                    fullFacePhotoUrl: res.document.fullFacePhotoUrl || '',
                                    handFullFacePhotoUrl: res.document.handFullFacePhotoUrl || '',
                                    readyName: res.document.readyName || '',
                                    reverseSideAsUrl: res.document.reverseSideAsUrl || '',
                                    attachmentUrl: res.document.attachmentUrl || null,
                                }
                            }
                            if (res.industry) {
                                this.qualification.industry = {
                                    beginTime: res.industry.beginTime || '',
                                    endTime: res.industry.endTime || '',
                                    foodUrl: res.industry.foodUrl || '',
                                    intelligence: res.industry.intelligence || null,
                                    legal: res.industry.legal || '',
                                    licenseAddress: res.industry.licenseAddress || '',
                                    licenseNumber: res.industry.licenseNumber || '',
                                    longTerm: res.industry.longTerm || true,
                                    unitName: res.industry.unitName || '',
                                    attachmentUrl: res.industry.attachmentUrl || null,
                                }
                            }
                            if (res.subject) {
                                this.qualification.subject = {
                                    beginTime: res.subject.beginTime || '',
                                    businessUrl: res.subject.businessUrl || '',
                                    endTime: res.subject.endTime || '',
                                    legal: res.subject.legal || '',
                                    longTerm: res.subject.longTerm || true,
                                    regAddress: res.subject.regAddress || '',
                                    regNumber: res.subject.regNumber || '',
                                    subjectDocument: res.subject.subjectDocument || '',
                                    unitName: res.subject.unitName || '',
                                    attachmentUrl: res.subject.attachmentUrl || null,
                                }
                            }
                        })
                        break;
                    case "4":
                        getShopSettleInfo().then(res => {
                            console.log(res)
                            if (res.openName) {
                                this.settlement.settlement.openName = res.openName
                            }
                            if (res.bankHouse) {
                                this.settlement.settlement.bankHouse = res.bankHouse
                            }
                            if (res.bankNumber) {
                                this.settlement.settlement.bankNumber = res.bankNumber
                            }
                            if (res.openBank) {
                                this.settlement.settlement.openBank = res.openBank
                            }
                            if (res.provinceId) {
                                this.settlement.settlement.provinceId = res.provinceId
                            }
                            if (res.cityId) {
                                this.settlement.settlement.cityId = res.cityId
                            }
                            if (res.attachmentUrl) {
                                this.settlement.settlement.attachmentUrl = res.attachmentUrl
                            }
                        })
                        getProvinceList().then(res => {
                            console.log(res)
                            this.settlement.province = res;
                        })
                        if(this.settlement.settlement.provinceId){
                            getCityListByProvinceId(this.settlement.settlement.provinceId).then(res => {
                                this.settlement.city = res;
                            })
                        }
                        break;
                }
            }
        }
    }        
</script>

