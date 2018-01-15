<template>
    <el-row v-loading="loading">
        <el-row class="bonusContentBox" v-if="!isEmpty">
            <ul class="bonusContent" v-if="noticeList.length">
                <li v-for="(item,index) in noticeList" :key="index" >
                    <el-row>
                        <el-col :span="2" class="orderImg">
                            <img :src="formatImgType(item.contentType)" alt="">
                            <!--<img src="../assets/images/notice.png" alt="">-->
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
    </el-row>
</template>
<script>
import { getNoticeLists, deleteNoticeById } from '@/api/api';
import ORDER_FINISHED from "@/assets/images/finishOrder.png";
import ORDER_DELIVERED from "@/assets/images/arriveOrder.png";
import ORDER_SHIPPING from "@/assets/images/finishedOrder.png";
import ORDER_CONFIRM from "@/assets/images/finishOrder.png";
import ORDER_CANCELLATION from "@/assets/images/cancelOrder.png";
import ORDER_CREATE from "@/assets/images/newOrder.png";
export default {
    data: function() {
        return {
            pageId: 1,
            counts: 0,
            canLoad: false,
            noticeList: [],
            loading: true,
            isEmpty:false
        }
    },
    methods:{
        //分页
        currentChange(val) {
            this.loading = true;
            this.pageId = val;
            this.getNoticeListData(val)
        },
        getNoticeListData(){
            getNoticeLists({ params: { pageSize: 10, pageId: this.pageId } }).then(res => {
                if(res.count == 0){
                    this.isEmpty = true
                }
                this.noticeList = res.list;
                console.log(res.list)
                this.counts = res.count;
                this.loading = false
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
        },
        formatImgType: function(contentType) {
            switch (contentType) {
                case 'ORDER_FINISHED':
                    return ORDER_FINISHED;
                case 'ORDER_DELIVERED':
                    return ORDER_DELIVERED;
                case 'ORDER_SHIPPING':
                    return ORDER_SHIPPING;
                case 'ORDER_CONFIRM':
                    return ORDER_CONFIRM;
                case 'ORDER_CANCELLATION':
                    return ORDER_CANCELLATION;
                case 'ORDER_CREATE':
                    return ORDER_CREATE;
                default:
                    return '-'
            }
        },
    },
    created(){
        this.getNoticeListData();
    },
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
        background-color: white;
    }
    .bonusContent{

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
    .PaginationBox{
        text-align: right;
        margin-bottom: 10px;
    }
</style>
