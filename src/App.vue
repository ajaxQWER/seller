<template>
	<div id="app">
		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>
<script>
export default {
	name: 'app'
}

</script>

<style lang="scss">
html{
	height: 100%;
	background-color: #f5f5f5;
}
body {
	height: 100%;
	margin: 0px;
	padding: 0px;
    background-size: cover;
	font-family: Microsoft YaHei, SimSun, sans-serif;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
}

#app {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
	background-color: #f5f5f5;
}

.el-submenu [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.el-menu-item [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.toolbar {
	background: #f2f2f2;
	padding: 10px;
	margin: 10px 0px;
	.el-form-item {
		margin-bottom: 10px;
	}
}
.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
.inline-form{
	display: inline-block;
	float: left;
}
</style>
