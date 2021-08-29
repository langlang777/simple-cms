import wlRequest from '../../index'
import { IDataType } from '@/service/type'

enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsFavor = '/goods/category/favor',
  categoryGoodsSale = '/goods/category/sale',
  adderssGoodsSale = '/goods/address/sale'
}

export function getCategoryGoodsCount() {
  return wlRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsCount
  })
}

export function getCategoryGoodsFavor() {
  return wlRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsFavor
  })
}

export function getCategoryGoodsSale() {
  return wlRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsSale
  })
}

export function getAdderssGoodsSale() {
  return wlRequest.get<IDataType>({
    url: DashboardAPI.adderssGoodsSale
  })
}
