import { ref } from 'vue'
import PageContent from '@/components/page-content'

export function usePageSearch() {
  const pagecontentRef = ref<InstanceType<typeof PageContent>>()
  // 点击重置按钮
  const handResetClick = () => {
    pagecontentRef.value?.getPageData()
  }
  // 点击搜索按钮
  const handQueryClick = (queryInfo: any) => {
    // 调用 ref 绑定组件里面的 函数
    const data = { ...queryInfo }

    console.log('点击搜索')
    pagecontentRef.value?.getPageData(data)
  }
  return [handResetClick, handQueryClick, pagecontentRef]
}
