<template>
    <el-row>
        <el-row class="bgColorW">
            <span>账号</span>
            <span class="countName">{{loginUser}}</span>
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
                            <el-button type="success" size="mini" @click="addPrinterBtn">
                                添加打印机
                            </el-button>
                        </el-col>
                    </el-row>
                    <el-row class="bgColorW bgH">
                        <el-row class="printerSetting" v-for="(item,index) in printerList" :key="index">
                            <el-col :span="22">
                                <el-row>
                                    <el-col :span="2">设备名称</el-col>
                                    <el-col :span="8">{{item.deviceName}}</el-col>
                                    <el-col :span="4">{{formatType(item.printerType)}}</el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="2">设备状态</el-col>
                                    <el-col :span="8">{{formatPageType(item.printerPageType)}}/{{item.copies}}份/{{formatStatus(item.printerStatus)}}</el-col>
                                </el-row>
                                <el-row v-if="item.deviceRemark">
                                    <el-col :span="2">设备备注</el-col>
                                    <el-col :span="8">{{item.deviceRemark}}</el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="2">
                                <el-button size="small" @click="editPrinter(item)" type="text">编辑</el-button>
                                <el-button size="small" @click="deletePrinter(item.printerId,index)" type="text" style="color: red">删除</el-button>
                            </el-col>
                        </el-row>
                    </el-row>
                </el-row>
            </el-form>
        </el-row>
        <!--添加打印机-->
        <el-dialog :title="isAdd?'新增设备':'修改设备'" :visible.sync="addDialog" size="tiny" class="dialog" @close="closeaddDialog">
            <el-form :model="addPrinterForm" label-width="120px">
                <el-form-item label="设备类型">
                    <el-select v-model="addPrinterForm.printerType" placeholder="请选择类型">
                        <el-option label="" :disabled="item.disabled" :value="item.value" v-for="(item) in printerTypes" :label="item.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备名称" v-if="addPrinterForm.deviceName">
                    <el-input type="text" v-model="addPrinterForm.deviceName " auto-complete="off" placeholder="单行输入"></el-input>
                </el-form-item>
                <el-form-item label="设备编号">
                    <el-input type="text" v-model="addPrinterForm.deviceId" auto-complete="off" placeholder="单行输入"></el-input>
                </el-form-item>
                <el-form-item label="设备密码" v-if="!addPrinterForm.deviceName">
                    <el-input type="text" v-model="addPrinterForm.deviceSecretKey" auto-complete="off" placeholder="请输入6-12位"></el-input>
                </el-form-item>
                <el-form-item label="纸张规则">
                    <el-select v-model="addPrinterForm.printerPageType" placeholder="请选择类型">
                        <el-option :label="item.label" :value="item.value" v-for="(item) in printerPageTypes" :disabled="item.disabled"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="打印数量">
                    <el-select v-model="addPrinterForm.copies" placeholder="请选择">
                        <el-option v-for="(item) in copyNum" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备备注">
                    <el-input type="text" v-model="addPrinterForm.deviceRemark" auto-complete="off" placeholder="请单行输入"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelAddPrinter" size="small">取 消</el-button>
                <el-button type="primary" @click="saveAddPrinter" :loading="addLoading" size="small">确 定</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>
