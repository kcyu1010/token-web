<template>
  <div class="main">
    <div class="welcome">
      欢迎回来，{{ name }}
    </div>
    <div class="main-tab">
      <el-tabs>
        <el-tab-pane label="JWSESSION提交">
          <Token/>
        </el-tab-pane>
        <el-tab-pane label="提交历史">
          <History :tableData=""/>
        </el-tab-pane>
        <el-tab-pane label="打卡配置">
          <Config/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Token from "@/views/token/Token";
import History from "@/views/token/History";
import Config from "@/views/token/Config";
import {getUserByName} from "@/api/token";
export default {
  name: 'Index',
  components: {
    Token,
    History,
    Config
  },
  data() {
    return {
      name: 'khy',
      tableData: null
    }
  },
  methods:{
    freshData(){
      getUserByName(this.$route.params.name)
    }
  },
  created() {
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading'
    });
    getUserByName(this.$route.params.name).then((res)=>{
      this.name = res.message.chnName
    }).finally(()=>{
      loading.close()
    })
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
