import { IloginState } from './login/type'
import { ISystemState } from './main/system/type'
export interface IRootstate {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entirMenu: any[]
}

export interface IRootWithModule {
  // 这里放模块的类型
  login: IloginState
  system: ISystemState
}

// 将这两个的类型合并起来
export type IStoreType = IRootWithModule & IRootstate
