import wlRequest from '../../index'
import { IDataType } from '@/service/type'

export function getPageListData(url: string, queryInfo: any) {
  return wlRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
