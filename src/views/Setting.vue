<template>
    <el-row>
        <el-row class="bgColorW">
            <span>账号</span>
            <span class="countName">******</span>
        </el-row>
        <el-row>
            <el-form  :model="settingForm">
                <el-row>
                    <el-row class="bgColorG">
                        <span>登录密码修改</span>
                    </el-row>
                    <el-row class="bgColorW bgH">
                        <el-row>
                            <el-col :span="7">
                                <el-input v-model="settingForm.oldSecretkey" size="small" placeholder="旧密码"></el-input>
                            </el-col>
                        </el-row>
                        <el-col :span="7">
                            <el-input v-model="settingForm.newSecretkey" size="small" placeholder="新密码"></el-input>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row>
                    <el-row class="bgColorG">
                        <span>支付密码修改</span>
                    </el-row>
                    <el-row class="bgColorW bgH">
                        <el-row><span>手机号码：9999**000</span></el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-col :span="21">
                                    <el-input v-model="settingForm.oldSecretkey" size="small" placeholder="手机验证码"></el-input>
                                </el-col>
                                <el-col :span="1" :offset="1">
                                    <el-button type="success" size="small">发送验证码</el-button>
                                </el-col>
                            </el-col>
                        </el-row>
                        <el-col :span="7">
                            <el-input v-model="settingForm.newSecretkey" size="small" placeholder="新密码"></el-input>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row>
                    <el-row class="bgColorG">
                        <span>结算设置</span>
                    </el-row>
                    <el-row class="bgColorW bgH">
                        <el-row><span>手机号码：9999**000</span></el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-col :span="21">
                                    <el-input v-model="settingForm.oldSecretkey" size="small" placeholder="手机验证码"></el-input>
                                </el-col>
                                <el-col :span="1" :offset="1">
                                    <el-button type="success" size="small">发送验证码</el-button>
                                </el-col>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-row>提现账户类型</el-row>
                            <el-row>
                                <el-radio-group v-model="settingForm.paymentMethods">
                                    <el-radio label="银行卡"></el-radio>
                                    <el-radio label="支付宝"></el-radio>
                                    <el-radio label="微信"></el-radio>
                                </el-radio-group>
                            </el-row>
                            <el-row>
                                <el-col :span="7">
                                    <el-input v-model="settingForm.oldSecretkey" size="small" placeholder="提现账号"></el-input>
                                </el-col>
                            </el-row>
                        </el-row>
                    </el-row>
                </el-row>
                <el-row>
                    <el-row class="bgColorG">
                        <el-col :span="22">
                            <span>打印机设置</span>
                        </el-col>
                        <el-col :span="2">
                            <el-button type="success" size="mini">
                                添加打印机
                            </el-button>
                        </el-col>
                    </el-row>
                    <el-row class="bgColorW bgH">
                        <el-row class="printerSetting">
                            <el-col :span="22">
                                <el-row>
                                    <el-col :span="2">设备名称</el-col>
                                    <el-col :span="8">易联云k4(777777)</el-col>
                                    <el-col :span="4">易联云k4</el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="2">设备状态</el-col>
                                    <el-col :span="8">58mm/2份/在线</el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="2">
                                <el-button size="small">删除设备</el-button>
                            </el-col>
                        </el-row>
                        <el-row class="printerSetting">
                            <el-col :span="22">
                                <el-row>
                                    <el-col :span="2">设备名称</el-col>
                                    <el-col :span="8">易联云k4(777777)</el-col>
                                    <el-col :span="4">易联云k4</el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="2">设备状态</el-col>
                                    <el-col :span="8">58mm/2份/在线</el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="2">
                                <el-button size="small">删除设备</el-button>
                            </el-col>
                        </el-row>
                    </el-row>
                </el-row>
            </el-form>
        </el-row>
    </el-row>
</template>
<script>
export default {
    data: function() {
        return {
            settingForm:{
                oldSecretkey:'',
                newSecretkey:'',
                paymentMethods:''
            }
        }
    },
}
</script>
<style scoped>
    .bgColorW{
        background-color: white;
        line-height: 40px;
        padding-left: 20px;
    }
    .countName{
        color: #00c500;
    }
    .bgColorG{
        background-color: rgba(237, 236, 243, 0.89);
        line-height: 40px;
        padding-left: 20px;
    }
    .bgH{
        padding:10px 0px 10px 20px;
    }
    .printerSetting{
        border-bottom: 1px solid lightgrey;
    }
</style>
