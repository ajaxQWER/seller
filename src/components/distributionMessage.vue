<template>
    <div class="store">
        <el-row class="row store-content">
            <el-form :model="distributionMessage.distribution" ref="distribution" label-width="100px">
                <el-form-item label="配送信息" class="required" v-if="distributionMessage.shopTypeCheck == false">
                    <el-radio-group v-model="distributionMessage.distribution.distributionType">
                        <el-radio class="radio" label="ANUBIS" value="ANUBIS" disabled>蜂鸟配送</el-radio>
                        <el-radio class="radio" label="ARES" value="ARES" disabled>蜂鹰配送</el-radio>
                        <el-radio class="radio" label="SELF_DELIVERY_BY_MERCHANTS" value="SELF_DELIVERY_BY_MERCHANTS" disabled>商家自送</el-radio>
                    </el-radio-group>
                    <span v-if="distributionMessage.distribution.distributionType == 'SELF_DELIVERY_BY_MERCHANTS'">
                        配送距离 <el-input class="small-input fee" v-model="distributionMessage.distribution.distributionScope" placeholder="配送距离"></el-input>米
                        配送费 <el-input class="small-input fee" v-model="distributionMessage.distribution.fee" placeholder="配送费"></el-input>元
                      </span>
                </el-form-item>
                <el-form-item label="起送费" class="required">
                    <el-input class="detail-input inline-block" v-model="distributionMessage.distribution.minDeliveryPrice" disabled></el-input>
                </el-form-item>
                <el-button type="primary" size="large" @click="saveDistributionMessage" class="savePositon" disabled>保存</el-button>
            </el-form>
        </el-row>
    </div>
</template>
<script>
import { getShopDistributionInfo , saveShopDistributionInfo } from '@/api/api'
export default {
    props:["distributionMessage"],
    created(){
    },
    methods: {
        saveDistributionMessage(){
            saveShopDistributionInfo(this.distributionMessage.distribution).then(res => {
                getShopDistributionInfo().then(data => {
                    this.distributionMessage.distribution = data
                    this.$message({
                        type: 'success',
                        message: '保存成功!'
                    });
                })
            })
        }
    }
}

</script>
<style scoped>
.savePositon{
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
.detail-input{
    width: 300px;
    display: inline-block;
}
.inline-block{
    display: inline-block;
}
.time-select{
    width: 100px;
}
</style>
