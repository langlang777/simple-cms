import { IForm } from '@/base-ui/form'

export const modelConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'password',
      type: 'password',
      label: '用户密码',
      placeholder: '请输入用户密码',
      isHidden: false
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      field: 'departmentId',
      type: 'select',
      label: '用户部门',
      placeholder: '请选择用户部门',
      options: []
    },
    {
      field: 'roleId',
      type: 'select',
      label: '用户角色',
      placeholder: '请选择用户角色',
      options: []
    }
  ],
  colLayout: { span: 24 }
}
