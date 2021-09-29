<template>
  <div>
    <div class="filter">
      <span>用户</span>
      <el-select v-model="filterValue" size="mini" @change="filterData">
        <el-option v-for="item in filterList" :value="item"></el-option>
      </el-select>
    </div>
    <div class="content">
      <el-table :data="tableData">
        <el-table-column label="用户" prop="who"></el-table-column>
        <el-table-column label="打卡时间" prop="checkTime"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status">正常</el-tag>
            <el-tag type="danger" v-if="!scope.row.status">异常</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {getRecordsByName, getRecordsRow} from "@/api/token";

export default {
  name: "AdminCheckList",
  data(){
    return{
      filterValue:'',
      filterList:[],
      tableData: []
    }
  },
  methods:{
    filterData(){
      getRecordsByName(this.filterValue).then(res=>{
        if(res.code === 200){
          this.tableData = res.message
          console.log(res.message)
        }
      })
    }
  },
  created() {
    getRecordsRow().then(res=>{
      if(res.code === 200){
        this.filterList = res.data
      }
    })
  }
}
</script>

<style lang="less" scoped>
.filter{
  margin: 10px 20px;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);
  span{
    margin-right: 10px;
  }
}

.content{
  margin: 10px 20px;
}
</style>
