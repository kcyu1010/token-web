<template>
  <div>
    <el-form>
      <el-form-item label="开启打卡">
        <el-switch
          v-model="config.totelSwitch">
        </el-switch>
      </el-form-item>
      <el-form-item label="打卡时段(暂未开放此功能)">
        早
        <el-switch
          v-model="config.morningCheck" disabled>
        </el-switch>
        午
        <el-switch
          v-model="config.middayCheck" disabled>
        </el-switch>
        晚
        <el-switch
          v-model="config.nightCheck" disabled>
        </el-switch>
      </el-form-item>
      <el-form-item label="打卡地点-经度">
        <el-input placeholder="暂未开放此功能，敬请期待" disabled></el-input>
      </el-form-item>
      <el-form-item label="打卡地点-纬度">
        <el-input placeholder="暂未开放此功能，敬请期待" disabled></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Config",
  data() {
    return {
      config: {
        totelSwitch: true,
        morningCheck: true,
        middayCheck: true,
        nightCheck: true
      }
    }
  }
}
</script>

<style scoped>

</style>
