<template>
    <el-row class="bg">
        <el-row  v-if="SettlementList.length>0" v-loading="loading" element-loading-text="拼命加载中">
            <el-row class="countDetailTitle">
                <span>结算明细</span>
            </el-row>
            <ul class="orderContainer">
                <li v-for="(item,index) in SettlementList" :key="index">
                    <el-row class="settlementItem" @click.native="getSettlementDetail(item.orderId,index)">
                        <el-row class="orderTitle">
                            <el-col :span="6" class="orderTime">订单号：{{item.orderNum}}</el-col>
                            <el-col :span="10">流水号：{{item.serialNumber}}</el-col>
                        </el-row>
                        <el-row style="margin-left: 5px">
                            <el-col :span="20">
                                <el-col :span="17" class="headerTitle">
                                    <el-row class="mar">{{item.order.orderName}}</el-row>
                                    <el-row class="address mar">{{moment(item.recordTime).format('YYYY-MM-DD HH:mm')}}</el-row>
                                </el-col>
                            </el-col>
                            <el-col :span="3"class="totalCount" style="text-align: right">
                                <span>￥{{item.sellerAmount}}</span>
                            </el-col>
                        </el-row>
                    </el-row>
                    <el-row class="mytable" v-if="item.orderId==currentId">
                        <table>
                                <thead>
                                    <tr>
                                        <th>商品</th>
                                        <th>数量</th>
                                        <th>现价小计</th>
                                        <th>原价小计</th>
                                    </tr>
                                </thead>
                            <tbody>
                            <tr v-for="(item,index) in settlementDetail.order.orderGoods" :key="index">
                                <td>
                                    <span class="dishes">{{item.goodsName}}</span>
                                </td>
                                <td>
                                    <span class="dishes">x{{item.goodsCount}}</span>
                                </td>
                                <td>
                                    <span class="dishes"><span>￥{{item.amount}}</span></span>
                                </td>
                                <td>
                                    <span class="dishes"><span>￥{{item.oldAmount}}</span></span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <el-row style="margin-top: 15px">
                            <el-row>
                                <el-col :span="6">餐盒费用</el-col>
                                <el-col :span="6" style="text-align: center;padding-right: 65px">￥{{settlementDetail.order.orderTakeout.mealFee}}</el-col>
                                <el-col :span="6">扣除费用后的总代</el-col>
                                <el-col :span="6" style="text-align: right">￥{{settlementDetail.orderAmount-settlementDetail.distributionFee}}</el-col>
                            </el-row>

                            <el-row style="margin-top: 10px">
                                <el-col :span="6">配送费</el-col>
                                <el-col :span="6" style="text-align: center;padding-right: 65px">￥{{settlementDetail.distributionFee}}</el-col>
                                <el-col :span="6">平台扣点</el-col>
                                <el-col :span="6" style="text-align: right">-￥{{settlementDetail.platformAmount}}</el-col>
                            </el-row>
                            <el-row v-for="(item,index) in settlementDetail.order.orderActivitys" :key="index" class="distributionFee">
                                <el-col :span="8">{{item.activityContent}}</el-col>
                                <el-col :span="10" class="discount"><span>￥-{{item.activityReduced}}</span></el-col>
                            </el-row>
                        </el-row>
                        <el-row style="margin-top: 15px">
                            <el-col :span="12"><div style="text-align: right;margin-right: 127px">订单总额 <span class="moneyCount">￥{{settlementDetail.orderAmount}}</span></div></el-col>
                            <el-col :span="12"><div style="text-align: right">商家实得 <span class="moneyCount">￥{{settlementDetail.sellerAmount}}</span></div></el-col>
                        </el-row>
                    </el-row>
                </li>
            </ul>
            <el-row class="PaginationBox">
                <el-pagination
                    @current-change="currentChange"
                    :current-page="pageId"
                    :total="counts">
                </el-pagination>
            </el-row>
        </el-row>
    </el-row>
