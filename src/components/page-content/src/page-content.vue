<template>
  <div class="page-content">
    <wltable v-bind="contentTableConfig" :dataList="userList">
      <template #headerHandler>
        <el-button type="primary" size="mini">新建用户</el-button>
      </template>
      <!-- 下面是 列里面的插槽 -->
      <!-- 将 名字为status 插槽 等于 scope（可以随便取名），这操作可以拿到 slot 传出来的数据 -->
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
      <template #handler>
        <div class="handler-btns">
          <el-button icon="el-icon-edit" size="mini" type="text"
            >编辑</el-button
          >
          <el-button icon="el-icon-delete" size="mini" type="text"
            >删除</el-button
          >
        </div>
      </template>
    </wltable>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { defineComponent, computed } from 'vue'
import wltable from '@/base-ui/table'
export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      require: true
    }
  },
  components: {
    wltable
  },
  setup(props) {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    const userList = computed(() => store.state.system.userList)
    console.log(userList)

    const userCount = computed(() => store.state.system.userCount)
    return {
      userList
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
