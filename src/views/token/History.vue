<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="token"
        label="历史Token"
      >
      </el-table-column>
      <el-table-column
        prop="changedate"
        label="更新时间"
      >
        <template slot-scope="scope">{{ scope.row.changedate | timeToString }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "History",
  props:{
    tableData:{
      default : ()=>{return {}},
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
