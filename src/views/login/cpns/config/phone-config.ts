export const rules = {
  // 数组里面用对象定义多个规则
  phonenumber: [
    {
      required: true, // 要求必传
      message: '手机号必须填写~', // 未填写时 提示
      trigger: 'blur' // 失去焦点时验证
    },
    {
      pattern: /^[0-9]{11}$/, //正则验证
      message: '手机号必须是11位数字~',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true, // 要求必传
      message: '验证码必须填写~', // 未填写时 提示
      trigger: 'blur' // 失去焦点时验证
    }
  ]
}
