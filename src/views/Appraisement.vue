<template>
    <el-row>
        <el-row class="gradeContainer">
            <span>综合评分</span>
            <el-row>
                <el-col :span="4" :offset="2">
                    <el-row class="grades">{{appraiseTotal.comprehensiveApprise}}</el-row>
                    <el-row class="gradeIntro">高于商圈{{appraiseTotal.businessCircleRatio*100}}%的商家</el-row>
                </el-col>
                <el-col :span="12">
                    <el-row class="Reply">
                        <el-row>
                            <el-col :span="7">
                                <span class="replyText">近7天评价回复率：{{appraiseTotal.reversionRate*100}}%</span>
                            </el-col>
                            <el-col :span="14">
                                <el-progress :text-inside="true" :stroke-width="12" :percentage="parseFloat(appraiseTotal.reversionRate*100) " class="Replyschedule"></el-progress>
                            </el-col>
                        </el-row>
                            <el-row>
                                <el-col :span="7">
                                    <span class="replyText">近7天差评回复率：{{appraiseTotal.reviewRate*100}}%</span>
                                </el-col>
                                <el-col :span="14">
                                    <el-progress :text-inside="true" :stroke-width="12" :percentage="appraiseTotal.reviewRate*100" status="exception"></el-progress>
                                </el-col>
                            </el-row>
                    </el-row>
                </el-col>
            </el-row>
        </el-row>
        <el-row class="AppraisementContent">
            <el-tabs v-model="activeName">
                <el-tab-pane label="全部评价(33)" name="0">
                    <el-row>
                        <ul class="clientRepalyContainer">
                            <li v-for="(item,index) in commentList" :key="index">
                                <el-row>
                                    <el-col class="headPortrait" :span="2">
                                        <img :src="UPLOADURL + item.avatorUrl + '/avator.png'"  alt="">
                                    </el-col>
                                    <el-col :span="19">
                                        <el-col>
                                            <ul class="custormReply">
                                                <li>
                                                    <el-row>
                                                        <img v-for="n in item.shopAppraise" src="../assets/images/scores.png" alt="" class="scores-img">
                                                    </el-row>
                                                </li>
                                                <li>{{item.contentShopAppraise}}</li>
                                                <li class="lastAppraise">{{item.orderName}}</li>
                                                <li class="AppraiseBox"><span class="AppraiseTitle">您的回复：</span><span>感谢您的支持。。。。</span></li>
                                            </ul>
                                        </el-col>
                                    </el-col>
                                    <el-col :span="3" class="replyInfo">
                                        <el-row>{{moment(item.appraiseTime).format('YYYY-MM-DD')}}</el-row>
                                        <el-row class="replyBtn"><el-button type="success" size="small">回复</el-button></el-row>
                                    </el-col>
                                </el-row>
                                <el-row class="clientRepalyContent">
                                    <ul class="clientRepaly">
                                        <li>
                                            <el-col :span="19">
                                                <el-row> 羊肉套饭</el-row>
                                                <el-row class="evaluate">美味。。。。。。</el-row>
                                            </el-col>
                                            <el-col :span="5" class="grade">
                                                <el-rate
                                                    v-model="value5"
                                                    disabled
                                                    show-text
                                                    text-color="#ff9900"
                                                    text-template="{value}">
                                                </el-rate></el-col>
                                        </li>
                                        <li>
                                            <el-col :span="19">
                                                <el-row> 羊肉套饭</el-row>
                                                <el-row class="evaluate">美味。。。。。。</el-row>
                                            </el-col>
                                            <el-col :span="5" class="grade">
                                                <el-rate
                                                    v-model="value5"
                                                    disabled
                                                    show-text
                                                    text-color="#ff9900"
                                                    text-template="{value}">
                                                </el-rate></el-col>
                                        </li>
                                    </ul>
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
                <el-tab-pane label="未回复(33)" name="second">配置管理</el-tab-pane>
                <el-tab-pane label="已回复(33)" name="third">角色管理</el-tab-pane>
            </el-tabs>
        </el-row>
    </el-row>
</template>
<script>
    import {getShopAppraiseHead,getShopAppraise,getShopAppraiseById,commentReply} from '@/api/api'
