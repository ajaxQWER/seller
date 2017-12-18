<template>
    <div id="login">
        <div class="login-container">
            <h3 class="title">共享点餐商家端</h3>
            <el-form :model="ruleForm" ref="ruleForm" label-width="60px">
                <el-form-item prop="account" label="手机号">
                    <el-input type="text" v-model="ruleForm.sellerName" auto-complete="off" placeholder="用户名" :maxlength="11"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass" label="验证码">
                    <el-input class="code-input" type="password" v-model="ruleForm.code" auto-complete="off" placeholder="验证码" :maxlength="4"></el-input>
                    <el-button type="primary" class="get-code-btn" @click="getCode" :disabled="isClickGetCode">获取验证码</el-button>
                </el-form-item>
                <el-form-item style="width:100%;">
                    <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
                </el-form-item>
                <p class="copyright">鑫圆共享电子商务股份有限公司© 2017
                    <br>蜀ICP备17032496号-4</p>
            </el-form>
        </div>
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
                        console.log(data)
                        localStorage.setItem('seller', JSON.stringify(data.seller));
                        localStorage.setItem('jwt', data.jwt);
                        localStorage.setItem('shopName',data.shopName)
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
<style lang="scss" scoped>
#login{
    width: 100%;
    height: 100%;
    position: absolute;
    //background-color: #ff0000;
}
.login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 15% 0 0 60%;
    ;
    background-color: #eee;
    width: 290px;
    padding: 15px 35px;
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
}
</style>
