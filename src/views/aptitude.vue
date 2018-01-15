<template>
    <div class="store">
        <el-tabs v-model="activeName" @tab-click="tabClick">
            <el-tab-pane label="基本信息" name="0">
                <BaseMsg></BaseMsg>
                <Store></Store>
            </el-tab-pane>
            <el-tab-pane label="资质信息" name="1">
                <Qualification></Qualification>
            </el-tab-pane>
            <el-tab-pane label="结算信息" name="2">
                <Settlement></Settlement>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import BaseMsg from '../components/baseMsg.vue'
    import Qualification from '../components/qualification.vue'
    import Store from '../components/store.vue'
    import Settlement from '../components/settlement.vue'
    export default {
        components:{
            BaseMsg,
            Store,
            Qualification,
            Settlement
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

