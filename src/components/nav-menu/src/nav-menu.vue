<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">Vue3+Ts</span>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertiacl"
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <!-- 遍历服务器传回的菜单 -->
      <template v-for="item in userMenus" :key="item.id">
        <!-- type=1 说明 可以展开 -->
        <template v-if="item.type === 1">
          <el-submenu :index="item.id + ''">
            <template #title
              ><i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历展开里面的菜单 -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!-- type=1 说明 不可以展开 -->
        <template v-else-if="type === 2">
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
// import {useStore} from 'Vuex'
import { useStore } from '@/store' // 通过直接自己定义返回有类型的 useStore
import { useRouter } from 'vue-router'
export default defineComponent({
  props: {
    collapse: {
      // 接受 main.vue 传来的值 然后给 el-menu :collapse
      type: Boolean,
      default: false
    }
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    const userMenus = computed(() => store.state.login.userMenus)
    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? '/not-fount'
      })
    }
    return {
      userMenus,
      handleMenuItemClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
