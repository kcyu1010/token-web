<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>当前JWSESSION</span>
      </div>
      <div class="text item">
        {{ oldToken }}
        <el-divider></el-divider>
        <div slot="header" class="clearfix">
          <span>更新时间：{{ updateTime }}</span>
        </div>
      </div>
    </el-card>
    <el-form :model="token" :rules="rules" ref="token">
      <el-form-item label="提交新Token" prop="token">
        <el-input v-model="token.token"/>
      </el-form-item>
      <el-button @click="handleSubmit" type="primary" style="width: 100%">
        提交
      </el-button>
    </el-form>
    <div class="token-status">
      <span>状态：</span>
      <el-tag type="danger" v-if="status === 0">Token过期</el-tag>
      <el-tag type="success" v-if="status === 1">Token正常</el-tag>
      <el-tag type="warning" v-if="status === 2">Token已更新，待验证</el-tag>
      <span style="display: inline-block;width: 20px;"></span>
      <el-tag type="danger" v-if="isCheck === 0">已停用</el-tag>
      <el-tag type="success" v-if="isCheck === 1">正常启用中</el-tag>
    </div>

  </div>
</template>

<script>
import {getUserByName,updateToken} from "@/api/token";
export default {
  name: "Token",
  data() {
    var validateToken = (rule, value, callback) => {
      const patt = /^[a-z0-9]{32}$/i;
      let result = value.search(patt)
      if (result !== -1) {
        callback()
      } else {
        callback(new Error("Token格式不对，请检查"))
      }
    }
    return {
      oldToken:'',
      status: '',
      isCheck: '',
      updateTime: '',
      token: {
        token: ''
      },
      rules: {
        token: [
          {validator: validateToken, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs['token'].validate((valid) => {
        if (valid) {
          const data = {
            who: this.$route.params.name,
            Token: this.token.token
          }
          updateToken(data).then((res)=>{
            if(res.code === 200){
              this.$message.success(res.message)
              this.token.token = ''
              this.initData()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    initData(){
      getUserByName(this.$route.params.name).then((res)=>{
        this.oldToken = res.message.token
        this.status = res.message.status
        this.updateTime = res.message.updateTime
        this.isCheck = res.message.isCheck
      })
    }
  },
  created() {
    this.initData()
  }
}
</script>

<style scoped>
.token-status {
  margin-top: 20px;
}

/deep/ .el-card__body{
  padding-left: 20px;
  padding-right: 0;
}
</style>
