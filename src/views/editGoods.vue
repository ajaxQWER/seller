<template>
    <el-row>
        <el-form :model="editGoodsForm" label-width="85px" >
            <el-row class="returnBack">
                <el-button type="primary" @click="back" size="small"><i class="el-icon--left el-icon-arrow-left"></i>返回</el-button>
            </el-row>
            <el-row class="uploadImgTitle">上传商品图片</el-row>
            <el-row class="uploadImgBox">
                <!-- 图片上传 -->
                <div id="demo">
                <!-- 遮罩层 -->
                    <div class="container" v-show="panel">
                          <div>
                                <img id="image" :src="url" alt="Picture" >
                          </div>
                           <button type="button" id="cancelButton" @click="cancelCrop">取消</button>
                           <button type="button" id="button" @click="crop">确定</button>
                    </div>
                    <div style="padding:20px;" class="imgBox">
                        <div class="show">
                            <img class="goods-imgage" :src="headerImage ? headerImage:UPLOADURL + editGoodsForm.goods.goodsImgUrl" alt="商品图片">
                        </div>
                        <div style="margin-top:20px;">
                            <div class="upload-bg"></div>
                            <input type="file" id="change" accept="image" @change="change" class="upload-btn">
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
                <!--添加商品规格弹窗-->
                <el-dialog title="添加规格" :visible.sync="addSpecificationDialog">
                    <el-form :model="addGoodsSpecs" label-width="100px">
                        <el-row class="addSpecifications">
                            <el-row >
                                <el-col :span="10">
                                    <el-form-item label="规格名称：">
                                        <el-col :span="13">
                                            <el-input type="text" v-model="addGoodsSpecs.goodsSpecificationName" placeholder="请输入规格名称" style="width: 150px"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10" :offset="1">
                                    <el-form-item label="价格：">
                                        <el-col :span="13">
                                            <el-input type="number" v-model.number="addGoodsSpecs.goodsSpecificationPrice" placeholder="请输入规格价格" style="width: 150px"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row style="margin: 10px 0px 10px 0px">
                                <el-col :span="10">
                                    <el-form-item label="库存：" prop="goodsName">
                                        <el-col :span="13">
                                            <el-col :span="10">
                                                <el-switch on-text="" off-text="" on-color="#13ce66" v-model="addGoodsSpecs.infiniteInventory"></el-switch>
                                            </el-col>
                                            <el-col :span="10" v-text="formatVal(addGoodsSpecs.infiniteInventory)">
                                            </el-col>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10" :offset="1" v-if="!addGoodsSpecs.infiniteInventory">
                                    <el-form-item label="库存数量：">
                                        <el-col :span="13">
                                            <el-input type="number" v-model.number="addGoodsSpecs.stock" placeholder="请输入库存数量" style="width: 150px"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row >
                                <el-col :span="10">
                                    <el-form-item label="餐盒数量：">
                                        <el-col :span="13">
                                            <el-input type="number" v-model.number="addGoodsSpecs.boxesNumber" placeholder="请输入餐盒数量" style="width: 150px"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10" :offset="1">
                                    <el-form-item label="餐盒价格：">
                                        <el-col :span="13">
                                            <el-input type="number" v-model.number="addGoodsSpecs.boxesMoney" placeholder="请输入餐盒价格" style="width: 150px"></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-row>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="cancelAddSpecs" size="small">取 消</el-button>
                        <el-button type="primary" @click="saveAddSpecs" :loading="SpecsLoading" size="small">保 存</el-button>
                    </div>
                </el-dialog>
                <el-row v-if="editGoodsForm.goodsSpecifications">
                    <el-row v-for="(item,index) in editGoodsForm.goodsSpecifications" :key="index" class="showSpecs">
                        <el-row class="standard-index">
                            <el-col :span="20">
                                规格{{index+1}}
                            </el-col>
                            <el-col :span="4" style="text-align: center">
                                <el-button type="text" style="color: #13ce66" @click="editGoodsSpecs(index)" v-if="!item.isEditMode">修改</el-button>
                                <el-button type="text" style="color: rgba(32,160,255,0.87)" @click="saveSpecs(index,item)" v-else>保存</el-button>
                                <el-button type="text" style="color: red" @click="deleteSpecs(index)">删除</el-button>
                            </el-col>
                        </el-row>
                        <el-row >
                            <el-col :span="25">
                                <el-form-item label="库存">
                                    <el-col :span="18">
                                        <el-input type="number" v-model.number="item.stock" style="width: 643px" v-bind:disabled="!item.isEditMode"></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row style="margin: 10px 0px 10px 0px">
                            <el-col :span="10">
                                <el-form-item label="规格名称">
                                    <el-col :span="18">
                                        <el-input type="text" v-model="item.goodsSpecificationName" placeholder="请输入规格名称" v-bind:disabled="!item.isEditMode"></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" :offset="1">
                                <el-form-item label="价格">
                                    <el-col :span="18">
                                        <el-input type="number" v-model.number="item.goodsSpecificationPrice" placeholder="请输入规格价格" v-bind:disabled="!item.isEditMode"></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row >
                            <el-col :span="10">
                                <el-form-item label="餐盒数量">
                                    <el-col :span="18">
                                        <el-input type="number" v-model.number="item.boxesNumber" placeholder="请输入餐盒数量" v-bind:disabled="!item.isEditMode"></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" :offset="1">
                                <el-form-item label="餐盒价格">
                                    <el-col :span="18">
                                        <el-input type="number" v-model.number="item.boxesMoney" placeholder="请输入餐盒价格" v-bind:disabled="!item.isEditMode"></el-input>
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
                    <!--添加商品属性弹窗-->
                    <el-dialog title="添加属性" :visible.sync="addAttributesDialog">
                        <el-form :model="addGoodsAttribute" label-width="80px">
                            <el-row>
                                <el-form-item label="属性名称">
                                    <el-col :span="13">
                                        <el-input type="text" v-model="addGoodsAttribute.goodsPropertyName" placeholder="请输入属性名称" size="small"></el-input>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="属性值" style="margin-top: 10px">
                                    <el-col :span="13">
                                        <el-input type="text" placeholder="请输入属性值，最多4项，每项最多6个字" size="small" v-model="addGoodsAttribute.propValue"></el-input>
                                    </el-col>
                                    <el-col :span="2" :offset="1">
                                        <el-button size="mini" type="success" style="margin-top: 6px" @click="addPropItem">添加</el-button>
                                    </el-col>
                                </el-form-item>
                                <el-form-item style="margin-top: 10px" v-if="addGoodsAttribute.goodsPropertyValueList && addGoodsAttribute.goodsPropertyValueList.length">
                                    <el-row style="margin-left: 80px">
                                        <el-col :span="2" v-for="(item,index) in addGoodsAttribute.goodsPropertyValueList" :key="index" class="goodsPropertyItem" >
                                            <span>{{item.value}}</span>
                                            <span class="delete-btn" @click="deleteItem(index)"></span>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                            </el-row>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="cancelAttribute" size="small">取 消</el-button>
                            <el-button type="primary" @click="saveAddAttribute()" :loading="SpecsLoading" size="small">保 存</el-button>
                        </div>
                    </el-dialog>
                    <el-row v-if="editGoodsForm.goodsPropertys">
                        <el-row v-for="(item,index) in editGoodsForm.goodsPropertys" >
                            <el-row class="standard-index">
                                <el-col :span="20">
                                    属性{{index+1}}
                                </el-col>
                                <el-col :span="4" style="text-align: center">
                                    <el-button type="text" style="color: #13ce66" @click="editGoodsAttribute(index)" v-if="!item.isEditMode">修改</el-button>
                                    <el-button type="text" style="color: rgba(32,160,255,0.87)" @click="saveAttribute(index,item)" v-if="item.isEditMode">保存</el-button>
                                    <el-button type="text" style="color: red" @click="deleteGoodsProperty(index)">删除</el-button>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-form-item label="属性名称">
                                    <el-col :span="21">
                                        <el-input type="text" v-model="item.goodsPropertyName" placeholder="请输入属性名称" :disabled="!item.isEditMode" style="width: 650px"></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="添加属性值" style="margin-top: 10px" v-if="item.isEditMode">
                                    <el-col :span="18">
                                        <el-input type="text"  placeholder="请输入属性值，最多4项，每项最多6个字" style="width: 650px" v-model="item.propValue"></el-input>
                                    </el-col>
                                    <el-col :span="2" :offset="1">
                                        <el-button size="mini" type="success" style="margin-top: 6px" @click="addEditAttribute(item.goodsPropertyValueList,item.propValue,item)">添加</el-button>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="属性值" style="margin-top: 10px" v-if="item.goodsPropertyValueList && item.goodsPropertyValueList.length">
                                       <el-row >
                                           <el-col :span="2" v-for="(prop,propIndex) in item.goodsPropertyValueList" :key="propIndex" class="goodsPropertyItem">
                                               <span>{{prop.value}}</span>
                                               <span class="delete-btn" v-if="item.isEditMode" @click="deleteAttribute(item.goodsPropertyValueList,propIndex)"></span>
                                           </el-col>
                                       </el-row>
                                </el-form-item>
                            </el-row>
                        </el-row>
                    </el-row>
                </el-form-item>
                <el-form-item label="商品介绍" class="goodsItem">
                    <el-input type="textarea" v-model="editGoodsForm.goods.goodsContent" placeholder="请输入商品简介，最多255字"></el-input>
                </el-form-item>
                <el-form-item label="商品状态" class="goodsItem">
                    <el-radio-group v-model="editGoodsForm.goods.goodsStatus">
                        <el-radio label="SOLD_OUT">下架</el-radio>
                        <el-radio label="PUTAWAY">上架</el-radio>
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
            // 图片上传以及裁图
                headerImage:'',
                picValue:'',
                cropper:'',
                croppable:false,
                panel:false,
                url:'' ,
                SpecsLoading:false, //商品规格弹窗loading
                AttributesLoading:false, //商品属性弹窗loading
                addSpecificationDialog:false, //商品规格弹窗
                addAttributesDialog:false, //商品属性弹窗
                addSpecification:false,  //添加规格
                addAttribute:false,      //添加属性
                editSpeciDisabled :true,  //禁止编辑商品规格
                editAttributeDisabled :true,  //禁止编辑商品属性
                addGoodsSpecs:{  //添加规格
                    goodsSpecificationName:'',
                    goodsSpecificationPrice:'',
                    infiniteInventory:'',
                    boxesNumber:'',
                    boxesMoney:'',
                    stock:'', //库存数量
                    isEditMode:false
                },
                addGoodsAttribute:{ //添加属性
                    goodsPropertyName:'',
                    propValue: '',
                    goodsPropertyValueList: [],
                    isEditMode:false
                },
                // tempAttributeArr: [],
                editGoodsForm:{
                    goods: {
                        goodsContent: "",
                        goodsImgUrl: "",
                        goodsName: "",
                        goodsStatus: "SOLD_OUT",
                    },
                    goodsCategoryIdList: [],
                    goodsPropertys: [],
                    addSpecs: [],
                    goodsSpecifications:[],
                },
                deleteStandardObj: [],
                goodsId:0,
                goodsCategoryLists:[]
            }
        },
        methods:{
            //返回上一页
            back: function() {
                this.$router.back()
            },
            // 回显信息
            showData(){
                //获取商品title列表
                var paramas={
                    pageSize:99999,
                }
                getGoodsCategoryLists(paramas).then( res =>{
                    if (res && res.list) {
                        this.goodsCategoryLists = res.list;
                        var goodsId = this.$route.query.goodsId;
                        this.goodsId = goodsId;
                        if (goodsId) {
                            getGoodsById(goodsId).then(res => {
                                console.log(res)
                                this.editGoodsForm = res;
                                this.goodsId = res.goodsId;
                                this.editGoodsForm.addSpecs = [];
                                // this.editGoodsForm.goodsPropertys = res.goods.goodsPropertys;
                                var goodsSpecifications = res.goods.goodsSpecifications;
                                goodsSpecifications.forEach((item) => {
                                    //***这里需要动态添加属性***
                                    this.$set(item,'isEditMode',false)
                                });
                                this.$set(this.editGoodsForm,'goodsSpecifications',goodsSpecifications);
                                var goodsPropertys = res.goods.goodsPropertys;
                                goodsPropertys.forEach((item) => {
                                    //****这里需要动态添加属性***
                                    this.$set(item,'isEditMode',false)
                                });
                                this.$set(this.editGoodsForm,'goodsPropertys',goodsPropertys);
                                this.editGoodsForm.goods.goodsImgUrl=res.goods.goodsImgUrl
                            })
                        }
                    }
                })
            },
            saveEditGoodsInfo(){
                console.log(this.goodsId)
                console.log(1111)
                //编辑
                if (this.goodsId) {
                    var reqData = {}
                    reqData.info = this.editGoodsForm.goods
                    reqData.goodsCategoryIdList = this.editGoodsForm.goodsCategoryIdList
                    reqData.goodsPropertys = this.editGoodsForm.goodsPropertys
                    reqData.updateSpecs = []
                    this.editGoodsForm.goodsSpecifications.forEach(function(item){
                        if (item.goodsSpecificationId) {
                            reqData.updateSpecs.push(item);
                        }else{
                            this.editGoodsForm.addSpecs.push(item)
                        }
                    })
                    reqData.addSpecs = this.editGoodsForm.addSpecs //暂时写死，未开发
                    reqData.deleteSpecIds = this.deleteStandardObj, //暂时写死，未开发
                    updateGoodsById(this.goodsId,reqData).then(() => {
                        this.$message.success("操作成功")
                        this.showData()
                    })
                }else{
                    //新增
                    var reqData = {}
                    reqData.info = this.editGoodsForm.goods
                    reqData.goodsCategoryIdList = this.editGoodsForm.goodsCategoryIdList
                    reqData.goodsPropertys = this.editGoodsForm.goodsPropertys
                    reqData.addSpecs = this.editGoodsForm.addSpecs
                    console.log(this.editGoodsForm.addSpecs.length)
                    console.log(555)
                    addGoods(reqData).then(() => {
                        this.$message.success("操作成功")   
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
                    console.log(this.url)
                    console.log(444)
                }
                this.panel = true;

            },
            cancelCrop(){
                this.panel = false;
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
                var bytes = window.atob(this.headerImage.split(',')[1]); //去掉url的头，并转换为byte
                //处理异常,将ascii码小于0的转换为大于0
                var ab = new ArrayBuffer(bytes.length);
                var ia = new Uint8Array(ab);
                for (var i = 0; i < bytes.length; i++) {
                    ia[i] = bytes.charCodeAt(i);
                }
                var obj = new Blob([ab], { type: 'image/jpeg' });
                var fd = new FormData();
                //formdata对象第3个参数为文件名，不传则默认使用文件名，这里是blob对象所以需要加一个后缀
                fd.append('file', obj, '*.jpg');
                fd.path = '/goods'
                uploadFiles(fd).then(data => {
                    console.log(data)
                    this.$message.success("上传成功")
                    this.editGoodsForm.goods.goodsImgUrl = data.originalUrl;
                    localStorage.setItem('goodsImgUrl', data.originalUrl);
                    this.cancel()
                }).catch(err => {
                    this.$message.error(err)
                })
            },
        //点击添加规格
        addSpecifications(){
            this.addSpecificationDialog=true
        },
        //取消添加规格
        cancelAddSpecs(){
            this.addGoodsSpecs = {
                goodsSpecificationName:'',
                goodsSpecificationPrice:'',
                infiniteInventory:'',
                boxesNumber:'',
                boxesMoney:'',
                stock:''
            }
            this.addSpecificationDialog = false
        },
        //保存添加规格
        saveAddSpecs(){
            if(!this.addGoodsSpecs.goodsSpecificationName){
                this.$message({
                    message: '请输入规格名称',
                    type: 'warning'
                })
                return;
            }
            if(!this.addGoodsSpecs.goodsSpecificationPrice){
                this.$message({
                    message: '请输入规格价格',
                    type: 'warning'
                })
                return;
            }
            // if(!this.addGoodsSpecs.infiniteInventory){
            //     this.$message({
            //         message: '请选择库存',
            //         type: 'warning'
            //     })
            //     return;
            // }
            if(!this.addGoodsSpecs.stock){
                this.$message({
                    message: '请输入库存数量',
                    type: 'warning'
                })
                return;
            }
            if(!this.addGoodsSpecs.boxesNumber){
                this.$message({
                    message: '请输入餐盒数量',
                    type: 'warning'
                })
                return;
            }
            if(!this.addGoodsSpecs.boxesMoney){
                this.$message({
                    message: '请输入餐盒价格',
                    type: 'warning'
                })
                return;
            }
            this.editGoodsForm.goodsSpecifications.push(this.addGoodsSpecs)
            this.$message.success("保存成功")
            this.cancelAddSpecs()
        },
        //点击添加属性
        addAttributes(){
            this.addAttributesDialog = true
        },
        //点击修改商品规格
        editGoodsSpecs(index){
            this.$set(this.editGoodsForm.goodsSpecifications[index],'isEditMode', true)
        },
        // 点击删除商品规格
        deleteSpecs: function(index){
            this.$confirm('此操作将永久删除该规格, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //TODO把id放在删除数组里面
                if (this.editGoodsForm.goodsSpecifications[index]['goodsSpecificationId']) {
                    this.deleteStandardObj.push(this.editGoodsForm.goodsSpecifications[index]['goodsSpecificationId'])
                }
                this.editGoodsForm.goodsSpecifications.splice(index,1);
                this.$message.success("删除成功")
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        //点击修改商品属性
        editGoodsAttribute(index){
            this.$set(this.editGoodsForm.goodsPropertys[index],'isEditMode',true)
        },
        //删除商品属性
        deleteGoodsProperty : function(index){
            this.$confirm('此操作将永久删除该规格, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.editGoodsForm.goodsPropertys.splice(index,1);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        //点击保存商品规格
        saveSpecs(index,item){
            if(!item.stock){
                this.$message({
                    message: '请输入库存',
                    type: 'warning'
                })
                return;
            }
            if(!item.goodsSpecificationName){
                this.$message({
                    message: '请输入规格名称',
                    type: 'warning'
                })
                return;
            }
            if(!item.goodsSpecificationPrice){
                this.$message({
                    message: '请输入价格',
                    type: 'warning'
                })
                return;
            }
            if(!item.boxesNumber){
                this.$message({
                    message: '请输入餐盒数量',
                    type: 'warning'
                })
                return;
            }
            if(!item.boxesMoney){
                this.$message({
                    message: '请输入餐盒价格',
                    type: 'warning'
                })
                return;
            }
            this.$set(this.editGoodsForm.goodsSpecifications[index],'isEditMode',false)
            this.$message.success("保存成功！")
        },
        //点击保存编辑商品属性
        saveAttribute(index,item){
            if(!item.goodsPropertyName){
                this.$message({
                    message: '请输入属性名称',
                    type: 'warning'
                })
                return;
            }
            if(item.goodsPropertyValueList.length == 0){
                this.$message({
                    message: '请添加属性值',
                    type: 'warning'
                })
                return;
            }
            this.$set(this.editGoodsForm.goodsPropertys[index],'isEditMode',false)
            this.$message.success("保存成功！")
        },
        // 添加商品属性
        addPropItem(){
            if(!this.addGoodsAttribute.propValue){
                this.$message({
                    message: '请输入属性值',
                    type: 'warning'
                })
                this.addGoodsAttribute.propValue = '';
                return;
            }
            if (this.addGoodsAttribute.goodsPropertyValueList.length == 4) {
                this.$message({
                    message: '属性值最多四项',
                    type: 'warning'
                })
                this.addGoodsAttribute.propValue = '';
                return;
            }
            var tempArr=[]
            this.addGoodsAttribute.goodsPropertyValueList.forEach(item=>{
                tempArr.push(item.value)
            })
            if(tempArr.indexOf(this.addGoodsAttribute.propValue) != -1){
                this.$message({
                    message: '属性值已经存在',
                    type: 'warning'
                })
                this.addGoodsAttribute.propValue = '';
                return;
            }

            this.addGoodsAttribute.goodsPropertyValueList.push({value: this.addGoodsAttribute.propValue});
            this.addGoodsAttribute.propValue=''
            },
        //点击取消商品属性
        cancelAttribute(){
            this.addAttributesDialog=false
        },
        // 点击保存新增商品属性
        saveAddAttribute(){
            if(!this.addGoodsAttribute.goodsPropertyName){
                this.$message({
                    message: '请输入属性名称',
                    type: 'warning'
                })
                return;
            }
            if(this.addGoodsAttribute.goodsPropertyValueList.length == 0){
                this.$message({
                    message: '请添加属性值',
                    type: 'warning'
                })
                this.addGoodsAttribute.propValue = '';
                return;
            }
            this.addAttributesDialog=false
            this.editGoodsForm.goodsPropertys.push(this.addGoodsAttribute)
            this.$message.success("保存成功")
            this.addGoodsAttribute={
                goodsPropertyName:'',
                propValue: '',
                goodsPropertyValueList: [],
                isEditMode:false
            }
        },
        //新增的小红点删除商品属性
            deleteItem: function(index){
            this.addGoodsAttribute.goodsPropertyValueList.splice(index,1);
        },
        //修改的添加商品属性
            addEditAttribute(goodsPropertyValueList,propValue,item){
                if(!item.propValue){
                    this.$message({
                        message: '请输入属性值',
                        type: 'warning'
                    })
                    return;
                }
                if (goodsPropertyValueList.length == 4) {
                    this.$message({
                        message: '属性值最多4项',
                        type: 'warning'
                    })
                 item.propValue = '';
                    return;
                }
                var tempArr=[]
                goodsPropertyValueList.forEach(item=>{
                    tempArr.push(item.value)
                })
                if(tempArr.indexOf(item.propValue)>-1){
                    this.$message({
                        message: '属性值已存在',
                        type: 'warning'
                    })
                    item.propValue = '';
                    return;
                }

                console.log(goodsPropertyValueList)
                console.log(item.propValue)
                console.log(777)
                goodsPropertyValueList.push({value:propValue})
                this.$set(item,"propValue","")
        },
        //修改的小红点删除商品属性
            deleteAttribute: function(prop,index){
                prop.splice(index,1);
        },
        formatVal: function(val){
            return val ? '无限' : '有限'
        },
    },
    mounted(){
        this.showData()
         //初始化图片上传
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
    .returnBack{
        background-color: white;
        padding:10px;
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
    .goodsPropertyItem{
        text-align: center;
        background-color: rgba(244, 244, 244, 0.58);
        margin-left: 10px;
        height: 30px;
        line-height: 30px;
        position: relative;
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
  .imgBox{
      position: relative;
  }
  .showSpecs{
      margin-bottom: 20px;
  }
    .upload-btn {
        width: 146px;
        height: 146px;
        position: absolute;
        opacity: 0;
        z-index: 2;
        top: 22px;
        left: 210px
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
        top: 23px;
        left: 207px;
    }
    .addSpecification>img{
        width: 13px;
        height:13px;
    }
    .delete-btn{
        height: 10px;
        width: 10px;
        background: url(../assets/images/close-red.png) no-repeat;
        background-size: contain;
        border: none;
        outline: none;
        position: absolute;
        right: 0px;
        top: 0px;
    }
    .addSpecification>span{
        color: #13ce66;
    }
    .addSpecifications{
        margin-bottom: 20px;
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
    #cancelButton{
        position: absolute;
        left: 10px;
        top: 10px;
        width: 80px;
        height: 40px;
        border:none;
        border-radius: 5px;
        background:red;
    }
#demo .show {
  width: 146px;
  height: 146px;
  overflow: hidden;

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
