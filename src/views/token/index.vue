<template>
  <div class="main">
    <div class="welcome">
      欢迎回来，{{ name }}
    </div>
    <div class="main-tab">
      <el-tabs>
        <el-tab-pane label="JWSESSION提交">
          <Token :data="tokenData" @freshData="freshData"/>
        </el-tab-pane>
        <el-tab-pane label="提交历史">
          <History :tableData="tableData" @freshData="freshData"/>
        </el-tab-pane>
        <el-tab-pane label="打卡配置">
          <Config/>
        </el-tab-pane>
<!--        <el-tab-pane label="打卡记录">-->
<!--          打卡记录-->
<!--        </el-tab-pane>-->
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Token from "@/views/token/Token";
import History from "@/views/token/History";
import Config from "@/views/token/Config";
import {getUserByName,getHistory} from "@/api/token";

export default {
  name: 'Index',
  components: {
    Token,
    History,
    Config
  },
  data() {
    return {
      name: 'loading...',
      tokenData: null,
      tableData: null
    }
  },
  methods: {
    freshData() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading'
      });
      getUserByName(this.$route.params.name).then((res) => {
        if(res.code === 200){
          this.name = res.message.chnName
          this.tokenData = res.message
        } else {
          this.$message.error(res.message)
        }
      }).catch((error)=>{
        this.$message.error(error)
      }).finally(() => {
        loading.close()
      })
      getHistory(this.$route.params.name).then((res)=>{
        if(res.code === 200){
          this.tableData = res.message
        } else {
          this.$message.error(res.message)
        }
      }).catch((err)=>{
        this.$message.error(err)
      })

    }
  },
  created() {
    this.freshData()
  }
}
</script>

<style lang="less" scoped>
.main {
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 800px;
  height: 100%;
}

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

.main-tab {
  margin: 0 20px;
}
</style>
