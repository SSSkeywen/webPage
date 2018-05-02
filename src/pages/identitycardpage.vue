<template>
  <div class="ic_box">
      <header class="ic_header">请根据提示拍摄以下证件照片</header>
      <section class="ic_picture" v-for="( imgSrcItem,index) in imgSrcList" :key="index">
          <hgroup class="ic_hgroup">{{ index+1 }}. {{ imgSrcItem.phIdentity }} {{ imgSrcItem.phName }} {{ imgSrcItem.phCardName }}</hgroup>
          <div class="ic_imgcontent">
              <div class="ic_img_box" v-for="(identityItem,indexTwo) in imgSrcItem.identityCardList" :key="indexTwo" @click="imgSrcFn(index,indexTwo)">
                <van-uploader :after-read="onRead">
                    <img :src="identityItem.imgSrc || identityItem.imgSrcTwo">
                  </van-uploader>
                  <!-- <img src="../../static/img/delectpt.png" class="delectfn"> -->
                  <img v-if="identityItem.isDelectImg" :src="delectImg" @click="imgDelectFn(index,indexTwo)" class="delectfn">
              </div>
              <!-- <div class="ic_img_box">
                  <van-uploader :after-read="onReadTwo">
                    <img :src="imgSrc">
                  </van-uploader>
                  <img v-if="isDelectImg" class="delectfn" :src="delectImg">
              </div> -->
          </div>
      </section>
      <!-- <section class="ic_picture">
          <hgroup class="ic_hgroup">1. 投保人 张三 身份证</hgroup>
          <div class="ic_imgcontent">
              <div>
                  <img src="../../static/img/sfzicon.png" alt="" srcset="">
              </div>
              <div>
                  <img src="../../static/img/sfzicontwo.png" alt="" srcset="">
              </div>
          </div>
      </section>
      <section class="ic_picture">
          <hgroup class="ic_hgroup">1. 投保人 张三 身份证</hgroup>
          <div class="ic_imgcontent">
              <div>
                  <img src="../../static/img/sfzicon.png" alt="" srcset="">
              </div>
          </div>
      </section> -->
      <div class="tb_button">
          <button @click="icSubmit">下一步</button>
      </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      delectImg: require('../../static/img/delectpt.png'), //删除小icon
      imgSrcZm: require('../../static/img/sfzicon.png'),//身份证背面照默认
      imgSrcZmTwo: require('../../static/img/sfzicontwo.png'),//身份证背面照默认
      numOne: '',
      numTwo: '',
      imgSrcList: [
        {
          phIdentity: '投保人',
          phName: '张三',
          phCardName: '身份证',
          phCardType: '1',
          identityCardList: [
            {
              imgSrcTwo: require('../../static/img/sfzicon.png'),//身份证背面照默认
              imgSrc: '',//身份证背面照默认
              isDelectImg:false, //默认不显示删除icon
            },{
              imgSrc: '',
              imgSrcTwo: require('../../static/img/sfzicontwo.png'),//身份证背面照默认
              isDelectImg:false, //默认不显示删除icon
            }
          ]
        },{
          phIdentity: '被保人',
          phName: '李四',
          phCardName: '身份证',
          phCardType: '1',
          identityCardList: [
            {
              imgSrcTwo: require('../../static/img/sfzicon.png'),//身份证背面照默认
              imgSrc: '',
              isDelectImg:false, //默认不显示删除icon
            },{
              imgSrcTwo: require('../../static/img/sfzicontwo.png'),//身份证背面照默认
              imgSrc: '',
              isDelectImg:false, //默认不显示删除icon
            }
          ]
        },{
          phIdentity: '受益人人',
          phName: '李四',
          phCardName: '户口薄',
          phCardType: '2',
          identityCardList: [
            {
              imgSrcTwo: require('../../static/img/sfzicon.png'),//身份证背面照默认
              imgSrc: '',
              isDelectImg:false, //默认不显示删除icon
            }
          ]
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      uploadImg: "UPLOADCRADIMG",
    }),
    //取下标
    imgSrcFn(index, indexTwo){
      console.log(index+'-'+indexTwo)
      this.numOne = index
      this.numTwo = indexTwo
    },
    imgDelectFn(indexOnw, indexTwo){
      // this.imgSrcList[indexOnw].identityCardList[indexTwo].imgSrc = this.imgSrcZm
      this.imgSrcList[indexOnw].identityCardList[indexTwo].isDelectImg = false
    },
    // 图片上传方法
    onRead(file) {
      // console.log(file.content)
      this.imgSrcList[this.numOne].identityCardList[this.numTwo].imgSrcTwo = ''
      this.imgSrcList[this.numOne].identityCardList[this.numTwo].imgSrc = file.content
      this.imgSrcList[this.numOne].identityCardList[this.numTwo].isDelectImg = true
      // this.imgSrc = file.content
      // this.isDelectImg = true
    },
    icSubmit() {
      console.log(this.imgSrcList)
      let cardListDataList = JSON.stringify(this.imgSrcList);
      // console.log(cardListData)
      // this.$router.push({ path: "/previewpage" });
      let cardListData = new FormData()
      cardListData.append("cardListData", cardListDataList);
      window.localStorage.setItem('cardListData', cardListDataList)
      this.uploadImg({
        cardListData, 
        successCallback:() => { 

        }, 
        failCallback:() => { } 
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.ic_box {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: rgb(231, 231, 245);
  .ic_header {
    background: rgba(255, 99, 51, 0.15);
    width: 100%;
    height: 0.68rem;
    line-height: 0.68rem;
    font-size: 0.34rem;
    color: #ff6333;
    text-align: center;
  }
  .ic_picture {
    width: 100%;
    // height: 4.3rem;
    background: #fff;
    margin-top: 0.37rem;
    padding: 0.4rem;
    box-sizing: border-box;
    .ic_hgroup {
      font-size: 0.4rem;
      color: #333333;
    }
    .ic_imgcontent {
      display: flex;
      justify-content: space-between;
      margin-top: 0.4rem;
      div.ic_img_box {
        width: 43%;
        text-align: center;
        position: relative;
        img {
          width: 100%;
        }
        .delectfn {
          position: absolute;
          width: 0.66rem;
          height: 0.66rem;
          right: 0;
          top: 0;
        }
      }
    }
  }
  .tb_button {
    margin-top: 0.4rem;
    button {
      position: fixed;
      bottom: 0;
    }
  }
}
</style>

