export const rules = {
  // 数组里面用对象定义多个规则
  name: [
    {
      required: true, // 要求必传
      message: '用户名必须填写~', // 未填写时 提示
      trigger: 'blur' // 失去焦点时验证
    },
    {
      pattern: /^[a-z0-9]{5,12}$/, //正则验证
      message: '用户名必须是5-10个字母或数字~',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true, // 要求必传
      message: '密码必须填写~', // 未填写时 提示
      trigger: 'blur' // 失去焦点时验证
    },
    {
      pattern: /^[a-z0-9]{6,16}$/, //正则验证
      message: '密码必须是6-16个字母或数字~',
      trigger: 'blur'
    }
  ]
}
