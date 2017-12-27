<template>
    <el-row>
        <el-form :model="editGoodsForm" label-width="80px" >
            <el-row class="uploadImgTitle">上传商品图片</el-row>
            <el-row class="uploadImgBox">
                <el-col :span="4">
                    <img class="goods-imgage" :src="headerImage ? headerImage:UPLOADURL + editGoodsForm.goods.goodsImgUrl" alt="商品图片">
                </el-col >
                <el-col class=" upload-img upload" :span="20">
                    <div class="upload-bg"></div>
                    <input class="upload-btn" type="file" id="change" ref="uploads" accept="image/*">
                    <label for="change"></label>
                </el-col>
                <!--<el-col :span="20">-->
                <!--<el-upload-->
                <!--class="avatar-uploader"-->
                <!--action="http://api.test.gongxiangdiancan.com/commons/upload/goods"-->
                <!--:show-file-list="false"-->
                <!--:on-success="handleAvatarSuccess"-->
                <!--:before-upload="beforeAvatarUpload">-->
                <!--&lt;!&ndash;<img v-if="editGoodsForm.goodsImgUrl" :src="UPLOADURL + editGoodsForm.goodsImgUrl" class="avatar">&ndash;&gt;-->
                <!--<i v-if class="el-icon-plus avatar-uploader-icon"></i>-->
                <!--</el-upload>-->
                <!--</el-col>-->
            </el-row>
            <el-form-item label="商品名称" class="goodsItem">
                <el-input type="text" v-model="editGoodsForm.goods.goodsName" placeholder="请输入商品名称，最多20字"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" class="goodsItem">
                <el-select v-model="editGoodsForm.goodsCategoryIdList" placeholder="请选择"  multiple filterable  allow-create>
                    <el-option
                        v-for="(item,index) in goodsCategoryLists"
                        :key="index"
                        :label="item.goodsCategoryName"
                        :value="item.goodsCategoryId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品规格" class="goodsItem">
            <el-row>
                     <span class="addSpecification" @click="addSpecifications">
                        <img src="../assets/images/edit-icon.png" alt="">
                        <span>添加规格</span>
                    </span>
            </el-row>
            <el-row v-if="addSpecification">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="规格名称">
                            <el-col :span="18">
                                <el-input type="text" v-model="editGoodsForm.goods.goodsName" placeholder="请输入规格名称"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="1">
                        <el-form-item label="餐盒费">
                            <el-col :span="18">
                                <el-input type="text" v-model="editGoodsForm.goods.goodsName" placeholder="请输入规格价格"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row style="margin: 10px 0px 10px 0px">
                    <el-col :span="10">
                        <el-form-item label="库存" prop="goodsName">
                            <el-col :span="18">
                                <el-switch on-text="" off-text="" v-model="editGoodsForm.goods.goodsName"></el-switch>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="1">
                        <el-form-item label="库存数量">
                            <el-col :span="18">
                                <el-input type="text" v-model="editGoodsForm.goods.goodsName" placeholder="请输入库存数量"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="10">
                        <el-form-item label="餐盒数量">
                            <el-col :span="18">
                                <el-input type="text" v-model="editGoodsForm.goods.goodsName" placeholder="请输入餐盒数量"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="1">
                        <el-form-item label="餐盒价格">
                            <el-col :span="18">
                                <el-input type="text" v-model="editGoodsForm.goods.goodsName" placeholder="请输入餐盒价格"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-row>
            <el-row v-if="editGoodsForm.addSpecs">
                <el-row v-for="(item,index) in editGoodsForm.addSpecs" :key="index">
                    <el-row class="standard-index">
                        <el-col :span="20">
                            规格{{index+1}}
                        </el-col>
                        <el-col :span="4" style="text-align: center">
                            <el-button type="text" style="color: #13ce66">修改</el-button>
                            <el-button type="text" style="color: red">删除</el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="规格名称">
                                <el-col :span="18">
                                    <el-input type="text" v-model="editGoodsForm.addSpecs.goodsSpecificationName" placeholder="请输入规格名称">{{item.goodsSpecificationName}}</el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-form-item label="价格">
                                <el-col :span="18">
                                    <el-input type="text" v-model="editGoodsForm.addSpecs.goodsSpecificationPrice" placeholder="请输入规格价格">{{item.goodsSpecificationPrice}}</el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin: 10px 0px 10px 0px">
                        <el-col :span="10">
                            <el-form-item label="库存" prop="goodsName">
                                <el-col :span="18">
                                    <el-switch on-text="" off-text="" v-model="editGoodsForm.goods.goodsName"></el-switch>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-form-item label="库存数量">
                                <el-col :span="18">
                                    <el-input type="text" v-model="editGoodsForm.goods.goodsName" placeholder="请输入库存数量"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row >
                        <el-col :span="10">
                            <el-form-item label="餐盒数量">
                                <el-col :span="18">
                                    <el-input type="text" v-model="editGoodsForm.addSpecs.boxesNumber" placeholder="请输入餐盒数量">{{item.boxesNumber}}</el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-form-item label="餐盒价格">
                                <el-col :span="18">
                                    <el-input type="text" v-model="editGoodsForm.addSpecs.boxesMoney" placeholder="请输入餐盒价格">{{item.boxesMoney}}</el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
            </el-row>
        </el-form-item>
            <el-form-item label="商品属性" class="goodsItem">
                <el-row>
                     <span class="addSpecification" @click="addAttributes">
                        <img src="../assets/images/edit-icon.png" alt="">
                        <span>添加属性</span>
                    </span>
                </el-row>
                <el-row v-if="addAttribute">
                    <el-form-item label="属性名称">
                        <el-col :span="21">
                            <el-input type="text" v-model="editGoodsForm.goods.goodsName" placeholder="请输入属性名称"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="属性值" style="margin-top: 10px">
                        <el-col :span="18">
                            <el-input type="text" v-model="editGoodsForm.goods.goodsName" placeholder="请输入属性值，最多4项，每项最多6个字" style="width: 690px"></el-input>
                        </el-col>
                        <el-col :span="2" :offset="1">
                            <el-button size="mini" type="success" style="float: right;margin-top: 6px">添加</el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                    </el-form-item>
                </el-row>
            </el-form-item>
            <el-form-item label="商品介绍" class="goodsItem">
                <el-input type="textarea" v-model="editGoodsForm.goods.goodsContent" placeholder="请输入商品简介，最多255字"></el-input>
            </el-form-item>
            <el-form-item label="商品状态" class="goodsItem">
                <el-radio-group v-model="editGoodsForm.goods.goodsStatus">
                    <el-radio label="下架"></el-radio>
                    <el-radio label="上架"></el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <el-row>
            <el-button type="success" size="small" @click="saveEditGoodsInfo">保存</el-button>
        </el-row>
    </el-row>
