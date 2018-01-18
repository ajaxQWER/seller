<template>
    <div class="store">
        <el-tabs v-model="activeName" @tab-click="tabClick">
            <el-tab-pane label="基本信息" name="0">
                <BaseMessage></BaseMessage>
            </el-tab-pane>
            <el-tab-pane label="配送信息" name="1">
                <DistributionMessage></DistributionMessage>
            </el-tab-pane>
            <el-tab-pane label="位置信息" name="2">
                <Store></Store>
            </el-tab-pane>
            <el-tab-pane label="资质信息" name="3">
                <Qualification></Qualification>
            </el-tab-pane>
            <el-tab-pane label="结算信息" name="4">
                <Settlement></Settlement>
            </el-tab-pane>
        </el-tabs> 
    </div>
</template>
<script>
    import BaseMessage from '../components/baseMessage.vue'
    import Qualification from '../components/qualification.vue'
    import Store from '../components/store.vue'
    import Settlement from '../components/settlement.vue'
    import DistributionMessage from '../components/distributionMessage.vue'
    export default {
        components:{
            BaseMessage,
            Store,
            Qualification,
            Settlement,
            DistributionMessage
        },
        data(){
            return{
                activeName:""
            }
        },
        methods:{
            tabClick(tab, event) {
                console.log(tab, event);
            },
        }
    }        
</script>

