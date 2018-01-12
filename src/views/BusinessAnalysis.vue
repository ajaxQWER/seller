<template>
    <el-row>
        <el-col>
            <h3>新客户趋势图</h3>
            <div class="customer-content">
                <div class="chart">
                    <IEcharts :option="line" :loading="loading"></IEcharts>
                </div>
                <div class="chart-info">
                    <div class="table-title">
                        <div class="column flex">
                            <div class="column-item flex-1">日期</div>
                            <div class="column-item flex-1">新客户量</div>
                        </div>
                    </div>
                    <table class="date-num">
                        <tbody>
                            <tr v-for="(item,index) in customers">
                                <td>{{moment(item.finishDay).format('YYYY/MM/DD')}}</td>
                                <td>{{item.newCustomerCount}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="tip">
                        Tips:
                        <br> 新客户：第一次在本店进行下单的客户
                    </div>
                </div>
            </div>
        </el-col>
        <el-col>

        </el-col>
    </el-row>
</template>
<script>
import { getNewCustomerTendency } from '@/api/api';
import IEcharts from 'vue-echarts-v3/src/full.js';
export default {
    components: {
        IEcharts
    },
    data: function() {
        return {
            customers: null,
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

            }
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
    },
    methods: {

    }
}
</script>
