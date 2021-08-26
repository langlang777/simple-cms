import wlRequest from '../../index'
import { IDataType } from '@/service/type'

export function getPageListData(url: string, queryInfo: any) {
  return wlRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

export function deletePageData(url: string) {
  return wlRequest.delete<IDataType>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return wlRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return wlRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
