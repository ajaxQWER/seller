<template>
    <el-row>
    	<el-form :inline="true">
          <el-form-item>
              <el-input placeholder="请输入添加商品分类名称" v-model="goodsCategoryName"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="addGoodsCategorys">添加分类</el-button>
          </el-form-item>
      </el-form>
    	<el-table
		    :data="getGoodsCategoryList"
		    stripe
		    style="width: 100%">
		    <el-table-column
		      prop="goodsCategoryName"
		      label="分类名称">
		    </el-table-column>
		    <el-table-column
		      prop="sortOrder"
		      label="排序">
		    </el-table-column>
		    <el-table-column
		      label="操作">
		      <template slot-scope="scope">
              <el-button size="small" @click="">编辑</el-button>
              <el-button size="small" type="danger" @click="deleteGoodsCategory(scope.$index,scope.row)">删除</el-button>
              <el-button size="small" type="primary" @click="">查看详情</el-button>
          </template>
		    </el-table-column>
		  </el-table>
    </el-row>
</template>
<script>
import { getGoodsCategory , addGoodsCategory , deleteGoodsCategoryById} from "../api/api.js"
export default {
		created(){
			this.getGoodsCategorys()
		},
    data: function() {
        return {
        		params:{
        			pageId:1,
        			pageSize:20
        		},
        		goodsCategoryName:null,
        		getGoodsCategoryList:[],

        }
    },
    methods:{
    	getGoodsCategorys(){
    		getGoodsCategory({params:this.params}).then(data =>{
    			this.getGoodsCategoryList = data.list
    		})
    	},
    	addGoodsCategorys(){
    		addGoodsCategory({goodsCategoryName:this.goodsCategoryName}).then(data =>{
    			this.$message({
              message: '添加成功',
              type: 'success'
          });
    			this.getGoodsCategorys()
    		})
    	},
    	deleteGoodsCategory(index,row){
    		deleteGoodsCategoryById(row.goodsCategoryId).then(data =>{
    			this.$message({
              message: '删除成功',
              type: 'success'
          });
          this.getGoodsCategorys()
    		})
    	}
    }
}
</script>