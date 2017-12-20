<template>
    <el-row class="bg">
        <el-tabs v-model="activeName" @tab-click="getOrderListData">
            <el-tab-pane :label="'全部订单'+ '('+totalOrderCount+')'" name="0">
                <el-row  v-if="orderList.length>0"  v-loading="loading">
                    <el-row class="searchBox">
                        <el-col :span="5">
                            <el-input
                                size="small"
                                placeholder="搜索订单号"
                                icon="search"
                                v-model="orderSearchInput"
                                :on-icon-click="searchIconClick">
                            </el-input>
                        </el-col>
                    </el-row>
                    <ul class="orderContainer">
                        <li v-for="(item,index) in orderList" :key="index"  @click="showOrderInfo(item,index)">
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
                                    <i class="fa fa-phone">{{item.orderContact.contactPhone}}</i>
                                </el-col>
                            </el-row>
                            <el-row class="mytable">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>商品</th>
                                        <th>单价</th>
                                        <th>数量</th>
                                        <th>实付金额</th>
                                        <th>状态</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <span class="dishes">{{item.orderName}}</span>
                                            <span class="dishes dishesRemark">【大份+微辣】</span>
                                        </td>
                                        <td class="moneyColor"><i class="fa fa-jpy"></i>{{item.orderPrice}}</td>
                                        <td>{{item.orderGoodsCount}}</td>
                                        <td class="moneyColor" rowspan="2"><i class="fa fa-jpy"></i>{{item.orderGoodsPrice}}</td>
                                        <td rowspan="2">
                                            <el-row class="clock"><i class="fa fa-clock-o "></i> <span> 已下单**分钟</span></el-row>
                                            <el-row class="cancel" v-if="item.orderCancel.cancelType">{{formatCancelType(item.orderCancel.cancelType)}}</el-row>
                                            <el-row class="status" :class="item.orderStatus=='CANCELLATION'?'cancel':''">{{formatOrderStatus(item.orderStatus)}}</el-row>
                                        </td>
                                    </tr>
                                    <!--<tr>-->
                                        <!--<td>华为</td>-->
                                        <!--<td><i class="fa fa-jpy"></i>78</td>-->
                                        <!--<td>1234567</td>-->
                                    <!--</tr>-->
                                    </tbody>
                                </table>
                            </el-row>
                            <!--</router-link>-->
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
            </el-tab-pane>
            <el-tab-pane :label="'新订单'+ '('+totalOrderCount+')'" name="1">
                <el-row  v-if="orderList.length>0"  v-loading="loading">
                    <el-row class="searchBox">
                        <el-col :span="5">
                            <el-input
                                size="small"
                                placeholder="搜索订单号"
                                icon="search"
                                v-model="orderSearchInput"
                                :on-icon-click="searchIconClick">
                            </el-input>
                        </el-col>
                    </el-row>
                    <ul class="orderContainer">
                        <li v-for="(item,index) in orderList" :key="index"  @click="showOrderInfo(item,index)">
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
                                    <i class="fa fa-phone">{{item.orderContact.contactPhone}}</i>
                                </el-col>
                            </el-row>
                            <el-row class="mytable">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>商品</th>
                                        <th>单价</th>
                                        <th>数量</th>
                                        <th>实付金额</th>
                                        <th>状态</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <span class="dishes">{{item.orderName}}</span>
                                            <span class="dishes dishesRemark">【大份+微辣】</span>
                                        </td>
                                        <td class="moneyColor"><i class="fa fa-jpy"></i>{{item.orderPrice}}</td>
                                        <td>{{item.orderGoodsCount}}</td>
                                        <td class="moneyColor" rowspan="2"><i class="fa fa-jpy"></i>{{item.orderGoodsPrice}}</td>
                                        <td rowspan="2">
                                            <el-row class="clock"><i class="fa fa-clock-o "></i> <span> 已下单**分钟</span></el-row>
                                            <el-row class="cancel" v-if="item.orderCancel.cancelType">{{formatCancelType(item.orderCancel.cancelType)}}</el-row>
                                            <el-row class="status" :class="item.orderStatus=='CANCELLATION'?'cancel':''">{{formatOrderStatus(item.orderStatus)}}</el-row>
                                        </td>
                                    </tr>
                                    <!--<tr>-->
                                    <!--<td>华为</td>-->
                                    <!--<td><i class="fa fa-jpy"></i>78</td>-->
                                    <!--<td>1234567</td>-->
                                    <!--</tr>-->
                                    </tbody>
                                </table>
                            </el-row>
                            <!--</router-link>-->
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
            </el-tab-pane>
            <el-tab-pane :label="'进行中'+ '('+totalOrderCount+')'" name="2">
                <el-row  v-if="orderList.length>0"  v-loading="loading">
                    <el-row class="searchBox">
                        <el-col :span="5">
                            <el-input
                                size="small"
                                placeholder="搜索订单号"
                                icon="search"
                                v-model="orderSearchInput"
                                :on-icon-click="searchIconClick">
                            </el-input>
                        </el-col>
                    </el-row>
                    <ul class="orderContainer">
                        <li v-for="(item,index) in orderList" :key="index"  @click="showOrderInfo(item,index)">
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
                                    <i class="fa fa-phone">{{item.orderContact.contactPhone}}</i>
                                </el-col>
                            </el-row>
                            <el-row class="mytable">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>商品</th>
                                        <th>单价</th>
                                        <th>数量</th>
                                        <th>实付金额</th>
                                        <th>状态</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <span class="dishes">{{item.orderName}}</span>
                                            <span class="dishes dishesRemark">【大份+微辣】</span>
                                        </td>
                                        <td class="moneyColor"><i class="fa fa-jpy"></i>{{item.orderPrice}}</td>
                                        <td>{{item.orderGoodsCount}}</td>
                                        <td class="moneyColor" rowspan="2"><i class="fa fa-jpy"></i>{{item.orderGoodsPrice}}</td>
                                        <td rowspan="2">
                                            <el-row class="clock"><i class="fa fa-clock-o "></i> <span> 已下单**分钟</span></el-row>
                                            <el-row class="cancel" v-if="item.orderCancel.cancelType">{{formatCancelType(item.orderCancel.cancelType)}}</el-row>
                                            <el-row class="status" :class="item.orderStatus=='CANCELLATION'?'cancel':''">{{formatOrderStatus(item.orderStatus)}}</el-row>
                                        </td>
                                    </tr>
                                    <!--<tr>-->
                                    <!--<td>华为</td>-->
                                    <!--<td><i class="fa fa-jpy"></i>78</td>-->
                                    <!--<td>1234567</td>-->
                                    <!--</tr>-->
                                    </tbody>
                                </table>
                            </el-row>
                            <!--</router-link>-->
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
            </el-tab-pane>
            <el-tab-pane :label="'已完成'+ '('+totalOrderCount+')'" name="3">
                <el-row  v-if="orderList.length>0"  v-loading="loading">
                    <el-row class="searchBox">
                        <el-col :span="5">
                            <el-input
                                size="small"
                                placeholder="搜索订单号"
                                icon="search"
                                v-model="orderSearchInput"
                                :on-icon-click="searchIconClick">
                            </el-input>
                        </el-col>
                    </el-row>
                    <ul class="orderContainer">
                        <li v-for="(item,index) in orderList" :key="index"  @click="showOrderInfo(item,index)">
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
                                    <i class="fa fa-phone">{{item.orderContact.contactPhone}}</i>
                                </el-col>
                            </el-row>
                            <el-row class="mytable">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>商品</th>
                                        <th>单价</th>
                                        <th>数量</th>
                                        <th>实付金额</th>
                                        <th>状态</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <span class="dishes">{{item.orderName}}</span>
                                            <span class="dishes dishesRemark">【大份+微辣】</span>
                                        </td>
                                        <td class="moneyColor"><i class="fa fa-jpy"></i>{{item.orderPrice}}</td>
                                        <td>{{item.orderGoodsCount}}</td>
                                        <td class="moneyColor" rowspan="2"><i class="fa fa-jpy"></i>{{item.orderGoodsPrice}}</td>
                                        <td rowspan="2">
                                            <el-row class="clock"><i class="fa fa-clock-o "></i> <span> 已下单**分钟</span></el-row>
                                            <el-row class="cancel" v-if="item.orderCancel.cancelType">{{formatCancelType(item.orderCancel.cancelType)}}</el-row>
                                            <el-row class="status" :class="item.orderStatus=='CANCELLATION'?'cancel':''">{{formatOrderStatus(item.orderStatus)}}</el-row>
                                        </td>
                                    </tr>
                                    <!--<tr>-->
                                    <!--<td>华为</td>-->
                                    <!--<td><i class="fa fa-jpy"></i>78</td>-->
                                    <!--<td>1234567</td>-->
                                    <!--</tr>-->
                                    </tbody>
                                </table>
                            </el-row>
                            <!--</router-link>-->
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
            </el-tab-pane>
            <el-tab-pane :label="'已取消'+ '('+totalOrderCount+')'" name="4">
                <el-row  v-if="orderList.length>0"  v-loading="loading">
                    <el-row class="searchBox">
                        <el-col :span="5">
                            <el-input
                                size="small"
                                placeholder="搜索订单号"
                                icon="search"
                                v-model="orderSearchInput"
                                :on-icon-click="searchIconClick">
                            </el-input>
                        </el-col>
                    </el-row>
                    <ul class="orderContainer">
                        <li v-for="(item,index) in orderList" :key="index"  @click="showOrderInfo(item,index)">
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
                                    <i class="fa fa-phone">{{item.orderContact.contactPhone}}</i>
                                </el-col>
                            </el-row>
                            <el-row class="mytable">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>商品</th>
                                        <th>单价</th>
                                        <th>数量</th>
                                        <th>实付金额</th>
                                        <th>状态</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <span class="dishes">{{item.orderName}}</span>
                                            <span class="dishes dishesRemark">【大份+微辣】</span>
                                        </td>
                                        <td class="moneyColor"><i class="fa fa-jpy"></i>{{item.orderPrice}}</td>
                                        <td>{{item.orderGoodsCount}}</td>
                                        <td class="moneyColor" rowspan="2"><i class="fa fa-jpy"></i>{{item.orderGoodsPrice}}</td>
                                        <td rowspan="2">
                                            <el-row class="clock"><i class="fa fa-clock-o "></i> <span> 已下单**分钟</span></el-row>
                                            <el-row class="cancel" v-if="item.orderCancel.cancelType">{{formatCancelType(item.orderCancel.cancelType)}}</el-row>
                                            <el-row class="status" :class="item.orderStatus=='CANCELLATION'?'cancel':''">{{formatOrderStatus(item.orderStatus)}}</el-row>
                                        </td>
                                    </tr>
                                    <!--<tr>-->
                                    <!--<td>华为</td>-->
                                    <!--<td><i class="fa fa-jpy"></i>78</td>-->
                                    <!--<td>1234567</td>-->
                                    <!--</tr>-->
                                    </tbody>
                                </table>
                            </el-row>
                            <!--</router-link>-->
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
            </el-tab-pane>
        </el-tabs>
    </el-row>
