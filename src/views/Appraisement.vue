<template>
    <el-row>
        <el-row class="gradeContainer">
            <span>综合评分</span>
            <el-row>
                <el-col :span="4" :offset="1">
                    <el-row class="grades">{{appraiseTotal.comprehensiveApprise}}</el-row>
                    <el-row class="gradeIntro">高于商圈{{(appraiseTotal.businessCircleRatio*100)>>0}}%的商家</el-row>
                </el-col>
                <el-col :span="12" :offset="1">
                    <el-row class="Reply">
                        <el-row>
                            <el-col :span="7">
                                <span class="replyText">近7天评价回复率：{{~~(appraiseTotal.reversionRate*100)>>0}}%</span>
                            </el-col>
                            <el-col :span="14">
                                <el-progress :text-inside="true" :stroke-width="12" :percentage="reversionRate " class="Replyschedule"></el-progress>
                            </el-col>
                        </el-row>
                            <el-row>
                                <el-col :span="7">
                                    <span class="replyText">近7天差评回复率：{{~~(appraiseTotal.reviewRate*100)>>0}}%</span>
                                </el-col>
                                <el-col :span="14">
                                    <el-progress :text-inside="true" :stroke-width="12" :percentage="reviewRate " status="exception"></el-progress>
                                </el-col>
                            </el-row>
                    </el-row>
                </el-col>
            </el-row>
        </el-row>
        <el-row class="AppraisementContent">
            <el-tabs v-model="activeName" @tab-click="tabClick">
                <el-tab-pane label="全部评价" name="0" v-for="(tab,tabIndex) in tabs " :key="tabIndex" :label="tab.label" :name="tab.name" :value="tab.value">
                </el-tab-pane>
                <!--<el-tab-pane label="已回复" name="1">-->
                <!--</el-tab-pane>-->
                <!--<el-tab-pane label="未回复" name="2">-->
                <!--</el-tab-pane>-->
            </el-tabs>
            <el-row v-loading="loading"  element-loading-text="拼命加载中" v-if="!isEmpty">
                <ul class="clientRepalyContainer" v-if="commentList.length>0">
                    <li v-for="(item,index) in commentList" :key="index">
                        <el-row>
                            <el-col class="headPortrait" :span="2">
                                <img :src="UPLOADURL + item.avatorUrl + '/avator.png'"  alt="" >
                            </el-col>
                            <el-col :span="19">
                                <el-col>
                                    <ul class="custormReply">
                                        <li>
                                            <el-row>
                                                <img v-for="n in item.shopAppraise" src="../assets/images/scores.png" alt="" class="scores-img">
                                            </el-row>
                                        </li>
                                        <li class="firstAppraise"><span >{{item.contentShopAppraise}}</span></li>
                                        <li class="lastAppraise">{{item.orderName}}</li>
                                        <li class="AppraiseBox" v-for="(val,index) in item.commentList" :key="index"><span class="AppraiseTitle">您的回复：</span><span>{{val.commentContent}}</span></li>
                                    </ul>
                                </el-col>
                            </el-col>
                            <el-col :span="3" class="replyInfo">
                                <el-row>{{moment(item.appraiseTime).format('YYYY-MM-DD')}}</el-row>
                                <el-row class="replyBtn"><el-button type="success" size="small" @click="clientReply(item.shopAppraiseId,index)">回复</el-button></el-row>
                            </el-col>
                        </el-row>
                        <el-row class="clientRepalyContent">
                            <ul class="clientRepaly">
                                <li v-if="item.goodsAppraiseList.length>0" v-for="(goods,goodsKey) in item.goodsAppraiseList" :key="goodsKey">
                                    <el-col :span="19" style="margin-top: 10px">
                                        <el-row class="evaluateTitle">{{goods.goodsName}}</el-row>
                                        <el-row class="evaluate">{{goods.appraiseContent}}</el-row>
                                    </el-col>
                                    <el-col :span="5" class="grade" style="text-align: center;padding-left: 53px">
                                        <div class="goods-comment"><img v-for="n in goods.appraiseLevel" src="../assets/images/scores.png" alt="" class="scores-img"></div>
                                    </el-col>
                                </li>
                            </ul>
                        </el-row>
                        <el-row class="replyTextareaBox" v-if="item.replay">
                            <el-input type="textarea" placeholder="请输入回复内容" v-model="commentContent"></el-input>
                            <el-row>
                                <el-col :span="3" :offset="21" class="replyBtn1">
                                    <el-button type="text" size="mini" @click="cancelReplay(index)">取消</el-button>
                                    <el-button type="success" size="mini" @click="commentsReply(index)">回复</el-button>
                                </el-col>
                            </el-row>
                        </el-row>
                    </li>
                </ul>
                <el-row class="PaginationBox">
                    <el-row class="PaginationBox">
                        <el-pagination
                            @current-change="currentChange"
                            :current-page="pageId"
                            :page-size = "pageSize"
                            :total="counts">
                        </el-pagination>
                    </el-row>
                </el-row>
            </el-row>
            <el-row v-else class="empty">
                <img src="../assets/images/empty-img.png" alt="">
            </el-row>
        </el-row>
    </el-row>
