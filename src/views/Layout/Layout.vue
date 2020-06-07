<template>
  <div class="layout">
    <el-container class="container">
      <el-header>
        <div class="name">
          <img :src="$img('heima.png')" alt="">
          <span>电商后台管理系统</span>
        </div>
        <div class="intro">
          <div class="username">
            <span class="iconfont icon-renxiang"></span>
            <span>{{uinfo.username}}</span>
          </div>
          <el-button type="info" @click="logout">退出</el-button>
        </div>
      </el-header>
      <!-- 页面主体区域 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse-transition="false"
          :collapse="isCollapse"
          :default-active="activePath"
          router
          >
            <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
              <template slot="title">
                <i :class="iconsObj[item.id]"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item :index="'/' + it.path" v-for="it in item.children" :key="it.id"  @click="saveNavState('/' + it.path)">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{it.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 右侧内容主体-->
        <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      // 左侧菜单数据
      menulist: [],
      // 是否折叠
      isCollapse: false,
      activePath: '',
      iconsObj: {
        '125': 'iconfont icon-renxiang',
        '103': 'iconfont icon-quanxian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-dingdan',
        '145': 'iconfont icon-shuju'
      }
    }
  },
  methods: {
    logout () {
      window.localStorage.clear()
      this.$router.push('/login')
    },
    getMenuList () {
      this.$api.get('menus').then(res => {
        if (res.data.meta.status == 200) {
          this.menulist = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath = activePath
    },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  },
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  computed: {
    ...mapGetters(['uinfo'])
  }
}
</script>

<style lang="scss" scoped>
.layout{
  width: 100%;
  height: 100%;
  .container{
    height: 100%;
  }
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  .name {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
  .intro{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .username{
      margin-right: 15px;
      background-color: #ecf5ff;
      border-color: #d9ecff;
      display: inline-block;
      height: 32px;
      padding: 0 10px;
      line-height: 30px;
      font-size: 12px;
      color: #409EFF;
      border-width: 1px;
      border-style: solid;
      border-radius: 4px;
      box-sizing: border-box;
      white-space: nowrap;
      span{
        &:first-child{
          padding-right: 5px;
        }
      }
    }
  }
}
.el-aside{
  background: #333744;
  .el-menu{
    border: none;
  }
}
.el-submenu__title i {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>