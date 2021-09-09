<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>当前JWSESSION</span>
      </div>
      <div class="text item">
        {{ data.token }}
        <el-divider></el-divider>
        <div slot="header" class="clearfix">
          <span>更新时间：{{ data.lastupdatetime | timeToString }}</span>
        </div>
      </div>
    </el-card>
    <el-form :model="token" :rules="rules" ref="token">
      <el-form-item label="提交新JWSESSION" prop="token">
        <el-input v-model="token.token"/>
      </el-form-item>
      <el-button @click="handleSubmit" type="primary" style="width: 100%">
        提交
      </el-button>
    </el-form>
    <div class="token-status">
      <span>状态：</span>
      <el-tag type="danger" v-if="data.status === 0">令牌过期</el-tag>
      <el-tag type="success" v-if="data.status === 1">令牌正常</el-tag>
      <el-tag type="warning" v-if="data.status === 2">令牌已更新，待验证</el-tag>
      <span style="display: inline-block;width: 20px;"></span>
      <el-tag type="danger" v-if="data.isCheck === 0">已停用</el-tag>
      <el-tag type="success" v-if="data.isCheck === 1">正常启用中</el-tag>
      <span style="display: inline-block;width: 20px;"></span>
      <el-button size="small" type="primary" @click="verifyToken" :disabled="data.status !== 2">验证</el-button>
    </div>
  </div>
</template>

<script>
import {updateToken, verifyToken} from "@/api/token";
export default {
  name: "Token",
  props:{
    data:{
      type: Object,
      default: ()=>{return {}}
    }
  },
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
      this.$emit('freshData')
    },
    verifyToken(){
      verifyToken(this.data.token,this.$route.params.name).then((res)=>{
        if(res.code === 200){
          this.$message.success(res.message)
          this.initData()
        } else {
          this.$message.error(res.message)
        }
      })
    }
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
