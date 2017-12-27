<template>
    <el-row>
        <el-form :model="editGoodsForm" label-width="80px" >
            <el-row class="uploadImgTitle">上传商品图片</el-row>
            <el-row class="uploadImgBox">
<!--                 <el-col :span="4">
                    <img class="goods-imgage" :src="headerImage ? headerImage:UPLOADURL + editGoodsForm.goods.goodsImgUrl" alt="商品图片">
                </el-col >
                <el-col class=" upload-img upload" :span="20">
                    <div class="upload-bg"></div>
                    <input class="upload-btn" type="file" id="change" ref="uploads" accept="image/*">
                    <label for="change"></label>
                </el-col> -->
                <!-- 图片上传 -->

                <div id="demo">  
                <!-- 遮罩层 -->  
                <div class="container" v-show="panel">  
                  <div>  
                    <img id="image" :src="url" alt="Picture" >  
                  </div>  
              
                  <button type="button" id="button" @click="crop">确定</button>  
                      
                </div>  
              
                <div style="padding:20px;">  
                    <div class="show">  
                      <div class="picture" :style="'backgroundImage:url('+headerImage+')'">  
                      </div>  
                    </div>  
                    <div style="margin-top:20px;">  
                      <input type="file" id="change" accept="image" @change="change">  
                      <label for="change"></label>  
                    </div>  
                      
                </div>  
              </div>  




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

                // 图片上传
                   headerImage:'',  
                  picValue:'',  
                  cropper:'',  
                  croppable:false,  
                  panel:false,  
                  url:'' ,



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
             change (e) {  
                  let files = e.target.files || e.dataTransfer.files;  
                  if (!files.length) return;  
                  this.panel = true;  
                  this.picValue = files[0];  
                    
                  this.url = this.getObjectURL(this.picValue);  
                  //每次替换图片要重新得到新的url  
                  if(this.cropper){  
                    this.cropper.replace(this.url);  
                  }  
                  this.panel = true;  
          
            }, 
             crop () {  
        this.panel = false;  
        var croppedCanvas;  
        var roundedCanvas;  
  
        if (!this.croppable) {  
          return;  
        }  
        // Crop  
        croppedCanvas = this.cropper.getCroppedCanvas();  
        console.log(this.cropper)  
        // Round  
        roundedCanvas = this.getRoundedCanvas(croppedCanvas);  
  
        this.headerImage = roundedCanvas.toDataURL();  
        this.postImg()  
          
    },  
    getRoundedCanvas (sourceCanvas) {  
        
      var canvas = document.createElement('canvas');  
      var context = canvas.getContext('2d');  
      var width = sourceCanvas.width;  
      var height = sourceCanvas.height;  
        
      canvas.width = width;  
      canvas.height = height;  
  
      context.imageSmoothingEnabled = true;  
      context.drawImage(sourceCanvas, 0, 0, width, height);  
      context.globalCompositeOperation = 'destination-in';  
      context.beginPath();  
      // context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);  
      context.fill();  
  
      return canvas;  
    },  
    postImg () {  
      //这边写图片的上传  
    }  ,


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
                if (res && res.list) {
                    this.goodsCategoryLists = res.list;
                    
                }
            })
            var goodsId = this.$route.query.goodsId;
            this.goodsId = goodsId;
            if (goodsId) {getGoodsById(goodsId).then(res => {
                console.log(res)
                console.log(6666)
                this.editGoodsForm = res;
                this.goodsId = res.goodsId;
                 this.editGoodsForm.addSpecs=res.goods.goodsSpecifications
                // this.editGoodsForm.goods.showImgUrl=this.UPLOADURL+res.goods.showImgUrl
            })
            }
        },
        mounted: function() {
            var self = this;
            var image = document.getElementById('image');
            this.cropper = new Cropper(image, {
                aspectRatio: 1,
                viewMode: 1,
                background: false,
                zoomable: false,
                dragMode: 'move',
                ready: function() {
                    self.croppable = true;
                }
            });
        },
    }
</script>
<style >
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

    /*上传图片*/
    #demo #button {  
  position: absolute;  
  right: 10px;  
  top: 10px;  
  width: 80px;  
  height: 40px;  
  border:none;  
  border-radius: 5px;  
  background:white;  
}  
#demo .show {  
  width: 100px;  
  height: 100px;  
  overflow: hidden;  
  position: relative;  
  border-radius: 5px;  
  border: 1px solid #d5d5d5;  
}  
#demo .picture {  
  width: 100%;  
  height: 100%;  
  overflow: hidden;  
  background-position: center center;  
  background-repeat: no-repeat;  
  background-size: cover;   
}  
#demo .container {  
    z-index: 99;  
    position: fixed;  
    padding-top: 60px;  
    left: 0;  
    top: 0;  
    right: 0;  
    bottom: 0;  
    background:rgba(0,0,0,1);  
}  
  
#demo #image {  
  max-width: 100%;  
}  
  
.cropper-view-box,.cropper-face {  
  border-radius: 50%;  
}  
  
.cropper-container {  
  font-size: 0;  
  line-height: 0;  
  
  position: relative;  
  
  -webkit-user-select: none;  
  
     -moz-user-select: none;  
  
      -ms-user-select: none;  
  
          user-select: none;  
  
  direction: ltr;  
  -ms-touch-action: none;  
      touch-action: none  
}  
  
.cropper-container img {  
  /* Avoid margin top issue (Occur only when margin-top <= -height) */  
  display: block;  
  min-width: 0 !important;  
  max-width: none !important;  
  min-height: 0 !important;  
  max-height: none !important;  
  width: 100%;  
  height: 100%;  
  image-orientation: 0deg  
}  
  
