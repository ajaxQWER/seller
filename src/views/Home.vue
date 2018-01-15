<template>
    <el-row class="container">
        <el-row class="header">
            <el-col class="logo">
                <el-col :span="10" :class="collapsed?'logo-collapse-width':'logo-width'">
                    <router-link to="/index" class="router-link">
                        <img src="../assets/images/logo.png" alt="logo" class="logo-icon">
                        <span class="txt">商家中心</span>
                    </router-link>
                </el-col>
                <el-col :span="7" class="userinfo">
                    <el-dropdown trigger="click">
                        <div>
                            <img :src="UPLOADURL + '/shopLogo/' + shopId + '.png/shopLogo.png'" alt="" class="avator">
                            <span class="el-dropdown-link userinfo-inner">{{sysUserName}}</span>
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="(item,index) in shopList" :key="index" @click.native="changeShop(index)"><img :src="UPLOADURL + '/shopLogo/' + item.shopId + '.png/shopLogo.png'" alt="" width="30" height="30">{{item.shopName}}</el-dropdown-item>
                            <el-dropdown-item @click.native="updateSecretkey">修改密码</el-dropdown-item>
                            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-col>
        </el-row>
        <el-row class="main">
            <!--导航菜单-->
            <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
                <el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router v-if="!collapsed">
                    <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                        <!-- <el-submenu :index="index+''" v-if="!item.leaf">
                            <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
                        </el-submenu> -->
                        <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path" class="a"><i :class="item.iconCls" class="iconFont"></i>{{item.children[0].name}}</el-menu-item>
                    </template>
                </el-menu>
            </aside>
            <!-- 右侧视图 -->
            <section class="content-container">
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" class="content-wrapper">
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </el-col>
                </div>
            </section>
        </el-row>
        <el-row class="footer-bar">
            <p>鑫圆共享餐饮文化管理有限公司©2017 &nbsp; 蜀ICP备17032496号-4 <br><a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51019002001128" class="beian-link">
                <img src="../assets/images/beian-gov.png"/>川公网安备 51019002001128号</a>
            </p>
        </el-row>
        <!-- 修改密码 -->
        <el-dialog title="修改密码" :visible.sync="dialog" size="tiny" @close="closeDialog" class="dialog">
            <el-form :model="password" label-width="100px" ref="newVideo">
                <el-form-item label="原密码" prop="title">
                    <el-input type="password" v-model="password.oldSecretkey" auto-complete="off" placeholder="原密码"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="title">
                    <el-input type="password" v-model="password.secretkey" auto-complete="off" placeholder="新密码"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="update">确 定</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>
