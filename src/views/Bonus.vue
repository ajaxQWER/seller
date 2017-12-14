<template>
    <el-row>
        <el-row class="bonusTitle">
            <el-col :span="22">
                <el-row class="bonusSetting">红包设置</el-row>
                <el-row>Lorem ipsum dolor sit amet, consectetur adipisicing.</el-row>
            </el-col>
            <el-col :span="2">
                <el-button type="success" size="small" @click="addNewBouns">添加红包</el-button>
            </el-col>
        </el-row>
        <el-row class="bonusContentBox">
            <ul class="bonusContent">
                <li>
                    <el-row>
                        <el-col :span="2">
                            <img src="../assets/images/envelopes.png" alt="">
                        </el-col>
                        <el-col :span="19">
                            <el-row><i class="fa fa-jpy"></i> 66 <span class="actives">(满30元可用)</span></el-row>
                            <el-row class="bonusNameBox"><span class="bonusName">红包名称： <span>Lorem ipsum dolor sit.</span> </span></el-row>
                            <el-row>2017-09-09 到期</el-row>
                        </el-col>
                        <el-col :span="3" class="operation">
                            <el-button type="text" @click="editBouns">编辑</el-button>
                            <el-button type="text">删除</el-button>
                        </el-col>
                    </el-row>
                </li>
                <li>
                    <el-row>
                        <el-col :span="2">
                            <img src="../assets/images/envelopes.png" alt="">
                        </el-col>
                        <el-col :span="19">
                            <el-row><i class="fa fa-jpy"></i> 66 <span class="actives">(满30元可用)</span></el-row>
                            <el-row class="bonusNameBox"><span class="bonusName">红包名称：<span>Lorem ipsum dolor sit.</span></span></el-row>
                            <el-row>2017-09-09 到期</el-row>
                        </el-col>
                        <el-col :span="3" class="operation">
                            <el-button type="text">编辑</el-button>
                            <el-button type="text">删除</el-button>
                        </el-col>
                    </el-row>
                </li>
            </ul>
        </el-row>
        <!--编辑/修改红包-->
        <el-dialog :title="isAdd?'新增红包':'修改红包'" :visible.sync="addDialog" size="tiny" @close="closeaddDialog" class="dialog">
            <el-form :model="addBonusForm" label-width="120px">
                <el-form-item label="红包名称">
                    <el-input type="text" v-model="addBonusForm.name" auto-complete="off" placeholder="单行输入"></el-input>
                </el-form-item>
                <el-form-item label="自助领取">
                    <el-radio-group v-model="addBonusForm.name">
                        <el-radio label='允许'></el-radio>
                        <el-radio label="不允许"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="红包金额">
                    <el-input type="text" v-model="addBonusForm.name" auto-complete="off" placeholder="单行输入"></el-input>
                </el-form-item>
                <el-form-item label="使用时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="addBonusForm.name" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="addBonusForm.name" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="最大领取数量">
                    <el-input type="text" v-model="addBonusForm.name" auto-complete="off" placeholder="留空为不限制"></el-input>
                </el-form-item>
                <el-form-item label="最低消费额度">
                    <el-input type="text" v-model="addBonusForm.name" auto-complete="off" placeholder="留空为不限制"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelAddBonus" size="small">取 消</el-button>
                <el-button type="primary" @click="saveAddBonus" :loading="addLoading" size="small">保 存</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>
<script>
export default {
    data: function() {
        return {
            isAdd: true,
            addDialog:false,
            addLoading:false,
            addBonusForm:{
                name:''
            }
        }
    },
    methods:{
        //关闭添加弹窗
        closeaddDialog: function() {
            this.isAdd = true;
            this.addLoading = false;
        },
        //取消添加分类
        cancelAddBonus: function() {
            this.addDialog = false;
        },
        saveAddBonus(){
            this.addLoading = true;
        },
        //点击编辑红包按钮
        editBouns(){
            this.addDialog = true;
        },
        // 点击添加红包按钮
        addNewBouns(){
            this.addDialog = true;
        }
    }
}
</script>
<style scoped>
    .bonusTitle{
        border-left: 2px solid #00ba00;
        background-color: white;
        padding: 10px;
    }
    .bonusSetting{
        font-size: 18px;
    }
    .bonusContentBox{
        margin-top: 10px;
    }
    .bonusContent{
        background-color: white;
        margin: 0;
        padding: 10px;
    }
    .bonusContent>li{
        list-style: none;
        border-bottom: 1px solid lightgrey;
        padding-bottom: 15px;
        padding-top: 15px;
    }
    .actives{
        color: red;
    }
    .bonusName{
        color: #7d7d7d;

    }
    .bonusNameBox{
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .operation{
        text-align: right;
        padding-right: 18px;
    }
</style>
