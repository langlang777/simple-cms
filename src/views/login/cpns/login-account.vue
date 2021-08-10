<template>
  <div class="login-account">
    <el-form label-width="" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
    <div class="account-control">
      <el-checkbox class="rememberpassword" v-model="isKeepPassword"
        >记住密码</el-checkbox
      >
      <el-link type="primary" class="passwordlink">忘记密码</el-link>
    </div>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { rules } from './config/account-config' // rules 传到 el-form rules 属性
import localCache from '@/utils/cache'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()
    const formRef = ref<InstanceType<typeof ElForm>>() //拿到form 组件对象
    const account = reactive({
      //先看看本地缓存有的话取出 否则 设置为空
      name: localCache.getCache('name') ?? '', // v-model 绑定
      password: localCache.getCache('password') ?? ''
    })
    const isKeepPassword = ref(false) // 和 v-model 绑定

    const accountLogin = (isKeepPassword: boolean) => {
      //form组件对象 里面有个方法 可以验证表单 是否符合格式
      formRef.value?.validate((valid) => {
        // 符合时 valid 为TRUE
        // 1.判断是否需要记住密码
        if (valid) {
          if (isKeepPassword) {
            //如果勾选记住密码进行本地缓存
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            // 如果没有勾选记住密码则清空缓存
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          // 2.开始登录验证
          store.dispatch('login/acountLoginAction', { ...account })
        }
      })
    }
    return {
      formRef,
      isKeepPassword,
      account,
      rules,
      accountLogin
    }
  }
})
</script>

<style scoped lang="less">
.account-control {
  padding-bottom: 15px;
  display: flex;
  justify-content: space-between;
  /deep/.el-checkbox__label {
    font-size: 10px;
  }
}
.rememberpassword {
  margin-left: 10px;
}

.passwordlink {
  font-size: 10px;
}
</style>
