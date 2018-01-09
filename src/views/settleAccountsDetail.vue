<template>
    <el-row class="bg">
        <el-row  v-if="orderList.length>0" v-loading="loading" element-loading-text="拼命加载中">
            <el-row class="countDetailTitle">
                <span>结算明细</span>
            </el-row>
            <ul class="orderContainer">
                <li v-for="(item,index) in orderList" :key="index">
                    <!--<router-link :to="'/orderDetail?orderId='+item.orderId" class="link">-->
                    <el-row class="orderTitle">
                        <el-col :span="6" class="orderTime">订单号：{{item.orderNum}}</el-col>
                        <el-col :span="10">流水号：{{item.orderNum}}</el-col>
                    </el-row>
                    <el-row style="margin-left: 5px">
                        <el-col :span="20">
                            <el-col :span="17" class="headerTitle">
                                <el-row class="mar">鸭血粉丝汤 等5件商品</el-row>
                                <el-row class="address mar">{{moment(item.addTime).format('YYYY-MM-DD HH:mm:ss')}}</el-row>

                            </el-col>
                        </el-col>
                        <el-col :span="3"class="totalCount" style="text-align: right">
                            <span>￥66.06</span>
                        </el-col>
                    </el-row>
                    <el-row class="mytable">
                        <table>
                            <thead>
                            <tr>
                                <th>商品</th>
                                <th>单价</th>
                                <th>实付金额</th>
                                <th>数量</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr >
                                <td>
                                    <span class="dishes">{{item.orderName}}</span>
                                    <span class="dishes dishesRemark">【大份+微辣】</span>
                                </td>
                                <td>{{item.orderGoodsCount}}</td>
                                <td class="moneyColor"><i class="fa fa-jpy"></i>￥{{item.orderPrice}}</td>
                                <td class="moneyColor" rowspan="2"><i class="fa fa-jpy"></i>{{item.orderGoodsPrice}}</td>
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
    </el-row>
</template>
<script>
    import { getOrderList, cancelOrderById, finishOrderById, acceptOrderById ,printOrder,getCarrierById,getPositionById,setOrderShipping} from '@/api/api'
    export default {
        data: function() {
            return {
                loading:false,
                copy:false,
                activeName: '0',
                orderSearchInput:'',
                active: 'order_1',
                pageId: 1,
                counts: 0,
                orderStatus: '',
                totalOrderCount : 0,
                orderList: [],
                orderId: 0,
                cancelLoading:false,
                cancelOrderForm:{
                    cancelContent: '',
                },
                dialogFormVisible:false
            }
        },
        created: function() {

        },
        methods: {
            searchIconClick(){
                console.log(this.orderSearchInput)
                this.getOrderLists()
            },
            //分页
            currentChange(val) {
                this.pageId = val;
                this.getOrderLists()
            },
            //获取列表
            getOrderLists(){
                this.loading=true
                getOrderList({ params: { pageSize: 5, pageId: this.pageId, orderStatus: this.orderStatus ,orderNum:this.orderSearchInput}}).then(res => {
                    this.loading=false
                    this.orderList = res.list
                    this.counts = res.count
                })
            },
            //点击tab获取的列表
            tabClick(tab){
                if (!tab || !tab.index) {
                    return false
                }
                switch (tab.index) {
                    case '0':
                        this.orderStatus = '';
                        this.activeName = '0';
                        break;
                    case '1':
                        this.orderStatus = 'MERCHANT_CONFIRM_RECEIPT';
                        this.activeName = '1';
                        break;
                    case '2':
                        this.orderStatus = 'SHIPPING';
                        this.activeName = '2';
                        break;
                    case '3':
                        this.orderStatus = 'TRANSACT_FINISHED';
                        this.activeName = '3';
                        break;
                    case '4':
                        this.orderStatus = 'CANCELLATION';
                        this.activeName = '4';
                        break;
                    default:
                        this.orderStatus = '';
                        this.activeName = '0'

                }
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

        beforeRouteEnter: function (to,from,next) {
            next(vm => {
                vm.getOrderLists()
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
</style>
