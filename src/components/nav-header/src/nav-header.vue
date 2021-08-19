<template>
  <div class="nav-header">
    <i
      class="fold-menu"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldClick"
    ></i>
    <div class="content">
      <nav-bread-crumb :breadcrumbs="breadcrumbs"></nav-bread-crumb>
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './user-info.vue'
import NavBreadCrumb from '@/base-ui/breadcrumb'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
export default defineComponent({
  components: {
    UserInfo,
    NavBreadCrumb
  },
  emits: ['foldChange'], // 定义事件
  setup(props, { emit }) {
    const store = useStore()
    const route = useRoute()

    const breadcrumbs = computed(() => {
      const currentpath = route.path
      const userMenus = store.state.login.userMenus
      return pathMapBreadcrumbs(userMenus, currentpath)
    })

    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value) // 抛出事件 在main.vue 监听
    }
    return {
      breadcrumbs,
      isFold,
      handleFoldClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
    margin-top: 5px;
  }
  .content {
    display: flex;
    justify-content: space-between;
    flex: 1;
    align-items: center;
    padding: 0 20px;
  }
}
</style>
