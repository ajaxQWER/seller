<template>
    <el-row>
		<el-row class="activityTitle">
			<p class="activitySize">活动设置</p>
			<p class="activityColor">活动设置活动设置活动设置活动设置活动设置活动设置活动设置活动设置活动设置</p>
		</el-row>
		<el-button class="addButton" size="small" type="success" @click="addActivity">添加活动</el-button>
		<el-row class="content">
			<div v-for="(item,index) in activityList">
				<el-row class="activityContent" v-if="item.state">
					<el-col :span="2">
						<img src="../assets/images/discount_03.png" height="66" width="69" class="imgP">
					</el-col>
					<el-col :span="19" :offset="1">
						<h4 :class="['discountType',formatClassByType(item.activityType)]">{{formatActivityType(item.activityType)}}</h4>
						<div class="discount">{{item.activityName}}</div>
						<div class="discount">有效期：{{moment(item.beginTime).format('YYYY-MM-DD')}} 至 {{item.endTime?moment(item.endTime).format('YYYY-MM-DD'):'长期'}}</div>
					</el-col>
					<el-col :span="2">
						<el-button type="text" @click="handleClick(index)">编辑</el-button>
	                    <el-button type="text" @click="deleteActivitys(item.activityId)">删除</el-button>
					</el-col>
				</el-row>
				<el-row class="activityContent" v-else>
					<el-col :span="2">
						<img src="../assets/images/discount_03.png" height="66" width="69" class="imgP">
					</el-col>
					<el-col :span="12" :offset="1">
						<el-form label-width="120px">
			                <el-form-item label="活动名称">
			                    <el-input width="100"></el-input>
			                </el-form-item>
			                <el-form-item label="开始时间">
			                    <el-input></el-input>
			                </el-form-item>
			                <el-form-item label="结束时间">
			                    <el-input></el-input>
			                </el-form-item>
			                <el-form-item label="立减金额">
			                    <el-input></el-input>
			                </el-form-item>
			                <el-button class="saveUpdateActivity" type="primary" @click="saveUpdateActivity(index)">保存</el-button>
		                    <el-button type="info" @click="cancelActivity(index)">取消</el-button>
			            </el-form>
					</el-col>
				</el-row>
			</div>
			<el-col class="pagination">
                <el-pagination @current-change="currentChange" :current-page="params.pageId" :page-size="params.pageSize" layout=" prev, pager, next, jumper" :total="counts">
                </el-pagination>
            </el-col>
		</el-row>
		<el-dialog :title="'添加活动'" :visible.sync="addDialog" size="tiny" @close="closeAddDialog" class="dialog">
			<el-button class="btn" @click="fullPurchase">购满就送</el-button>
			<el-button class="btn" @click="firstSingleExemption">首单免减</el-button>
			<el-button class="btn" @click="delGold">购满就减</el-button>
			<el-button class="btn" @click="specialPrices">特价商品</el-button>
			<el-button class="btn" @click="sale">折扣商品</el-button>
			<el-button class="btn" @click="specific">其他</el-button>
			<div v-if="state=='fullPurchase'">
				<el-form label-position="none" label-width="120px">
	            	<el-form-item label="活动时间" :inline="true">
	                    <el-date-picker
					      type="date"
					      placeholder="选择日期"
					      :picker-options="pickerOptions0">
					    </el-date-picker>
					    <i class="el-icon-minus"></i>
					    <el-date-picker
					      type="date"
					      placeholder="无限制"
					      :picker-options="pickerOptions0">
					    </el-date-picker>
	                </el-form-item>
	                <el-form-item label="最低金额">
	                    <el-input type="number"></el-input>
	                </el-form-item>
	                <el-form-item label="选择红包">
	                    <el-input></el-input>
	                </el-form-item>
	                <el-form-item label="红包数量">
	                    <el-input type="number"></el-input>
	                </el-form-item>
	            </el-form>
			</div>
			<div v-if="state=='firstSingleExemption'">
				<el-form label-position="none" label-width="120px">
					<el-form-item label="活动时间" :inline="true">
	                    <el-date-picker
					      type="date"
					      placeholder="选择日期"
					      :picker-options="pickerOptions0">
					    </el-date-picker>
					    <i class="el-icon-minus"></i>
					    <el-date-picker
					      type="date"
					      placeholder="无限制"
					      :picker-options="pickerOptions0">
					    </el-date-picker>
	                </el-form-item>
	                <el-form-item label="立减金额">
	                    <el-input type="number"></el-input>
	                </el-form-item>
	            </el-form>
			</div>
			<div v-if="state=='delGold'">
				<el-form label-position="none" label-width="120px">
					<el-form-item label="活动时间" :inline="true">
	                    <el-date-picker
					      type="date"
					      placeholder="选择日期"
					      :picker-options="pickerOptions0">
					    </el-date-picker>
					    <i class="el-icon-minus"></i>
					    <el-date-picker
					      type="date"
					      placeholder="无限制"
					      :picker-options="pickerOptions0">
					    </el-date-picker>
	                </el-form-item>
	                <el-form-item label="最低金额">
	                    <el-input type="number"></el-input>
	                </el-form-item>
	            </el-form>
			</div>
			<div v-if="state=='specialPrices'">
				<el-form label-position="none" label-width="120px">
					<el-form-item label="活动时间" :inline="true">
	                    <el-date-picker
					      type="date"
					      placeholder="选择日期"
					      :picker-options="pickerOptions0">
					    </el-date-picker>
					    <i class="el-icon-minus"></i>
					    <el-date-picker
					      type="date"
					      placeholder="无限制"
					      :picker-options="pickerOptions0">
					    </el-date-picker>
	                </el-form-item>
	                <el-form-item label="最低金额">
	                    <el-input type="number"></el-input>
	                </el-form-item>
	            </el-form>
			</div>
			<div v-if="state=='sale'">
				<el-form label-position="none" label-width="120px">
					<el-form-item label="活动时间" :inline="true">
	                    <el-date-picker
					      type="date"
					      placeholder="选择日期"
					      :picker-options="pickerOptions0">
					    </el-date-picker>
					    <i class="el-icon-minus"></i>
					    <el-date-picker
					      type="date"
					      placeholder="无限制"
					      :picker-options="pickerOptions0">
					    </el-date-picker>
	                </el-form-item>
	                <el-form-item label="最低金额">
	                    <el-input type="number"></el-input>
	                </el-form-item>
	            </el-form>
			</div>
			<div v-if="state=='specific'">
				<el-form label-position="none" label-width="120px">
					<el-form-item label="活动时间" :inline="true">
	                    <el-date-picker
					      type="date"
					      placeholder="选择日期"
					      :picker-options="pickerOptions0">
					    </el-date-picker>
					    <i class="el-icon-minus"></i>
					    <el-date-picker
					      type="date"
					      placeholder="无限制"
					      :picker-options="pickerOptions0">
					    </el-date-picker>
	                </el-form-item>
	                <el-form-item label="最低金额">
	                    <el-input type="number"></el-input>
	                </el-form-item>
	            </el-form>
			</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeAddDialog">取 消</el-button>
                <el-button type="primary" @click="closeAddDialog" >确 定</el-button>
            </div>
        </el-dialog>
	</el-row>
