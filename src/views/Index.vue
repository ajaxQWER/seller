<template>
    <el-row class="bg">
        <div class="titleContaier">
            <div class="titleImg">
                <img :src="UPLOADURL+'/shopLogo/'+loginShopId+'.png/shopLogo.png'"  alt="">
            </div>
            <div class="titleText">
                <ul>
                    <li><h3>{{loginUser}}</h3></li>
                    <ul class="admin-shop-status" v-if="shopSalesData">
                        <li class="status onBusiness">
                            <img v-lazy="printerStatusImg" alt="" class="img">
                        </li>
                        <li class="status">
                            <img v-lazy="shopStatusImg" alt="" class="img">
                        </li>
                    </ul>
                </ul>
                <!--<span class="intro">门店简介：*************************************************</span>-->
            </div>
            <!--<div class="QRcodeconContainer">-->
                <!--<div class="QRcode">-->
                    <!--<img src="../assets/images/ew.png" alt="">-->
                <!--</div>-->
                <!--<div class="logo">-->
                    <!--<img src="../assets/images/logo1.png" alt="">-->
                <!--</div>-->
                <!--<div class="download"><p class="fa fa-arrow-circle-down">下载到手机</p></div>-->
            <!--</div>-->
        </div>
        <el-row class="contentContainer">
            <el-col :span="8">
                <div class="turnoverContainer">
                    <ul class="turnover">
                        <li class="titleText">今日营业额</li>
                        <li class="totalNum"><i class="fa fa-jpy"></i>{{formatMoney(shopSalesData.todayTurnover) || 0}}</li>
                        <li>昨日 <i class="fa fa-jpy"></i>{{formatMoney(shopSalesData.yesterdayTurnover) || 0}}</li>
                        <!--<li>-->
                            <!--<span>在线支付：<i class="fa fa-jpy"></i>983.00</span>-->
                            <!--<span>到货付款：<i class="fa fa-jpy"></i>983.00</span>-->
                        <!--</li>-->
                    </ul>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="turnoverContainer Containermar ContainerT">
                    <ul class="turnover">
                        <li class="titleText">今日订单</li>
                        <li class="totalNum">{{shopSalesData.todayOrderQuantity || 0 }}</li>
                        <li>昨日{{shopSalesData.yesterdayOrderQuantity || 0 }}</li>
                        <!--<li>-->
                            <!--<span>按时送达：983</span>-->
                            <!--<span>延误送达：983</span>-->
                        <!--</li>-->
                    </ul>
                </div>
            </el-col>
            <el-col :span="8" >
                <div class="turnoverContainer Containermar ContainerK">
                    <ul class="turnover">
                        <li class="titleText">可用余额</li>
                        <li class="totalNum"><i class="fa fa-jpy"></i>{{formatMoney(shopSalesData.availableBalance) || 0}}</li>
                        <li> 可提现<i class="fa fa-jpy"></i>{{formatMoney(shopSalesData.amountWithdrawal) || 0}}</li>
                        <!--<li>-->
                            <!--<span>可提现额度：<i class="fa fa-jpy"></i>983.00</span>-->
                        <!--</li>-->
                    </ul>
                </div>
            </el-col>
        </el-row>
        <el-row class="orderBox">
            <ul class="orderContainer">
                <li class="msgBox">
                    <!--<ul class="msg">-->
                        <!--<li>-->
                            <!--<span class="msgnum">7</span>-->
                            <!--<span> 最新订单，希望尽快送达！</span>-->
                        <!--</li>-->
                        <!--<li class="receiveOrder"><el-button  type="success" size="small">一键接单</el-button></li>-->
                    <!--</ul>-->
                    <el-row style="margin-left: 20px;font-size: 16px">最新订单</el-row>
                </li>
                <li @click="changeClass(index)" :class=" activeIndex==index ? 'active' : ''" v-for="(item,index) in orderList" :key="index">
                    <el-row>
                        <el-col :span="10">
                            <el-col class="headPortrait" :span="9">
                                <img src="../assets/images/default-avatar.png" alt="">
                            </el-col>
                            <el-col :span="9" class="headerTitle">
                                <el-row>{{item.orderContact.contactName}}</el-row>
                                <el-row class="address" ><span :title="item.orderContact.address">{{(item.orderContact.address).substr(item.orderContact.address,10)}}</span></el-row>
                            </el-col>
                        </el-col>
                        <el-col :span="10">
                            <el-col >
                                <el-row >备注：{{item.orderContent?item.orderContent:'无'}}</el-row>
                                <el-row class="address" v-if="item.title">发票：{{item.title}}</el-row>
                            </el-col>
                        </el-col>
                        <el-col :span="4"class="phone">
                            <i class="fa fa-phone">{{item.orderContact.contactPhone}}</i>
                        </el-col>
                    </el-row>
                </li>
            </ul>
        </el-row>
    </el-row>
