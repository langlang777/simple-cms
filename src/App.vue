<template>
  <div class="app">
    <el-config-provider :locale="locale">
      <router-view />
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { ElConfigProvider } from 'element-plus' //elme 组件显示中文
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    ElConfigProvider
  },
  setup() {
    return {
      locale: zhCn
    }
  }
})
</script>

<style scoped></style>
