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
  // overflow: hidden;
  overflow-y: auto;
  font-size: 0.37rem;
  // background-color: rgb(231, 231, 245);
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
  #linePoto{
  div:nth-child(2) {
    background: -webkit-linear-gradient(left, #12AFC1 0%,#1AC0A5 100%) !important;
}
} 
input:disabled{
    // border: 1px solid #DDD;
    background-color: #fff;
    color: #999 !important;
    // color:#ACA899;
}
  // input{
  //   padding: 15px 0;
  //   box-sizing: border-box;
  //   height: 100%;
  // }
  .color-cacaca {
  color: #cacaca;
}
.van-picker__cancel, .van-picker__confirm {
    color: #02ad4d!important;
    padding: 0 15px;
}
input{
  caret-color:#02ad4d!important;
}
.is-open-style {
  width: 8rem;
  padding: 10px;
  text-align: center;
  border-radius: 7px;
}
.buy-page-style{
  background-color: #fff;
  .van-dialog{
    background-color: transparent;
    .van-hairline{
      background-color: #fff;
    }
  }
  .van-dialog__footer{
    background: #00c000!important;
    width: 101%;
    button{
      border-radius: 0px!important;
    }
  }
  .van-dialog__confirm, .van-dialog__confirm:active{
      background: #00c000!important;
    color: #fff!important;
    
}
}

</style>
