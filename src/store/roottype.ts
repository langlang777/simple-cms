import { IloginState } from './login/type'

export interface IRootstate {
  name: string
  age: number
}

export interface IRootWithModule {
  // 这里放模块的类型
  login: IloginState
}

// 将这两个的类型合并起来
export type IStoreType = IRootWithModule & IRootstate
