<template>
    <div class="assess_box">
        <div class="assess_top"></div>
        <div class="assess_title">
            <p>个人投资者风险承受能力评估问卷</p>
            <hgroup>评 估 问 卷</hgroup>
        </div>
        <div class="assess_content">
            <hgroup>尊敬的投资者： </hgroup>
            <p>为了便于您了解自身的风险承受能力，选择合适的投资产品和服务，请您填写以下风险承受能力评估问卷。</p>
            <p>下列问题可协助评估您对投资产品和服务的风险承受能力，请您根据自身情况认真选择。评估结果仅供参考，不构成投资建议。为了及时了解您的风险承受能力，我们建议您持续做好动态评估。</p>
            <p>我们承诺对您的所有个人资料保密。 </p>
            <div class="assess_sumbit">
                <button @click="testpage">立即测试</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    testpage() {
      this.$router.push({ path: "/testpage" });
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
@import "../style/style.scss";
.assess_box {
  padding-bottom: 0.5rem;
  .assess_top {
    width: 100%;
    height: 2.3rem;
    background: #02ad4d;
  }
  .assess_title {
    width: 9.15rem;
    height: 3.2rem;
    margin: -1.6rem auto 0;
    padding: 0.66rem 0 0;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
    p {
      font-family: PingFangSC-Medium;
      font-size: 0.48rem;
      color: $fontcolor;
      text-align: center;
    }
    hgroup {
      font-family: PingFangSC-Medium;
      font-size: 0.74rem;
      color: #333333;
      padding-top: 0.3rem;
      text-align: center;
    }
  }
  .assess_content {
    background: #ffffff;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
    width: 9.15rem;
    height: 10.8rem;
    box-sizing: border-box;
    margin: 0.5rem auto 0;
    padding: 0.67rem 0.4rem 0.8rem;
    font-size: $fontsize;
    color: #333333;
    p {
      text-indent: 2em;
      margin-top: 0.4rem;
    }
    .assess_sumbit {
      margin-top: 1.51rem;
      text-align: center;
      button {
        width: 7.6rem;
        height: 1.06rem;
        text-align: center;
        font-size: $fontsize;
        color: #fff;
        background: #02ad4d;
        border-radius: 5px;
        box-shadow: 0 0 5px 0 #02ad4d;
      }
    }
  }
}
</style>


