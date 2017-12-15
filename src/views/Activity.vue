<template>
    <el-row>
		<el-row class="activityTitle">
			<p class="activitySize">活动设置</p>
			<p class="activityColor">活动设置活动设置活动设置活动设置活动设置活动设置活动设置活动设置活动设置</p>
		</el-row>
		<el-button class="addButton" size="small" type="success" @click="addActivity">添加活动</el-button>
		<el-row class="content">
			<div v-for="(item,index) in total">
				<el-row class="activityContent" v-if="item.state">
				<el-col :span="2">
					<img src="../assets/images/discount_03.png" height="66" width="69" class="imgP">
				</el-col>
				<el-col :span="19" :offset="1">
					<el-row>
						<span class="discountType">购满就送</span>
					</el-row>
					<el-row class="discount">
						<span>满100元送10元优惠券</span>
					</el-row>
					<el-row class="discount">
						<span>有效期：2017-01-01~2018-01-01</span>	
					</el-row>
				</el-col>
				<el-col :span="2">
					<el-row>
						<el-button type="text" @click="handleClick(index)">编辑</el-button>
	                    <el-button type="text">删除</el-button>
					</el-row>
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
		</el-row>
		<el-dialog :title="'添加活动'" :visible.sync="addDialog" size="tiny" @close="closeAddDialog" class="dialog">
			<el-button>默认按钮</el-button>
			<el-button>默认按钮</el-button>
			<el-button>默认按钮</el-button>
			<el-button>默认按钮</el-button>
			<el-button>默认按钮</el-button>
			<el-button>默认按钮</el-button>
            <el-form label-width="120px">
                <el-form-item label="活动名称">
                    <el-input></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeAddDialog">取 消</el-button>
                <el-button type="primary" @click="closeAddDialog" >确 定</el-button>
            </div>
        </el-dialog>
		<el-row>
            <el-col class="pagination">
                <el-pagination @current-change="currentChange" :current-page="params.pageId" :page-size="params.pageSize" layout=" prev, pager, next, jumper" :total="counts">
                </el-pagination>
            </el-col>
        </el-row>
	</el-row>
</template>

  

<script>
export default {
    data: function() {
        return {
        	params:{
        		pageId:1,
        		pageSize: 10,
        	},
        	addDialog:false,
        	counts:50,
            total:[{state:true},{state:true},{state:true},{state:true}]
        }
    },
    methods:{
    	handleClick(index){
    		this.total[index].state = false
    	},
    	saveUpdateActivity(index){
    		this.total[index].state = true
    	},
    	cancelActivity(index){
    		this.total[index].state = true
    	},
    	currentChange: function(val) {
            this.params.pageId = val;
        },
        closeAddDialog(){
        	this.addDialog = false
        },
        addActivity(){
        	this.addDialog = true
        }
    }
}
</script>
<style scoped>
	.addButton{
		border-radius: 20px;
		position: absolute;
		top:26px;
		right: 20px
	}
	.discountType{
		font-size: 16px;
		color: #ff7426
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
		margin-top: 10px
	}
	.saveUpdateActivity{
		margin-left: 150px
	}
</style>