<template>
  <div>
    <div class="welcome">
      管理列表
    </div>
    <div class="main">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="token"
          label="Token"
        >
        </el-table-column>
        <el-table-column
          prop="who"
          label="谁"
        >
        </el-table-column>
        <el-table-column
          prop="lastupdatetime"
          label="上次更新时间"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
        >
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status === 1">正常打卡</el-tag>
            <el-tag type="info" v-if="scope.row.status === 2">已更新未认证</el-tag>
            <el-tag type="danger" v-if="scope.row.status === 0">打卡过期</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="isCheck"
          label="打卡开关"
        >
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.isCheck === 1">启用</el-tag>
            <el-tag type="danger" v-if="scope.row.isCheck === 0">暂停</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {getAllToken} from "@/api/token";
export default {
  name: "ShowAll",
  data(){
    return {
      tableData: ''
    }
  },
  created() {
    getAllToken().then((res)=>{
      this.tableData = res.message
    })
  }
}
</script>

<style scoped>
.welcome {
  height: 60px;
  background-color: rgb(64, 157, 253);
  display: flex;
  margin: 20px 20px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.main {
  padding: 20px;
}
</style>
