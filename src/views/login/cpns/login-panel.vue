<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" :stretch="true" v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone ref="phoneRef"></login-phone>
      </el-tab-pane>
    </el-tabs>
    <el-button type="primary" class="btn-login" @click="loginClick">
      立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    // ref 在 setup 里面拿值 需要 .value  在模板里面不需要
    const currentTab = ref('account') // 这个属性记录目前选中是 账户登录(默认) 还是 手机登录
    const accountRef = ref<InstanceType<typeof LoginAccount>>() // 拿到 login-account组件对象
    const phoneRef = ref<InstanceType<typeof LoginPhone>>() // 拿到 login-phone组件对象

    const loginClick = () => {
      if (currentTab.value === 'account') {
        console.log('点击登录~')
        // 拿到LoginAccount组件里面的方法
        accountRef.value?.accountLogin(accountRef.value?.isKeepPassword)
      } else {
        console.log('调用login-phone组件里面的验证逻辑')
      }
    }
    return {
      loginClick,
      accountRef,
      phoneRef,
      currentTab
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;
  .title {
    text-align: center;
  }
}
.btn-login {
  width: 100%;
}
/deep/.el-tabs--border-card > .el-tabs__content {
  padding-bottom: 0px;
}
</style>