<script>
import {getShopLists , getRealtimestatistics , getOrderList} from '@/api/api'
// import { getRealtimestatisticsData,} from '@/views/index'
export default {
    created(){
        this.shopIdList = JSON.parse(localStorage.getItem('seller')).shopList
        this.getShopList()
        console.log(this.shopList)
    },
    data: function () {
        return {
            collapsed: false,
            shopId: 0,
            sysUserName: '',
            password: {
                oldSecretkey: '',
                secretkey: ''
            },
            dialog: false,
            shopIdList:null,
            shopList:[]
        }
    },
    methods: {
        //退出登录
        logout: function () {
            var _this = this;
            this.$confirm('确认退出吗?', '提示', {
                type: 'info'
            }).then(() => {
                this.clearStorage();
            }).catch(() => {

            });
        },
        clearStorage: function () {
            localStorage.removeItem('seller');
            localStorage.removeItem('jwt');
            this.$router.push('/login');
        },
        closeDialog: function () {
            this.password = {
                oldSecretkey: '',
                secretkey: ''
            }
        },
        cancel: function () {
            this.dialog = false;
        },
        updateSecretkey: function () {
            this.dialog = true;
        },
        update: function () {
            updatePwd(this.password).then(data => {
                this.$message({
                    message: '修改成功',
                    type: 'success'
                })
                this.dialog = false;
                this.clearStorage();
            })
        },
        async getShopList(){
            console.log(this.shopIdList)
            for(let i=0;i<this.shopIdList.length;i++){
                var data = await getShopLists();
                this.shopList = [...data];
            }
            console.log(this.shopList)
        },
        changeShop(index){
            // console.log(index)
            localStorage.setItem('shopId',JSON.parse(localStorage.getItem('seller')).shopList[index].shopId)
            localStorage.setItem('shopName',JSON.parse(localStorage.getItem('seller')).shopList[index].shopName)
            this.$router.go({
                path: '/index'
            });
        }
    },
    mounted: function () {
        var seller = localStorage.getItem('seller');
        var shopName = localStorage.getItem('shopName')
        var shopId = localStorage.getItem('shopId')
        if (seller) {
            seller = JSON.parse(seller);
            this.sysUserName = shopName || '';
            this. shopId = shopId
        }

    }
}
</script>
<style scoped lang="scss">
.container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .header {
        height: 60px;
        line-height: 60px;
        color: #fff;
        background-color: #11c15b;
        .userinfo {
            text-align: right;
            padding-right: 35px;
            float: right;
            .userinfo-inner {
                cursor: pointer;
                color: #fff;
                vertical-align: middle;
            }
        }
        .logo {
            width: 1200px;
            height: 60px;
            position: absolute;
            left: 50%;
            margin-left: -600px;
            font-size: 0;
            //border-color: rgba(238, 241, 146, 0.3);
            //border-right-width: 1px;
            //border-right-style: solid;
            .router-link {
                display: inline-block;
                width: 100%;
                height: 100%;
                padding: 0 20px;
                box-sizing: border-box;
                text-align: center;
                color: #fff;
                text-decoration: none;
            }
            .logo-icon{
                width: 54px;
                vertical-align: middle;
            }
            .txt {
                color: #fff;
                font-size: 16px;
                margin-left: 18px;
                border-left: 2px solid #fffffe;
                padding-left: 15px;
                vertical-align: middle;
            }
        }
        .avator{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            vertical-align: middle;
            cursor: pointer;
        }
        .logo-width {
            width: 231px;
        }
        .logo-collapse-width {
            width: 60px;
            padding: 0;
            text-align: center;
            .router-link {
                padding: 0;
            }
        }
        .tools {
            padding: 0px 23px;
            width: 14px;
            height: 60px;
            line-height: 60px;
            cursor: pointer;
        }
    }
    .main {
        width: 1200px;
        display: flex;
        //position: absolute;
        //left: 50%;
        margin: 0 auto;
        //top: 60px;
        //bottom: 0px;
        overflow: hidden;
        aside {
            flex: 0 0 230px;
            width: 230px;
            .el-menu {
                border-radius: 0;
                height: 800px;
                background-color: #fffffe;
            }
            .collapsed {
                width: 60px;
                background-color: #324157;
                .item {
                    position: relative;
                }
                .submenu {
                    position: absolute;
                    top: 0px;
                    left: 60px;
                    z-index: 99999;
                    height: auto;
                    display: none;
                }
            }
        }
        .menu-collapsed {
            flex: 0 0 60px;
            width: 60px;
        }
        .menu-expanded {
            flex: 0 0 230px;
            width: 230px;
            //background-color: #fffffe;
        }
        .icon-color {
            color: #bfcbd9;
        }
        .content-container {
            margin: 15px;
            //background-color: #fff;
            flex: 1;
            overflow-y: auto;
            //padding: 20px;
            .breadcrumb-container {
                .title {
                    width: 200px;
                    float: left;
                    color: #475669;
                }
                .breadcrumb-inner {
                    float: right;
                }
            }
            .content-wrapper {
                //background-color: #fff;
                box-sizing: border-box;
            }
        }
        .icon {
            color: #fff;
        }
    }
    .footer-bar{
        width: 100%;
        margin-top: 40px;
        text-align: center;
        background-color: #fff;
        p{
            color: #333;
            line-height: 1.5;
            .beian-link{
                text-decoration: none;
                color: #333;
                img{
                    vertical-align: middle;
                }
            }
        }
    }
}
.el-menu-item{
    border-left: 3px solid transparent;
}
.el-menu-item.is-active{
    color: #1eaa4d;
    background-color: #d8f3e0;
    border-left: 3px solid #0bb745;
}
.el-message-box__headerbtn {
    position: absolute;
    top: 19px;
    right: 20px;
    background: transparent;
    border: none;
    outline: none;
    padding: 0;
    cursor: pointer;
}
    .iconFont{
        padding-right: 5px;
    }
</style>
