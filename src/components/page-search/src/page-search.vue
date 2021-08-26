<template>
  <div class="page-sreach">
    <hy-form v-bind="searchFormConfig" v-model="formData">
      <!-- v-model 绑定组件 相当于 给组件传了 ：model-value
    同时监听了 @update：model-value 这个事件
    这个事件 @update：model-value= ‘formDate= $even'
    会把事件传过来的值复制给 v-model绑定的 变量 -->
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh" @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HyForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      reuqired: true
    }
  },
  components: {
    HyForm
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // formData 应该由 配置决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOrginData: any = {}
    for (const item of formItems) {
      formOrginData[item.field] = ''
    }
    const formData = ref(formOrginData)

    // 用户点击重置
    const handleResetClick = () => {
      // for (const key in formOrginData) {
      //   formData.value[`${key}`] = formOrginData[key]
      // }
      formData.value = formOrginData
      emit('resetBtnClick')
    }
    // 用户点击搜索
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
