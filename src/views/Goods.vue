<template>
    <el-row class="bgColor">
        <el-row class="goodsHeader">
            <el-col :span="16">
                <ul class="changeGoodsStatus">
                    <li :span="3" @click="changeGoodsStatus('')" :class="activeStatus == ''?'activeStatus' : '' " >全部商品</li>
                    <li :span="3" @click="changeGoodsStatus('PUTAWAY')" :class="activeStatus == 'PUTAWAY'?'activeStatus' : '' ">已上架</li>
                    <li :span="3" @click="changeGoodsStatus('SOLD_OUT')" :class="activeStatus == 'SOLD_OUT'?'activeStatus' : '' ">已下架</li>
                </ul>
            </el-col>
            <el-col :span="8">
                <el-col :span="16">
                    <el-input
                        size="small"
                        placeholder="搜索商品"
                        icon="search"
                        v-model="searchGoods"
                        :on-icon-click="searchGoodsBtn">
                    </el-input>
                </el-col>
                <el-col :span="2" style="text-align: center"><i class="i-icon i-icon-shanchu"></i></el-col>
                <el-col :span="4"  @click.native="changeGoodsStatus('DELETE')" :class="activeStatus == 'DELETE'?'activeStatus' : '' ">回收站</el-col>
            </el-col>
        </el-row>
        <el-row class="goods-content">
            <el-col class="goods-type" :span="4">
                <draggable element="ul" v-model="goodsCategoryLists" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="endDrag">
                        <li class="goods-type-item" v-for="(item,index) in goodsCategoryLists" :key="index" @click="getGoodsById(item.goodsCategoryId,index)" :id="item.goodsCategoryId">
                            <el-row :class="item.isActiveItem ? 'activeType' : '' ">
                                <el-col :span="13">{{item.goodsCategoryName}}</el-col>
                                <el-col :span="10" v-if="item.isActiveItem">
                                    <el-col :span=15><el-button type="text" style="font-size: 13px;color: #8c939d" @click="updateCategory(item)">编辑</el-button></el-col>
                                    <el-col :span="3"><el-button type="text" style="font-size: 13px;color: red" @click="deleteCategory(item.goodsCategoryId)">删除</el-button></el-col>
                                </el-col>
                            </el-row>
                        </li>
                        <li style="margin-top: 15px;text-align: left"><el-button size="mini" type="success" @click="addCategory">添加分类</el-button></li>
                </draggable>
            </el-col>
            <el-col class="goods-details-lists" :span="20">
                <el-row>
                    <!--<el-col :span="11" :offset="1"><h4>猪排饭</h4></el-col>-->
                    <el-col :span="12" style="margin-top: 15px;text-align: right" :offset="12">
                        <el-button  size="small" :disabled="!hasSoldOut" @click="batchShelves(0)">批量上架</el-button>
                        <el-button  size="small" :disabled="!hasPutAway" @click="batchShelves(1)">批量下架</el-button>
                        <el-button size="small" type="success">
                            <router-link :to="'/editGoods'"  style="color: white;text-decoration: none">添加商品</router-link>
                        </el-button>
                        <el-button  size="small" :disabled="multipleSelection.length<=0" @click="batchDelete">批量删除</el-button>
                    </el-col>
                </el-row>
                <el-row class="mytable">
                    <el-table :data="goodsList" @selection-change="handleSelectionChange">
                        <el-table-column type="selection"></el-table-column>
                        <el-table-column label="商品" width="200">
                            <template slot-scope="scope">
                                <el-row type="flex" justify="space-between">
                                    <el-col><img v-lazy=" UPLOADURL + scope.row.goodsImgUrl + '/goods.png '" alt="" class="goodsImgs"></el-col>
                                    <el-col class="showSpecSelecterBox">
                                        <el-row class="goodsNameTitle">{{scope.row.goodsName}}</el-row>
                                        <el-row class="showSpecSelecter" v-if="scope.row.showSpecSelecter">多属性</el-row>
                                    </el-col>
                                </el-row>
                            </template>
                        </el-table-column>
                        <el-table-column prop="goodsPrice" label="价格" width="80">
                            <template slot-scope="scope">
                                ￥{{scope.row.goodsPrice ?  scope.row.goodsPrice : '-'}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="goodsSales" label="月售" show-overflow-tooltip width="80"> </el-table-column>
                        <el-table-column prop="goodsRateApprise" label="好评" show-overflow-tooltip>
                            <template slot-scope="scope">
                                {{scope.row.goodsRateApprise }}%
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="200" >
                            <template slot-scope="scope" >
                                <el-col v-if="scope.row.goodsStatus!='DELETE'">
                                    <el-button type="text" @click="soldOut(scope.row.goodsId,scope.$index,scope.row.goodsStatus)" style="color: orange">{{formatStatus(scope.row.goodsStatus)}}</el-button>
                                    <router-link :to="'/editGoods?goodsId='+scope.row.goodsId"><el-button type="text" style="padding: 0px 10px 0px 10px">编辑</el-button></router-link>
                                    <el-button type="text"  @click="deleteGoodsByIds(scope.row.goodsId)" style="color: red">删除</el-button>
                                </el-col>
                                <el-col v-else style="color:gray">已删除</el-col>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
                </el-col>
        </el-row>
        <!--添加分类弹窗-->
        <el-dialog :title="isAdd?'新建分类':'修改分类'" :visible.sync="addCategoryDialog">
            <el-form :model="addCategoryList" label-width="120px">
                    <el-form-item label="分类名称">
                        <el-col :span="13">
                            <el-input type="text" v-model="addCategoryList.goodsCategoryName" size="small"></el-input>
                        </el-col>
                    </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="canceladdCategory" size="small">取 消</el-button>
                <el-button type="primary" @click="saveaddCategory()" :loading="addCategoryLoading" size="small">保 存</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>
<script>
import draggable from 'vuedraggable'
import {getGoodsCategoryLists,getGoodsLists,deleteGoodsById,soldOutGoods,putAwayGoods,batchDelGoods,addGoodsCategory,updateGoodsCategoryById,deleteGoodsCategoryById,setSortOrder} from '@/api/api';
export default {
    name: 'Goods',
    components: {
        draggable,
    },
    data: function() {
        return {
            activeStatus:'',//当前选中商品状态
            addCategoryDialog:false,
            addCategoryLoading:false,
            isAdd: true,
            addCategoryList:{ //新建分类
                goodsCategoryName:null,
                goodsCategoryId:0
            },
            multipleSelection:[], //多选结果
            isEmpty: false, //判断是否有无数据
            loading:false,
            searchGoods:'',
            pageId:1,
            pageSize:10,
            goodsList:[],
            goodsCategoryLists:null,  //分类列表(title)
            goodsCategoryId : null, // 当前选中分类ID
            isIndeterminate: true,
            // 拖拽
            editable:true,
            isDragging: false,
            delayedDragging:false,
            sortOrder:null, //排序值
            sortGoodsCategoryId:0 // 商品分类ID
        }
    },
    methods:{
        //搜索商品
        searchGoodsBtn(){
            this.getGoodsListsData(this.goodsCategoryId)
        },
        changeType(index){
            this.type=index
        },
        //获取商品列表
        getGoodsListsData(goodsCategoryId){
            this.loading = true
            var reqData={
                pageSize: 999999,
                goodsClassId: goodsCategoryId,
                goodsNameLike:this.searchGoods,
                goodsStatus:this.activeStatus
            }
            getGoodsLists({params:reqData }).then( res =>{

                this.isEmpty = res.list.length ? false : true
                this.loading = false
                this.goodsList = res.list;
            })
        },
        //获取商品title列表
        getGoodsCategoryListsData(){
            var reqData={
                pageSize:99999,
            }
            getGoodsCategoryLists({params:reqData}).then( res =>{
                console.log(res)
                console.log(99999)
                if(res.length){
                    this.goodsCategoryId = res[0].goodsCategoryId
                    this.getGoodsListsData(res[0].goodsCategoryId)
                }else{
                    this.isEmpty = true
                }
                this.goodsCategoryLists = res;
                this.goodsCategoryLists.forEach(function(item,index){
                    item.isActiveItem = false;
                    if(index == 0){
                        item.isActiveItem = true
                    }
                })
            })
        },
        formatStatus: function(status){
            switch (status) {
                case 'PUTAWAY':
                    return '下架';
                case 'SOLD_OUT':
                    return '上架';
                  // case 'DELETE':
                  //   return '删除';
            }
        },
        getGoodsById(goodsCategoryId,index){
            this.goodsCategoryLists.forEach(function(item,current){
                item['isActiveItem'] = false;
                if(index == current){
                    console.log(index)
                    console.log(current)
                    console.log(6666)
                    item['isActiveItem'] = true;
                }
            })
            this.goodsCategoryId = goodsCategoryId;
            this.getGoodsListsData(goodsCategoryId)
        },
        //上架或者下架商品
        soldOut: function(id,index,status){
            var soldStatus = this.formatStatus(status);
            const h = this.$createElement;
            this.$msgbox({
                title: '提示',
                message: h('p', null, [
                    h('span', null, '确定'+soldStatus+'该商品?'),
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = '执行中...';
                        setTimeout(() => {
                            done();
                            setTimeout(() => {
                                instance.confirmButtonLoading = false;
                            }, 300);
                        }, 3000);
                    } else {
                        done();
                    }
                }
            }).then(action => {
                if(status==='PUTAWAY'){
                    soldOutGoods([id]).then(() => {
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                        this.goodsList[index].goodsStatus = 'SOLD_OUT'
                    })
                }else if(status==='SOLD_OUT'){
                    putAwayGoods([id]).then(() => {
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                        this.goodsList[index].goodsStatus = 'PUTAWAY'
                    })
                }
                this.$message({
                    type: 'info',
                    message: 'action: '+ action
                });
            });
        },
        //删除商品
        deleteGoodsByIds(id){
            this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteGoodsById(id).then(() => {
                    this.getGoodsListsData(this.goodsCategoryId)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        /**
        * 改变展示商品状态
        */
        changeGoodsStatus : function(status){
            this.activeStatus = status;
            this.getGoodsListsData(this.goodsCategoryId)
        },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      /*
      *  批量上架或者下架，isPutAway ：0 批量上架，1批量下架
      */
      batchShelves :function(isPutAway){
            var soldStatus;
            if(isPutAway == 0){
                soldStatus = "批量上架";
            }else{
                soldStatus = "批量下架";
            }
          const h = this.$createElement;
          this.$msgbox({
              title: '消息',
              message: h('p', null, [
                  h('span', null, '确定批量'+soldStatus+'商品吗?'),
              ]),
              showCancelButton: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              beforeClose: (action, instance, done) => {
                  if (action === 'confirm') {
                      instance.confirmButtonLoading = true;
                      instance.confirmButtonText = '执行中...';
                      setTimeout(() => {
                          done();
                          setTimeout(() => {
                              instance.confirmButtonLoading = false;
                          }, 300);
                      }, 3000);
                  } else {
                      done();
                  }
              }
          }).then(action => {
              var putAwayList = [];
              var soldOutList = [];
              this.multipleSelection.forEach((item)=>{
                  if (item.goodsStatus == "PUTAWAY") {
                      putAwayList.push(item.goodsId);
                  }else  if (item.goodsStatus == "SOLD_OUT") {
                      soldOutList.push(item.goodsId);
                  }
              })

              if (isPutAway == 0) { //批量上架
                  putAwayGoods(soldOutList).then( ()=>{
                      this.$message({
                          type: 'success',
                          message: '批量上架成功!'
                      });
                      this.getGoodsListsData(this.goodsCategoryId)
                  })
              }else{
                  soldOutGoods(putAwayList).then( ()=>{
                      this.$message({
                          type: 'success',
                          message: '批量下架成功!'
                      });
                      this.getGoodsListsData(this.goodsCategoryId)
                  })
              }
          });

      },
      // 批量删除
      batchDelete : function(){
          const h = this.$createElement;
          this.$msgbox({
              title: '提示',
              message: h('p', null, [
                  h('span', null, '确定批量删除？ '),
              ]),
              showCancelButton: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              beforeClose: (action, instance, done) => {
                  if (action === 'confirm') {
                      instance.confirmButtonLoading = true;
                      instance.confirmButtonText = '执行中...';
                      setTimeout(() => {
                          done();
                          setTimeout(() => {
                              instance.confirmButtonLoading = false;
                          }, 300);
                      }, 3000);
                  } else {
                      done();
                  }
              }
          }).then(action => {
              let  DeteteList = [];
              var that = this;
              this.multipleSelection.forEach((item)=>{
                  DeteteList.push(item.goodsId);
              })
              console.log(222);
              batchDelGoods(DeteteList).then( ()=>{
                  that.$message({
                      type: 'success',
                      message: '批量删除成功!'
                  });
                  that.getGoodsListsData(that.goodsCategoryId)
              })
          });
      },
        //通过id修改分类的名称
        updateCategory(row){
            this.isAdd = false;
            this.addCategoryDialog = true;
            this.addCategoryList = {
                goodsCategoryName : row.goodsCategoryName,
                goodsCategoryId : row.goodsCategoryId,
            }
        },
        // 点击添加分类按钮
        addCategory(){
            this.addCategoryDialog = true;
        },
        //点击取消分类
        canceladdCategory(){
            this.addCategoryDialog = false;
            this.isAdd = true;
            this.addCategoryList = {
                goodsCategoryName : null,
            }
        },
        //点击保存分类
        saveaddCategory(){
            this.addCategoryLoading = true;
            if (this.isAdd) {
                addGoodsCategory(this.addCategoryList).then(data => {
                    this.getGoodsCategoryListsData()
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    })
                    this.addCategoryLoading = false;
                    this.addCategoryDialog = false
                })
            } else {
                updateGoodsCategoryById(this.addCategoryList).then(data => {
                    this.getGoodsCategoryListsData()
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    })
                    this.addCategoryLoading = false;
                    this.addCategoryDialog = false
                }).catch(err => {
                    console.error(err)
                })
            }
        },
        // 删除商品分类
        deleteCategory(goodsCategoryId){
            this.$confirm('此操作将永久删除该商品分类, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteGoodsCategoryById(goodsCategoryId).then(() => {
                    this.getGoodsCategoryListsData()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        //拖拽
        onMove ({relatedContext, draggedContext}) {
            const relatedElement = relatedContext.element;
            const draggedElement = draggedContext.element;
            this.goodsCategoryLists.map((item, index) => {
                if(relatedElement.goodsCategoryId == item.goodsCategoryId){
                    this.sortOrder = index +1;
                    this.sortGoodsCategoryId = draggedElement.goodsCategoryId
                }
            })

        },
        endDrag(){
            this.isDragging = false;
            var params={
                goodsCategoryId : this.sortGoodsCategoryId,
                sortOrder : this.sortOrder
            }
            //商品排序
            if(params.sortOrder&&params.goodsCategoryId){
              setSortOrder(params).then(res=>{
                  this.$message({
                      type: 'success',
                      message: '排序成功'
                  });
              })
            }
        }
    },
    created(){
        // this.getGoodsListsData(this.goodsCategoryId);
        this.getGoodsCategoryListsData()
    },
    computed:{

        hasSoldOut : function (){ //计算是否选中有上架商品
            let isSoldOut = false;
            this.multipleSelection.forEach((item)=>{
                if (item.goodsStatus == "SOLD_OUT") {
                    isSoldOut = true
                }
            })
            return isSoldOut
        },
        hasPutAway :function (){//计算是否选中有下架商品
            let isPutAway = false;
            this.multipleSelection.forEach((item)=>{
                if (item.goodsStatus == "PUTAWAY") {
                    isPutAway = true
                }
            })
            return isPutAway
        },
        // 拖拽
        dragOptions () {
            return  {
                animation: 0,
                group: 'description',
                disabled: !this.editable,
                ghostClass: 'ghost'
            };
        },
    },
    // 拖拽
    watch: {
        isDragging (newValue) {
            if (newValue){
                this.delayedDragging= true
                return
            }
            this.$nextTick( () =>{
                this.delayedDragging =false
            })
        }
    }
}
</script>
<style scoped>
    .bgColor{
        background-color: white;
        padding: 10px;
    }
    .goodsImg>img{
        width: 100px;
        height: 100px;
        border-radius: 5px
    }
    .goodsImg{
        background: url(../assets/images/default.jpg) no-repeat center center;
        background-size: cover;
        height: 100px;
    }
    .goodsHeader{
        border-bottom: 1px solid #ebebeb;
        line-height: 50px;
    }
    .goods-content{
        box-sizing: border-box;
        zoom: 1;
        padding: 5px 0px 5px 0px;
    }
    .goods-type{
        float: left;
        height: 100%;
    }
    .goods-type>ul{
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .goods-type-item{
        line-height: 30px;
        padding: 5px;
        font-size: 14px;
        text-align: left;
    }
    .activeType{
        border-bottom: 1px solid #ededed;
        color: #13ce66;
    }
    .changeGoodsStatus{
        list-style: none;
        margin: 0;
        padding-left: 20px;
    }
    .changeGoodsStatus>li{
        width: 60px;
        padding: 1px;
        text-align: center;
        display: inline-block;
        border-right: 1px solid rgba(131, 131, 131, 0.4);
        line-height: 10px;
    }
    .changeGoodsStatus>li:last-child{
        border:none
    }
    .goodsImgs{
        width: 80px;
        height: 80px;
        vertical-align: center;
    }
    .goodsNameTitle{
        margin-top: 8px;
    }
    .showSpecSelecterBox{
            padding-left: 10px;
    }
    .showSpecSelecter{
        margin-top: 8px;
        font-size: 12px;
        width: 60px;
        height: 25px;
        border-radius: 20px;
        border: 1px solid lightgrey;
        text-align: center;
        color: #13ce66;
    }
    .list-group-item i{
        cursor: pointer;
    }
    .mytable{
        padding: 10px 0px 0px 5px;
    }
</style>
