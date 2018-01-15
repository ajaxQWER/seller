<template>
    <el-row class="bg">
        <el-row>
            <el-col>
                <el-col :span="18">
                    <el-tabs v-model="activeName" @tab-click="tabClick">
                        <el-tab-pane v-for="(tab, tabIndex) in tabs" :key="tabIndex" :label="tab.label" :name="tab.name" :value="tab.value"></el-tab-pane>
                    </el-tabs>    
                </el-col>
                
                <el-col :span="6" class="searchOrder">
                    <el-col :span="20">
                        <el-input
                            size="small"
                            placeholder="搜索订单号"
                            icon="search"
                            v-model="orderSearchInput"
                            :on-icon-click="searchIconClick">
                        </el-input>
                    </el-col>
                </el-col>
            </el-col>
        </el-row>
        <el-row  v-if="!isEmpty" v-loading="loading" element-loading-text="拼命加载中">
            <ul class="orderContainer" v-if="orderList.length">
                <li v-for="(item,index) in orderList" :key="index">
                    <!--<router-link :to="'/orderDetail?orderId='+item.orderId" class="link">-->
                    <el-row class="orderTitle">
                        <el-col :span="5" class="orderTime">{{moment(item.addTime).format('YYYY-MM-DD HH:mm:ss')}}</el-col>
                        <el-col :span="10">订单号：{{item.orderNum}}</el-col>
                    </el-row>
                    <el-row >
                        <el-col :span="20">
                            <el-col class="headPortrait" :span="4">
                                <img src="../assets/images/portrait.jpg" alt="">
                            </el-col>
                            <el-col :span="17" class="headerTitle">
                                <el-row class="mar">{{item.orderContact.contactName}}</el-row>
                                <el-row class="address mar">{{item.orderContact.address}}</el-row>
                                <el-row class="address mar">
                                    <span class="remark">备注：</span>
                                    <span class="remarkContent">{{item.orderContent?item.orderContent:'无'}}</span>
                                </el-row>
                            </el-col>
                        </el-col>
                        <el-col :span="3"class="phone">
                            <i class="fa fa-phone" @click.stop="copy=true">{{item.orderContact.contactPhone}}</i>
                            <el-button size="mini" type="text" @click="showOrderInfo(item,index)" style="margin-top: 10px">查看详情</el-button>
                        </el-col>
                    </el-row>
                    <el-row class="mytable">
                        <table>
                            <thead>
                            <tr>
                                <th>商品</th>
                                <th>数量</th>
                                <th>单价</th>
                                <th>实付金额</th>
                                <th>订单类型</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr >
                                <td>
                                    <span class="dishes">{{item.orderName}}</span>
                                    <!--<span class="dishes dishesRemark">【大份+微辣】</span>-->
                                </td>
                                <td>{{item.orderGoodsCount}}</td>
                                <td class="moneyColor"><i class="fa fa-jpy"></i>{{item.orderPrice}}</td>
                                <td class="moneyColor" rowspan="2"><i class="fa fa-jpy"></i>{{item.orderGoodsPrice}}</td>
                                <td>{{formatOrderType(item.orderType)}}</td>
                                <td rowspan="2">
                                    <el-row class="cancel" v-if="item.orderCancel.cancelType"><span class="dishes">{{formatCancelType(item.orderCancel.cancelType)}}</span></el-row>
                                    <el-row class="status" :class="item.orderStatus=='CANCELLATION'?'cancel':''"> <span class="dishes">{{formatOrderStatus(item.orderStatus)}}</span></el-row>
                                </td>
                                <td v-if="item.orderType=='TAKEOUT'" >
                                    <el-row type="flex" justify="center">
                                          <el-col :span="7">
                                        <el-button size="mini" type="success" @click="printOrderBtn(item.orderId)" >打印小票</el-button>
                                    </el-col>
                                    <el-col v-if="item.orderStatus=='PAYED'" :span="12">
                                        <el-button @click="cancelOrder(item.orderId)" size="mini" type="danger" >拒绝接单</el-button>
                                        <el-button @click="acceptOrder(item.orderId,item.orderType)" size="mini" type="success" >&emsp;接单&emsp;</el-button>
                                    </el-col>
                                    <el-col v-if="item.orderStatus=='MERCHANT_CONFIRM_RECEIPT'" :span="5">
                                        <el-button @click="cancelOrder(item.orderId)" size="mini" type="danger" >取消订单</el-button>
                                    </el-col>
                                    <el-col v-if="item.orderStatus=='WAIT_PICKUP'" :span="5">
                                        <el-button @click="cancelOrder(item.orderId)" size="mini" type="danger" >取消订单</el-button>
                                    </el-col>
                                    <el-col v-if="item.orderStatus=='PICKUPING'" :span="5">
                                        <el-button @click="cancelOrder(item.orderId)" size="mini" type="danger" >取消订单</el-button>
                                    </el-col>
                                    </el-row>
                                </td>
                                <td v-else>
                                     <el-row type="flex" justify="center">
                                        <el-col class="inline-block" v-if="item.orderStatus=='PAYED'" :span="20">
                                            <el-button @click="cancelOrder(item.orderId)" size="mini" type="danger" >拒绝接单</el-button>
                                            <el-button @click="acceptOrder(item.orderId,item.orderType)" size="mini" type="info">接单</el-button>
                                        </el-col>
                                        <el-col class="inline-block" v-if="item.orderStatus=='MERCHANT_CONFIRM_RECEIPT'" :span="4">
                                            <button @click="finishOrder(item.orderId)" class="btn deal-btn" size="mini" type="info">&emsp;完成&emsp;</button>
                                        </el-col>
                                     </el-row>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <el-row v-if="item.orderTakeout.carrierDriverName" style="margin-top: 10px">
                            <el-col class="" :span="2"><span style="color: #13ce66">骑手信息:</span></el-col>
                            <el-col class="" :span="20"><span>{{item.orderTakeout.carrierDriverName}} {{item.orderTakeout.carrierDriverphone}}</span></el-col>
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
        <el-row v-else class="empty">
            <img src="../assets/images/empty-img.png" alt="">
        </el-row>
        <!--取消订单弹窗-->
        <el-dialog title="取消订单" :visible.sync="dialogFormVisible">
            <el-form :model="cancelOrderForm">
                <el-form-item label="取消理由" :label-width="80">
                    <el-input v-model="cancelOrderForm.cancelContent" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="cfmCancelOrder" :loading="cancelLoading">确 定</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>
