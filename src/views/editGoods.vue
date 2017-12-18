<template>
  <el-row>
      <el-form :model="editGoodsForm" label-width="80px">
          <el-row class="uploadImgTitle">上传商品图片</el-row>
          <el-row class="uploadImgBox">
              <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
              </el-upload>
          </el-row>
          <el-form-item label="商品名称" class="goodsItem">
              <el-input type="text" v-model="editGoodsForm.goodsName" placeholder="请输入商品名称，最多20字"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" class="goodsItem">
              <el-select v-model="editGoodsForm.goodsCatogery" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="商品价格" class="goodsItem">
              <el-input type="text" v-model="editGoodsForm.goodsName" placeholder="请输入商品价格"></el-input>
          </el-form-item>
          <el-form-item label="餐盒费" class="goodsItem">
              <el-input type="text" v-model="editGoodsForm.goodsName" placeholder="请输入餐盒费"></el-input>
          </el-form-item>
          <el-form-item label="餐盒费" class="goodsItem">
              <el-input type="textarea" v-model="editGoodsForm.goodsName" placeholder="请输入商品简介，最多255字"></el-input>
          </el-form-item>
      </el-form>
      <el-row>
          <el-button type="success" size="small">发布</el-button>
      </el-row>
  </el-row>
</template>
<script>
    export default {
        data: function () {
            return {
                editGoodsForm:{
                    goodsName:'',
                    goodsCatogery:'',
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
</style>
