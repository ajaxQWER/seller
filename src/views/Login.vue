<template>
    <div>
        <div id="green-color">
            <div id="login">
                <img src="../assets/images/login.png" height="684" width="668" alt="">
                <div class="login-container">
                    <h3 class="title">共享点餐商家端</h3>
                    <el-form :model="ruleForm" ref="ruleForm" label-width="60px">
                        <el-form-item prop="account" label="手机号">
                            <el-input type="text" v-model="ruleForm.sellerName" auto-complete="off" placeholder="用户名" :maxlength="11"></el-input>
                        </el-form-item>
                        <el-form-item prop="checkPass" label="验证码">
                            <el-input class="code-input" type="text" v-model="ruleForm.code" auto-complete="off" placeholder="验证码" :maxlength="4"></el-input>
                            <el-button type="success" class="get-code-btn" @click="getCode" :disabled="isClickGetCode">获取验证码</el-button>
                        </el-form-item>
                        <el-button type="success" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
                    </el-form>
                </div>
            </div>
        </div>
        <el-row class="content">
            <el-col :span="10" :offset="4">
                <h4 class="subtitle">产品简介</h4>
                <p class="p-margin">共享点餐商家端，是共享点餐推出的商家管理系统。用户端处理订单，管理订单，管理菜品，商品。赶快入住共享点餐吧，让赚钱变得更简单。共享点餐商家端，是共享点餐推出的商家管理系统。用客户端处理订单，管理订单，管理菜品，商品。赶快入出共享点餐，让赚钱变得更简单。</p>
            </el-col>
            <el-col :span="8" :offset="2">
                <h4 class="subtitle">联系我们</h4>
                <p class="p-margin">电话:022-88888888</p>
                <p class="p-margin">邮箱:xinyuangongxiang@888tal.com</p>
                <p class="p-margin">四川省成都市高新区通威国际中心19楼</p>
            </el-col>
        </el-row>
        <el-row class="footer-bar">
            <p class="p-margin">鑫圆共享餐饮文化管理有限公司©2017 &nbsp; 蜀ICP备17032496号-4 <br><a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51019002001128" class="beian-link">
                <img src="../assets/images/beian-gov.png"/>川公网安备 51019002001128号</a>
            </p>
        </el-row>
    </div>
</template>
<script>
 import {
     userLogin,
     getPhoneCode
 } from '@/api/api';
export default {
    data: function() {
        return {
            logining: false,
            ruleForm: {
                sellerName: '',
                code: ''
            },
            isClickGetCode: false
        };
    },
    methods: {
        handleSubmit: function() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    var loginParams = {
                        sellerName: this.ruleForm.sellerName,
                        code: this.ruleForm.code
                    };
                    userLogin(loginParams).then(data => {
                        localStorage.setItem('seller', JSON.stringify(data.seller));
                        localStorage.setItem('sellerName', JSON.stringify(data.seller.sellerName));
                        localStorage.setItem('jwt', data.jwt);
                        localStorage.setItem('shopId',data.seller.shopList[0].shopId);
                        localStorage.setItem('shopName',data.seller.shopList[0].shopName);
                        this.$router.push({
                            path: '/index'
                        });
                    })
                } else {
                    return false;
                }
            });
        },
        getCode: function(e){
            if(this.ruleForm.sellerName == ''){
                this.$message({
                    message: '请输入手机号',
                    type: 'error'
                })
                return;
            }
            if(this.ruleForm.sellerName.length != 11){
                this.$message({
                    message: '手机号有误，请重新输入',
                    type: 'error'
                })
                return;
            }

            getPhoneCode(this.ruleForm.sellerName).then(()=>{})
            this.isClickGetCode = true;
            var i = 60;
            var codeInterval = setInterval(() =>{
                i--;
                if(i == 0){
                    e.target.innerText = '获取验证码';
                    clearInterval(codeInterval)
                    codeInterval = null;
                    this.isClickGetCode = false;
                    return;
                }
                e.target.innerText = i + 's后重发'
            }, 1000)
        }
    }
}
</script>
<style scoped>
#green-color{
    background-color: #28c76b;
}
#login{
    width: 1200px;
    margin: auto;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
}
.login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    background-color: #eee;
    width: 290px;
    height: 230px;
    padding: 15px 35px;
    margin-top: 20%;
}
.title {
    font-size: 20px;
    margin: 10px auto;
    text-align: center;
    color: #363f44;
}
.code-input{
    width: 45%;
}
.get-code-btn{
    display: inline-block;
    width: 50%;
}
.remember {
    margin-bottom: 20px;
}
.copyright {
    font-size: 14px;
    color: #98a6ad;
    text-align: center;
}
.footer-bar{
    width: 100%;
    padding-top: 20px;
    text-align: center;
    margin-top: 20px;
}
.footer-bar p{
    color: #333;
    line-height: 1.5;
}
.beian-link{
    text-decoration: none;
    color: #333;
}
.beian-link img{
    vertical-align: middle;
}
.p-margin{
    margin: 6px;
    color: #666666;
}
.content{
    background-color: #fff;
    padding-bottom: 30px;
}
.subtitle{
    border-left: 6px solid #11c15b;
    padding-left: 10px;
    color: #11c15b;
}
</style>