</template>
<script>
    import Cropper from 'cropperjs'
    import {getGoodsById, updateGoodsById, addGoods, getGoodsCategoryLists, uploadFiles } from '@/api/api'
    export default {
        data: function () {
            return {
                headerImage: '',
                panel: false,
                dialogVisible: false,
                addSpecification:false,  //添加规格
                addAttribute:false,      //添加属性
                editGoodsForm:{
                    goods: {
                        goodsContent: "",
                        goodsImgUrl: "",
                        goodsName: "",
                        goodsStatus: "SOLD_OUT",
                    },
                    goodsCategoryIdList: [],
                    goodsPropertys: [],
                    addSpecs: {
                        goodsSpecificationName:'',
                        goodsSpecificationPrice:'',
                        infiniteInventory:'',
                        boxesNumber:'',
                        boxesMoney:''
                    }
                },
                goodsId:0,
                standardObj: null,
                // editGoodsFormRules:{
                //     goodsName:[
                //         { required: true, message: '请输入商品名称', trigger: 'blur' },
                //     ],
                //     goodsClassNames:[
                //         { required: true, message: '请选择商品分类', trigger: 'blur' },
                //     ],
                //     goodsPrice:[
                //         { required: true, message: '请输入价格', trigger: 'blur' },
                //     ],
                //     feeMeals:[
                //         { required: true, message: '请输入餐盒费', trigger: 'blur' },
                //     ],
                //     goodsContent:[
                //         { required: true, message: '请输入商品简介', trigger: 'blur' },
                //     ],
                // },
                goodsCategoryLists:[]
            }
        },
        methods:{
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            saveEditGoodsInfo(){
                //debugger
                //编辑
                if (this.goodsId) {
                    console.log(666)
                    updateGoodsById(this.goodsId, this.editGoodsForm).then(() => {
                        this.$message.success("操作成功")
                    })
                }else{
                    //新增
                    var names = [];
                    this.goodsCategoryLists.forEach((item) => {
                        if(this.editGoodsForm.goodsCategoryIdList.indexOf(item.goodsCategoryId) != -1){
                            names.push(item.goodsCategoryName)
                        }
                    })
                    this.editGoodsForm.goods.goodsClassNames = names.join(",");
                    addGoods(this.editGoodsForm).then(() => {
                        this.$message.success('操作成功');
                    })
                }
            },
            //上传图片
            // handleAvatarSuccess(res, file) {
            //     this.editGoodsForm.goods.showImgUrl = this.UPLOADURL+res.data.originalUrl
            //     this.saveImgUrl = res.data.originalUrl
            //     this.$message.success('上传成功');
            // },
            beforeAvatarUpload(file) {
                //     const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                //     if (!isJPG) {
                //         this.$message.error('上传头像图片只能是 JPG 格式!');
                //     }  q2
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
            },
            getObjectURL(file) {
                var url = null;
                if (window.createObjectURL != undefined) { // basic
                    url = window.createObjectURL(file);
                } else if (window.URL != undefined) { // mozilla(firefox)
                    url = window.URL.createObjectURL(file);
                } else if (window.webkitURL != undefined) { // webkit or chrome
                    url = window.webkitURL.createObjectURL(file);
                }
                return url;
            },
            change(e) {
                this.popupVisible = true;
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                this.panel = true;
                this.picValue = files[0];

                this.url = this.getObjectURL(this.picValue);
                //每次替换图片要重新得到新的url
                if (this.cropper) {
                    this.cropper.replace(this.url);
                }

            },
            //点击添加规格
            addSpecifications(){
                this.addSpecification = true
                console.log(444)
            },
            //点击添加属性
            addAttributes(){
                this.addAttribute = true
            }
        },
        created(){
            //获取商品title列表
            var paramas={
                pageSize:99999,
            }
            getGoodsCategoryLists(paramas).then( res =>{
                this.goodsCategoryLists = res.list;
                console.log(this.goodsCategoryLists)
                console.log(3333)
            })
            var goodsId = this.$route.query.goodsId;
            this.goodsId = goodsId;
            if (goodsId) {getGoodsById(goodsId).then(res => {
                this.editGoodsForm = res;
                this.goodsId = res.goodsId;
                 this.editGoodsForm.addSpecs=res.goods.goodsSpecifications
                // this.editGoodsForm.goods.showImgUrl=this.UPLOADURL+res.goods.showImgUrl
            })
            }
        },
        mounted: function() {
            //初始化这个裁剪框
            // var self = this;
            // var image = document.getElementById('image');
            // this.cropper = new Cropper(image, {
            //     aspectRatio: 1,
            //     viewMode: 1,
            //     background: false,
            //     zoomable: false,
            //     dragMode: 'move',
            //     ready: function() {
            //         self.croppable = true;
            //     }
            // });
        },
    }