export default {
    data: function() {
        return {
            activeName: '0',
            value5: 3.7,
            replay:false,
            appraiseTotal:"",
        	commentsAppraise: false,
                pageId: 1,
            pageSize: 5,
            counts: 0,
            shopAppraise: '',
            reply: '',
            commentList: [],
            init: true,
            allLoaded: false,
            canLoad: false,
            isEmpty: false,
            replyIndex: 1,
            starIndex: 1,
            filterObj: [{
                name: '全部',
                shopAppraise: '',
                index: 1
            },{
                name: '一星',
                shopAppraise: '1',
                index: 2
            },{
                name: '二星',
                shopAppraise: '2',
                index: 3
            },{
                name: '三星',
                shopAppraise: '3',
                index: 4
            },{
                name: '四星',
                shopAppraise: '4',
                index: 5
            },{
                name: '五星',
                shopAppraise: '5',
                index: 6
            }],
            popupVisible3: false,
            shopAppraiseId: 0,
            commentContent: '',
            imgPopup: false,
            bigImgUrl: ''
        }
    },
    methods:{
        clientReply(){
            this.replay=true
        },
        cancelReplay(){
            this.replay=false
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        //获取评价的头部信息
        getHeadInfo(){
            getShopAppraiseHead().then(res => {
                console.log(res)
                if(res.comprehensiveApprise){
                    this.appraiseTotal = res;
                }else{
                    this.appraiseTotal = {
                        businessCircleRatio: 0,
                        comprehensiveApprise: 0,
                        reversionRate: 0,
                        reviewRate: 0
                    }
                }
            })
        },
        //获取评价信息
        showShopAppraise(){
            getShopAppraise({params:{shopAppraise:this.shopAppraise, reply: this.reply,commentsAppraise: this.commentsAppraise, pageSize: this.pageSize, pageId: this.pageId}}).then(res => {
                console.log(res)
                console.log(444)
                this.counts = res.count;
                if(this.init){
                    this.commentList = res.list
                }else{
                    this.commentList = [].concat.apply(this.commentList, res.list)
                }
                console.log(this.commentList)
                if(res.count == 0){
                    this.isEmpty = true;
                    this.allLoaded = true;
                }else{
                    this.isEmpty = false;
                    this.canLoad = true;
                }
                if(Math.ceil(this.counts / this.pageSize) == this.pageId){
                    this.allLoaded = true;
                    this.canLoad = false;
                    return;
                }
            })
        },
    },
    create(){
    },
    mounted(){
        this.getHeadInfo();
        this.showShopAppraise()
    }
}
</script>
<style scoped>
    .gradeContainer{
        background-color: white;
        border: 5px;
        padding: 10px 0px 15px 15px;
    }
    .grade{
        font-size: 30px;
        color: red;
    }
    .grades{
        font-size: 30px;
        color: red
    }
    .gradeIntro{
        color: rgba(62, 83, 113, 0.76);
        font-size: 13px;
    }
    .Reply{
        padding: 0;
        margin: 0;
    }
    .Reply>li{
        list-style: none;
    }
    .Reply>li>span{
        color: #8c939d;
        font-size: 12px;
    }
    .replyText{
        color: #8c939d;
        font-size: 12px;
    }
    .headPortrait{
        width: 40px;
        height: 40px;
        border-radius: 20px;
    }
    .headPortrait>img{
        width: 40px;
        height: 40px;
        border-radius: 20px;
    }
    .AppraisementContent{
        background-color: white;
        padding: 5px;
        margin-top: 15px;
    }
    .custormReply{
        list-style: none;
        margin:0;
        padding-left:10px
    }
    .lastAppraise{
        color: green
    }
    .AppraiseTitle{
        color: red
    }
    .AppraiseBox{
        margin-top: 5px
    }
    .replyBtn{
        margin-top: 10px;
        text-align: center;
    }
    .replyInfo{
        float: right;
    }
    .clientRepalyContent{
        background-color: #f9f9f9;
        margin-left: 10px;
        margin-top: 10px;
        border: 1px solid white;
        padding-bottom: 14px;
    }

    .clientRepaly{
        margin-left: 25px;
        padding: 10px;
    }
    .clientRepaly>li{
        list-style: none;
    }
    .evaluate{
        color: #8c939d;
        font-size: 12px;
    }
    .grade{
        float: right;
    }
    .appraiseBor{
        padding-top: 20px;
    }
    .clientRepalyContainer{
        list-style: none;
        margin:0;
        padding-left: 15px;
    }
    .clientRepalyContainer>li{
        border-bottom: 1px solid #f0f0f0;
        padding: 10px;
    }
    .replyBox{
        margin-top: 10px;
        margin-left: 10px;
        width: 90%;
    }
    .PaginationBox{
        text-align: right;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .replayBtn{
        margin-top: 10px;
        margin-left: 55px;
    }
    .cancelReplay{
        color: #5e7382;
    }
    .scores-img{
        padding-left: 5px;
    }

</style>
