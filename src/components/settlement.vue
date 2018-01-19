<template>
    <div class="settlement">
        <el-row class="row settlement-content">
            <el-form :model="settlement.settlement" ref="settlement" label-width="100px">
                <el-form-item class="normal-item required" label="开户人">
                    <el-input v-model="settlement.settlement.openName"></el-input>
                </el-form-item>
                <el-form-item class="large-item required" label="银行卡号">
                    <el-input v-model="settlement.settlement.bankNumber" @blur="getBankCardInfo"></el-input>
                </el-form-item>
                <el-form-item class="required" label="所属银行">{{settlement.settlement.bankHouse}}</el-form-item>
                <el-form-item label="开户城市" class="required">
                    <el-select v-model.number="settlement.settlement.provinceId" filterable placeholder="省" prop="type" @change="selectCity">
                        <el-option v-for="item in settlement.province" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId">
                        </el-option>
                    </el-select>
                    <el-select v-model.number="settlement.settlement.cityId" filterable placeholder="市" prop="type">
                        <el-option v-for="item in settlement.city" :key="item.cityId" :label="item.cityName" :value="item.cityId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="normal-item required" label="开户支行">
                    <el-input v-model="settlement.settlement.openBank"></el-input>
                </el-form-item>
                <el-form-item label="附件">
                    <div class="photo-info">
                        <div class="photo-title">上传附件</div>
                        <div class="photo-upload" v-loading="settlement.uploadsLoding">
                            <el-upload class="upload-demo" ref="handFullFacePhotoUrl" action="" :auto-upload="false" :show-file-list="false" accept="image/*" :on-change="uploadsAttachmentUrl">
                                <img  v-if="settlement.settlement.attachmentUrl " :src="UPLOADURL + settlement.settlement.attachmentUrl + '/shopDetail.png'" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                </el-form-item>
                <el-button  class="saveBase" type="primary" size="large" @click="save">保存</el-button>
            </el-form>
        </el-row>
    </div>
</template>
<script>
import { getBankCardInfoByCardNumber, saveShopSettleInfo, getShopSettleInfo, uploadFiles } from '@/api/api'
import { getProvinceList, getDistrictList, getCityListByProvinceId } from '@/api/region'
export default {
    props:["settlement"],
    methods: {
        selectCity: function() {
            getCityListByProvinceId(this.settlement.settlement.provinceId).then(res => {
                console.log(res)
                this.settlement.city = res;
            })
        },
        save: function() {
            this.$confirm('此操作将对资料进行保存, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                if (!this.settlement.settlement.openName) {
                    this.$message({
                        type: 'error',
                        message: '请输入开户人'
                    })
                    return;
                }
                if (!this.settlement.settlement.bankNumber) {
                    this.$message({
                        type: 'error',
                        message: '请输入银行卡号'
                    })
                    return;
                }
                if (!this.settlement.settlement.provinceId) {
                    this.$message({
                        type: 'error',
                        message: '请选择开户省份'
                    })
                    return;
                }
                if (!this.settlement.settlement.cityId) {
                    this.$message({
                        type: 'error',
                        message: '请选择开户城市'
                    })
                    return;
                }
                if (!this.settlement.settlement.openBank) {
                    this.$message({
                        type: 'error',
                        message: '请输入开户支行'
                    })
                    return;
                }
                saveShopSettleInfo(this.settlement.settlement).then(res => {
                    this.$message({
                        type: 'success',
                        message: '保存成功!'
                    });
                })
            }).catch(() =>{
                this.$message({
                    type: 'info',
                    message: '已取消保存'
                }); 
            })
        },
        getBankCardInfo: function() {
            if (!this.settlement.settlement.bankNumber) {
                return;
            }
            getBankCardInfoByCardNumber(this.settlement.settlement.bankNumber).then(res => {
                console.log(res)
                this.settlement.settlement.bankHouse = res.showapi_res_body.bankName
            })
        },
        uploadsAttachmentUrl: function(e){
            this.settlement.uploadsLoding = true;
            var file = e.raw;
            var fd = new FormData();
            fd.append('file', file);
            fd.path = '/settlement';
            uploadFiles(fd).then(data => {
                console.log(data)
                this.settlement.settlement.attachmentUrl = data.originalUrl;
                this.settlement.uploadsLoding = false;
            }).catch(err => {
                console.log(err)
                this.settlement.uploadsLoding = false;
            })
        }
    }
}

</script>
<style scoped>
.settlement {
    background-color: #ebebeb;
}

.settlement a {
    text-decoration: none;
    color: #fff;
}

.settlement-content {
    background-color: #fff;
    padding: 40px 50px;
    min-height: 650px;
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
</style>