<script>
import { getOrderList, cancelOrderById, finishOrderById, acceptOrderById ,printOrder,getCarrierById,getPositionById,setOrderShipping} from '@/api/api'
export default {
    data: function() {
        return {
            isEmpty: false, //判断是否有无数据
            loading:false,
            copy:false,
            activeName: 'ALL',
            orderSearchInput:null,
            active: 'order_1',
            pageId: 1,
            counts: 0,
            orderStatus: null,
            totalOrderCount : 0,
            orderList: [],
            orderId: 0,
            cancelLoading:false,
            cancelOrderForm:{
                cancelContent: null,
            },
            dialogFormVisible:false,
            tabs: [{
                label: '全部订单',
                name: 'ALL',
            },{
                label: '已接单',
                name: 'MERCHANT_CONFIRM_RECEIPT'
            },{
                label: '配送中',
                name: 'SHIPPING'
            },{
                label: '已完成',
                name: 'TRANSACT_FINISHED'
            },{
                label: '已取消',
                name: 'CANCELLATION'
            }]
        }
    },
    created: function() {
        var pageId = parseInt(this.$route.query.pageId) || 1;
        var orderStatus = this.$route.query.orderStatus || null;
        this.pageId = pageId;
        this.orderStatus = orderStatus;
        this.activeName = orderStatus || 'ALL';
        this.getOrderLists()
    },
    methods: {
        searchIconClick(){
            this.getOrderLists()
        },
        //分页
        currentChange(val) {
            this.pageId = val;
            this.getOrderLists()
        },
        //获取列表
        getOrderLists(){
            this.loading = true;
            var params = {
                pageSize: 5,
                pageId: this.pageId,
                orderStatus: this.orderStatus,
                orderNum: this.orderSearchInput
            }
            getOrderList({ params: params}).then(res => {
               this.isEmpty = res.list.length ? false : true
                var queryString = '?';
                for(var key in params){
                    if(params[key]){
                        queryString += key + '=' + params[key] + '&';
                    }
                }
                this.$router.push(queryString);
                this.loading = false
                this.orderList = res.list
                this.counts = res.count
            })
        },
        //点击tab获取的列表
        tabClick(tab){
            if (!tab || !tab.index) {
                return false
            }
            this.orderStatus = tab.index == '0' ?  null : tab.name;
            this.activeName = tab.name;
            this.pageId = 1;
            this.getOrderLists()
        },
        formatCancelType: function(type) {
            switch (type) {
                case 'USER':
                    return '用户取消';
                case 'SHOP':
                    return '商家取消';
                case 'WAIT_PAY_TIMEOUT':
                    return '支付超时';
                case 'RECEIVING_TIMEOUT':
                    return '接单超时';
                case 'DELIVERY_REJECT':
                    return '配送拒绝';
                default:
                    return '-'
            }
        },
        formatOrderStatus: function(status) {
            switch (status) {
                case 'PAYED':
                    return '新订单';
                case 'SHIPPING':
                    return '配送中';
                case 'CANCELLATION':
                    return '已取消';
                case 'TRANSACT_FINISHED':
                    return '已完成';
                case 'MERCHANT_CONFIRM_RECEIPT':
                    return '已接单';
                case 'WAIT_PICKUP':
                    return '待取货';
                case 'PICKUPING':
                    return '取货中';
                case 'DELIVERED':
                    return '已送达';
                default:
                    break;
            }
        },
        formatOrderType: function(type) {
            switch (type) {
                case 'TAKEOUT':
                    return '外卖订单';
                case 'RESERVE':
                    return '预定订单';
                default:
                    break;
            }
        },
        showOrderInfo: function(item, index) {
            var orderId = item.orderId;
            this.$router.push('/orderDetail?orderId=' + orderId)
        },
        //取消订单
        cancelOrder: function(orderId) {
            this.dialogFormVisible=true
            this.orderId=orderId
        },
        cfmCancelOrder(orderId){
            this.dialogFormVisible=false
            this.cancelLoading=true
            var params = {
                cancelContent: this.cancelOrderForm.cancelContent,
                orderId: this.orderId
            }
            console.log(params)
            cancelOrderById(params).then(() => {
                this.cancelLoading=false
                this.$message({
                    type: 'success',
                    message: '取消成功!'
                });
                this.getOrderLists()
            }).catch((err) => {
                this.cancelLoading=false
                this.$message.error(err.message);
            });
        },
        //确定接单
        acceptOrder: function(orderId, orderType) {
            var isConfirm = confirm('确定接单?');
            if(isConfirm){
                acceptOrderById(orderId).then(() => {
                    this.$message({
                        type: 'success',
                        message: '接单成功!'
                    });
                    this.getOrderLists()
                })
            }
        },
        //完成订单
        finishOrder: function(orderId) {
            var isConfirm = confirm('确定完成预定订单?');
            if(isConfirm){
                finishOrderById(orderId).then(() => {
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                    this.getOrderLists()
                })
            }
        },
        // 补打订单
        printOrderBtn(orderId){
            this.$confirm('是否确认补打订单？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                printOrder(orderId).then(() => {
                    this.getOrderLists()
                })
                this.$message({
                    type: 'success',
                    message: '补打成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消补打'
                });
            });
        }
    },

    // beforeRouteEnter: function (to,from,next) {
            // next(vm => {
            //        vm.tabClick({pageId: 1, orderStatus: vm.orderStatus ,index:'0'})
            // });
    // }

}

</script>
<style scoped lang="scss">
    .bg{
        background-color: white;
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
    .phone{
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
        padding-left: 30px;
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
    .searchOrder{
        line-height: 41px;
        border-bottom: 1px solid lightgrey;
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
</style>
