<template>
    <el-row class="bgColor">
        <el-row>
            <el-col :span="5">
                <el-input
                    size="small"
                    placeholder="搜索商品"
                    icon="search"
                    v-model="searchGoods"
                    :on-icon-click="searchGoodsBtn">
                </el-input>
            </el-col>
            <el-col :span="5" :offset="1" style="text-align:right">
                <el-col :span="8">全部商品</el-col>
                <el-col :span="8">已上架</el-col>
                <el-col :span="8">已下架</el-col>
            </el-col>
            <el-col :span="5" :offset="8">
                <el-col :span="8">回收站</el-col>
                <el-col :span="8">批量管理</el-col>
                <router-link :to="'/editGoods'"><el-button :span="8" size="mini" type="success" @click="addGoods">添加商品</el-button></router-link>
            </el-col>
        </el-row>
        <el-row class="dishType">
            <el-col :span="2" class="Type" ><span >商家分类：</span></el-col>
            <el-col :span="2" class="Type" v-for="(item,index) in goodsCategoryLists" :key="index"  ><span  @click="getGoodsById(item.goodsCategoryId,index)" :class="item.isActiveItem ? 'activeType' : '' "  >{{item.goodsCategoryName}}</span></el-col>
        </el-row>
        <el-row class="goodsContentBox" v-if="goodsList.length>0">
            <el-col :span="7" class="goodsContent" v-for="(item,index) in goodsList" :key="index">
                <el-row class="chageBtn">
                    <el-checkbox></el-checkbox>
                    <el-button type="text" @click="soldOut(item.goodsId,index,item.goodsStatus)">{{formatStatus(item.goodsStatus)}}</el-button>
                    <router-link :to="'/editGoods?goodsId='+item.goodsId"><el-button type="text">编辑</el-button></router-link>
                    <el-button type="text" @click="deleteGoods(item.goodsId)">删除</el-button>
                </el-row>
                <el-row class="goodsContentText">
                    <el-col class="goodsImg" :span="10">
                        <img :src="UPLOADURL + item.goodsImgUrl+'/goods.png'" alt="">
                    </el-col>
                    <el-col :span="14">
                        <el-row class="goodsName">{{item.goodsName}}</el-row>
                        <el-row class="goodsPrice"><i class="fa fa-jpy"></i>{{item.goodsPrice}}</el-row>
                        <el-row class="goodsSales ">月销量：{{item.goodsSales}}</el-row>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row v-else class="empty">
            <img src="../assets/images/empty-img.png" alt="">
        </el-row>
    </el-row>
</template>
<script>

import {getGoodsCategoryLists,getGoodsLists,deleteGoodsById,soldOutGoods,putAwayGoods} from '@/api/api'
export default {
    data: function() {
        return {
            searchGoods:'',
            type:1,
            pageId:1,
            pageSize:10,
            counts:0,
            goodsList:[],
            goodsCategoryLists:'',  //分类列表(title)
            goodsCategoryId : '' // 当前选中分类ID
        }
    },
    methods:{
        //搜索商品
        searchGoodsBtn(){

        },
        changeType(index){
            this.type=index
        },

        //获取商品列表
        getGoodsLists(goodsCategoryId){
            getGoodsLists({params: {pageSize: 999999, goodsClassId: goodsCategoryId}}).then( res =>{
                this.goodsList = res.list;
            })
        },
        //获取商品title列表
        getGoodsCategoryListsData(){
            var paramas={
                pageSize:99999,
            }
            getGoodsCategoryLists(paramas).then( res =>{
                console.log(res)
                console.log(33333)
                this.goodsCategoryId = res.list[0].goodsCategoryId
                this.getGoodsLists(res.list[0].goodsCategoryId)
                this.goodsCategoryLists = res.list;
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
            }
        },
        getGoodsById(goodsCategoryId,index){
            this.goodsCategoryLists.forEach(function(item,current){
                item['isActiveItem'] = false;
                if(index == current){
                    item['isActiveItem'] = true;
                }
            })
            this.goodsCategoryId = goodsCategoryId;
            this.getGoodsLists(goodsCategoryId)
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
        deleteGoods(id){
            this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteGoodsById(id).then(() => {
                    this.getGoodsLists(this.goodsCategoryId)
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
        addGoods(){

        }
    },
    created(){
        this.getGoodsLists();
        this.getGoodsCategoryListsData()
    }
}
</script>
<style scoped>
    .bgColor{
        background-color: white;
        padding: 10px;
    }
    .dishType{
        padding: 10px;
        margin-top: 5px;
        margin-bottom: 10px;
    }
    .activeType{
        background-color: #13ce66;
        color: white;
        border: 5px;
        padding: 5px;
        border-radius: 5px;
    }
    .Type{
        text-align: center;
    }

    .chageBtn{
        background-color: #f4f4f4;
        padding-left: 10px;
    }
    .goodsContent{
        border: 1px solid lavender;
        margin-left: 10px;
        margin-bottom: 15px;
    }
    .goodsContentText{
        padding: 10px;
    }
    .goodsImg>img{
        width: 100px;
        height: 100px;
        border-radius: 5px
    }
    .goodsPrice{
        margin: 5px 0px 5px 0px;
        color: red;
    }
    .goodsSales{
        color: #8c939d;
    }
    .goodsContentBox{
        margin-bottom: 10px;
    }
    .empty{
        padding: 30px;
        text-align: center;
    }
</style>
