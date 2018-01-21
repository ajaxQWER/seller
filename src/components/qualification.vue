<template>
    <div class="qualification">
        <el-row class="row qualification-content">
            <el-row class="license">
                <el-form :model="qualification" ref="license" label-width="100px">
                    <el-form-item class="normal-item required" label="证件类型">
                        <el-select v-model="qualification.document.documentType" placeholder="请选择证件类型">
                            <el-option v-for="(item,index) in licenseObj" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="normal-item required" label="真实姓名">
                        <el-input v-model="qualification.document.readyName"></el-input>
                    </el-form-item>
                    <el-form-item class="normal-item required" label="证件号码" prop="idCardNum">
                        <el-input v-model="qualification.document.documentNum"></el-input>
                    </el-form-item>
                    <el-form-item label="证件照片" prop="licensePhoto" class="required">
                        <div class="photo-info">
                            <div class="photo-title">正面照</div>
                            <div class="photo-upload">
                                <el-upload class="upload-demo" ref="fullFacePhotoUrl" action="" :auto-upload="false" :show-file-list="false" :on-change="uploadFullFacePhotoUrl">
                                    <img v-if="qualification.document.fullFacePhotoUrl" :src="UPLOADURL + qualification.document.fullFacePhotoUrl + '/shopDetail.png'" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div>
                        </div>
                        <div class="photo-info">
                            <div class="photo-title">反面照</div>
                            <div class="photo-upload">
                                <el-upload class="upload-demo" ref="reverseSideAsUrl" action="" :auto-upload="false" :show-file-list="false" :on-change="uploadReverseSideAsUrl">
                                    <img v-if="qualification.document.reverseSideAsUrl" :src="UPLOADURL + qualification.document.reverseSideAsUrl + '/shopDetail.png'" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div>
                        </div>
                        <div class="photo-info">
                            <div class="photo-title">手持证件正面照</div>
                            <div class="photo-upload">
                                <el-upload class="upload-demo" ref="handFullFacePhotoUrl" action="" :auto-upload="false" :show-file-list="false" :on-change="uploadHandFullFacePhotoUrl">
                                    <img v-if="qualification.document.handFullFacePhotoUrl" :src="UPLOADURL + qualification.document.handFullFacePhotoUrl + '/shopDetail.png'" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div>
                        </div>
                        <div class="photo-info">
                            <div class="photo-title">附件</div>
                            <div class="photo-upload">
                                <el-upload class="upload-demo" ref="handFullFacePhotoUrl" action="" :auto-upload="false" :show-file-list="false" :on-change="uploadDocumentAttachmentUrl">
                                    <img v-if="qualification.document.attachmentUrl" :src="UPLOADURL + qualification.document.attachmentUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div>
                        </div>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row class="license">
                <el-form :model="qualification.subject" ref="subject" label-width="100px">
                    <el-form-item class="normal-item required" label="主体资质">
                        <el-select v-model="qualification.subject.subjectDocument" placeholder="请选择主体资质">
                            <el-option v-for="(item,index) in certificateType" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="large-item required" label="单位名称">
                        <el-input v-model="qualification.subject.unitName"></el-input>
                    </el-form-item>
                    <el-form-item class="normal-item required" label="法定代表人">
                        <el-input v-model="qualification.subject.legal"></el-input>
                    </el-form-item>
                    <el-form-item class="normal-item required" label="注册号">
                        <el-input v-model="qualification.subject.regNumber"></el-input>
                    </el-form-item>
                    <el-form-item class="large-item required" label="注册地址">
                        <el-input v-model="qualification.subject.regAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="有效期" class="required">
                        <span>是否长期</span>
                        <el-switch v-model="qualification.subject.longTerm" on-text="是" off-text="否"></el-switch>
                        <span v-if="!qualification.subject.longTerm">
                            <el-date-picker v-model="qualification.subject.beginTime" type="date" placeholder="开始时间" @change="formatBeginTime1(qualification.subject.beginTime)"></el-date-picker>
                            <el-date-picker v-model="qualification.subject.endTime" type="date" placeholder="到期时间" @change="formatEndTime1(qualification.subject.endTime)"></el-date-picker>
                        </span>
                    </el-form-item>
                    <el-form-item label="资质照片" class="required">
                        <div class="photo-info">
                            <div class="photo-title">资质照片</div>
                            <div class="photo-upload">
                                <el-upload class="upload-demo" ref="handBusinessUrl" action="" :auto-upload="false" :show-file-list="false" :on-change="uploadHandBusinessUrl">
                                    <img v-if="qualification.subject.businessUrl" :src="UPLOADURL + qualification.subject.businessUrl + '/shopDetail.png'" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div>
                        </div>
                        <div class="photo-info">
                            <div class="photo-title">附件</div>
                            <div class="photo-upload">
                                <el-upload class="upload-demo" ref="handBusinessUrl" action="" :auto-upload="false" :show-file-list="false" :on-change="uploadSubjectAttachmentUrl">
                                    <img v-if="qualification.subject.attachmentUrl" :src="UPLOADURL + qualification.subject.attachmentUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div>
                        </div>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row class="license">
                <el-form :model="qualification.industry" ref="industry" label-width="100px">
                    <el-form-item label="行业资质">
                        <el-select v-model="qualification.industry.intelligence" placeholder="请选择行业资质">
                            <el-option v-for="(item,index) in mainQualifications" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="large-item" label="单位名称">
                        <el-input v-model="qualification.industry.unitName"></el-input>
                    </el-form-item>
                    <el-form-item class="normal-item" label="法定代表人">
                        <el-input v-model="qualification.industry.legal"></el-input>
                    </el-form-item>
                    <el-form-item class="large-item" label="许可证编号">
                        <el-input v-model="qualification.industry.licenseNumber"></el-input>
                    </el-form-item>
                    <el-form-item class="large-item" label="许可证地址">
                        <el-input v-model="qualification.industry.licenseAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="有效期">
                        <span>是否长期</span>
                        <el-switch v-model="qualification.industry.longTerm" on-text="是" off-text="否"></el-switch>
                        <span v-if="!qualification.industry.longTerm">
                            <el-date-picker v-model="qualification.industry.beginTime" type="date" placeholder="开始时间" @change="formatBeginTime2(qualification.industry.beginTime)"></el-date-picker>
                            <el-date-picker v-model="qualification.industry.endTime" type="date" placeholder="到期时间" @change="formatEndTime2(qualification.industry.endTime)"></el-date-picker>
                        </span>
                    </el-form-item>
                    <el-form-item label="资质照片">
                        <div class="photo-info">
                            <div class="photo-title">资质照片</div>
                            <div class="photo-upload">
                                <el-upload class="upload-demo" ref="handFoodUrl" action="" :auto-upload="false" :show-file-list="false" :on-change="uploadHandFoodUrl">
                                    <img v-if="qualification.industry.foodUrl" :src="UPLOADURL + qualification.industry.foodUrl + '/shopDetail.png'" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div>
                        </div>
                        <div class="photo-info">
                            <div class="photo-title">附件</div>
                            <div class="photo-upload">
                                <el-upload class="upload-demo" ref="handFoodUrl" action="" :auto-upload="false" :show-file-list="false" :on-change="uploadIndustryAttachmentUrl">
                                    <img v-if="qualification.industry.attachmentUrl" :src="UPLOADURL + qualification.industry.attachmentUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div>
                        </div>
                    </el-form-item>
                    <el-button type="primary" size="large" @click="submitQualification" class="saveBase">保存</el-button>
                </el-form>
            </el-row>
        </el-row>
    </div>
