<template>
    <el-row class="right_width">
    	<el-form>
			  <el-form-item label="营业状态">
			    <el-select v-model="business" placeholder="请选择营业状态" class="input_width">
			      <el-option label="营业中" value="1"></el-option>
			      <el-option label="未营业" value="2"></el-option>
			    </el-select>
			  </el-form-item>
			</el-form>
			<p class="title">门店基本信息</p>
			<el-form>
				<el-form-item label="门店头像">
					<el-upload
					  class="avatar-uploader"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="imageUrl" :src="imageUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<div class="notes">
						<i class="el-icon-warning icon_color"></i>
			    	<span class="fontColor">仅支持JPG，PNG格式，文件小于1M</span>
					</div>
					<el-button type="success" class="button">同意并保存</el-button>
				</el-form-item>
			  <el-form-item label="门店名称">
			    <el-input placeholder="请输入内容" class="input_width" auto-complete="off"></el-input>
			    <i class="el-icon-warning icon_color"></i>
			    <span class="fontColor">更改门店名称，系统将再次审核~</span>
			  </el-form-item>
			  <el-form-item label="门店地址">
			    <el-input placeholder="请输入内容" class="input_width" auto-complete="off"></el-input>
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
				      step: '00:15',
				      end: '24:00'
				    }">
				  </el-time-select>
				  <i class="el-icon-minus"></i>
				  <el-time-select
				    placeholder="结束时间"
				    v-model="endTime"
				    :picker-options="{
				      start: '00:00',
				      step: '00:15',
				      end: '24:00',
				      minTime: startTime
				    }">
  				</el-time-select>
  				<el-button type="success" class="button">同意并保存</el-button>
			  </el-form-item>
			  <el-form-item label="联系电话" >
			    <el-input placeholder="请输入联系电话" class="input_width"></el-input>
			  </el-form-item>
			  <el-form-item label="营业类型">
			    <el-select v-model="businessType" placeholder="请选择配送方式" class="input_width">
			      <el-option label="预定" value="11"></el-option>
			      <el-option label="外卖" value="12"></el-option>
			      <el-option label="预定+外卖" value="13"></el-option>
			    </el-select>
			  </el-form-item>
			</el-form>
			<p class="title">配送设置</p>
			<el-form>
			  <el-form-item label="配送方式">
			    <el-select v-model="distribution" placeholder="请选择配送方式" class="input_width">
			      <el-option label="商家自行送至" value="21"></el-option>
			      <el-option label="蜂鸟专送" value="22"></el-option>
			    </el-select>
			    <i class="el-icon-warning icon_color"></i>
			    <span class="fontColor">更改门店地址，系统将再次审核~</span>
			    <el-button type="success" class="button">同意并保存</el-button>
			  </el-form-item>
			</el-form>
    </el-row>
</template>
<script>
export default {
    data: function() {
        return {
          startTime: '',
        	endTime: '',
        	business:'',
        	distribution:'',
        	businessType:'',
        	imageUrl: ''
        }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt1M = file.size / 1024 / 1024 < 1;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt1M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
        }
        return isJPG && isLt1M;
      }
    }
}
</script>
<style>
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