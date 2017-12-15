<template>
    <el-row class="bg">
        <el-tabs v-model="activeName" @tab-click="tableTitleClick">
            <el-tab-pane label="全部订单(55)" name="first">
                <el-row>
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
                        <li v-for="(item,index) in orderList" :key="index">
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
                                            <el-row class="status">已完成。。。</el-row>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>华为</td>
                                        <td><i class="fa fa-jpy"></i>78</td>
                                        <td>1234567</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </el-row>
                        </li>
                    </ul>
                    <el-row class="PaginationBox">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :page-size="100"
                            layout="prev, pager, next, jumper"
                            :total="1000">
                        </el-pagination>
                    </el-row>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="新订单(55)" name="second">
                <el-row>
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
                        <li>
                            <el-row class="orderTitle">
                                <el-col :span="4" class="orderTime">2017-09-09 11:30</el-col>
                                <el-col :span="10">订单号：50000000</el-col>
                            </el-row>
                            <el-row >
                                <el-col :span="20">
                                    <el-col class="headPortrait" :span="9">
                                        <img src="../assets/images/portrait.jpg" alt="">
                                    </el-col>
                                    <el-col :span="9" class="headerTitle">
                                        <el-row class="mar">张晓天</el-row>
                                        <el-row class="address mar">四川成店铺下你下发</el-row>
                                        <el-row class="address mar">
                                            <span class="remark">备注：</span>
                                            <span class="remarkContent">哆多。。。</span>
                                        </el-row>
                                    </el-col>
                                </el-col>
                                <el-col :span="4"class="phone">
                                    <i class="fa fa-phone">191919191911</i>
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
                                            <span class="dishes">招牌菜</span>
                                            <span class="dishes dishesRemark">【大份+微辣】</span>
                                        </td>
                                        <td class="moneyColor"><i class="fa fa-jpy"></i>78</td>
                                        <td>X2</td>
                                        <td class="moneyColor" rowspan="2"><i class="fa fa-jpy"></i>78</td>
                                        <td rowspan="2">
                                            <el-row class="clock"><i class="fa fa-clock-o "></i> <span> 已下单**分钟</span></el-row>
                                            <el-row class="status">已完成。。。</el-row>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>华为</td>
                                        <td><i class="fa fa-jpy"></i>78</td>
                                        <td>1234567</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </el-row>
                        </li>
                        <li>
                            <el-row class="orderTitle">
                                <el-col :span="4" class="orderTime">2017-09-09 11:30</el-col>
                                <el-col :span="10">订单号：50000000</el-col>
                            </el-row>
                            <el-row >
                                <el-col :span="20">
                                    <el-col class="headPortrait" :span="9">
                                        <img src="../assets/images/portrait.jpg" alt="">
                                    </el-col>
                                    <el-col :span="9" class="headerTitle">
                                        <el-row class="mar">张晓天</el-row>
                                        <el-row class="address mar">四川成店铺下你下发</el-row>
                                        <el-row class="address mar">
                                            <span class="remark">备注：</span>
                                            <span class="remarkContent">哆多。。。</span>
                                        </el-row>
                                    </el-col>
                                </el-col>
                                <el-col :span="4"class="phone">
                                    <i class="fa fa-phone">191919191911</i>
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
                                            <span class="dishes">招牌菜</span>
                                            <span class="dishes dishesRemark">【大份+微辣】</span>
                                        </td>
                                        <td class="moneyColor"><i class="fa fa-jpy"></i>78</td>
                                        <td>X2</td>
                                        <td class="moneyColor" rowspan="2"><i class="fa fa-jpy"></i>78</td>
                                        <td rowspan="2">
                                            <el-row class="clock"><i class="fa fa-clock-o "></i> <span> 已下单**分钟</span></el-row>
                                            <el-row class="status">已完成。。。</el-row>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>华为</td>
                                        <td><i class="fa fa-jpy"></i>78</td>
                                        <td>1234567</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </el-row>
                        </li>
                    </ul>
                    <el-row class="PaginationBox">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :page-size="100"
                            layout="prev, pager, next, jumper"
                            :total="1000">
                        </el-pagination>
                    </el-row>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="进行中(55)" name="third">
                <el-row>
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
                        <li>
                            <el-row class="orderTitle">
                                <el-col :span="4" class="orderTime">2017-09-09 11:30</el-col>
                                <el-col :span="10">订单号：50000000</el-col>
                            </el-row>
                            <el-row >
                                <el-col :span="20">
                                    <el-col class="headPortrait" :span="9">
                                        <img src="../assets/images/portrait.jpg" alt="">
                                    </el-col>
                                    <el-col :span="9" class="headerTitle">
                                        <el-row class="mar">张晓天</el-row>
                                        <el-row class="address mar">四川成店铺下你下发</el-row>
                                        <el-row class="address mar">
                                            <span class="remark">备注：</span>
                                            <span class="remarkContent">哆多。。。</span>
                                        </el-row>
                                    </el-col>
                                </el-col>
                                <el-col :span="4"class="phone">
                                    <i class="fa fa-phone">191919191911</i>
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
                                            <span class="dishes">招牌菜</span>
                                            <span class="dishes dishesRemark">【大份+微辣】</span>
                                        </td>
                                        <td class="moneyColor"><i class="fa fa-jpy"></i>78</td>
                                        <td>X2</td>
                                        <td class="moneyColor" rowspan="2"><i class="fa fa-jpy"></i>78</td>
                                        <td rowspan="2">
                                            <el-row class="clock"><i class="fa fa-clock-o "></i> <span> 已下单**分钟</span></el-row>
                                            <el-row class="status">已完成。。。</el-row>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>华为</td>
                                        <td><i class="fa fa-jpy"></i>78</td>
                                        <td>1234567</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </el-row>
                        </li>
                        <li>
                            <el-row class="orderTitle">
                                <el-col :span="4" class="orderTime">2017-09-09 11:30</el-col>
                                <el-col :span="10">订单号：50000000</el-col>
                            </el-row>
                            <el-row >
                                <el-col :span="20">
                                    <el-col class="headPortrait" :span="9">
                                        <img src="../assets/images/portrait.jpg" alt="">
                                    </el-col>
                                    <el-col :span="9" class="headerTitle">
                                        <el-row class="mar">张晓天</el-row>
                                        <el-row class="address mar">四川成店铺下你下发</el-row>
                                        <el-row class="address mar">
                                            <span class="remark">备注：</span>
                                            <span class="remarkContent">哆多。。。</span>
                                        </el-row>
                                    </el-col>
                                </el-col>
                                <el-col :span="4"class="phone">
                                    <i class="fa fa-phone">191919191911</i>
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
                                            <span class="dishes">招牌菜</span>
                                            <span class="dishes dishesRemark">【大份+微辣】</span>
                                        </td>
                                        <td class="moneyColor"><i class="fa fa-jpy"></i>78</td>
                                        <td>X2</td>
                                        <td class="moneyColor" rowspan="2"><i class="fa fa-jpy"></i>78</td>
                                        <td rowspan="2">
                                            <el-row class="clock"><i class="fa fa-clock-o "></i> <span> 已下单**分钟</span></el-row>
                                            <el-row class="status">已完成。。。</el-row>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>华为</td>
                                        <td><i class="fa fa-jpy"></i>78</td>
                                        <td>1234567</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </el-row>
                        </li>
                    </ul>
                    <el-row class="PaginationBox">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :page-size="100"
                            layout="prev, pager, next, jumper"
                            :total="1000">
                        </el-pagination>
                    </el-row>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="已完成(55)" name="fourth">
                <el-row>
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
                        <li>
                            <el-row class="orderTitle">
                                <el-col :span="4" class="orderTime">2017-09-09 11:30</el-col>
                                <el-col :span="10">订单号：50000000</el-col>
                            </el-row>
                            <el-row >
                                <el-col :span="20">
                                    <el-col class="headPortrait" :span="9">
                                        <img src="../assets/images/portrait.jpg" alt="">
                                    </el-col>
                                    <el-col :span="9" class="headerTitle">
                                        <el-row class="mar">张晓天</el-row>
                                        <el-row class="address mar">四川成店铺下你下发</el-row>
                                        <el-row class="address mar">
                                            <span class="remark">备注：</span>
                                            <span class="remarkContent">哆多。。。</span>
                                        </el-row>
                                    </el-col>
                                </el-col>
                                <el-col :span="4"class="phone">
                                    <i class="fa fa-phone">191919191911</i>
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
                                            <span class="dishes">招牌菜</span>
                                            <span class="dishes dishesRemark">【大份+微辣】</span>
                                        </td>
                                        <td class="moneyColor"><i class="fa fa-jpy"></i>78</td>
                                        <td>X2</td>
                                        <td class="moneyColor" rowspan="2"><i class="fa fa-jpy"></i>78</td>
                                        <td rowspan="2">
                                            <el-row class="clock"><i class="fa fa-clock-o "></i> <span> 已下单**分钟</span></el-row>
                                            <el-row class="status">已完成。。。</el-row>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>华为</td>
                                        <td><i class="fa fa-jpy"></i>78</td>
                                        <td>1234567</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </el-row>
                        </li>
                        <li>
                            <el-row class="orderTitle">
                                <el-col :span="4" class="orderTime">2017-09-09 11:30</el-col>
                                <el-col :span="10">订单号：50000000</el-col>
                            </el-row>
                            <el-row >
                                <el-col :span="20">
                                    <el-col class="headPortrait" :span="9">
                                        <img src="../assets/images/portrait.jpg" alt="">
                                    </el-col>
                                    <el-col :span="9" class="headerTitle">
                                        <el-row class="mar">张晓天</el-row>
                                        <el-row class="address mar">四川成店铺下你下发</el-row>
                                        <el-row class="address mar">
                                            <span class="remark">备注：</span>
                                            <span class="remarkContent">哆多。。。</span>
                                        </el-row>
                                    </el-col>
                                </el-col>
                                <el-col :span="4"class="phone">
                                    <i class="fa fa-phone">191919191911</i>
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
                                            <span class="dishes">招牌菜</span>
                                            <span class="dishes dishesRemark">【大份+微辣】</span>
                                        </td>
                                        <td class="moneyColor"><i class="fa fa-jpy"></i>78</td>
                                        <td>X2</td>
                                        <td class="moneyColor" rowspan="2"><i class="fa fa-jpy"></i>78</td>
                                        <td rowspan="2">
                                            <el-row class="clock"><i class="fa fa-clock-o "></i> <span> 已下单**分钟</span></el-row>
                                            <el-row class="status">已完成。。。</el-row>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>华为</td>
                                        <td><i class="fa fa-jpy"></i>78</td>
                                        <td>1234567</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </el-row>
                        </li>
                    </ul>
                    <el-row class="PaginationBox">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :page-size="100"
                            layout="prev, pager, next, jumper"
                            :total="1000">
                        </el-pagination>
                    </el-row>
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
            activeName: 'first',
            orderSearchInput:'',
            navObj: [{
                name: '全部',
                orderStatus: '',
                index: 1
            }, {
                name: '已接单',
                orderStatus: 'MERCHANT_CONFIRM_RECEIPT',
                index: 2
            }, {
                name: '配送中',
                orderStatus: 'SHIPPING',
                index: 3
            }, {
                name: '已完成',
                orderStatus: 'TRANSACT_FINISHED',
                index: 4
            }, {
                name: '已取消',
                orderStatus: 'CANCELLATION',
                index: 5
            }],
            init: true,
            allLoaded: false,
            active: 'order_1',
            current: 1,
            pageId: 1,
            counts: 0,
            orderStatus: '',
            orderList: [],
            canLoad: false,
            isEmpty: false,
            popupVisible3: false,
            orderId: 0,
            cancelContent: ''
        }
    },
    created: function() {

    },
    methods: {
        tableTitleClick(tab, event) {
            console.log(tab, event);
        },
        searchIconClick(){

        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        getOrderListData(){
            getOrderList({ params: { pageSize: 10, pageId: this.pageId, orderStatus: this.orderStatus } }).then(res => {
                console.log(res.list)
                if (this.init) {
                    this.orderList = res.list
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
        }
    },
    created(){
    },
    mounted(){
        this.getOrderListData()
    }
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
</style>