</template>

  <!-- [首单立减'FIRST', 购满就减'DELGOLD', 购满就送'COMPLIMENTARY', 特价商品'SPECIALPRICES', 折扣商品'SALE', 其他'SPECIFIC'] -->

<script>
import { getActivity , deleteActivity , addActivity } from "@/api/api.js"
export default {
	created(){
		this.getActivitys()
	},
    data: function() {
        return {
        	params:{
        		pageId:1,
        		pageSize: 4,
        		shopId:localStorage.getItem("shopId")
        	},
        	pickerOptions0: {
	          disabledDate(time) {
	            return time.getTime() < Date.now() - 8.64e7;
	          }
	        },
	        activityId:"",
	        state:"",
        	addDialog:false,
        	counts:0,
            activityList:[]
        }
    },
    methods:{
    	handleClick(index){
    		this.activityList[index].state = false
    	},
    	saveUpdateActivity(index){
    		this.activityList[index].state = true
    	},
    	cancelActivity(index){
    		this.activityList[index].state = true
    	},
    	currentChange: function(val) {
            this.params.pageId = val;
            this.getActivitys()
        },
        closeAddDialog(){
        	this.addDialog = false
        	this.state = ""
        },
        addActivity(){
        	this.addDialog = true
        },
        //购满就送
        fullPurchase(){
        	this.state = "fullPurchase"
        },
        //首单免减
        firstSingleExemption(){
        	this.state = "firstSingleExemption"
        },
        //购买立减
        delGold(){
        	this.state = "delGold"
        },
        //特价商品
        specialPrices(){
        	this.state = "specialPrices"
        },
        //折扣商品
        sale(){
        	this.state = "sale"
        },
        //其他
        specific(){
        	this.state = "specific"
        },
        //获取店铺活动列表
        async getActivitys(){
    		const res = await getActivity({params:this.params})
    		this.counts = res.count
    		let data = res.list
    		let state = {state:true}
    		this.activityList = data.map((item) =>{
    			return {...item,...state}
    		})
    		console.log(res)
        },
        //删除店铺活动
        async deleteActivitys(activityId){
        	await deleteActivity(activityId)
        	this.getActivitys()
        },
        formatActivityType(type){
			switch (type) {
				case 'FIRST':
					return '首单立减';
				case 'DELGOLD':
					return '购满就减';
				case 'COMPLIMENTARY':
					return '购满就送';
				case 'SPECIALPRICES':
					return '特价商品';
				case 'SALE':
					return '折扣商品';
				case 'SPECIFIC':
					return '其他';
			}
		},
		formatClassByType(type){
			switch (type) {
				case 'FIRST':
					return 'type-3';
				case 'DELGOLD':
				case 'COMPLIMENTARY':
					return 'type-2';
				case 'SALE':
				case 'SPECIFIC':
				case 'SPECIALPRICES':
					return 'type-1';
			}
		},	
	}
}
</script>
<style scoped>
	h4{
		margin:0;
	}
	.addButton{
		border-radius: 20px;
		position: absolute;
		top:26px;
		right: 20px
	}
	.discountType{
		font-size: 16px;
		/*color: #ff7426*/
	}
	.type-1{
		color: #ff7426
	}
	.type-2{
		color: #e20008
	}
	.type-3{
		color: #239a1e
	}
	.discount{
		color: #7a7a7a;
		margin-top: 10px;
	}
	.imgP{
		padding: 10px
	}
	.activityTitle{
		background-color: #fff;
		border-left: 2px solid #00ba00;
		padding: 10px 20px;
	}
	.activityColor{
		color:#7a7a7a;
	}
	.activitySize{
		font-size: 16px
	}
	.activityContent{
		background-color: #fff;
		border-bottom: 1px solid #ececec;
		padding: 20px
	}
	.content{
		margin-top: 10px;
		background-color: #fff
	}
	.saveUpdateActivity{
		margin-left: 150px
	}
	.btn{
		margin:0 8px
	}
	.labelName{
		text-align: center;
	}
	.el-pagination{
		float:right;
	}
	form{
		margin-top: 1em
	}
</style>