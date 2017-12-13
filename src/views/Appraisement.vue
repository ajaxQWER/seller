<template>
    <el-row>
        <el-row class="gradeContainer">
            <span>综合评分</span>
            <el-row>
                <el-col :span="4" :offset="2">
                    <el-row class="grade">4.8</el-row>
                    <el-row class="gradeIntro">高于商圈20%的商家</el-row>
                </el-col>
                <el-col :span="12">
                    <ul class="Reply">
                        <el-row>
                            <el-col :span="6">
                                <span class="replyText">评价回复(40%)</span>
                            </el-col>
                            <el-col :span="16">
                                <el-progress :text-inside="true" :stroke-width="12" :percentage="70" class="Replyschedule"></el-progress>
                            </el-col>
                        </el-row>
                        <li>
                            <el-row>
                                <el-col :span="6">
                                    <span class="replyText">评价回复(40%)</span>
                                </el-col>
                                <el-col :span="16">
                                    <el-progress :text-inside="true" :stroke-width="12" :percentage="70" class="Replyschedule"></el-progress>
                                </el-col>
                            </el-row>
                        </li>
                        <li>
                            <el-row>
                                <el-col :span="6">
                                    <span class="replyText">差频率(40%)</span>
                                </el-col>
                                <el-col :span="16">
                                    <el-progress :text-inside="true" :stroke-width="12" :percentage="50" status="exception"></el-progress>
                                </el-col>
                            </el-row>
                        </li>
                    </ul>
                </el-col>
                <el-col :span="6"></el-col>
            </el-row>
        </el-row>
        <el-row class="AppraisementContent">
            <el-tabs v-model="activeName">
                <el-tab-pane label="全部评价(33)" name="first">
                    <el-row>
                        <el-col class="headPortrait" :span="2">
                            <img src="../assets/images/portrait.jpg" alt="">
                        </el-col>
                        <el-col :span="19">
                            <el-col>
                                <ul class="custormReply">
                                    <li>
                                        <el-rate
                                            v-model="value5"
                                            disabled
                                            show-text
                                            text-color="#ff9900"
                                            text-template="{value}">
                                        </el-rate>
                                    </li>
                                    <li>味道好</li>
                                    <li class="lastAppraise">鸡腿一个，鸡蛋一个，面包一个</li>
                                    <li class="AppraiseBox"><span class="AppraiseTitle">您的回复：</span><span>感谢您的支持。。。。</span></li>
                                    <ul clas="">
                                        <li>
                                            
                                        </li>
                                        <li>
                                            
                                        </li>
                                    </ul>
                                </ul>
                            </el-col>
                            <el-col></el-col>
                        </el-col>
                        <el-col :span="3">
                            <el-row>2017-09-09</el-row>
                            <el-row> <el-button type="" size="small">回复</el-button></el-row>
                        </el-col>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="未回复(33)" name="second">配置管理</el-tab-pane>
                <el-tab-pane label="已回复(33)" name="third">角色管理</el-tab-pane>
            </el-tabs>
        </el-row>

    </el-row>
</template>
<script>
export default {
    data: function() {
        return {
            activeName: 'first',
            value5: 3.7
        }
    },
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
        width: 40px;
        border-radius: 20px;
    }
    .headPortrait>img{
        width: 40px;
        width: 40px;
        border-radius: 25px;
    }
    .AppraisementContent{
        background-color: white;
        padding: 5px;
        margin-top: 20px;
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
</style>
