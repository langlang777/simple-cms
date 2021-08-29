import * as echarts from 'echarts'

import chinaMapData from '../data/china.json' //导入地图数据
echarts.registerMap('china', chinaMapData)

export default function (el: HTMLElement) {
  // 1.初始化 echart 对象
  const echartInstance = echarts.init(el)
  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }

  const updatesize = () => {
    // 重新改变大小
    echartInstance.resize()
  }

  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  return {
    echartInstance,
    setOptions,
    updatesize
  }
}
