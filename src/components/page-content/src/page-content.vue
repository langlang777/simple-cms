<template>
  <div class="page-content">
    <wltable
      v-bind="contentTableConfig"
      :dataList="userList"
      :dataCount="userCount"
      v-model:page="pageInfo"
    >
      <!-- 给v-model起名 modelValue -> page  update：modelvalue -> update：page -->
      <template #headerHandler>
        <el-button
          type="primary"
          size="mini"
          v-if="isCreate"
          @click="handleNewClick"
          >新建用户</el-button
        >
      </template>
      <!-- 下面是 列里面的插槽 -->
      <!-- 将 名字为status的 插槽 等于 scope（可以随便取名），这操作可以拿到 slot 传出来的数据 -->
      <template #status="scope">
        <!-- <div>{{ scope }}</div> -->
        <el-button
          plain
          size="mini"
          :type="scope.data.enable ? 'success' : 'danger'"
        >
          {{ scope.data.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>
          {{ $filters.formatTime(scope.data.createAt) }}
        </span>
      </template>
      <template #updateAt="scope">
        <span>
          {{ $filters.formatTime(scope.data.createAt) }}
        </span>
      </template>
      <template #handler="scope">
        <div class="handler-btns">
          <el-button
            icon="el-icon-edit"
            size="mini"
            type="text"
            v-if="isUpdate"
            @click="handleEditclick(scope.data)"
            >编辑</el-button
          >
          <el-button
            icon="el-icon-delete"
            size="mini"
            type="text"
            v-if="isDelete"
            @click="handleDeleteClick(scope.data)"
            >删除</el-button
          >
        </div>
      </template>
      <!-- 动态插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <slot :name="item.slotName" :data="scope.data"></slot>
      </template>
    </wltable>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { defineComponent, computed, ref, watch } from 'vue'
import wltable from '@/base-ui/table'
import { usePermission } from '@/hooks/use-permission'

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    wltable
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    // 双向绑定 pageInfo currentPage 当前页数，pageSize 一页显示多少
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })

    // 当数据pageInfo 改变 重新请求数据
    watch(pageInfo, () => getPageData())

    // 获取用户权限
    const isQuery = usePermission(props.pageName, 'query')
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')

    // 请求数据
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }

    getPageData()

    // 从vuex 获取数据
    const userList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    console.log(userList)

    const userCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )
    //获取动态插槽
    const otherPropSlots = props.contentTableConfig?.titleList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )
    // console.log(otherPropSlots)

    // 删除，新增，编辑操作
    const handleDeleteClick = (item: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    const handleEditclick = (item: any) => {
      emit('editBtnClick', item)
    }

    return {
      userList,
      userCount,
      getPageData,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleNewClick,
      handleEditclick
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 0 40px;
  border-top: 20px solid #f5f5f5;
}
</style>
