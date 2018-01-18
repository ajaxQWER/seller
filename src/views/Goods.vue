<template>
    <el-row class="bgColor">
        <el-row class="goodsHeader">
            <el-col :span="16">
                <el-col :span="3" >全部商品</el-col>
                <el-col :span="3">已上架</el-col>
                <el-col :span="3">已下架</el-col>
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
                <el-col :span="4">回收站</el-col>
            </el-col>
        </el-row>
        <el-row class="goods-content">
            <el-col class="goods-type" :span="2">
                <ul>
                    <li class="goods-type-item" v-for="(item,index) in goodsCategoryLists" :key="index"  @click="getGoodsById(item.goodsCategoryId,index)" :class="item.isActiveItem ? 'activeType' : '' ">{{item.goodsCategoryName}}</li>
                    <li style="margin-top: 15px;text-align: center"><el-button size="mini" type="success">添加分类</el-button></li>
                </ul>
            </el-col>
            <el-col class="goods-details-lists" :span="21">
                <el-row>
                    <el-col :span="18" :offset="1"><h4>猪排饭</h4></el-col>
                    <el-col :span="5" style="margin-top: 15px">
                        <el-button  size="small" @click="batchShelves">批量下架</el-button>
                        <router-link :to="'/editGoods'"><el-button size="small" type="success">添加商品</el-button></router-link>
                    </el-col>
                </el-row>
                <el-row class="mytable">
                    <!--<table>-->
                        <!--<thead>-->
                            <!--<tr>-->
                                <!--<th>商品</th>-->
                                <!--<th>价格</th>-->
                                <!--<th>月售</th>-->
                                <!--<th>好评</th>-->
                                <!--<th>操作</th>-->
                            <!--</tr>-->
                        <!--</thead>-->
                        <!--<tbody v-if="!isEmpty" v-loading="loading" element-loading-text="拼命加载中">-->

                            <!--<tr v-for="(item,index) in goodsList" :key="index" v-if="goodsList.length">-->
                                <!--<td>-->
                                    <!--<el-col :span="8"><img v-lazy=" UPLOADURL + item.goodsImgUrl + '/goods.png '" alt="" class="goodsImgs"></el-col>-->
                                    <!--<el-col :span="10" style="text-align: left">{{item.goodsName}}</el-col>-->
                                <!--</td>-->
                                <!--<td>￥{{item.goodsPrice}}</td>-->
                                <!--<td>{{item.goodsSales}}</td>-->
                                <!--<td>{{item.goodsRateApprise }}%</td>-->
                                <!--<td>-->
                                    <!--<el-button type="text" @click="soldOut(item.goodsId,index,item.goodsStatus)" style="color: orange">{{formatStatus(item.goodsStatus)}}</el-button>-->
                                    <!--<router-link :to="'/editGoods?goodsId='+item.goodsId"><el-button type="text">编辑</el-button></router-link>-->
                                    <!--<el-button type="text" @click="deleteGoods(item.goodsId)" style="color: red">删除</el-button>-->
                                <!--</td>-->
                            <!--</tr>-->
                        <!--</tbody>-->
                        <!--<tbody v-else class="empty">-->
                            <!--<img src="../assets/images/empty-img.png" alt="">-->
                        <!--</tbody>-->
                    <!--</table>-->
                    <el-table
                        :data="goodsList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        >
                        <el-table-column
                            type="selection"
                            >
                        </el-table-column>
                        <el-table-column
                            label="商品"
                            width="200"
                            >
                            <template slot-scope="scope">
                                <el-row type="flex" justify="space-between">
                                    <el-col><img v-lazy=" UPLOADURL + scope.row.goodsImgUrl + '/goods.png '" alt="" class="goodsImgs"></el-col>
                                    <el-col style="padding-left: 10px">{{scope.row.goodsName}}</el-col>
                                </el-row>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="goodsPrice"
                            label="价格"
                        >
                            <template slot-scope="scope">
                                ￥{{scope.row.goodsPrice ?  scope.row.goodsPrice : '-'}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="goodsSales"
                            label="月售"
                            width="100"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="goodsRateApprise"
                            label="好评"
                            show-overflow-tooltip>
                            <template slot-scope="scope">
                                {{scope.row.goodsRateApprise }}%
                            </template>
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                           >
                            <template slot-scope="scope">
                                <el-button type="text" @click="soldOut(scope.row.goodsId,scope.$index,scope.row.goodsStatus)" style="color: orange">{{formatStatus(scope.row.goodsStatus)}}</el-button>
                                <router-link :to="'/editGoods?goodsId='+scope.row.goodsId"><el-button type="text">编辑</el-button></router-link>
                                <el-button type="text" @click="deleteGoods(scope.row.goodsId)" style="color: red">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </el-col>
        </el-row>
    </el-row>
</template>
<script>
import {getGoodsCategoryLists,getGoodsLists,deleteGoodsById,soldOutGoods,putAwayGoods} from '@/api/api';
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
    data: function() {
        return {
            checkAll: false,
            isEmpty: false, //判断是否有无数据
            loading:false,
            searchGoods:'',
            pageId:1,
            pageSize:10,
            goodsList:[],
            goodsCategoryLists:null,  //分类列表(title)
            goodsCategoryId : null, // 当前选中分类ID
            goodsCategoryName:null,
            checkedCities: ['上海', '北京'],
            cities: cityOptions,
            isIndeterminate: true
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
                goodsNameLike:this.searchGoods
            }
            getGoodsLists({params:reqData }).then( res =>{
                console.log(res)
                console.log(9999)
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
                console.log(666)
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
        deleteGoods(id){
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
        handleCheckAllChange(val){
            this.checkedCities = val ? cityOptions : [];
            this.isIndeterminate = false;
        },

        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
        batchShelves(){

        }
    },
    created(){
        // this.getGoodsListsData(this.goodsCategoryId);
        this.getGoodsCategoryListsData()
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
        text-align: center;
    }
    .activeType{
        border-bottom: 1px solid #ededed;
        color: #13ce66;
    }
    /*table*/
    .mytable
    {
        height: auto;
        margin: 0 auto;
        padding-top: 10px;
        padding-left: 30px;
        padding-bottom: 20px;

    }
    .mytable table
    {
        width: 100%;
        padding: 0;
        margin: 0;
        border-collapse: collapse;
    }

    .mytable th
    {
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-bottom: 1px solid rgba(211, 211, 211, 0.33);
        padding: 0;
        margin: 0;
        background-color: rgba(255, 255, 255, 0.27);

    }
    .mytable td
    {
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-bottom: 1px solid rgba(211, 211, 211, 0.33);
        padding: 0;
        margin: 0;
    }
    .mytable tfoot
    {
        width: 100%;
    }

    .mytable  tfoot a{
        text-decoration: none;
        color: #999;
    }
    .goodsImgs{
        width: 80px;
        height: 80px;
    }

</style>
