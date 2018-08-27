<template>
    <div>
        <van-popup class="alerWrongStyle" v-model="isShowWrong" :overlay="false">
          <div class="con_tk2">
    	<em><img :src="iconImg" width="20%"></em>
        <p style = "font-size:16px; color:#666;" name = "msg">{{ wrongData }}</p>
        <a href="javascript:;"  @click="closeTips">知道了</a>
    </div>   
            <!-- <div class="alert-style-content">
              <div>

              </div>
              <p>
                 {{ wrongData }}
              </p>
              <div class="alert-btn">
                <p>知道了</p>
              </div>
            </div> -->
        </van-popup>
    </div>
</template>

<script>
export default {
  data() {
    return {
      iconImg: require("../../static/img/icon_3.jpg"),
      wrongData: "", //报错内容
      isShowWrong: false, //报错弹出层
      urlAddress: false,
    };
  },
  methods: {
    //输入错误提示
    isworngFn(value, urlAddress) {
      this.isShowWrong = true;
      this.wrongData = value;
      this.urlAddress = urlAddress
      // setTimeout(() => {
      //   this.isShowWrong = false;
      // }, 3000);
      // return false;
      
    },
    closeTips(){
      this.isShowWrong = false;
      if(this.urlAddress == true){
        this.$router.push({ path: "/recordpage" });
      }
      if(this.urlAddress == 'inputVcode'){
        this.$emit('inputVcode')
      }
      
    }
  }
};
</script>

<style lang="scss" scoped>
/* 错误弹出层样式 */
.alerWrongStyle {
  // padding: 0.2rem;
  // font-size: 0.4rem;
  // line-height: 0.58rem;
  // color: #ff0000;
  // text-align: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  .alert-style-content {
    position: fixed;
    left: 1rem;
    top: 4rem;
    width: 8rem;
    height: 5rem;
    background-color: #fff;
    border-radius: 7px;
    overflow: hidden;
  }
  .alert-btn {
    width: 100%;
    height: 0.8rem;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 0;

    p {
      font-size: 0.4rem;
      width: 100%;
      height: 100%;
      color: #fff;
      background: #02ad4d;
      border: none;
    }
  }
}
.con_tk2{ background:#dedede; z-index:110; position:absolute;width:90%;top:40%;left:50%; background:#fff;margin-left:-45%;margin-top:-75px;border-radius:7px;}
.con_tk2 em{ text-align:center;text-align: center;display: inline-block;width: 100%;padding-top:10px;}
.con_tk2 p{line-height:24px; text-align: center;color:#a5a5a5;padding:32px 10px;width:100%;box-sizing: border-box;}
.con_tk2 a{width:100%; display:inline-block;line-height:40px;height:40px;float:left;color:#fff; text-align:center;font-size:16px; background:#09bb07;border-bottom-left-radius:7px;border-bottom-right-radius:7px;}
</style>