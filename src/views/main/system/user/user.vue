<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handResetClick"
      @queryBtnClick="handQueryClick"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      :pageName="pageName"
      ref="pagecontentRef"
      @editBtnClick="handleEditData"
      @newBtnClick="handleNewData"
    ></page-content>
    <page-model
      :defaultInfo="defaultInfo"
      :pageName="pageName"
      :modelConfig="modalConfigRef"
      ref="pageModelRef"
    ></page-model>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModel from '@/components/page-model'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModel } from '@/hooks/use-page-model'

import { modelConfig } from './config/model.config'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent,
    PageModel
  },

  setup() {
    const pageName = 'users'
    // const pagecontentRef = ref<InstanceType<typeof PageContent>>()
    // const handResetClick = () => {
    //   pagecontentRef.value?.getPageData()
    // }
    // // 点击搜索按钮
    // const handQueryClick = (queryInfo: any) => {
    //   // 调用 ref 绑定组件里面的 函数
    //   console.log('点击搜索')
    //   pagecontentRef.value?.getPageData(queryInfo)
    // }
    const newCallBack = () => {
      const passwordItem = modelConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCallBack = () => {
      const passwordItem = modelConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }

    // 动态添加部门和角色
    const store = useStore()
    const modalConfigRef = computed(() => {
      const departmentItem = modelConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })

      const roleItem = modelConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modelConfig
    })

    // 调用hook获取公共变量
    const [handResetClick, handQueryClick, pagecontentRef] = usePageSearch()
    const [handleEditData, handleNewData, pageModelRef, defaultInfo] =
      usePageModel(newCallBack, editCallBack)

    return {
      pageName,
      pagecontentRef,
      searchFormConfig,
      contentTableConfig,
      handQueryClick,
      handResetClick,
      handleEditData,
      handleNewData,
      modalConfigRef,
      pageModelRef,
      defaultInfo
    }
  }
})
</script>

<style scoped></style>
