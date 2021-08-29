import { ref } from 'vue'
import PageModel from '@/components/page-model'

type CallBackFn = (item?: any) => void

export function usePageModel(
  newCallBacl?: CallBackFn,
  editCallBack?: CallBackFn
) {
  const defaultInfo = ref({})
  const pageModelRef = ref<InstanceType<typeof PageModel>>()

  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    editCallBack && editCallBack(item)
  }
  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    newCallBacl && newCallBacl()
  }
  return [handleEditData, handleNewData, pageModelRef, defaultInfo]
}
