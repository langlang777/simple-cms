import wlRequest from '../index' //拿到创建的网络请求实例
import { IAccount, ILoginResult } from './type'
import { IDataType } from '@/service/type'

// 定义一个枚举
enum LoginAPI {
  AccoutLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  return wlRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccoutLogin,
    data: account,
    showLoading: true
  })
}

export function requestUserInfoById(id: number) {
  return wlRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id
  })
}

export function requestUserMenusByRoleId(id: number) {
  return wlRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
