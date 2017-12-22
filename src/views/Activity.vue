<template>
    <el-row>
		<el-row class="activityTitle">
			<p class="activitySize">活动设置</p>
			<p class="activityColor">活动设置活动设置活动设置活动设置活动设置活动设置活动设置活动设置活动设置</p>
		</el-row>
		<el-button class="addButton" size="small" type="success" @click="showAddActivity">添加活动</el-button>
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
						<el-button type="text" @click="handleClick(item.activityId,index)">编辑</el-button>
	                    <el-button type="text" @click="deleteActivitys(item.activityId)">删除</el-button>
					</el-col>
				</el-row>
				<el-row class="activityContent" v-else>
					<el-col :span="2">
						<img src="../assets/images/discount_03.png" height="66" width="69" class="imgP">
					</el-col>
					<el-col :span="12" :offset="1">
						<el-form label-width="120px" v-if="item.activityType == 'FIRST'">
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
			            <el-form label-width="120px" v-if="item.activityType == 'DELGOLD'">
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
			            <el-form label-width="120px" v-if="item.activityType == 'COMPLIMENTARY'">
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
			            <el-form label-width="120px" v-if="item.activityType == 'COMPLIMENTARY'">
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
			            <el-form label-width="120px" v-if="item.activityType == 'SPECIFIC'">
			                <el-form-item label="活动名称">
			                    <el-input width="100"></el-input>
			                </el-form-item>
			                <el-form-item label="开始时间">
			                    <el-input></el-input>
			                </el-form-item>
			                <el-form-item label="结束时间">
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
			<el-form :inline="true">
				<el-form-item label="活动类型" label-width="120px">
					<el-select @change="change(value)" v-model="value" placeholder="请选择">
					    <el-option v-for="(item,index) in activityTypes" :key="index" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div v-if="state=='fullPurchase'">
				<el-form label-position="none" label-width="120px">
	                <el-form-item label="活动时间">
					    <el-col :span="10">
					        <el-date-picker type="date" placeholder="选择日期" v-model="beginTime" :picker-options="pickerOptions0"></el-date-picker>
					    </el-col>
					    <el-col class="line" :span="2" style="text-align:center">-</el-col>
					    <el-col :span="10">
					        <el-date-picker type="date" placeholder="无限制" v-model="endTime" :picker-options="pickerOptions0"></el-date-picker>
					    </el-col>
					</el-form-item>
	                <el-form-item label="最低金额">
	                    <el-input v-model="full"></el-input>
	                </el-form-item>
	                <el-form-item label="选择红包">
	                    <el-select v-model="couponId" placeholder="请选择">
						    <el-option v-for="(item,index) in options" :key="index" :label="item.couponName" :value="item.couponId"></el-option>
						</el-select>
	                </el-form-item>
	                <el-form-item label="红包数量">
	                    <el-input v-model="couponCount"></el-input>
	                </el-form-item>
	            </el-form>
			</div>
			<div v-if="state=='firstSingleExemption'">
				<el-form label-position="none" label-width="120px">
	                <el-form-item label="活动时间">
					    <el-col :span="10">
					        <el-date-picker type="date" placeholder="选择日期" v-model="beginTime" :picker-options="pickerOptions0"></el-date-picker>
					    </el-col>
					    <el-col class="line" :span="2" style="text-align:center">-</el-col>
					    <el-col :span="10">
					        <el-date-picker type="date" placeholder="无限制" v-model="endTime" :picker-options="pickerOptions0"></el-date-picker>
					    </el-col>
					</el-form-item>
	                <el-form-item label="立减金额">
	                    <el-input v-model="money"></el-input>
	                </el-form-item>
	            </el-form>
			</div>
			<div v-if="state=='delGold'">
				<el-form label-position="none" label-width="120px">
					<el-form-item label="活动时间">
					    <el-col :span="10">
					        <el-date-picker type="date" placeholder="选择日期" v-model="beginTime" :picker-options="pickerOptions0"></el-date-picker>
					    </el-col>
					    <el-col class="line" :span="2" style="text-align:center">-</el-col>
					    <el-col :span="10">
					        <el-date-picker type="date" placeholder="无限制" v-model="endTime" :picker-options="pickerOptions0"></el-date-picker>
					    </el-col>
					</el-form-item>
	                <el-form-item label="购满">
	                	<el-col :span="10">
					      <el-input v-model="full"></el-input>
					    </el-col>
					    <el-col class="line" :span="3" style="text-align:center;">立减</el-col>
					    <el-col :span="10">
					      <el-input v-model="subtract"></el-input>
					    </el-col>
	                </el-form-item>
	            </el-form>
			</div>
			<div v-if="state=='sale'">
				<el-form label-position="none" label-width="120px">
	                <el-form-item label="活动时间">
					    <el-col :span="10">
					        <el-date-picker type="date" placeholder="选择日期" v-model="beginTime" :picker-options="pickerOptions0"></el-date-picker>
					    </el-col>
					    <el-col class="line" :span="2" style="text-align:center">-</el-col>
					    <el-col :span="10">
					        <el-date-picker type="date" placeholder="无限制" v-model="endTime" :picker-options="pickerOptions0"></el-date-picker>
					    </el-col>
					</el-form-item>
	                <el-form-item label="活动名称">
	                    <el-input v-model="activityName"></el-input>
	                </el-form-item>
	            </el-form>
			</div>
			<div v-if="state=='specific'">
				<el-form label-position="none" label-width="120px">
	                <el-form-item label="活动时间">
					    <el-col :span="10">
					        <el-date-picker type="date" placeholder="选择日期" v-model="beginTime" :picker-options="pickerOptions0"></el-date-picker>
					    </el-col>
					    <el-col class="line" :span="2" style="text-align:center">-</el-col>
					    <el-col :span="10">
					        <el-date-picker type="date" placeholder="无限制" v-model="endTime" :picker-options="pickerOptions0"></el-date-picker>
					    </el-col>
					</el-form-item>
	                <el-form-item label="活动名称">
	                    <el-input v-model="activityName"></el-input>
	                </el-form-item>
	            </el-form>
			</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeAddDialog">取 消</el-button>
                <el-button type="primary" @click="addActivitys" >确 定</el-button>
            </div>
        </el-dialog>
	</el-row>
