<template>
    <el-row class="right_width" v-loading="loading">
    	<el-form>
			  <el-form-item label="营业状态">
			  	<el-button type="success" class="button" @click="saveOperatingState">同意并保存</el-button>
			    <el-select v-model="business" placeholder="请选择营业状态" class="input_width">
			      <el-option v-for="(item,index) in businessOptions" :key="index" :label="item.label" :value="item.value"></el-option>
			    </el-select>
			  </el-form-item>
			</el-form>
			<p class="title">门店基本信息</p>
			<el-form>
			  <el-form-item label="门店名称">
			  	<el-button type="success" class="button" disabled>同意并保存</el-button>
			    <el-input placeholder="请输入内容" v-model="shopName" class="input_width" auto-complete="off" disabled></el-input>
			    <i class="el-icon-warning icon_color"></i>
			    <span class="fontColor">更改门店名称，系统将再次审核~</span>
			  </el-form-item>
			  <el-form-item label="门店地址">
			    <el-input placeholder="请输入内容" v-model="address" class="input_width" auto-complete="off" disabled></el-input>
			    <i class="el-icon-warning icon_color"></i>
			    <span class="fontColor">更改门店地址，系统将再次审核~</span>
			  </el-form-item>
			</el-form>
			<p class="title">营业设置</p>
			<el-form>
				<el-form-item label="营业时间" >
			   	<el-time-select
				    placeholder="起始时间"
				    v-model="startTime"
				    :picker-options="{
				      start: '00:00',
				      step: '00:30',
				      end: '24:00'
				    }">
				  </el-time-select>
				  <i class="el-icon-minus"></i>
				  <el-time-select
				    placeholder="结束时间"
				    v-model="endTime"
				    :picker-options="{
				      start: '00:00',
				      step: '00:30',
				      end: '24:00',
				      minTime: startTime
				    }">
  				</el-time-select>
  				<el-button type="success" class="button"  @click="savePhoneAndTime">同意并保存</el-button>
			  </el-form-item>
			  <el-form-item label="联系电话" >
			    <el-input placeholder="请输入联系电话" class="input_width" v-model="takeOutPhone"></el-input>
			  </el-form-item>
			  <el-form-item label="营业类型">
			    <el-select v-model="shopType" placeholder="请选择配送方式" class="input_width" disabled>
			      <el-option label="预定" value="RESERVE"></el-option>
			      <el-option label="外卖" value="TAKEOUT"></el-option>
			      <el-option label="预定+外卖" value="RESERVE_TAKEOUT"></el-option>
			    </el-select>
			  </el-form-item>
			</el-form>
			<p class="title">金额设置</p>
			<el-form>
			  <el-form-item label="配送最小金额">
			  	<el-button type="success" class="button" @click="saveMinMoneyAddDrawInvoice">同意并保存</el-button>
			    <el-input placeholder="请输入最小配送金额" v-model="minDeliveryPrice" class="input_width" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="是否允许开票">
			   	<el-select v-model="canDrawInvoice" placeholder="请选择是否允许开票" class="input_width">
			   		<el-option label="是" value="true"></el-option>
			      <el-option label="否" value="false"></el-option>
			    </el-select>
			  </el-form-item>
			</el-form>
			<p class="title">配送设置</p>
			<el-form>
			  <el-form-item label="配送方式">
			    <el-select v-model="distributionType" placeholder="请选择配送方式" class="input_width" disabled>
			      <el-option label="商家自行送至" value="SELF_DELIVERY_BY_MERCHANTS"></el-option>
			      <el-option label="蜂鸟专送" value="ANUBIS"></el-option>
			      <el-option label="蜂鹰配送" value="ARES"></el-option>
			    </el-select>
			    <i class="el-icon-warning icon_color"></i>
			    <span class="fontColor">更改配送方式，系统将再次审核~</span>
			    <el-button type="success" class="button" disabled>同意并保存</el-button>
			  </el-form-item>
			</el-form>
			<p class="title">接单设置</p>
			<el-form>
			  <el-form-item label="接单方式">
			    <el-select v-model="automaticAcceptOrder" placeholder="请选择接单方式" class="input_width">
			      <el-option label="自动接单" value="true"></el-option>
			      <el-option label="手动接单" value="false"></el-option>
			    </el-select>
			    <el-button type="success" class="button" @click="saveReceiveOrderType">同意并保存</el-button>
			  </el-form-item>
			</el-form>
    </el-row>
