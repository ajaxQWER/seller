<template>
  <el-row>
      <el-form :model="editGoodsForm" label-width="80px" :rules="editGoodsFormRules" ref="editGoodsForms">
          <el-row class="uploadImgTitle">上传商品图片</el-row>
          <el-row class="uploadImgBox">
              <!--<el-col :span="4">-->
                  <!--<img class="goods-imgage" :src="UPLOADURL + editGoodsForm.goodsImgUrl" alt="商品图片">-->
              <!--</el-col>-->
              <el-col :span="20">
                  <el-upload
                      class="avatar-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="editGoodsForm.goodsImgUrl" :src="UPLOADURL + editGoodsForm.goodsImgUrl" class="avatar">
                      <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                      <img v-else :src="imageUrl" class="avatar">
                  </el-upload>
              </el-col>
          </el-row>
          <el-form-item label="商品名称" class="goodsItem">
              <el-input type="text" v-model="editGoodsForm.goodsName" placeholder="请输入商品名称，最多20字"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" class="goodsItem">
              <el-select v-model="editGoodsForm.goodsClassNames" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="商品价格" class="goodsItem">
              <el-input type="text" v-model="editGoodsForm.goodsPrice" placeholder="请输入商品价格"></el-input>
          </el-form-item>
          <el-form-item label="餐盒费" class="goodsItem">
              <el-input type="text" v-model="editGoodsForm.feeMeals" placeholder="请输入餐盒费"></el-input>
          </el-form-item>
          <el-form-item label="餐盒费" class="goodsItem">
              <el-input type="textarea" v-model="editGoodsForm.goodsContent" placeholder="请输入商品简介，最多255字"></el-input>
          </el-form-item>
      </el-form>
      <el-row>
          <el-button type="success" size="small" @click="saveEditGoodsInfo">保存</el-button>
      </el-row>
  </el-row>
</template>
<script>
    import { getGoodsById, updateGoodsById, addGoods, getGoodsCategoryLists, uploadFiles } from '@/api/api'
    export default {
        data: function () {
            return {
                editGoodsForm:{
                    goodsName:'',
                    goodsCatogery:'',
                    goodsClassNames:'',
                    goodsPrice:'',
                    feeMeals:'',
                    goodsContent:'',
                    goodsImgUrl:''

                },
                imageUrl: '',
                goodsId:'',
                editGoodsFormRules:{
                    goodsName:[
                        { required: true, message: '请输入商品名称', trigger: 'blur' },
                    ],
                    goodsClassNames:[
                        { required: true, message: '请选择商品分类', trigger: 'blur' },
                    ],
                    goodsPrice:[
                        { required: true, message: '请输入价格', trigger: 'blur' },
                    ],
                    feeMeals:[
                        { required: true, message: '请输入餐盒费', trigger: 'blur' },
                    ],
                    goodsContent:[
                        { required: true, message: '请输入商品简介', trigger: 'blur' },
                    ],
                }
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
                //编辑
                if (this.goodsId) {
                        updateGoodsById(this.goodsId, this.editGoodsForm).then(() => {
                        this.$message.success("保存成功")
                    })
                } else {
                    this.$refs['editGoodsForms'].validate((valide)=>{
                        if (valide) {

                        }
                    })
                }

            },
            //上传图片
            handleAvatarSuccess(res, file) {
                this.editGoodsForm.goodsImgUrl = file.url
                console.log(res)
                console.log(file)
            },
            beforeAvatarUpload(file) {
            //     const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
            //
            //     if (!isJPG) {
            //         this.$message.error('上传头像图片只能是 JPG 格式!');
            //     }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
            }
        },

        created(){
            var goodsId = this.$route.query.goodsId;
            this.goodsId = goodsId;
            if (goodsId) {getGoodsById(goodsId).then(res => {
                console.log(res)
                    this.editGoodsForm = res.goods;

                })
            }
        }

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
</style>