</template>
<script>
    import { getRealtimestatistics,getOrderList} from '@/api/api'
    export default {
        data: function () {
            return {
                activeIndex: 1,
                loginShopId: localStorage.getItem('shopId'),
                loginUser: localStorage.getItem('shopName'),
                shopSalesData: {
                    todayTurnover:0,
                    yesterdayTurnover:0,
                    availableBalance:0,
                    amountWithdrawal:0
                },
                shopStatusImg: null,
                printerStatusImg: null,
                orderList: [],
                pageSize: 5,
                pageId: 1,
                orderStatus: null,
                Loading:false,
                totalOrderCount:null
            }
        },
        methods: {
            changeClass(index) {
                this.activeIndex = index
            },
            // 获取店铺实时统计
            getRealtimestatisticsData() {
                getRealtimestatistics().then(res => {
                    console.log(res)
                    this.shopSalesData = res;
                    if (res.operatingState) {
                        this.shopStatusImg = '../../static/images/shop-open.png';
                    } else {
                        this.shopStatusImg = '../../static/images/shop-close.png';
                    }
                    this.printerStatusImg = '../../static/images/' + res.printerStatus.toLowerCase() + '.png';
                })
            },
            formatMoney: function (money) {
                money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";
                var l = money.split(".")[0].split("").reverse();
                var r = money.split(".")[1];
                var t = "";
                for (var i = 0; i < l.length; i++) {
                    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
                }
                return t.split("").reverse().join("") + "." + r;
            },
            // 新订单列表
           getOrderListData(){
               this.Loading=true
               getOrderList({ params: { pageSize: this.pageSize, pageId: this.pageId, orderStatus: this.orderStatus}}).then(res => {
                   this.Loading=false
                   this.orderList = res.list
                   console.log(res.list)
                   console.log(555)
                   this.totalOrderCount = res.count
               })
           },
            // 点击查看结算详情
            settleAccounts(){
                this.$router.push('/settleAccountsDetail')
            }
        },
        created() {
            this.getRealtimestatisticsData()
            this.getOrderListData()
        }
    }
</script>
<style scoped>
    .titleContaier{
        padding: 10px;
        background-color: white;
        border-radius: 5px;
    }
    .titleImg,.titleText{
        display: inline-block;
    }
    .titleText{
        position:relative;
    }
    .titleImg{
        width: 8%;
    }
    .titleText{
        vertical-align: top;
    }
    .titleImg>img{
        width: 100px;
        height: 100px;
        border: 1px solid lightgrey;
    }
    .titleText{
        width: 90%;
    }
    .titleText>ul{
        margin: 0px;
    }
    .titleText>ul>li{
        list-style: none;
        display: inline-block;
    }
    .status{
        float: right;
        background-color: #ffffff;
        border: 1px solid rgba(215, 215, 215, 0.3);
    }
    .onBusiness{
        margin-left: 5px;
    }
    .QRcode>img{
        width: 100px;
        height: 100px;
    }
    .logo{
        position: absolute;
        left: 45px;
        top:40px
    }
    .logo>img{
        width: 40px;
    }
    .contentContainer{
        margin-top: 20px;
    }
    .turnover{
        margin: 0;
        padding: 0;
    }
    .turnover>li{
        list-style: none;
    }
    .turnoverContainer{
        background-color: #74b4fe;
        padding: 15px;
        color: white;
        border-radius: 5px;
    }
    .totalNum{
        text-align: right;
        font-size: 30px;
    }
    .titleText{
        font-size: 16px;
    }
    .Containermar{
        margin-left: 10px;
    }
    .ContainerT{
        background-color: #43dbbd;
    }
    .ContainerK{
        background-color: #ffbb5a;
    }
    .orderContainer{
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .orderContainer>li{
        border-bottom: 1px solid lightgrey;
    }
    .orderContainer>li:first-child{
        height: 40px;
    }
    .orderContainer>li{
        height: 60px;
        padding-left: 10px;
        padding-top:22px;
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
    }
    .address{
        color: #8c939d;
        font-size: 10px;
    }
    .phone{
        color: #13ce66;
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
    .admin-shop-status>li{
        list-style: none;
    }
    .img{
        width: 50px;
        height: 50px;
    }
</style>
