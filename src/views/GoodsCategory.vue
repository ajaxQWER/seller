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
        <el-table :data="getGoodsCategoryList" stripe style="width: 100%">
            <el-table-column prop="goodsCategoryName" label="分类名称">
            </el-table-column>
            <el-table-column prop="sortOrder" label="排序">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" @click="updateGoodsCategory(scope.$index,scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="deleteGoodsCategory(scope.$index,scope.row)">删除</el-button>
                    <el-button size="small" type="primary" @click="getDetail(scope.$index,scope.row)" disabled>查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row class="pagination">
            <el-pagination @current-change="currentChange" :current-page="params.pageId" :page-size="params.pageSize" layout="total, prev, pager, next" :total="counts">
            </el-pagination>
        </el-row>
        <el-dialog :title="'编辑商品分类'" :visible.sync="addDialog" size="tiny" @close="closeAddDialog" class="dialog">
		        <el-form :model="updateGoodsCategorys" label-width="120px">
		            <el-form-item label="分类名称">
		                <el-input v-model="updateGoodsCategorys.goodsCategoryName" ></el-input>
		            </el-form-item>
		            <el-form-item label="排序">
		                <el-input v-model="updateGoodsCategorys.sortOrder" ></el-input>
		            </el-form-item>
		        </el-form>
		        <div slot="footer" class="dialog-footer">
		            <el-button @click="closeAddDialog">取 消</el-button>
		            <el-button type="primary" @click="updateGoods" >确 定</el-button>
		        </div>
		    </el-dialog>
    </el-row>
</template>
<script>
import { getGoodsCategory, addGoodsCategory, deleteGoodsCategoryById , updateGoodsCategoryById , getGoodsCategoryDetail} from "../api/api.js"
export default {
    created() {
        this.getGoodsCategorys()
    },
    data: function() {
        return {
            params: {
                pageId: 1,
                pageSize: 15
            },
            updateGoodsCategorys:{
            	 goodsCategoryId: 0,
				 goodsCategoryName: "",
				 sortOrder: 0
            },
            counts: 0,
            addDialog: false,
            addLoading: false,
            goodsCategoryName: null,
            getGoodsCategoryList: [],
        }
    },
    methods: {
    		//详情
    		getDetail(index,row){
    			getGoodsCategoryDetail(row.goodsCategoryId).then(data =>{
    				console.log(data)
    			})
    		},
    		updateGoods(){
    			updateGoodsCategoryById(this.updateGoodsCategorys).then(data =>{
    				this.addDialog = false
    				this.$message({
                        type: 'success',
                        message: '编辑成功!'
                    });
    			})
    		},
    		updateGoodsCategory(index,row){
    			this.updateGoodsCategorys = row
    			this.addDialog = true
    		},
    		closeAddDialog(){
                this.getGoodsCategorys()
    			this.addDialog = false
    		},
        //分页
        currentChange(val) {
            this.$router.push('?page=' + val);
            this.params.pageId = val;
            this.getGoodsCategorys()
        },
        //获取商品分类列表
        getGoodsCategorys() {
            getGoodsCategory({ params: this.params }).then(data => {
                // console.log(data)
                this.getGoodsCategoryList = data.list
                this.counts = data.count
            })
        },
        //增加商品分类
        addGoodsCategorys() {
            if(this.goodsCategoryName){
                addGoodsCategory({ goodsCategoryName: this.goodsCategoryName }).then(data => {
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.goodsCategoryName = null
                    this.getGoodsCategorys()
                })
            }else{
                this.$message({
                    type: 'error',
                    message: '分类名称不能为空'
                });
            }
           
        },
        //删除商品分类
        deleteGoodsCategory(index, row) {
            this.$confirm('此操作将删除该分类, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteGoodsCategoryById(row.goodsCategoryId).then(data => {
                    this.getGoodsCategorys()
                })
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    }
}

</script>
<style scoped>
    .pagination{
        float: right;
    }
</style>
