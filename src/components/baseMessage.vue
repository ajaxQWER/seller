<template>
    <div class="store">
        <el-row class="row store-content">
            <el-form :model="baseMessage.store" ref="store" label-width="100px">
                <el-form-item class="normal-item required" label="店铺名称">
                    <el-input v-model="baseMessage.store.shopName"></el-input>
                </el-form-item>
                <el-form-item class="small-item required" label="联系电话">
                    <el-input v-model.number="baseMessage.store.takeOutPhone" :maxlength="11"></el-input>
                </el-form-item>
                <el-form-item class="small-item required" label="联系人姓名">
                    <el-input v-model="baseMessage.store.name"></el-input>
                </el-form-item>
                <el-form-item label="店铺分类" class="required">
                    <el-select class="normal-item" v-model="baseMessage.store.shopCategoryIdList" multiple :multiple-limit="5" placeholder="请选择店铺分类">
                        <el-option v-for="item in baseMessage.shopCategory" :key="item.shopCategoryId" :label="item.shopCategoryName" :value="item.shopCategoryId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="营业时间" class="required">
                    <el-radio class="radio" v-model="baseMessage.isAllDay" label="true">全天</el-radio>
                    <el-radio class="radio" v-model="baseMessage.isAllDay" label="false">自定义</el-radio>
                    <div class="inline-block" v-if="baseMessage.isAllDay=='false'">
                        <span>营业开始时间
                        </span>
                        <el-select v-model="baseMessage.beginHour" placeholder="小时" filterable :clearable="true" class="time-select">
                            <el-option
                                  v-for="(item,index) in baseMessage.timeStartArr"
                                  :key="index"
                                  :label="item"
                                  :value="item">
                                </el-option>
                        </el-select>
                        <el-select v-model="baseMessage.beginMin" placeholder="分钟" filterable :clearable="true" class="time-select">
                            <el-option
                              v-for="(item,index) in baseMessage.timeEndArr"
                              :key="index"
                              :label="item"
                              :value="item">
                            </el-option>
                        </el-select>-
                        <span>营业结束时间</span>
                        <el-select v-model="baseMessage.endHour" placeholder="小时" filterable :clearable="true" class="time-select">
                            <el-option
                                  v-for="(item,index) in baseMessage.timeStartArr"
                                  :key="index"
                                  :label="item"
                                  :value="item">
                                </el-option>
                        </el-select>
                        <el-select v-model="baseMessage.endMin" placeholder="分钟" filterable :clearable="true" class="time-select">
                            <el-option
                              v-for="(item,index) in baseMessage.timeEndArr"
                              :key="index"
                              :label="item"
                              :value="item">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="店铺类型" class="required">
                    <el-radio-group v-model="baseMessage.store.shopType">
                        <el-radio class="radio" label="RESERVE" disabled>预定</el-radio>
                        <el-radio class="radio" label="TAKEOUT" disabled>外卖</el-radio>
                        <el-radio class="radio" label="RESERVE_TAKEOUT" disabled>预定加外卖</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-button  class="saveBase" type="primary" size="large" @click="showStore">保存</el-button>
            </el-form>
        </el-row>
    </div>
</template>
<script>
import { shopCategoryList, saveShopBaseInfo, getShopBaseInfo } from '@/api/api'
export default {
    props:["baseMessage"],
    methods: {
        showStore() {
            if(!this.baseMessage.store.shopName){
                this.$message({
                    type: 'error',
                    message: '请输入店铺名称'
                })
                return;
                }
                if(!this.baseMessage.store.takeOutPhone){
                    this.$message({
                        type: 'error',
                        message: '请输入联系电话'
                    })
                    return;
                }
                if(!this.baseMessage.store.name){
                    this.$message({
                        type: 'error',
                        message: '联系人姓名'
                    })
                    return;
                }
                if(!this.baseMessage.store.shopCategoryIdList.length){
                    this.$message({
                        type: 'error',
                        message: '请选择店铺分类'
                    })
                    return;
                }
                if (this.isAllDay == 'true') {
                    this.baseMessage.store.busBeginTime = '00:00:00';
                    this.baseMessage.store.busEndTime = '23:59:59';
                }else{
                    this.baseMessage.store.busBeginTime = this.beginHour + ':' + this.beginMin;
                    this.baseMessage.store.busEndTime = this.endHour + ':' + this.endMin;
                }
                if(!this.baseMessage.store.busBeginTime){
                    this.$message({
                        type: 'error',
                        message: '请输营业开始时间'
                    })
                    return;
                }
                if(!this.baseMessage.store.busEndTime){
                    this.$message({
                        type: 'error',
                        message: '请输营业结束时间'
                    })
                    return;
                }
            saveShopBaseInfo(this.baseMessage.store).then(res => {
                this.$message({
                    type: 'success',
                    message: '保存成功!'
                });
            }) 
        },

        isAllDayChange: function(val){
            if (val == 'true') {
                this.baseMessage.store.busBeginTime = '00:00';
                this.baseMessage.store.busEndTime = '23:59';
            }else{
                this.baseMessage.store.busBeginTime = null;
                this.baseMessage.store.busEndTime = null;
            }
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