</script>
<style scoped>
    .uploadImgTitle{
        background-color: white;
        padding:10px;
        border-bottom: 1px solid lightgrey;
        line-height: 30px;
    }
    .uploadImgBox{
        background-color: white;
        padding: 20px;
    }
    .goodsItem{
        background-color: white;
        margin: 10px 0px 10px 0px ;
        padding: 10px;
    }
    .goods-imgage{
        width: 146px;
        height: 146px;
        border-radius: 10px;
    }

    /*上传图片*/
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 146px;
        height: 146px;
        line-height: 146px;
        text-align: center;
    }
    .avatar {
        width: 146px;
        height: 146px;
        display: block;
    }
    .upload-btn {
        width: 146px;
        height: 146px;
        position: absolute;
        left: 0;
        opacity: 0;
        z-index: 2;
    }
    .upload-img {
        width: 146px;
        height: 146px;
        line-height:130px;
        text-align: center;
    }
    .upload {
        margin-left: 2px;
        position: relative;
    }
    .upload-bg {
        width: 146px;
        height: 146px;
        background: url(../assets/images/upload-btn.jpg) no-repeat center center;
        background-size: contain;
        position: absolute;
        z-index: 1;
        color: #fff;
        text-align: center;
        line-height: 100px;
    }
    .addSpecification>img{
        width: 13px;
        height:13px;
    }
    .addSpecification>span{
        color: #13ce66;
    }
    .standard-index{
        background-color: rgba(218, 218, 218, 0.13);
        padding-left: 10px;
        margin-bottom: 10px;
    }
</style>