</template>
<script>
    import {getShopAppraiseHead,getShopAppraise,getShopAppraiseById,commentReply} from '@/api/api'
export default {
    data: function() {
        return {
            loading:false,
            headerImage: '',
            activeName: 'ALL',
            appraiseTotal:"",
        	commentsAppraise: false,
            pageId: 1,
            pageSize:5,
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
            bigImgUrl: '',
            replyTextarea:'', //回复内容
            tabs:[{
                label:"全部评价",
                name: 'ALL',
            },{
                label:"已回复",
                name: 'true',
            },{
                label:"未回复",
                name: 'false',
            },
            ]
        }
    },
    methods:{
      //分页
        currentChange(val){
            this.pageId = val;
            this.getAppraiseList()
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
        //获取评价tab
        tabClick(tab){
            if (!tab || !tab.index) {
                return false
            }
            this.reply = tab.index == '0' ?  "" : tab.name;
            this.activeName = tab.name;
            this.pageId = 1;
            this.getAppraiseList()
        },
        //获取评价列表
        getAppraiseList(){
            this.loading=true
            var params={
                shopAppraise:this.shopAppraise,
                reply: this.reply,
                commentsAppraise: this.commentsAppraise,
                pageSize: 5,
                pageId: this.pageId
            }
            console.log(params)
            console.log(5555)
            getShopAppraise({params:params}).then(res => {
                if(res.count == 0){
                    this.isEmpty = true;
                }
                this.loading=false
                this.counts = res.count;
                this.commentList = res.list
                var queryString = '?';
                for(var key in params){
                    if(params[key]){
                        queryString += key + '=' + params[key] + '&';
                    }
                }
                this.$router.push(queryString);
                var commentList=res.list
                commentList.forEach((item) => {
                    //****这里需要动态添加属性***
                    this.$set(item,'replay',false)
                });
                window.scrollTo(0,0);
            })
        },
        // 点击回复
        clientReply(AppraiseId,index){
            this.shopAppraiseId = AppraiseId
            this.$set(this.commentList[index],'replay', true)
        },
        // 点击取消回复
        cancelReplay(index){
            this.$set(this.commentList[index],'replay', false)
        },
        // 回复
        commentsReply: function(index){
            var params = {
                commentContent: this.commentContent,
                shopAppraiseId: this.shopAppraiseId
            }
            commentReply(params).then(() => {
                this.getAppraiseList()
                this.commentContent=""
                this.$set(this.commentList[index],'replay', false)
                this.$message({
                    type: 'success',
                    message: '操作成功',
                })
            })
        },
    },
    created(){
        var pageId = parseInt(this.$route.query.pageId) || 1;
        var reply = this.$route.query.reply || null;
        this.pageId = pageId;
        this.reply = reply;
        this.activeName = reply;
        this.getHeadInfo();
        this.getAppraiseList()
    },
    computed : {
        reversionRate : function(){
            return parseInt(this.appraiseTotal.reversionRate*100) || 0
        },
        reviewRate : function(){
            return parseInt(this.appraiseTotal.reviewRate*100) || 0
        }
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
        color: red;
        text-align: center;
    }
    .gradeIntro{
        color: rgba(62, 83, 113, 0.76);
        font-size: 13px;
        text-align: center;
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
        background: url(../assets/images/default-avatar.png) no-repeat center center #eaeaea;
        background-size: cover;
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
        color: green;
        font-size: 12px;
        margin-top: 3px;

    }
    .AppraiseTitle{
        color: red;
    }
    .AppraiseBox{
        margin-top: 10px;
        font-size: 12px;

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
        margin-left: 48px;
        margin-top: 10px;
        border: 1px solid white;
        padding-bottom: 14px;
    }

    .clientRepaly{
        margin-left: 5px;
        padding: 0px 0px 0px 10px;
    }
    .clientRepaly>li{
        list-style: none;
    }
    .evaluateTitle{
        font-size: 14px;
    }
    .evaluate{
        color: #8c939d;
        font-size: 12px;
        padding-top: 3px;
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
        padding-left: 3px;
        width: 10px;
        height: 15px;
    }
    .replyTextareaBox{
        margin-top: 10px;
        margin-left: 53px;
        width: 90%;
    }
    .firstAppraise{
        font-size: 13px;

    }
    .replyBtn1{
        text-align: right;
        margin-top: 10px;
    }
    .empty{
        padding: 30px;
        text-align: center;
    }
</style>