.cropper-wrap-box,  
.cropper-canvas,  
.cropper-drag-box,  
.cropper-crop-box,  
.cropper-modal {  
  position: absolute;  
  top: 0;  
  right: 0;  
  bottom: 0;  
  left: 0;  
}  
  
.cropper-wrap-box {  
  overflow: hidden;  
}  
  
.cropper-drag-box {  
  opacity: 0;  
  background-color: #fff;  
}  
  
.cropper-modal {  
  opacity: .5;  
  background-color: #000;  
}  
  
.cropper-view-box {  
  display: block;  
  overflow: hidden;  
  
  width: 100%;  
  height: 100%;  
  
  outline: 1px solid #39f;  
  outline-color: rgba(51, 153, 255, 0.75);  
}  
  
.cropper-dashed {  
  position: absolute;  
  
  display: block;  
  
  opacity: .5;  
  border: 0 dashed #eee  
}  
  
.cropper-dashed.dashed-h {  
  top: 33.33333%;  
  left: 0;  
  width: 100%;  
  height: 33.33333%;  
  border-top-width: 1px;  
  border-bottom-width: 1px  
}  
  
.cropper-dashed.dashed-v {  
  top: 0;  
  left: 33.33333%;  
  width: 33.33333%;  
  height: 100%;  
  border-right-width: 1px;  
  border-left-width: 1px  
}  
  
.cropper-center {  
  position: absolute;  
  top: 50%;  
  left: 50%;  
  
  display: block;  
  
  width: 0;  
  height: 0;  
  
  opacity: .75  
}  
  
.cropper-center:before,  
  .cropper-center:after {  
  position: absolute;  
  display: block;  
  content: ' ';  
  background-color: #eee  
}  
  
.cropper-center:before {  
  top: 0;  
  left: -3px;  
  width: 7px;  
  height: 1px  
}  
  
.cropper-center:after {  
  top: -3px;  
  left: 0;  
  width: 1px;  
  height: 7px  
}  
  
.cropper-face,  
.cropper-line,  
.cropper-point {  
  position: absolute;  
  
  display: block;  
  
  width: 100%;  
  height: 100%;  
  
  opacity: .1;  
}  
  
.cropper-face {  
  top: 0;  
  left: 0;  
  
  background-color: #fff;  
}  
  
.cropper-line {  
  background-color: #39f  
}  
  
.cropper-line.line-e {  
  top: 0;  
  right: -3px;  
  width: 5px;  
  cursor: e-resize  
}  
  
.cropper-line.line-n {  
  top: -3px;  
  left: 0;  
  height: 5px;  
  cursor: n-resize  
}  
  
.cropper-line.line-w {  
  top: 0;  
  left: -3px;  
  width: 5px;  
  cursor: w-resize  
}  
  
.cropper-line.line-s {  
  bottom: -3px;  
  left: 0;  
  height: 5px;  
  cursor: s-resize  
}  
  
.cropper-point {  
  width: 5px;  
  height: 5px;  
  
  opacity: .75;  
  background-color: #39f  
}  
  
.cropper-point.point-e {  
  top: 50%;  
  right: -3px;  
  margin-top: -3px;  
  cursor: e-resize  
}  
  
.cropper-point.point-n {  
  top: -3px;  
  left: 50%;  
  margin-left: -3px;  
  cursor: n-resize  
}  
  
.cropper-point.point-w {  
  top: 50%;  
  left: -3px;  
  margin-top: -3px;  
  cursor: w-resize  
}  
  
.cropper-point.point-s {  
  bottom: -3px;  
  left: 50%;  
  margin-left: -3px;  
  cursor: s-resize  
}  
  
.cropper-point.point-ne {  
  top: -3px;  
  right: -3px;  
  cursor: ne-resize  
}  
  
.cropper-point.point-nw {  
  top: -3px;  
  left: -3px;  
  cursor: nw-resize  
}  
  
.cropper-point.point-sw {  
  bottom: -3px;  
  left: -3px;  
  cursor: sw-resize  
}  
  
.cropper-point.point-se {  
  right: -3px;  
  bottom: -3px;  
  width: 20px;  
  height: 20px;  
  cursor: se-resize;  
  opacity: 1  
}  
  
@media (min-width: 768px) {  
  
  .cropper-point.point-se {  
    width: 15px;  
    height: 15px  
  }  
}  
  
@media (min-width: 992px) {  
  
  .cropper-point.point-se {  
    width: 10px;  
    height: 10px  
  }  
}  
  
@media (min-width: 1200px) {  
  
  .cropper-point.point-se {  
    width: 5px;  
    height: 5px;  
    opacity: .75  
  }  
}  
  
.cropper-point.point-se:before {  
  position: absolute;  
  right: -50%;  
  bottom: -50%;  
  display: block;  
  width: 200%;  
  height: 200%;  
  content: ' ';  
  opacity: 0;  
  background-color: #39f  
}  
  
.cropper-invisible {  
  opacity: 0;  
}  
  
.cropper-bg {  
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');  
}  
  
.cropper-hide {  
  position: absolute;  
  
  display: block;  
  
  width: 0;  
  height: 0;  
}  
  
.cropper-hidden {  
  display: none !important;  
}  
  
.cropper-move {  
  cursor: move;  
}  
  
.cropper-crop {  
  cursor: crosshair;  
}  
  
.cropper-disabled .cropper-drag-box,  
.cropper-disabled .cropper-face,  
.cropper-disabled .cropper-line,  
.cropper-disabled .cropper-point {  
  cursor: not-allowed;  
}  
  
</style>