<script>
import { getPrinterLists, deletePrinterById,addPrinter,updatePrinter } from '@/api/api';
export default {
    data: function() {
        return {
            addDialog:false,
            addLoading:false,
            isAdd:true,
            // 打印机
            pageId: 1,
            counts: 0,
            printerList: [],
            pageSize:10,
            settingForm:{
                oldSecretkey:'',
                newSecretkey:'',
                paymentMethods:'',
            },
            addPrinterForm:{
                copies: 1,
                deviceId: "",
                deviceName: "",
                deviceRemark: "",
                deviceSecretKey: "",
                printerId: 0,
                printerPageType: "MM58",
                printerType: "CLOUD_YILIANYUN_K4",
                shopId: 0
            },
            loginUser: JSON.parse(localStorage.getItem('seller')).sellerName,
            printerList:'',
            printerTypes: [{
                label: '易联云K4',
                value: 'CLOUD_YILIANYUN_K4',
                disabled: false,
            },{
                label: 'USB',
                value: 'USB',
                disabled: true,
            }],
            printerPageTypes: [{
                label: '58mm',
                value: 'MM58',
                disabled: false,
            },{
                label: '80mm',
                value: 'MM80',
                disabled: true,
            }],
            copyNum:[{
                label: '1',
                value: '1',
             },{
                label: '2',
                value: '2',
            },{
                    label: '3',
                    value: '3',
                },
                {
                    label: '4',
                    value: '4',
                },
                {
                    label: '5',
                    value: '5',
                },
                {
                    label: '6',
                    value: '6',
                },
                {
                    label: '7',
                    value: '7',
                },
                {
                    label: '8',
                    value: '8',
                },
                {
                    label: '9',
                    value: '9',
                },
            ]
        }
    },
    methods:{
        //取消保存打印机
        cancelAddPrinter(){
            this.addDialog = false
        },
        //关闭添加弹窗
        closeaddDialog: function() {
            this.isAdd = true;
            this.addLoading = false;
            this.addPrinterForm={
                    copies: 1,
                    deviceId: null,
                    deviceName: null,
                    deviceRemark: null,
                    deviceSecretKey: null,
                    printerId: 0,
                    printerPageType: "MM58",
                    printerType: "CLOUD_YILIANYUN_K4",
                    shopId: 0
            }
        },
        //保存打印机
        saveAddPrinter(){
            this.addLoading = true;
            if (this.isAdd) {
                addPrinter(this.addPrinterForm).then(data => {
                    this.getPrinterList();
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
                updatePrinter(this.addPrinterForm).then(data => {
                    this.getPrinterList();
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
        //点击编辑设备按钮
        editPrinter(row){
            this.isAdd = false;
            this.addDialog = true;
            this.addPrinterForm = {
                copies: row.copies,
                deviceId: row.deviceId,
                deviceName: row.deviceName,
                deviceRemark: row.deviceRemark,
                deviceSecretKey: row.deviceSecretKey,
                printerId: row.printerId,
                printerPageType: row.printerPageType,
                printerType: row.printerType,
                shopId: row.shopId
            }
        },
        // 点击添加打印机按钮
        addPrinterBtn(){
            this.addDialog = true
        },
        // 获取打印机列表
        getPrinterList: function(printer) {
            getPrinterLists({ params: { pageSize: 10, pageId: this.pageId } }).then(res => {
                this.printerList = res.list;
                this.counts = res.count;
            })
        },
        //删除打印机
        deletePrinter(id, index){
            this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deletePrinterById(id, index).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.pageId = 1;
                    this.getPrinterList({ pageId: this.pageId });
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        formatPageType: function (type) {
            switch (type){
                case 'MM58':
                    return '58mm';
                case 'MM80':
                    return '80mm';
                default:
                    return '';
            }
        },
        formatStatus: function (status) {
            switch (status){
                case 'UNBIND':
                    return '未绑定';
                case 'ONLINE':
                    return '在线';
                case 'OFFLINE':
                    return '离线';
                case 'ABNORMALITY':
                    return '异常';
                case 'PAPER_DEFICIENCY':
                    return '缺纸';
                default:
                    return '';
            }
        },
        formatType: function (type) {
            switch (type){
                case 'CLOUD_YILIANYUN_K4':
                    return '易联云K4';
                case 'USB':
                    return 'USB';
                default:
                    return '';
            }
        },
    },
    created(){
        this.getPrinterList()
    }
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
    .dialog-footer{
        background-color: rgba(238, 238, 238, 0.4);
       line-height: 40px;
    }
</style>
