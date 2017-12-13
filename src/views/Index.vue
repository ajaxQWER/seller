<template>
    <el-row class="bg">
        <div class="titleContaier">
            <div class="titleImg">
                <img src="../assets/images/title.jpg" alt="">
            </div>
            <div class="titleText">
                <ul>
                    <li><h3>小词小令</h3></li>
                    <li class="status onBusiness">
                        <span class="onBusinessText">营业中</span>
                    </li>
                    <li class="status">
                        <span class="unBound">未绑定</span>
                    </li>
                </ul>
                <span class="intro">门店简介：*************************************************</span>
            </div>
            <div class="QRcodeconContainer">
                <div class="QRcode">
                    <img src="../assets/images/ew.png" alt="">
                </div>
                <div class="logo">
                    <img src="../assets/images/logo1.png" alt="">
                </div>
                <div class="download"><p class="fa fa-arrow-circle-down">下载到手机</p></div>
            </div>
        </div>
        <el-row class="contentContainer">
            <el-col :span="8">
                <div class="turnoverContainer">
                    <ul class="turnover">
                        <li class="titleText">今日营业额</li>
                        <li class="totalNum">5555.00</li>
                        <li><i class="fa fa-long-arrow-up"></i> <i class="fa fa-jpy"></i>983.00</li>
                        <li>
                            <span>在线支付：<i class="fa fa-jpy"></i>983.00</span>
                            <span>到货付款：<i class="fa fa-jpy"></i>983.00</span>
                        </li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="turnoverContainer Containermar ContainerT">
                    <ul class="turnover">
                        <li class="titleText">今日订单</li>
                        <li class="totalNum">5555.00</li>
                        <li>比昨日同时间下降 <i class="fa fa-long-arrow-down"></i></li>
                        <li>
                            <span>按时送达：983</span>
                            <span>延误送达：983</span>
                        </li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="turnoverContainer Containermar ContainerK">
                    <ul class="turnover">
                        <li class="titleText">可用余额</li>
                        <li class="totalNum">5555.00</li>
                        <li><i class="fa fa-arrow-up"></i> <i class="fa fa-jpy"></i>983.00</li>
                        <li>
                            <span>可提现额度：<i class="fa fa-jpy"></i>983.00</span>
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <el-row class="orderBox">
            <ul class="orderContainer">
                <li class="msgBox">
                    <ul class="msg">
                        <li>
                            <span class="msgnum">7</span>
                            <span> 最新订单，希望尽快送达！</span>
                        </li>
                        <li class="receiveOrder"><el-button  type="success" size="small">一键接单</el-button></li>
                    </ul>
                </li>
                <li @click="changeClass(0)" :class=" type==1 ? 'active' : ''">
                    <el-row>
                        <el-col :span="10">
                            <el-col class="headPortrait" :span="9">
                                <img src="../assets/images/portrait.jpg" alt="">
                            </el-col>
                            <el-col :span="9" class="headerTitle">
                                <el-row>张晓天</el-row>
                                <el-row class="address">四川成店铺下你下发</el-row>
                            </el-col>

                        </el-col>
                        <el-col :span="10">
                            <el-col >
                                <el-row>备注：多放辣椒</el-row>
                                <el-row class="address">发票：四川成店铺下你下发</el-row>
                            </el-col>
                        </el-col>
                        <el-col :span="4"class="phone">
                            <i class="fa fa-phone">191919191911</i>
                        </el-col>
                    </el-row>
                </li>
                <li @click="changeClass(0)" :class=" type==1 ? 'active' : ''">
                    <el-row>
                        <el-col :span="10">
                            <el-col class="headPortrait" :span="9">
                                <img src="../assets/images/portrait.jpg" alt="">
                            </el-col>
                            <el-col :span="9" class="headerTitle">
                                <el-row>张晓天</el-row>
                                <el-row class="address">四川成店铺下你下发</el-row>
                            </el-col>

                        </el-col>
                        <el-col :span="10">
                            <el-col >
                                <el-row>备注：多放辣椒</el-row>
                                <el-row class="address">发票：四川成店铺下你下发</el-row>
                            </el-col>
                        </el-col>
                        <el-col :span="4"class="phone">
                            <i class="fa fa-phone">191919191911</i>
                        </el-col>
                    </el-row>
                </li>
            </ul>
        </el-row>
    </el-row>
</template>
<script>
    export default {
        data: function () {
            return {
                type: 1
            }
        },
        methods: {
            changeClass(index) {
                this.type = index
            }
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
    .QRcodeconContainer{
        background-color: #13ce66;
        width: 130px;
        height: 140px;
        text-align: center;
        position: absolute;
        top: 0px;
        right: 185px;
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
    .intro{
        padding-left: 40px;
        font-size: 15px;
        color: gray;
    }
    .status{
        float: right;
        padding: 10px;

        background-color: #ffffff;
        border: 1px solid rgba(215, 215, 215, 0.3);
    }
    .onBusiness{
        margin-left: 5px;
    }
    .unBound{
        color: #1d90e6;
        font-size: 10px;
    }
    .onBusinessText{
        color: #11b95c;
        font-size: 10px;
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
    .download{
        color: white
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
        padding-top: 10px;
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
        background-color: #ffffff;
        border-left: 2px solid #13ce66;
    }
    .headerTitle{
        padding-left: 10px;
    }
    .msgBox{
        margin-left: -5px;
    }
</style>
