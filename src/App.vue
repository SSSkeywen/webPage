<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
@import "../static/css/rest.css";
@import "./style/style.scss";
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  font-size: 0.37rem;
}
// 按钮的公共样式
.tb_button {
  background: transparent;
  width: 100%;
  height: 1.3rem;
  line-height: 1.3rem;
  button {
    width: 100%;
    text-align: center;
    height: 1.3rem;
    line-height: 1.3rem;
    color: #ffffff;
    font-size: $fontsize;
    background: #02ad4d;
  }
}
::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #CACACA !important;
	}
	
	 :-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #CACACA!important;
	}
	
	 ::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #CACACA !important;
	}
	
	 :-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #CACACA !important;
	}

  .van-dialog{
    border-radius: 8px;
  }
  // input{
  //   padding: 15px 0;
  //   box-sizing: border-box;
  //   height: 100%;
  // }
</style>