</template>
<script>
    import { getSettlementLists,getSettlementByOrderId } from '@/api/api'
    export default {
        data: function() {
            return {
                loading:false,
                pageId: 1,
                counts: 0,
                SettlementList: [],
                settlementDetail:{
                    order:{
                        orderGoods:[]
                    }
                },
                orderId:'',
                currentId:''
            }
        },
        methods: {
            //分页
            currentChange(val) {
                this.pageId = val;
                this.getSettlementListsData()
            },
            //获取列表
            getSettlementListsData(){
                this.loading=true
                getSettlementLists({ params: { pageSize: 5, pageId: this.pageId}}).then(res => {
                    this.loading=false
                    this.SettlementList = res.list
                    this.counts = res.count
                    console.log(res.list)
                    console.log(2222)
                    var SettlementList=res.list
                    SettlementList.forEach((item) => {
                        //****这里需要动态添加属性***
                        this.$set(item,'showDetail',false)
                    });
                    window.scrollTo(0,0);
                })
            },
            //获取结算详情
            getSettlementDetail(orderId,index){
                this.$set(this.SettlementList[index],'showDetail', true)
                this.currentId=orderId;
                this.orderId=orderId
                getSettlementByOrderId(this.orderId).then(res =>{
                    this.settlementDetail = res
                })
            }
        },
            beforeRouteEnter: function (to,from,next) {
                next(vm => {
                    vm.getSettlementListsData()
                });
            }

    }

</script>
<style scoped lang="scss">
    .bg{
        background-color: white;
    }
    .countDetailTitle{
        padding: 10px 0px 0px 20px;
    }
    .searchBox{
        padding: 0px 0px 5px 20px;
    }
    .orderTitle{
        height: 40px;
        line-height: 40px;
        background-color: #ddecfb;
        margin-bottom: 10px;
    }
    .orderTime{
        padding-left: 20px;
    }
    .orderContainer{
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .orderContainer>li{
        padding-left: 10px;
        padding-top: 20px;
    }
    .mar{
        padding-top: 5px;
    }
    .msgnum{
        font-size: 20px;
        color: #13ce66;
        font-weight: 800;
    }
    .msg>li{
        display: inline-block;
        margin: 0;
    }
    .orderBox{
        background-color: white;
        margin-top: 20px;
    }
    .remark{
        color: red;
    }
    .remarkContent{
        color: #1f2d3d;
    }
    .receiveOrder{
        float: right;
        padding-right: 20px;
    }
    .headPortrait{
        width: 40px;
        width: 40px;
        border-radius: 20px;
    }
    .headPortrait>img{
        width: 40px;
        width: 40px;
        border-radius: 25px;
        margin-top: 10px;
    }
    .address{
        color: #8c939d;
        font-size: 10px;
    }
    .totalCount>span{
        color: #13ce66;
        text-align: center;
    }
    .active{
        background-color: #fbfbfb;
        border-left: 2px solid #13ce66;
    }
    .headerTitle{
        padding-left: 10px;
    }
    .msgBox{
        margin-left: -5px;
    }
    /*table*/
    .mytable
    {
        width: 900px;
        height: auto;
        margin: 0 auto;
        padding-top: 10px;
        padding-bottom: 20px;
    }
    .mytable table
    {
        width: 100%;
        border: 1px solid #999;
        padding: 0;
        margin: 0;
        border-collapse: collapse;
    }
    .mytable th
    {
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-bottom: 1px solid #999;
        padding: 0;
        margin: 0;
        background-color: rgba(247, 247, 247, 0.53);

    }
    .mytable td
    {
        height: 40px;
        line-height: 40px;
        text-align: center;
        border: 1px solid lightgrey;
        padding: 0;
        margin: 0;
    }
    .mytable tr:hover
    {
        background-color: #f8f8f8;
    }
    .mytable tfoot
    {
        width: 100%;
    }

    .mytable  tfoot a{
        text-decoration: none;
        color: #999;
    }
    .moneyColor{
        color: red
    }
    .dishes{
        display: block;
        line-height: 25px;
    }
    .dishesRemark{
        color: #ffbb5a;
    }
    .clock{
        color: #8c939d;
    }
    .status{
        color: #13ce66;
    }
    .PaginationBox{
        text-align: right;
        margin-bottom: 20px;
    }
    .cancel{
        color: red;
    }
    .link {
        text-decoration: none;
    }
    .empty{
        padding: 30px;
        text-align: center;
    }
    .distributionFee{
        padding: 10px 0px 10px 0px;
        border-bottom: 1px solid lightgrey;
    }
    .moneyCount{
        color: red;
    }
    .discount{
        margin-left: -8px;
    }
</style>
