<template>
  <div class="result_box">
      <div class="result_content">
          <hgroup class="result_hgroup">您的投资偏好为</hgroup>
          <p class="result_p" v-text="aswerData"></p>
      </div>
      <section class="result_section">
          <p>此产品已超出了您的风险承受能力</p>
          <p>如继续买入，则视为愿意承担该风险</p>
      </section>
      <section class="result_btn">
          <button @click="goOn">继续</button>
          <button @click="goBank">返回</button>
      </section>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goOn() {
      this.$router.push({ path: "/policyholder" });
    },
    goBank() {
      this.$router.push({ path: "/testpage" });
    }
  },
  computed: {
    aswerData() {
      return this.$store.getters.aswerData;
    }
  }
};
</script>

<style lang="scss" scoped>
.result_box {
  width: 100%;
  height: 100%;
  background: url(../../static/img/resutlbg.jpg) no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  overflow-y: auto;
  padding-bottom: 0.4rem;
  box-sizing: border-box;
  position: relative;
  .result_content {
    width: 6.9rem;
    height: 7.8rem;
    background: url(../../static/img/resultcontentbg.png) no-repeat;
    background-size: 100% 100%;
    margin: 1.4rem auto 0;
    padding-top: 1rem;
    box-sizing: border-box;
    .result_hgroup {
      color: #a28c57;
      text-align: center;
      font-size: 0.4rem;
    }
    .result_p {
      font-size: 1.06rem;
      color: #ff6333;
      text-shadow: 0 2px 2px #beab7d;
      text-align: center;
      margin-top: 0.45rem;
    }
  }
  .result_section {
    width: 8.9rem;
    height: 2.1rem;
    background: rgba(6, 100, 49, 0.3);
    border-radius: 9px;
    margin: 0.5rem auto 0;
    p {
      font-size: 0.4rem;
      color: #ffffff;
      text-align: center;
      line-height: 1.05rem;
    }
  }
  .result_btn {
    width: 7.2rem;
    margin: 1.35rem auto 0;
    button {
      width: 7.2rem;
      background: #f9c567;
      box-shadow: 0 0 6px 0 #098640;
      border-radius: 5px;
      height: 1.3rem;
      font-size: 0.4rem;
      color: #ffffff;
    }
    button:last-child {
      color: #666666;
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0 0 6px 0 #098640;
      border-radius: 5px;
      margin-top: 0.5rem;
    }
  }
}
</style>


