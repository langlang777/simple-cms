<template>
  <div class="login-phone">
    <el-form label-width="" :rules="rules" :model="phone">
      <el-form-item label="手机号" prop="phonenumber">
        <el-input v-model="phone.phonenumber" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code" />
          <el-button type="primary" class="btn-code">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { rules } from './config/phone-config'
export default defineComponent({
  setup() {
    const phone = reactive({
      phonenumber: '',
      code: ''
    })
    return {
      phone,
      rules
    }
  }
})
</script>

<style scoped lang="less">
.get-code {
  display: flex;
}
.btn-code {
  margin-left: 8px;
}

.el-tabs__content {
  padding: 1px;
}
</style>
