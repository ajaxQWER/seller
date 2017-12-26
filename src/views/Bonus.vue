<template>
    <el-row>
        <el-row class="bonusTitle">
            <el-col :span="22">
                <!--<el-row class="i-icon i-icon-shouye"></el-row>-->
                <el-row class="bonusSetting">红包设置</el-row>
                <el-row>Lorem ipsum dolor sit amet, consectetur adipisicing.</el-row>
            </el-col>
            <el-col :span="2">
                <el-button type="success" size="small" @click="addNewBouns">添加红包</el-button>
            </el-col>
        </el-row>
        <el-row class="bonusContentBox"v-if="bonusList.length>0">
            <ul class="bonusContent">
                <li v-for="(item, index) in bonusList " :key="index">
                    <el-row>
                        <el-col :span="2">
                            <img src="../assets/images/envelopes.png" alt="">
                        </el-col>
                        <el-col :span="19">
                            <el-row><i class="fa fa-jpy"></i> {{item.money}} <span class="actives">{{item.minimum?'满'+item.minimum+'元可用':'任意金额可用'}}</span></el-row>
                            <el-row class="bonusNameBox"><span class="bonusName">红包名称： <span>{{item.couponName}}</span> </span></el-row>
                            <el-row>{{item.endTime?(moment(item.endTime).format('YYYY-MM-DD HH:mm')+'到期'):'无限期'}}</el-row>
                        </el-col>
                        <el-col :span="3" class="operation">
                            <el-button type="text" @click="editBouns(item)">编辑</el-button>
                            <el-button type="text"  @click="deleteBonus(item.couponId)" style="color: red">删除</el-button>
                        </el-col>
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
        <el-row v-else class="empty">
            <img src="../assets/images/empty-img.png" alt="">
        </el-row>
        <!--编辑/修改红包-->
        <el-dialog :title="isAdd?'新增红包':'修改红包'" :visible.sync="addDialog" size="tiny" @close="closeaddDialog" class="dialog">
            <el-form :model="addBonusForm" label-width="120px">
                <el-form-item label="红包名称">
                    <el-input type="text" v-model="addBonusForm.couponName" auto-complete="off" placeholder="单行输入"></el-input>
                </el-form-item>
                <el-form-item label="自助领取">
                    <el-radio-group v-model="addBonusForm.pickUpType">
                        <el-radio label='HAND'>允许</el-radio>
                        <el-radio label="CONSUME">不允许</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="金额类型">
                    <el-radio-group v-model="addBonusForm.couponMoneyType">
                        <el-radio label='FIXED' >固定</el-radio>
                        <el-radio label="RANDOM" >随机</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="红包金额">
                    <el-input type="text" v-model="addBonusForm.money" auto-complete="off" placeholder="单行输入"></el-input>
                </el-form-item>
                <el-form-item label="使用时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="addBonusForm.startTime" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="addBonusForm.endTime" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="最大领取数量">
                    <el-input type="text" v-model="addBonusForm.maxPickUpNumber" auto-complete="off" placeholder="留空为不限制"></el-input>
                </el-form-item>
                <el-form-item label="最低消费额度">
                    <el-input type="text" v-model="addBonusForm.minimum" auto-complete="off" placeholder="最低消费额度"></el-input>
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
    import {getBonusLists,deleteBonusById,addBonus,updateBonusById,getBonusById} from '@/api/api'
export default {
    data: function() {
        return {
            isAdd: true,
            addDialog:false,
            addLoading:false,
            pageId: 1,
            counts: 0,
            bonusList:'',
            addBonusForm:{
                couponName:'',
                pickUpType:'HAND',
                couponMoneyType:'FIXED',
                money:'',
                startTime:'',
                endTime:'',
                maxPickUpNumber:'',
                minimum:'',
                couponId:""
            }
        }
    },
    methods:{
        //关闭添加弹窗
        closeaddDialog: function() {
            this.isAdd = true;
            this.addLoading = false;
            this.addBonusForm={
                couponName:'',
                    pickUpType:'HAND',
                    couponMoneyType:'FIXED',
                    money:'',
                    startTime:'',
                    endTime:'',
                    maxPickUpNumber:'',
                    minimum:'',
                    couponId:""
            }
        },
        //分页
        currentChange(val) {
            this.pageId = val;
            this.getBonusList(val)
        },
        //取消添加分类
        cancelAddBonus: function() {
            this.addDialog = false;
        },
        saveAddBonus(){
            if (!this.addBonusForm.couponName) {
                this.$message({
                    message: '请输入红包名称',
                    type: 'warning'
                })
                return;
            }
            if (this.addBonusForm.couponMoneyType == 'FIXED' && !this.addBonusForm.money) {
                this.$message({
                    message: '请输入红包金额',
                    type: 'warning'
                })
                return;
            }
            if (this.addBonusForm.endTime && this.addBonusForm.startTime > this.addBonusForm.endTime) {
                this.$message({
                    message: '结束时间不能小于开始时间',
                    type: 'warning'
                })
                return;
            }
            this.addLoading = true;
            if (this.isAdd) {
                addBonus(this.addBonusForm).then(data => {
                    this.getBonusList();
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    })
                    this.addDialog = false;
                }).catch(data =>{
                    this.$message({
                        message: data.message,
                        type: 'error'
                    })
                    this.addLoading = false;
                })
            } else {
                updateBonusById(this.addBonusForm).then(data => {
                    this.getBonusList();
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    })
                    this.addDialog = false;
                }).catch(data => {
                    this.$message({
                        message: data.message,
                        type: 'error'
                    })
                    this.addLoading = false;
                })
            }
        },
        //点击编辑红包按钮
        editBouns(row){
            this.isAdd = false;
            this.addDialog = true;
            this.addBonusForm = {
                couponName:row.couponName,
                pickUpType:row.pickUpType,
                couponMoneyType:row.couponMoneyType,
                money:row.money,
                startTime:row.startTime,
                endTime:row.endTime,
                maxPickUpNumber:row.maxPickUpNumber,
                minimum:row.minimum,
                couponId:row.couponId
            }
        },
        // 点击添加红包按钮
        addNewBouns(){
            this.addDialog = true;
        },
        //获取红包列表
        getBonusList: function(){
            getBonusLists({params: {pageSize: 5,pageId:this.pageId}}).then(res => {
                this.bonusList = res.list;
                this.counts = res.count;
            })
        },
        //删除红包
        deleteBonus(couponId){
            this.$confirm('此操作将永久删除该红包, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteBonusById(couponId).then(() => {
                    this.getBonusList()
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
        }
    },
    created(){
        //最大日期和最小日期限制在当年
        // var thisYear = new Date().getFullYear();
        // var thisStartDate = thisYear + '-01-01';
        // var thisEndDate = thisYear + 4 + '-12-31';
        // this.startDate = new Date(thisStartDate);
        // this.endDate = new Date(thisEndDate);
    },
    mounted(){
        this.getBonusList()
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
        background-color: white;
    }
    .bonusContent{
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
    .empty{
        padding: 30px;
        text-align: center;
    }
    .PaginationBox{
        text-align: right;
        margin-bottom: 10px;
    }
</style>
