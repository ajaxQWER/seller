<template>
    <el-row>
		<el-row class="activityTitle">
			<p class="activitySize">活动设置</p>
			<p class="activityColor">活动设置活动设置活动设置活动设置活动设置活动设置活动设置活动设置活动设置</p>
		</el-row>
		<el-button class="addButton" size="small" type="success" @click="showAddActivity">添加活动</el-button>
		<el-row class="content" v-if="!isEmpty">
			<div v-for="(item,index) in activityList" :key="index">
				<!-- 活动列表 -->
				<el-row class="activityContent" v-if="item.state">
					<el-col :span="2">
						<img v-if="item.activityType == 'FIRST'" src="../assets/images/discount_01.png" class="imgP">
						<img v-if="item.activityType == 'DELGOLD'" src="../assets/images/discount_02.png" class="imgP">
						<img v-if="item.activityType == 'COMPLIMENTARY'" src="../assets/images/discount_03.png" class="imgP">
						<img v-if="item.activityType == 'SALE'" src="../assets/images/discount_04.png" class="imgP">
						<img v-if="item.activityType == 'SPECIFIC'" src="../assets/images/discount_05.png" class="imgP">
					</el-col>
					<el-col :span="19" :offset="1">
						<h4 :class="['discountType',formatClassByType(item.activityType)]">{{formatActivityType(item.activityType)}}</h4>
						<div class="discount">{{item.activityName}}</div>
						<div class="discount">有效期：{{moment(item.beginTime).format('YYYY-MM-DD')}} 至 {{item.endTime?moment(item.endTime).format('YYYY-MM-DD'):'长期'}}</div>
					</el-col>
					<el-col :span="2">
						<el-button type="text" @click="handleClick(item,index)">编辑</el-button>
	                    <el-button type="text" @click="deleteActivitys(item.activityId)">删除</el-button>
					</el-col>
				</el-row>
				<!-- 修改活动 -->
				<el-row class="activityContent" v-else>
					<el-col :span="2">
						<img v-if="item.activityType == 'FIRST'" src="../assets/images/discount_01.png" class="imgP">
						<img v-if="item.activityType == 'DELGOLD'" src="../assets/images/discount_02.png" class="imgP">
						<img v-if="item.activityType == 'COMPLIMENTARY'" src="../assets/images/discount_03.png" class="imgP">
						<img v-if="item.activityType == 'SALE'" src="../assets/images/discount_04.png" class="imgP">
						<img v-if="item.activityType == 'SPECIFIC'" src="../assets/images/discount_05.png" class="imgP">
					</el-col>
					<el-col :span="12" :offset="1">
						<el-form label-width="120px" v-if="item.activityType == 'FIRST'" v-model="firstActivity">
			                <el-form-item label="开始时间">
			                    <el-date-picker type="date" v-model="firstActivity.beginTime" :picker-options="pickerOptions0"></el-date-picker>
			                </el-form-item>
			                <el-form-item label="结束时间">
			                    <el-date-picker type="date" v-model="firstActivity.endTime" :picker-options="pickerOptions0"></el-date-picker>
			                </el-form-item>
			                <el-form-item label="立减金额">
			                    <el-input v-model="firstActivity.activityContent.money"></el-input>
			                </el-form-item>
			                <el-button class="saveUpdateActivity" type="primary" @click="saveUpdateActivity(item,index)">保存</el-button>
		                    <el-button type="info" @click="cancelActivity(index)">取消</el-button>
			            </el-form>
			            <el-form label-width="120px" v-if="item.activityType == 'DELGOLD'" v-model="delgoldActivity">
			                <el-form-item label="开始时间">
			                    <el-date-picker type="date" v-model="delgoldActivity.beginTime" :picker-options="pickerOptions0"></el-date-picker>
			                </el-form-item>
			                <el-form-item label="结束时间">
			                    <el-date-picker type="date" v-model="delgoldActivity.endTime" placeholder="无限制" :picker-options="pickerOptions0"></el-date-picker>
			                </el-form-item>
			                <div v-for="(item,index) in delgoldActivity.activityContent.delgolds">
			                	<el-form-item label="购满">
				                	<el-col :span="5">
								      <el-input v-model="item.full"></el-input>
								    </el-col>
								    <el-col class="line" :span="3" style="text-align:center;">立减</el-col>
								    <el-col :span="5">
								      <el-input v-model="item.subtract"></el-input>
								    </el-col>
								    <el-col :span="5">
								      <el-button @click="addDel">增加</el-button>
								    </el-col>
								    <el-col :span="5">
								      <el-button @click="delAddDel(index)">删除</el-button>
								    </el-col>
				                </el-form-item>
			                </div>
			                <el-button class="saveUpdateActivity" type="primary" @click="saveUpdateActivity(item,index)">保存</el-button>
		                    <el-button type="info" @click="cancelActivity(index)">取消</el-button>
			            </el-form>
			            <el-form label-width="120px" v-if="item.activityType == 'COMPLIMENTARY'" v-model="complimentaryActivity">
			                <el-form-item label="活动时间">
							    <el-col :span="10">
							        <el-date-picker type="date" placeholder="选择日期" v-model="complimentaryActivity.beginTime" :picker-options="pickerOptions0"></el-date-picker>
							    </el-col>
							    <el-col class="line" :span="2" style="text-align:center">-</el-col>
							    <el-col :span="10">
							        <el-date-picker type="date" placeholder="无限制" v-model="complimentaryActivity.endTime" :picker-options="pickerOptions0"></el-date-picker>
							    </el-col>
							</el-form-item>
			                <el-form-item label="最低金额">
			                    <el-input v-model="complimentaryActivity.activityContent.full"></el-input>
			                </el-form-item>
			                <el-form-item label="选择红包">
			                    <el-select v-model="complimentaryActivity.activityContent.couponId" placeholder="请选择">
								    <el-option v-for="(item,index) in options" :key="index" :label="item.couponName" :value="item.couponId"></el-option>
								</el-select>
			                </el-form-item>
			                <el-form-item label="红包数量">
			                    <el-input v-model="complimentaryActivity.activityContent.couponCount"></el-input>
			                </el-form-item>
			                <el-button class="saveUpdateActivity" type="primary" @click="saveUpdateActivity(item,index)">保存</el-button>
		                    <el-button type="info" @click="cancelActivity(index)">取消</el-button>
			            </el-form>
			            <el-form label-width="120px" v-if="item.activityType == 'SALE'" v-model="saleActivity">
			                <el-form-item label="活动时间">
							    <el-col :span="10">
							        <el-date-picker type="date" placeholder="选择日期" v-model="saleActivity.beginTime" :picker-options="pickerOptions0"></el-date-picker>
							    </el-col>
							    <el-col class="line" :span="2" style="text-align:center">-</el-col>
							    <el-col :span="10">
							        <el-date-picker type="date" placeholder="无限制" v-model="saleActivity.endTime" :picker-options="pickerOptions0"></el-date-picker>
							    </el-col>
							</el-form-item>
			                <el-form-item label="活动名称">
			                    <el-input v-model="saleActivity.activityName"></el-input>
			                </el-form-item>
			                <el-button class="saveUpdateActivity" type="primary" @click="updateGoodsAdministration(item.activityId)">商品管理</el-button>
			                <el-button type="primary" @click="saveUpdateActivity(item,index)">保存</el-button>
		                    <el-button type="info" @click="cancelActivity(index)">取消</el-button>
			            </el-form>
			            <el-form label-width="120px" v-if="item.activityType == 'SPECIFIC'" v-model="specificActivity">
			               <el-form-item label="活动时间">
							    <el-col :span="10">
							        <el-date-picker type="date" placeholder="选择日期" v-model="specificActivity.beginTime" :picker-options="pickerOptions0"></el-date-picker>
							    </el-col>
							    <el-col class="line" :span="2" style="text-align:center">-</el-col>
							    <el-col :span="10">
							        <el-date-picker type="date" placeholder="无限制" v-model="specificActivity.endTime" :picker-options="pickerOptions0"></el-date-picker>
							    </el-col>
							</el-form-item>
			                <el-form-item label="活动名称">
			                    <el-input v-model="specificActivity.activityName"></el-input>
			                </el-form-item>
			                <el-button class="saveUpdateActivity" type="primary" @click="saveUpdateActivity(item,index)">保存</el-button>
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
		<el-row v-else-if="isEmpty" class="img-center">
			<img src="../assets/images/empty-img.png" height="215" width="209">
		</el-row>
		<!-- 添加活动 -->
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
	                <div v-for="(item,index) in activityObj">
	                	<el-form-item label="购满">
		                	<el-col :span="5">
						      <el-input v-model="item.full"></el-input>
						    </el-col>
						    <el-col class="line" :span="3" style="text-align:center;">立减</el-col>
						    <el-col :span="5">
						      <el-input v-model="item.subtract"></el-input>
						    </el-col>
						    <el-col :span="5" :offset="1">
						      <el-button @click="addDelGold">增加</el-button>
						    </el-col>
						    <el-col :span="5">
						      <el-button @click="delAddDelGold(index)">删除</el-button>
						    </el-col>
		                </el-form-item>
	                </div>
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
        <!-- 商品管理 -->
        <el-dialog :title="'商品管理'" :visible.sync="goodsAdministration" size="tiny" @close="closeGoodsAdministration" class="dialog">
        	<p>1.参加活动的商品需要进行勾选</p>
        	<p>2.限购为空或0表示不限购</p>
        	<el-table
		      :data="goodsLists"
		      style="width: 100%">
		      <el-table-column
		        prop="goodsName"
		        label="商品名称">
		      </el-table-column>
		      <el-table-column
		        prop="goodsPrice"
		        label="原价">
		      </el-table-column>
		      <el-table-column
		        label="折扣">
		        <template slot-scope="scope">
		        	<el-input v-model="scope.row.discount"></el-input>
		        </template>
		      </el-table-column>
		      <el-table-column
		        label="限购">
		        <template slot-scope="scope">
		        	<el-input v-model="scope.row.limitation"></el-input>
		        </template>
		      </el-table-column>
		      <el-table-column
		        label="参加活动">
		        <template slot-scope="scope">
		        	<el-checkbox v-model="scope.row.isActivity"></el-checkbox>
		        </template>
		      </el-table-column>
		    </el-table>
			<div slot="footer" class="dialog-footer">
                <el-button @click="closeGoodsAdministration">取 消</el-button>
                <el-button type="primary" @click="saveGoodsAdministration" >保 存</el-button>
            </div>
        </el-dialog>
	</el-row>