</template>
<script>
import { getOrderList, cancelOrderById, finishOrderById, acceptOrderById } from '@/api/api'
export default {
    data: function() {
        return {
            activeName: '0',
            orderSearchInput:'',
            init: true,
            allLoaded: false,
            active: 'order_1',
            current: 1,
            pageId: 1,
            counts: 0,
            orderStatus: '',
            totalOrderCount : 0,
            orderList: [],
            canLoad: false,
            isEmpty: false,
            popupVisible3: false,
            orderId: 0,
            cancelContent: '',
            loading:false,
            cancelContent:''
        }
    },
    created: function() {

    },
    methods: {
        searchIconClick(){
            this.getOrderListData()
        },
        //分页
        currentChange(val) {
            this.pageId = val;
            this.getOrderListData(val)
        },
        getOrderListData(tab){
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
            this.Loading=true
            getOrderList({ params: { pageSize: 5, pageId: this.pageId, orderStatus: this.orderStatus ,orderNum:this.orderSearchInput}}).then(res => {
                this.Loading=false
                console.log(res)
                console.log(res.list)
                if (this.init) {
                    this.orderList = res.list
                    this.totalOrderCount = res.count
                } else {
                    this.orderList = [].concat.apply(this.orderList, res.list)
                }
                this.counts = res.count;
                if (res.count == 0) {
                    this.allLoaded = true;
                    this.isEmpty = true;
                } else {
                    this.canLoad = true;
                    this.isEmpty = false;
                }
                if (Math.ceil(this.counts / 10) == this.pageId) {
                    this.allLoaded = true;
                    this.canLoad = false;
                    return;
                }
            })
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
        showOrderInfo: function(item, index) {
            var orderId = item.orderId;
            this.$router.push('/orderDetail?orderId=' + orderId)
        },
        //取消订单
        orderCancel: function(orderId) {
            var params = {
                cancelContent: this.cancelContent,
                orderId: this.orderId
            }
            console.log(params)
            cancelOrderById(params).then(() => {
                this.$message({
                    type: 'success',
                    message: '取消成功!'
                });
                this.getOrderListData({ pageId: this.pageId, orderStatus: this.orderStatus })
            })
        },
    },
    created(){
        this.getOrderListData({pageId: this.pageId, orderStatus: this.orderStatus })
    },
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
        padding-top: 10px;
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
