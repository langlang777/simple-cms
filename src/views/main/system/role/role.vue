<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      :pageName="pageName"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-model
      :modelConfig="modalConfig"
      pageName="role"
      ref="pageModelRef"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
    >
      <div class="menu-tree">
        <el-tree
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        >
        </el-tree>
      </div>
    </page-model>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store'

import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import PageModel from '@/components/page-model'

import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { modalConfig } from './config/modal.config'

import { usePageModel } from '@/hooks/use-page-model'

export default defineComponent({
  name: 'role',
  components: {
    PageContent,
    PageSearch,
    PageModel
  },
  setup() {
    const pageName = 'role'
    const store = useStore()
    const [handleEditData, handleNewData, pageModelRef, defaultInfo] =
      usePageModel()

    const menus = computed(() => store.state.entirMenu)
    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      // eltree自带选中监听 @check 会像函数传进两个值 data1: any, data2: any
      // console.log('data1:', data1)
      // console.log('data2:', data2)
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      pageName,
      contentTableConfig,
      searchFormConfig,
      modalConfig,
      handleEditData,
      handleNewData,
      pageModelRef,
      defaultInfo,
      menus,
      otherInfo,
      handleCheckChange
    }
  }
})
</script>

<style scoped>
.menu-tree {
  margin-left: 75px;
}
</style>
