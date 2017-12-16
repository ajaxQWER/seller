<template>
    <el-row>
        <el-row class="bonusContentBox" v-if="noticeList.length>0">
            <ul class="bonusContent">
                <li v-for="(item,index) in noticeList" :key="index" >
                    <el-row>
                        <el-col :span="2" class="orderImg">
                            <!--<img src="../assets/images/newOrder.png" alt="">-->
                            <img src="../assets/images/notice.png" alt="">
                        </el-col>
                        <el-col :span="19">
                            <el-row><span class="orderName">{{item.title}}</span></el-row>
                            <el-row class="bonusNameBox"><span class="bonusName">{{moment(item.createTime).format('MM-DD HH:mm')}}</span></el-row>
                            <el-row>{{item.content}}</el-row>
                        </el-col>
                        <el-col :span="3" class="operation">
                            <el-button type="text" class="deleteOrder" @click="deleteNotice(item.noticeId)">删除</el-button>
                        </el-col>
                    </el-row>
                </li>
                    <!--<li>-->
                        <!--<el-row>-->
                            <!--<el-col :span="2" class="orderImg">-->
                                <!--<img src="../assets/images/acceptOrder.png" alt="">-->
                            <!--</el-col>-->
                            <!--<el-col :span="19">-->
                                <!--<el-row><span class="orderName">已接单</span></el-row>-->
                                <!--<el-row class="bonusNameBox"><span class="bonusName">2017-09-09 12:30</span></el-row>-->
                                <!--<el-row>Lorem ipsum dolor sit amet.</el-row>-->
                            <!--</el-col>-->
                            <!--<el-col :span="3" class="operation">-->
                                <!--<el-button type="text" class="deleteOrder">删除</el-button>-->
                            <!--</el-col>-->
                        <!--</el-row>-->
                    <!--</li>-->
            </ul>
        </el-row>
        <el-row v-else class="empty">
            <img src="../assets/images/empty-img.png" alt="">
        </el-row>
    </el-row>
</template>
<script>
import { getNoticeLists, deleteNoticeById } from '@/api/api';
export default {
    data: function() {
        return {
            pageId: 1,
            counts: 0,
            canLoad: false,
            noticeList: [],
        }
    },
    methods:{
        getNoticeListData(){
            getNoticeLists({ params: { pageSize: 10, pageId: this.pageId } }).then(res => {
                this.noticeList = res.list;
                this.counts = res.count;
            })
        },
        deleteNotice: function(noticeId) {
            this.$confirm('是否删除该通知?', '删除通知', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteNoticeById(noticeId).then(() => {
                    this.getNoticeListData();
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
            }).catch((message) => {
                this.$message.error(message)
            });
        }
    },
    created(){
        // this.getNoticeListData({ pageId: this.pageId });
    },
    mounted(){
        this.getNoticeListData();
    }
}
</script>
<style scoped>
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
    .empty{
        padding: 30px;
        text-align: center;
    }
</style>