</template>

  <!-- [首单立减'FIRST', 购满就减'DELGOLD', 购满就送'COMPLIMENTARY', 特价商品'SPECIALPRICES', 折扣商品'SALE', 其他'SPECIFIC'] -->

<script>
import { getActivity , deleteActivity , addActivity , getBonusLists , getActivityDetails} from "@/api/api.js"
export default {
	created(){
		this.getActivitys()
		let bonusParams = {
			pageId:1,
			pageSize:9999
		}
		getBonusLists({params:bonusParams}).then(res =>{
			this.options = res.list
		})
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
	        typeName:"",
	        couponCount:"",
	        couponId:"",
	        full:"",
            beginTime: '',
            endTime: '',
            money:"",
            activityName:"",
            subtract: "",
            activityObj:[{
            	full:"",
            	subtract:""
            }],




	        activityId:"",
	        state:"",
        	addDialog:false,
        	counts:0,
            activityList:[],
            value:"",
            options: [],
            activityTypes:[{
            	label:"购满就送",
            	value:1
            },{
            	label:"首单立减",
            	value:2
            },{
            	label:"购满就减",
            	value:3
            },{
            	label:"折扣商品",
            	value:4
            },{
            	label:"其他",
            	value:5
            },]
        }
    },
    methods:{
    	async handleClick(activityId,index){
    		this.activityList[index].state = false
    		const data = await getActivityDetails(activityId)
    		console.log(data)
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
        	this.value = ""
        	this.addDialog = false
        	this.state = ""
        },
        showAddActivity(){
        	this.addDialog = true
        },
        change(val){
        	if(val == 1){
        		this.state = "fullPurchase"
        	}else if(val == 2){
        		this.state = "firstSingleExemption"
        	}else if(val == 3){
        		this.state = "delGold"
        	}else if(val == 4){
        		this.state = "sale"
        	}else if(val == 5){
        		this.state = "specific"
        	}
        },
        //时间格式化
        formatDate(date){
        	return new Date(date).getTime()
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
					return 'type-1';
			}
		},
		//增加店铺活动
		async addActivitys(){
			var activityParams = {}
			console.log(this.value)
			//购满就送
			if(this.value==1&&!this.full==""&&!this.couponId==""&&!this.couponCount==""){
				activityParams = {
		        	activityContent:{
		        		typeName:"sharefood.models.activity.activity.entity.ComplimentaryActivityData",
		        		couponCount: this.couponCount,
	                    couponId: this.couponId,
	                    full: this.full,
		        	},
		        	activityType: 'COMPLIMENTARY',
	                beginTime: this.formatDate(this.beginTime),
	                endTime:  this.formatDate(this.endTime),
	                isValid: true
		        }
		        await addActivity(activityParams)
				this.addDialog = false
				this.getActivitys()
				this.typeName = ""
		        this.couponCount = ""
		        this.couponId = ""
		        this.full = ""
	            this.beginTime = ''
	            this.endTime = ''
			}else if(this.value == 2){
				activityParams = {
	                activityContent: {
	                	typeName: "sharefood.models.activity.activity.entity.FirstActivityData",
	                    money: this.money
	                },
	                activityType: "FIRST",
	                beginTime: this.formatDate(this.beginTime),
	                endTime: this.formatDate(this.endTime),
	                isValid: true
	            }
	            await addActivity(activityParams)
	            this.addDialog = false
				this.getActivitys()
				this.money=""
				this.beginTime = ''
	            this.endTime = ''
			}else if(this.value == 3){
				//添加买满就减有问题
				this.activityObj.push({
					full:this.full,
					subtract:this.subtract
				})
				activityParams = {
		        	activityContent:{
		        		typeName:"sharefood.models.activity.activity.entity.DelgoldActivityData",
		        		delgolds : this.activityObj
		        	},
		        	activityType: 'DELGOLD',
	                beginTime: this.formatDate(this.beginTime),
	                endTime:  this.formatDate(this.endTime),
	                isValid: true
		        }
		        await addActivity(activityParams)
				this.addDialog = false
				this.getActivitys()
		        this.full = ""
		        this.subtract = ""
	            this.beginTime = ''
	            this.endTime = ''
			}else if(this.value == 4){
				activityParams = {
	                activityContent: {
                		typeName: "sharefood.models.activity.activity.entity.SaleActivityData"
	                },
	                activityType: 'SALE',
	                beginTime: this.formatDate(this.beginTime),
	                endTime: this.formatDate(this.endTime),
	                activityName: this.activityName,
	                isValid: true
	            }
	            await addActivity(activityParams)
	            this.addDialog = false
				this.getActivitys()
				this.activityName=""
				this.beginTime = ''
	            this.endTime = ''
			}else if(this.value == 5){
				activityParams = {
					activityContent: {
	                	typeName: "sharefood.models.activity.activity.entity.SpecificActivityData",
	                    content: this.activityName
	                },
	                activityType: "SPECIFIC",
	                beginTime: this.formatDate(this.beginTime),
		            endTime: this.formatDate(this.endTime),
		            activityName: this.activityName,
	                isValid: true
				}
                await addActivity(activityParams)
	            this.addDialog = false
				this.getActivitys()
				this.activityName=""
				this.beginTime = ''
	            this.endTime = ''
			}else{
				this.$message({
                    type: 'error',
                    message: '信息不完整，请填写完整'
                });
			}
			
		}	
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
	.el-date-editor.el-input{
		width:100%;
	}
</style>