</template>
<script>
import { saveShopQualificationInfo, getShopQualificationInfo, uploadFiles } from '@/api/api'
export default {
    props:["qualification"],
    data() {
        return {
            // qualification: {
            //     document: {
            //         documentNum: "",
            //         documentType: "",
            //         fullFacePhotoUrl: "",
            //         handFullFacePhotoUrl: "",
            //         readyName: "",
            //         reverseSideAsUrl: "",
            //         attachmentUrl: null
            //     },
            //     industry: {
            //         beginTime: '',
            //         endTime: '',
            //         foodUrl: "",
            //         intelligence: null,
            //         legal: "",
            //         licenseAddress: "",
            //         licenseNumber: "",
            //         longTerm: true,
            //         unitName: "",
            //         attachmentUrl: null
            //     },
            //     subject: {
            //         beginTime: '',
            //         businessUrl: '',
            //         endTime: "",
            //         legal: "",
            //         longTerm: true,
            //         regAddress: "",
            //         regNumber: "",
            //         subjectDocument: "",
            //         unitName: "",
            //         attachmentUrl: null
            //     }
            // },
            licenseObj: [{
                label: '身份证',
                value: 'ID_CARD'
            }, {
                label: '港澳居民来往内地通行证',
                value: 'HONG_KONG_AND_MACAO_RESIDENTS_TRAVEL_TO_AND_FROM_THE_MAINLAND'
            }, {
                label: '台胞证',
                value: 'TAIWAN_COMPATRIOTS_CERTIFICATE'
            }, {
                label: '护照',
                value: 'PASSPORT'
            }, {
                label: '其他',
                value: 'OTHER'
            }],
            mainQualifications: [{
                label: '餐饮服务许可证',
                value: 'FOOD_SERVICE_LICENSE'
            }, {
                label: '食品经营许可证',
                value: 'FOOD_BUSINESS_LICENSE'
            }, {
                label: '食品流通许可证',
                value: 'FOOD_CIRCULATION_LICENSE'
            }, {
                label: '食品摊贩临时经营公示卡',
                value: 'TEMPORARY_PUBLICITY_CARDS_FOR_FOOD_VENDORS'
            }, {
                label: '全国工业产品生产许可证',
                value: 'NATIONAL_INDUSTRIAL_PRODUCT_PRODUCTION_LICENSE'
            }, {
                label: '小微餐饮分级证/登记凭证',
                value: 'CLASSIFICATION_CERTIFICATE_REGISTRATION_CERTIFICATE_FOR_SMALL_AND_MICRO_CATERING'
            }, {
                label: '食品生产加工作坊准许证',
                value: 'PERMIT_FOR_FOOD_PRODUCTION_AND_PROCESSING_WORKSHOP'
            }, {
                label: '食品小作坊生产许可证',
                value: 'FOOD_WORKSHOP_PRODUCTION_LICENSE'
            }, {
                label: '其他',
                value: 'OTHER'
            }],
            certificateType: [{
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
            }]
        }
    },
    methods: {
        //上传身份证正面照
        uploadFullFacePhotoUrl: function(e) {
            var file = e.raw;
            var fd = new FormData();
            fd.append('file', file);
            fd.path = '/qualification';
            uploadFiles(fd).then(data => {
                console.log(data)
                this.qualification.document.fullFacePhotoUrl = data.originalUrl;
            }).catch(err => {
                console.log(err)
            })
        },
        //上传身份证反面照
        uploadReverseSideAsUrl: function(e) {
            var file = e.raw;
            var fd = new FormData();
            fd.append('file', file);
            fd.path = '/qualification';
            uploadFiles(fd).then(data => {
                console.log(data)
                this.qualification.document.reverseSideAsUrl = data.originalUrl;
            }).catch(err => {
                console.log(err)
            })
        },
        //上传手持证件正面照
        uploadHandFullFacePhotoUrl: function(e) {
            var file = e.raw;
            var fd = new FormData();
            fd.append('file', file);
            fd.path = '/qualification';
            uploadFiles(fd).then(data => {
                console.log(data)
                this.qualification.document.handFullFacePhotoUrl = data.originalUrl;
            }).catch(err => {
                console.log(err)
            })
        },
        //附件
        uploadDocumentAttachmentUrl: function(e) {
            var file = e.raw;
            var fd = new FormData();
            fd.append('file', file);
            fd.path = '/qualification';
            uploadFiles(fd).then(data => {
                console.log(data);
                this.qualification.document.attachmentUrl = data.originalUrl;
            }).catch(err => {
                console.log(err)
            })
        },
        //主体资质照片上传
        uploadHandBusinessUrl: function(e) {
            var file = e.raw;
            var fd = new FormData();
            fd.append('file', file);
            fd.path = '/qualification';
            uploadFiles(fd).then(data => {
                console.log(data)
                this.qualification.subject.businessUrl = data.originalUrl;
            }).catch(err => {
                console.log(err)
            })
        },
        uploadSubjectAttachmentUrl: function(e) {
            var file = e.raw;
            var fd = new FormData();
            fd.append('file', file);
            fd.path = '/qualification';
            uploadFiles(fd).then(data => {
                console.log(data);
                this.qualification.subject.attachmentUrl = data.originalUrl;
            }).catch(err => {
                console.log(err)
            })
        },
        uploadHandFoodUrl: function(e) {
            var file = e.raw;
            var fd = new FormData();
            fd.append('file', file);
            fd.path = '/qualification';
            uploadFiles(fd).then(data => {
                console.log(data)
                this.qualification.industry.foodUrl = data.originalUrl;
            }).catch(err => {
                console.log(err)
            })
        },
        uploadIndustryAttachmentUrl: function(e) {
            var file = e.raw;
            var fd = new FormData();
            fd.append('file', file);
            fd.path = '/qualification';
            uploadFiles(fd).then(data => {
                console.log(data);
                this.qualification.industry.attachmentUrl = data.originalUrl;
            }).catch(err => {
                console.log(err)
            })
        },
        formatBeginTime1: function(time) {
            this.qualification.subject.beginTime = this.moment(time).format('YYYY-MM-DD')
        },
        formatBeginTime2: function(time) {
            this.qualification.industry.beginTime = this.moment(time).format('YYYY-MM-DD')
        },
        formatEndTime1: function(time) {
            this.qualification.subject.endTime = this.moment(time).format('YYYY-MM-DD')
        },
        formatEndTime2: function(time) {
            this.qualification.industry.endTime = this.moment(time).format('YYYY-MM-DD')
        },
        submitQualification: function() {
            if (this.qualification.document.documentType == '') {
                this.$message({
                    type: 'error',
                    message: '请选择证件类型'
                })
                return;
            }
            if (this.qualification.document.readyName == '') {
                this.$message({
                    type: 'error',
                    message: '请输入真实姓名'
                })
                return;
            }
            if (this.qualification.document.documentNum == '') {
                this.$message({
                    type: 'error',
                    message: '请输入证件号码'
                })
                return;
            }
            if (this.qualification.document.fullFacePhotoUrl == '') {
                this.$message({
                    type: 'error',
                    message: '请上传证件正面照'
                })
                return;
            }
            if (this.qualification.document.reverseSideAsUrl == '') {
                this.$message({
                    type: 'error',
                    message: '请上传证件反面照'
                })
                return;
            }
            if (this.qualification.document.handFullFacePhotoUrl == '') {
                this.$message({
                    type: 'error',
                    message: '请上传手持证件照'
                })
                return;
            }
            if (this.qualification.subject.subjectDocument == '') {
                this.$message({
                    type: 'error',
                    message: '请选择主体资质'
                })
                return;
            }
            if (this.qualification.subject.unitName == '') {
                this.$message({
                    type: 'error',
                    message: '请输入单位名称'
                })
                return;
            }
            if (this.qualification.subject.legal == '') {
                this.$message({
                    type: 'error',
                    message: '请输入法定代表人'
                })
                return;
            }
            if (this.qualification.subject.regNumber == '') {
                this.$message({
                    type: 'error',
                    message: '请输入注册号'
                })
                return;
            }
            if (this.qualification.subject.regAddress == '') {
                this.$message({
                    type: 'error',
                    message: '请输入注册地址'
                })
                return;
            }
            if (this.qualification.subject.longTerm) {
                delete this.qualification.subject.beginTime;
                delete this.qualification.subject.endTime;
            } else {
                console.log(this.qualification.subject.beginTime)
                if (!this.qualification.subject.beginTime) {
                    this.$message({
                        type: 'error',
                        message: '请选择证件生效日期'
                    })
                    return;
                }
                if (!this.qualification.subject.endTime) {
                    this.$message({
                        type: 'error',
                        message: '请选择证件失效日期'
                    })
                    return;
                }
            }
            if (this.qualification.subject.businessUrl == '') {
                this.$message({
                    type: 'error',
                    message: '请上传主体资质照片'
                })
                return;
            }
            console.log(this.qualification)
            saveShopQualificationInfo(this.qualification).then(res => {
                this.$message({
                    type: 'success',
                    message: '保存成功!'
                });
            })
        }
    },
}

</script>
<style scoped>
.saveBase{
    margin-left: 40px
}
.qualification {
    background-color: #ebebeb;
}

.qualification a {
    text-decoration: none;
    color: #fff;
}

.qualification-content {
    background-color: #fff;
    padding: 40px 50px;
    min-height: 650px;
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

</style>