</template>
<script>
import { getShopDetails , openShop , closeShop , updateBusTime , updateTakeOutPhone , updateMinDeliveryPrice , openDrawInvoice , closeDrawInvoice , updateDistributionType , updateShopType , autoReceiveOrder ,handReceiveOrder} from "@/api/api"
export default {
		created(){
  		getShopDetails().then(res => {
  			console.log(res)
  			if(res.operatingState){
  				this.business = "营业中"
  			}else{
  				this.business = "歇业中"
  			}
  			this.shopName = res.shopName;
  			this.address = res.address;
  			this.takeOutPhone = res.takeOutPhone;
  			this.startTime = res.busBeginTime;
  			this.endTime = res.busEndTime;
  			this.shopType = res.shopType;
  			this.distributionType = res.distributionType;
  			this.minDeliveryPrice = res.minDeliveryPrice;
  			if(res.canDrawInvoice){
  				this.canDrawInvoice = "是"
  			}else{
  				this.canDrawInvoice = "否"
  			}
  			// this.automaticAcceptOrder = res.automaticAcceptOrder
  			if(res.automaticAcceptOrder){
  				this.automaticAcceptOrder = "自动接单"
  			}else{
  				this.automaticAcceptOrder = "手动接单"
  			}
  			this.loading = false
  		})
  	},
    data() {
        return {
          startTime: '',
        	endTime: '',
        	business:'',
        	distributionType:'',
        	shopType:'',
        	shopName:"",
        	address:"",
        	takeOutPhone:"",
        	minDeliveryPrice:"",
        	canDrawInvoice:"",
        	automaticAcceptOrder:"",
        	loading:true,
        	businessOptions:[{
        		label:"营业中",
        		value:"true"
        	},{
        		label:"歇业中",
        		value:"false"
        	}]
        }
    },
    methods: {
      async saveOperatingState(){
      	if(this.business == "true"){
      		const data = await openShop()
      		if(data){
	      		this.$message({
	            type: 'success',
	            message: '修改成功!'
	          })
	      	}else{
	      		this.$message({
	            type: 'info',
	            message: '修改失败!'
	          })
	      	}
      	}else if(this.business == "false"){
      		const data = await closeShop()
      		if(data){
	      		this.$message({
	            type: 'success',
	            message: '修改成功!'
	          })
	      	}else{
	      		this.$message({
	            type: 'info',
	            message: '修改失败!'
	          })
	      	}
      	}
      },
      async savePhoneAndTime(){
      	let params = {
      		busBeginTime:this.startTime,
      		busEndTime:this.endTime
      	}
      	await updateBusTime(params)
      	const data = await updateTakeOutPhone(this.takeOutPhone)
      	if(data){
      		this.$message({
            type: 'success',
            message: '修改成功!'
          })
      	}else{
      		this.$message({
            type: 'info',
            message: '修改失败!'
          })
      	}
      },
      async saveMinMoneyAddDrawInvoice(){
      	if(this.canDrawInvoice == "true"){
      		await openDrawInvoice()
      	}else if(this.canDrawInvoice == "false"){
      		await closeDrawInvoice()
      	}
      	const data = await updateMinDeliveryPrice(this.minDeliveryPrice)
      	if(data){
      		this.$message({
            type: 'success',
            message: '修改成功!'
          })
      	}else{
      		this.$message({
            type: 'info',
            message: '修改失败!'
          })
      	}
      },
      async saveReceiveOrderType(){
      	if(this.automaticAcceptOrder == "true"){
      		const data = await autoReceiveOrder()
      		if(data){
	      		this.$message({
	            type: 'success',
	            message: '修改成功!'
	          })
	      	}else{
	      		this.$message({
	            type: 'info',
	            message: '修改失败!'
	          })
	      	}
      	}else if(this.automaticAcceptOrder == "false"){
      		const data = await handReceiveOrder()
      		if(data){
	      		this.$message({
	            type: 'success',
	            message: '修改成功!'
	          })
	      	}else{
	      		this.$message({
	            type: 'info',
	            message: '修改失败!'
	          })
	      	}
      	}
      }
    }
}
</script>
<style scoped>
	.input_width{
		width: 360px;
	}
	.icon_color{
		margin-left: 14px;
		color: #ea9518;
	}
	.fontColor{
		color: #959595;
	}
	.right_width{
		width: 940px;
	}
	.content-container{
		overflow-y: visible;
	}
	.el-form{
		padding: 14px 14px 14px 25px;
		background-color: #ffffff 
	}
	.title{
		padding: 14px 14px 14px 25px;
		background-color: #f0eff6;
		margin: 0;
	}
	.button{
		position: absolute;
    top: 0;
    right: 0;
	}
	.el-form-item__label{
		margin-right: 20px
	}
	.notes{
		position: absolute;
		top: 40px;
		left:230px;
	}
	.el-form-item__content{
		line-height: normal;
	}
	.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>