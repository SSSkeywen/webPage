<template>
    <div>
        <van-popup v-model="isShowWrong" position="top" :overlay="false">
            <div class="alerWrongStyle">
                {{ wrongData }}
            </div>
        </van-popup>
    </div>
</template>

<script>
export default {
  data() {
    return {
      wrongData: "", //报错内容
      isShowWrong: false //报错弹出层
    };
  },
  methods: {
    //输入错误提示
    isworngFn(value) {
      this.isShowWrong = true;
      this.wrongData = value;
      setTimeout(() => {
        this.isShowWrong = false;
      }, 1000);
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
/* 错误弹出层样式 */
.alerWrongStyle {
  padding: 0.2rem;
  font-size: 0.4rem;
  line-height: 0.58rem;
  color: #ff0000;
  text-align: center;
  background-color: rgba(255, 0, 0, 0.15);
}
</style>