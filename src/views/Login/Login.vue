<template>
  <div class="login">
    <div class="login_box">
      <div class="avatar_box">
        <img :src="$img('logo.png')" alt="">
      </div>
      <el-form :model="loginForm" :rules="rules" ref="formRefs" class="login_form">
        <el-form-item prop="username">
          <el-input v-model.trim="loginForm.username" prefix-icon="iconfont icon-renxiang"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model.trim="loginForm.password" prefix-icon="iconfont icon-42" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      this.$refs.formRefs.resetFields()
    },
    login () {
      this.$refs.formRefs.validate(async valid => {
        if (valid) {
          const {data: res} = await this.$api.post('login',this.loginForm)
          if (res.meta.status != 200) return this.$message.error('登录失败！')
          this.$message.success('登录成功')
          sessionStorage.setItem('access_token',res.data.token)
          sessionStorage.setItem('uinfo',JSON.stringify(res.data))
          this.$store.commit('UINFO',res.data)
          this.$store.commit('TOKEN',res.data.token)
          this.$router.push('/')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  width: 100%;
  height: 100%;
  background-color: #2b4b6b;
  position: relative;
}
.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form{
  position:absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns{
  display: flex;
  justify-content:space-around;
}
</style>