</template>
<script>
import { getActivity , deleteActivity , addActivity , getBonusLists , getActivityDetails ,updateActivityDetails , getGoodsLists , setActivityGoods} from "@/api/api.js"
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
		getGoodsLists({params:{pageSize:9999}}).then(res =>{
			res.list.forEach((item,index) => {
            	this.goodsLists.push({
            		goodsName: item.goodsName,
            		goodsId: item.goodsId,
	        		goodsPrice: item.goodsPrice,
            		discount:  item.activityGoods ? item.activityGoods.discount : null,
            		limitation: item.activityGoods ? item.activityGoods.limitedQuantity : null,
            		isActivity: item.activityGoods ? true : false,
            	})
            })
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
	        goodsLists:[],
	        goodsAdministration:false,
	        isEmpty:false,
	        typeName:"",
	        couponCount:"",
	        couponId:"",
	        full:"",
            beginTime: '',
            endTime: '',
            money:"",
            activityName:"",
            activityObj:[{
            	full:null,
            	subtract:null
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
            }],
            firstActivity: {
            	activityContent: {
            		typeName: "sharefood.models.activity.activity.entity.FirstActivityData",
            	    money: null,
            	},
            	beginTime: null,
            	endTime: null,
            	activityType: "FIRST",
            	isValid: true
            },
            complimentaryActivity: {
            	activityContent: {
            		typeName:"sharefood.models.activity.activity.entity.ComplimentaryActivityData",
	        		couponCount: null,
                    couponId: null,
                    full: null,
            	},
            	activityType: 'COMPLIMENTARY',
                beginTime: null,
                endTime:  null,
                isValid: true
            },
            delgoldActivity: {
            	activityContent:{
	        		typeName:"sharefood.models.activity.activity.entity.DelgoldActivityData",
	        		delgolds : null
	        	},
	        	activityType: 'DELGOLD',
                beginTime: null,
                endTime:  null,
                isValid: true
            },
            saleActivity: {
            	activityContent: {
            		typeName: "sharefood.models.activity.activity.entity.SaleActivityData"
                },
                activityType: 'SALE',
                beginTime: null,
                endTime: null,
                activityName: null,
                isValid: true
            },
            specificActivity: {
            	activityContent: {
                	typeName: "sharefood.models.activity.activity.entity.SpecificActivityData",
                    content: {
                    	activityName:""
                    }
                },
                activityType: "SPECIFIC",
                beginTime: null,
	            endTime: null,
	            activityName: null,
                isValid: true
            }
        }
    },
    methods:{
    	addDelGold(){
    		if(this.activityObj.length < 5){
    			this.activityObj.push({
	    			full:null,
	            	subtract:null
	    		})
	    	}else{
	    		this.$message({
                    type: 'error',
                    message: '不能超过5个'
                });
	    	}
    	},
    	delAddDelGold(index){
    		this.activityObj.splice(index, 1)
    	},
    	addDel(){
    		if(this.delgoldActivity.activityContent.delgolds.length < 5){
    			this.delgoldActivity.activityContent.delgolds.push({
	    			full:null,
	            	subtract:null
	    		})
	    	}else{
	    		this.$message({
                    type: 'error',
                    message: '不能超过5个'
                });
	    	}
    	},
    	delAddDel(index){
    		this.delgoldActivity.activityContent.delgolds.splice(index, 1)
    	},
    	async handleClick(item,index){
    		switch(item.activityType){
    			case 'FIRST':
    				this.firstActivity = item;
    				break;
    			case 'DELGOLD':
    				this.delgoldActivity = item;
    				break;
    			case 'COMPLIMENTARY':
    				this.complimentaryActivity = item;
    				break;
    			case 'SALE':
    				this.saleActivity = item;
    				break;
    			case 'SPECIFIC':
    				this.specificActivity = item;
    				break;
    		}
    		this.activityList[index].state = false;
    	},
    	async saveUpdateActivity(item,index){
    		switch(item.activityType){
    			case 'FIRST':
    				if(this.firstActivity.beginTime < this.firstActivity.endTime || !this.firstActivity.beginTime=="" && this.firstActivity.endTime == ""){
    					await updateActivityDetails(item.activityId,this.firstActivity)
    					this.$message({
		                    type: 'success',
		                    message: '保存成功'
		                });
    				}else{
    					this.$message({
		                    type: 'error',
		                    message: '开始时间不能小于结束时间'
		                });
    				}
    				break;
    			case 'DELGOLD':
    				if(this.delgoldActivity.beginTime < this.delgoldActivity.endTime || !this.delgoldActivity.beginTime=="" && this.delgoldActivity.endTime == ""){
    					await updateActivityDetails(item.activityId,this.delgoldActivity)
    					this.$message({
		                    type: 'success',
		                    message: '保存成功'
		                });
    				}else{
    					this.$message({
		                    type: 'error',
		                    message: '开始时间不能小于结束时间'
		                });
    				}
    				break;
    			case 'COMPLIMENTARY':
    				if(this.complimentaryActivity.beginTime < this.complimentaryActivity.endTime || !this.complimentaryActivity.beginTime=="" && this.complimentaryActivity.endTime == ""){
    					await updateActivityDetails(item.activityId,this.complimentaryActivity)
    					this.$message({
		                    type: 'success',
		                    message: '保存成功'
		                });
    				}else{
    					this.$message({
		                    type: 'error',
		                    message: '开始时间不能小于结束时间'
		                });
    				}
    				break;
    			case 'SALE':
    				if(this.saleActivity.beginTime < this.saleActivity.endTime || !this.saleActivity.beginTime=="" && this.saleActivity.endTime == ""){
    					await updateActivityDetails(item.activityId,this.saleActivity)
    					this.$message({
		                    type: 'success',
		                    message: '保存成功'
		                });
    				}else{
    					this.$message({
		                    type: 'error',
		                    message: '开始时间不能小于结束时间'
		                });
    				}
    				break;
    			case 'SPECIFIC':
    				if(this.specificActivity.beginTime < this.specificActivity.endTime || !this.specificActivity.beginTime=="" && this.specificActivity.endTime == ""){
    					await updateActivityDetails(item.activityId,this.specificActivity)
    					this.$message({
		                    type: 'success',
		                    message: '保存成功'
		                });
    				}else{
    					this.$message({
		                    type: 'error',
		                    message: '开始时间不能小于结束时间'
		                });
    				}
    				break;
    		}
    		this.activityList[index].state = true
    		this.getActivitys()
    	},
    	cancelActivity(index){
    		this.activityList[index].state = true
    		this.getActivitys()
    	},
    	currentChange: function(val) {
            this.params.pageId = val;
            this.getActivitys()
        },
        closeAddDialog(){
        	this.typeName = ""
	        this.couponCount = ""
	        this.couponId = ""
	        this.full = ""
            this.beginTime = ''
            this.endTime = ''
            this.money = ""
            this.activityName = ""
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
    		if(res.count === 0){
    			this.isEmpty = true
    		}else{
    			this.isEmpty = false
    			let data = res.list
	    		let state = {state:true}
	    		this.activityList = data.map((item) =>{
	    			return {...item,...state}
	    		})
    		}
        },
        //删除店铺活动
        deleteActivitys(activityId){
        	this.$confirm('此操作将删除该活动, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	        	deleteActivity(activityId).then(() => {
	        		this.getActivitys()
	        	})
	          this.$message({
	            type: 'success',
	            message: '删除成功!'
	          });
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
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
					return 'type-1';
				case 'DELGOLD':
					return 'type-2'
				case 'COMPLIMENTARY':
					return 'type-3';
				case 'SALE':
					return 'type-4'
				case 'SPECIFIC':
					return 'type-5';
			}
		},
		//增加店铺活动
		async addActivitys(){
			var activityParams = {}
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
		        if(this.beginTime < this.endTime || !this.beginTime=="" && this.endTime == ""){
		        	await addActivity(activityParams)
					this.addDialog = false
					this.getActivitys()
					this.typeName = ""
			        this.couponCount = ""
			        this.couponId = ""
			        this.full = ""
		            this.beginTime = ''
		            this.endTime = ''
		        }else{
		        	this.$message({
	                    type: 'error',
	                    message: '开始时间不能小于结束时间'
	                });
		        }
			}else if(this.value == 2 && !this.money==""){
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
	            if(this.beginTime < this.endTime || !this.beginTime=="" && this.endTime == ""){
		        	await addActivity(activityParams)
		            this.addDialog = false
					this.getActivitys()
					this.money=""
					this.beginTime = ''
		            this.endTime = ''
		        }else{
		        	this.$message({
	                    type: 'error',
	                    message: '开始时间不能小于结束时间'
	                });
		        }
			}else if(this.value == 3){
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
	            if(this.beginTime < this.endTime || !this.beginTime=="" && this.endTime == ""){
		        	await addActivity(activityParams)
					this.addDialog = false
					this.getActivitys()
			        this.full = ""
			        this.activityObj = [{
			        	full:null,
		            	subtract:null
			        }]
		            this.beginTime = ''
		            this.endTime = ''
		        }else{
		        	this.$message({
	                    type: 'error',
	                    message: '开始时间不能小于结束时间'
	                });
		        }
			}else if(this.value == 4 && !this.activityName == ""){
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
	            if(this.beginTime < this.endTime || !this.beginTime=="" && this.endTime == ""){
		        	await addActivity(activityParams)
		            this.addDialog = false
					this.getActivitys()
					this.activityName=""
					this.beginTime = ''
		            this.endTime = ''
		        }else{
		        	this.$message({
	                    type: 'error',
	                    message: '开始时间不能小于结束时间'
	                });
		        }
			}else if(this.value == 5 && !this.activityName == ""){
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
				if(this.beginTime < this.endTime || !this.beginTime=="" && this.endTime == ""){
		        	await addActivity(activityParams)
		            this.addDialog = false
					this.getActivitys()
					this.activityName=""
					this.beginTime = ''
		            this.endTime = ''
		        }else{
		        	this.$message({
	                    type: 'error',
	                    message: '开始时间不能小于结束时间'
	                });
		        }
			}else{
				this.$message({
                    type: 'error',
                    message: '信息不完整，请填写完整'
                });
			}
		},
		saveGoodsAdministration(){
			var id = this.activityId
   			this.hasError = false;
        	var params = {}
        	this.goodsLists.forEach((item) => {
        		if(item.isActivity){
                    params[item.goodsId] = {
                        goodsId: +item.goodsId,
                        activityId: +this.activityId,
                        discount: +item.discount,
                        limitedQuantity: +item.limitation
                    }
                }
        	})
        	setActivityGoods(id,params).then(res => {
        		this.goodsAdministration = false
        		this.goodsLists = []
        		getGoodsLists({params:{pageSize:9999}}).then(res =>{
					res.list.forEach((item,index) => {
		            	this.goodsLists.push({
		            		goodsName: item.goodsName,
		            		goodsId: item.goodsId,
			        		goodsPrice: item.goodsPrice,
		            		discount:  item.activityGoods ? item.activityGoods.discount : null,
		            		limitation: item.activityGoods ? item.activityGoods.limitedQuantity : null,
		            		isActivity: item.activityGoods ? true : false,
		            	})
		            })
				})
        	})
		},
		updateGoodsAdministration(activityId){
			this.goodsAdministration = true
			this.activityId = activityId
		},
		closeGoodsAdministration(){
			this.goodsAdministration = false
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
		color: #239a1e
	}
	.type-2{
		color: #ffa71d
	}
	.type-3{
		color: #f65a99
	}
	.type-4{
		color:#348ee0
	}
	.type-5{
		color:#9d55d0
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
	.img-center{
		text-align: center;
	}
</style>