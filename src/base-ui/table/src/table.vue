<template>
  <div class="header">
    <slot name="header">
      <div>{{ title }}</div>
      <div class="handler">
        <slot name="headerHandler"></slot>
      </div>
    </slot>
  </div>
  <div class="table">
    <el-table
      :data="dataList"
      border
      style="width: 100%"
      @selection-change="selectChange"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        align="center"
        width="80"
        label="序号"
      ></el-table-column>
      <template v-for="propItem in titleList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <template #default="scope">
            <!-- :data(名字随便取) 可以将 数据传出去 -->
            <slot :name="propItem.slotName" :data="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
  <div class="footer">
    <slot name="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    titleList: {
      type: Array,
      required: true
    },
    dataList: {
      type: Array,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    }
  },
  emits: ['selectionChange'],
  setup(props, { emit }) {
    // 当在表格选中时 el-table 可以监听 @selection-change 这个事件
    // 调用这个自定义函数（默认传入选中的数据）
    const selectChange = (data: any) => {
      console.log(data)
      emit('selectionChange', data)
    }
    return { selectChange }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
