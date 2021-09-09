<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="token"
        label="历史Token"
        width="100px"
      >
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "History",
  props:{
    tableData:{
      default : {},
      type: Object
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>

</style>
