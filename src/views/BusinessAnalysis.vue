<template>
    <el-row>
        <el-row >
            <el-col :span="12" class="bg">
                <h4>新客户趋势图</h4>
                <div class="customer-content">
                    <div class="chart">
                        <IEcharts :option="line" :loading="loading"></IEcharts>
                    </div>
                    <div class="chart-info">
                        <table class="date-num">
                            <tbody>
                            <tr>
                                <th>日期</th>
                                <th>新客户量</th>
                            </tr>
                            <tr v-for="(item,index) in customers" :key="index">
                                <td>{{moment(item.finishDay).format('YYYY/MM/DD')}}</td>
                                <td>{{item.newCustomerCount}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </el-col>
            <el-col :span="12" class="bg">
                <h4>订单量趋势图</h4>
                <div class="customer-content">
                    <div class="chart">
                        <IEcharts :option="option" :loading="loading"></IEcharts>
                    </div>
                    <div class="chart-info">
                        <table class="date-num">
                            <tbody>
                            <tr>
                                <th>日期</th>
                                <th>订单量</th>
                            </tr>
                            <tr v-for="(item,index) in orders" :key="index">
                                <td>{{moment(item.finishDayTime).format('YYYY/MM/DD')}}</td>
                                <td>{{item.orderQuantity}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row style="margin-top: 20px">
            <el-col :span="8" class="bg">
                <h4>新客户趋势图</h4>
                <div class="customer-content">
                    <div class="chart">
                        <IEcharts :option="business" :loading="loading"></IEcharts>
                    </div>
                    <div class="chart-info">
                        <table class="date-num">
                            <tbody>
                            <tr>
                                <th>日期</th>
                                <th>营业额</th>
                            </tr>
                            <tr v-for="(item,index) in turnover">
                                <td>{{moment(item.finishDayTime).format('YYYY/MM/DD')}}</td>
                                <td>{{formatMoney(item.turnoverCount)}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </el-col>
            <el-col :span="8" class="bg">
                <h4>销售量趋势图</h4>
                <div class="customer-content">
                    <el-row>
                        <el-col :span="6"><span>商品名称：</span></el-col>
                        <el-col :span="15">
                            <el-select v-model="goodsName" placeholder="请选择" size="mini">
                                <el-option
                                    @change="selectGoods(item.goodsId,item.goodsName)"
                                    v-for="item in goodsNamesData"
                                    :key="item.goodsId"
                                    :label="item.goodsName"
                                    :value="item.goodsId"
                                    >
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <div class="chart">
                        <IEcharts :option="sell" :loading="loading"></IEcharts>
                    </div>
                    <div class="chart-info">
                        <table class="date-num">
                            <tbody>
                            <tr>
                                <th>日期</th>
                                <th>销售量</th>
                            </tr>
                            <tr v-for="(item,index) in salesData" :key="index">
                                <td>{{moment(item.finishDayTime).format('YYYY/MM/DD')}}</td>
                                <td>{{item.goodsSaleCount}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </el-col>
            <el-col :span="8">
                
            </el-col>
        </el-row>
    </el-row>

</template>
<script>
import { getNewCustomerTendency,getOrderQuantity,getTurnover,getGoodsLists,getSalesTendency } from '@/api/api';
import IEcharts from 'vue-echarts-v3/src/full.js';
export default {
    components: {
        IEcharts
    },
    data: function() {
        return {
            customers: null,
            orders:null,
            turnover:null,
            salesData:null,
            loading: false,
            line: {
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        show: true
                    },
                    axisLabel: {
                        color: '#999'
                    },

                    data: null
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value}',
                        color: '#999'

                    }
                },
                series: [{
                    name: '新客户量',
                    type: 'line',
                    data: null,
                    itemStyle: {
                        normal: {
                            borderColor: '#f7bdbd'
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: '#f47475'
                        }
                    },
                    label: {
                        normal: {
                            color: '#999',

                        }
                    }
                }],
                grid: {
                    show: true,
                    left: '10%',
                    right: '10%',
                    top: '10%',
                    bottom: '10%',
                    containLabel: true

                }

            },
            option: {
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        show: true
                    },
                    axisLabel: {
                        color: '#999'
                    },

                    data: null
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value}',
                        color: '#999'

                    }
                },
                series: [{
                    name: '订单量',
                    type: 'line',
                    data: null,
                    itemStyle: {
                        normal: {
                            borderColor: '#8bc876'
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: '#4ddb80'
                        }
                    },
                    label: {
                        normal: {
                            color: '#999',

                        }
                    }
                }],
                grid: {
                    show: true,
                    left: '10%',
                    right: '10%',
                    top: '10%',
                    bottom: '10%',
                    containLabel: true

                }

            },
            business: {
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        show: true
                    },
                    axisLabel: {
                        color: '#999'
                    },

                    data: null
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value}',
                        color: '#999'

                    }
                },
                series: [{
                    name: '营业额',
                    type: 'line',
                    data: null,
                    itemStyle: {
                        normal: {
                            borderColor: '#f8b755'
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: '#f39800'
                        }
                    },
                    label: {
                        normal: {
                            color: '#999',

                        }
                    }
                }],
                grid: {
                    show: true,
                    left: '10%',
                    right: '10%',
                    top: '10%',
                    bottom: '10%',
                    containLabel: true
                },

            },
            sell: {
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine:{
                        show: true
                    },
                    axisLabel: {
                        color: '#999'
                    },
                    data: []
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine:{
                        show:false
                    },
                    axisLabel: {
                        formatter: '{value}',
                        color: '#999'
                    }
                },
                series: [{
                    type: 'line',
                    data: [],
                    name: '销售额',
                    itemStyle: {
                        normal: {
                            borderColor: '#05a2e9'
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: '#05a2e9'
                        }
                    },
                    label: {
                        normal: {
                            color: '#999'
                        }
                    }
                }],
                grid: {
                    show: true,
                    left: '10%',
                    right: '10%',
                    top: '10%',
                    bottom: '10%',
                    containLabel: true
                }
            },
            salesData: [],
            popupVisible3: false,
            goodsName: '',
            goodsNamesData:[],
            searchData: [],
            isEmpty: false,
            goodsId: '',
        }
    },
    mounted(){
        var _this = this;
        _this.line.xAxis.data = [];
        _this.line.series[0].data = [];
        _this.loading = true;
        getNewCustomerTendency({ params: { days: 7 } }).then(res => {
            console.log(res);
            res.sort((a, b) => {
                return a.finishDay - b.finishDay;
            }).forEach((item) => {
                _this.line.xAxis.data.push(_this.moment(item.finishDay).format('MM-DD'));
                _this.line.series[0].data.push(item.newCustomerCount);
                _this.loading = false;
            })
            _this.customers = res;
        })
        var _this = this;
        _this.option.xAxis.data = [];
        _this.option.series[0].data = [];
        _this.loading = true;
        getOrderQuantity({ params: { days: 7 } }).then(res => {
            console.log(res);
            res.sort((a, b) => {
                return a.finishDayTime - b.finishDayTime;
            }).forEach((item) => {
                _this.option.xAxis.data.push(_this.moment(item.finishDayTime).format('MM-DD'));
                _this.option.series[0].data.push(item.orderQuantity);
                _this.loading = false;
            })
            _this.orders = res;
        })
        var _this = this;
        _this.business.xAxis.data = [];
        _this.business.series[0].data = [];
        _this.loading = true;
        getTurnover({ params: { days: 7 } }).then(res => {
            res.sort((a, b) => {
                return a.finishDayTime - b.finishDayTime;
            }).forEach((item) => {
                _this.business.xAxis.data.push(_this.moment(item.finishDayTime).format('MM-DD'));
                _this.business.series[0].data.push(_this.formatMoney(item.turnoverCount));
                _this.loading = false;
            })
            _this.turnover = res;
        })
        this.getData();
        this.getGoodsListData()
    },
    methods: {
        formatMoney: function(money) {
            money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";
            var l = money.split(".")[0].split("").reverse();
            var r = money.split(".")[1];
            var t = "";
            for (var i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            return t.split("").reverse().join("") + "." + r;
        },
        //获取销售数量列表数据
        getData: function(){
            var _this = this;
            _this.searchData = [];
            _this.sell.xAxis.data = [];
            _this.sell.series[0].data = [];
            _this.loading = true;
            getSalesTendency({params: {days: 7, goodsId: _this.goodsId}}).then(res => {
                console.log(res)
                res.sort((a,b) => {
                    return a.finishDayTime - b.finishDayTime;
                }).forEach((item) => {
                    _this.sell.xAxis.data.push(_this.moment(item.finishDayTime).format('MM-DD'));
                    _this.sell.series[0].data.push(item.goodsSaleCount);
                    _this.loading = false;
                })
                _this.salesData = res;
            })
        },
        //获取商品列表
        getGoodsListData: function(){
            getGoodsLists({params:{pageId: 1, pageSize: 9999}}).then(res => {
                this.goodsNamesData=res.list
                console.log(res)
                console.log(9999)
            })
        },
        selectGoods: function(goodsId,goodsName){
            this.goodsId = goodsId;
            this.sell.series[0].name = goodsName;
            this.getData();
        },
    }
}
</script>
<style scoped>
    .bg{
        background-color: white;
        padding-left: 15px;
    }
    .chart{
        height: 300px;
    }
    .date-num{
        text-align: center;
    }
    .date-num tbody tr td{
        width: 100px;
    }
    .chart-info{
        margin-left: 20px;
    }
</style>
