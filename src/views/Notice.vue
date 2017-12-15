<template>
    <el-row>
        <el-row class="bonusContentBox">
            <ul class="bonusContent">
                <li>
                    <el-row>
                        <el-col :span="2" class="orderImg">
                            <img src="../assets/images/newOrder.png" alt="">
                        </el-col>
                        <el-col :span="19">
                            <el-row><span class="orderName">订单新增</span></el-row>
                            <el-row class="bonusNameBox"><span class="bonusName">2017-09-09 12:30</span></el-row>
                            <el-row>Lorem ipsum dolor sit amet.</el-row>
                        </el-col>
                        <el-col :span="3" class="operation">
                            <el-button type="text" class="deleteOrder">删除</el-button>
                        </el-col>
                    </el-row>
                </li>
                <li>
                    <el-row>
                        <el-col :span="2" class="orderImg">
                            <img src="../assets/images/acceptOrder.png" alt="">
                        </el-col>
                        <el-col :span="19">
                            <el-row><span class="orderName">已接单</span></el-row>
                            <el-row class="bonusNameBox"><span class="bonusName">2017-09-09 12:30</span></el-row>
                            <el-row>Lorem ipsum dolor sit amet.</el-row>
                        </el-col>
                        <el-col :span="3" class="operation">
                            <el-button type="text" class="deleteOrder">删除</el-button>
                        </el-col>
                    </el-row>
                </li>
            </ul>
        </el-row>
    </el-row>
</template>
<script>
export default {
    data: function() {
        return {

        }
    },
}
</script>
<style scoped>
    .orderPage{
        margin: 0;
        padding: 0;
    }
    .orderPage>li{
        list-style: none;

    }
    .deleteOrder{
        color: red;
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
    .orderName{
        font-size: 18px;
    }
    .orderImg{
        text-align: center;
    }
    .deleteOrder{
        color: red;
    }
</style>
