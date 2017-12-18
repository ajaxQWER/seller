<template>
    <el-row class="bgColor">
        <el-row>
            <el-col :span="5">
                <el-input
                    size="small"
                    placeholder="搜索商品"
                    icon="search"
                    v-model="searchGoods"
                    :on-icon-click="searchGoodsBtn">
                </el-input>
            </el-col>
            <el-col :span="5" :offset="1">
                <el-col :span="8">全部商品</el-col>
                <el-col :span="8">已上架</el-col>
                <el-col :span="8">已下架</el-col>
            </el-col>
            <el-col :span="5" :offset="8">
                <el-col :span="8">回收站</el-col>
                <el-col :span="8">批量管理</el-col>
                <el-button :span="8" size="mini" type="success">添加商品</el-button>
            </el-col>
        </el-row>
        <el-row class="dishType">
            <el-col :span="3" class="Type" ><span >商家分类：</span></el-col>
            <el-col :span="3" class="Type"><span @click="changeType(1)" :class=" type==1 ? 'activeType' : ''">推荐菜品</span></el-col>
            <el-col :span="3" class="Type"><span @click="changeType(2)" :class=" type==2 ? 'activeType' : ''">特色菜系</span></el-col>
            <el-col :span="3" class="Type"><span @click="changeType(3)" :class=" type==3 ? 'activeType' : ''">汤品系列</span></el-col>
            <el-col :span="3" class="Type"><span @click="changeType(4)" :class=" type==4 ? 'activeType' : ''">拌菜系列</span></el-col>
            <el-col :span="3" class="Type"><span @click="changeType(5)" :class=" type==5 ? 'activeType' : ''">甜品系列</span></el-col>
            <el-col :span="3" class="Type"><span @click="changeType(6)" :class=" type==6 ? 'activeType' : ''">酒水系列</span></el-col>
            <el-col :span="3"class="Type"><span @click="changeType(7)" :class=" type==7 ? 'activeType' : ''">热菜系列</span></el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-row></el-row>
            </el-col>
            <el-col></el-col>
            <el-col></el-col>
        </el-row>
    </el-row>
</template>
<script>
export default {
    data: function() {
        return {
            searchGoods:'',
            type:1
        }
    },
    methods:{
        //搜索商品
        searchGoodsBtn(){

        },
        changeType(index){
            this.type=index
        }
    }
}
</script>
<style scoped>
    .bgColor{
        background-color: white;
        padding: 10px;
    }
    .dishType{
        padding: 10px;
        margin-top: 5px;
    }
    .activeType{
        background-color: #13ce66;
        color: white;
        border: 5px;
        padding: 5px;
    }
    .Type{
        text-align: center;
    }

</style>
