import { App } from 'vue'
import 'element-plus/lib/theme-chalk/base.css'
import {
  ElButton,
  ElTable,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubmenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar
} from 'element-plus'

const components = [
  ElButton,
  ElTable,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubmenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar
]
export default function (app: App): void {
  for (const cpn of components) {
    app.component(cpn.name, cpn)
  }
}
