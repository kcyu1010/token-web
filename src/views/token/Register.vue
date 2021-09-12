<template>
  <div>
    <div class="welcome">
      注册
    </div>
    <div class="main">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="用户名" prop="who">
          <el-input v-model="form.who"></el-input>
        </el-form-item>
        <el-form-item label="名字" prop="chnName">
          <el-input v-model="form.chnName"></el-input>
        </el-form-item>
        <el-form-item label="JWSESSION" prop="token">
          <el-input v-model="form.token"></el-input>
        </el-form-item>
        <el-form-item label="喵提醒Code" prop="miaoCode">
          <el-input v-model="form.miaoCode"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="submitForm">注 册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {addToken} from "@/api/token";

export default {
  name: "Register",
  data() {
    return {
      form: {
        who: '',
        chnName: '',
        token: '',
        email: '',
        miaoCode: '',
        status: 2,
        isCheck: 1
      },
      rules: {
        who: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {pattern: /^[\w]*$/g, message: '用户名只能为数字和字母的组合', trigger: 'blur'},
          {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
        ],
        chnName: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        token: [
          {required: true, message: '请输入JWSESSION', trigger: 'blur'},
          {len: 32, message: 'JWSESSION长度需为32位', trigger: 'blur'}
        ],
        miaoCode: [
          {required: true, message: '请输入喵提醒Code', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          addToken(this.form).then((res) => {
            if (res.code === 200) {
              this.$message.success(res.message)
              this.successTips()
            } else {
              this.$message.error(res.message)
            }
          }).catch((err) => {
            this.$message.error("网络异常！！请检查网络配置")
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    successTips() {
      this.$alert('<p>请记住下面网址。这是当JWSESSION失效时主动更新的地址</br><a style="color: #20a0ff" href="../config/' + this.form.who + '">http://www.kcyu.top/config/' + this.form.who + '</a></p>', '注册成功', {
        dangerouslyUseHTMLString: true
      })
    }
  }
}
</script>

<style lang="less" scoped>
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
