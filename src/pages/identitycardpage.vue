<template>
  <div class="ic_box" ref="icBox">
    <div class="ic-box-new" ref="icBoxTwo">
      <div class="ic_box_two">
        <header class="ic_header">请根据提示拍摄以下证件照片</header>
        <section class="ic_picture" v-for="( imgSrcItem,index) in imgSrcList" :key="index">
            <hgroup class="ic_hgroup">{{ index+1 }}. {{ imgSrcItem.phIdentity }} {{ imgSrcItem.phName }} {{ imgSrcItem.phCardName }}</hgroup>
            <div class="ic_imgcontent">
                <div class="ic_img_box" v-for="(identityItem,indexTwo) in imgSrcItem.identityCardList" :key="indexTwo" @click="imgSrcFn(index, indexTwo)">
                  <!-- <van-uploader :after-read="onRead"> -->
                      <img :src="identityItem.imgSrc || identityItem.imgSrcTwo" class="imgSrcOne">
                    <!-- </van-uploader> -->
                    <img v-if="identityItem.isDelectImg" :src="delectImg" @click="imgDelectFn(index,indexTwo)" class="delectfn">
                </div>
            </div>
        </section>
      </div>
      <div class="tb_button">
          <button @click="selectNsr">下一步</button>
      </div>
      <alertWrong ref="alertFn"></alertWrong>
    </div>
    <!-- 选择是否是中国纳税人 -->
    <van-dialog
      v-model="iscredit"
      @confirm="icSubmit"
    >
      <div class="code_style">
        <van-icon name="close" class="code-close-icon" @click="codeClose"/>
        <hgroup class="code_title">请告知我们您的税收居民身份！</hgroup>
        
        
        <div class="code_radio" :class="checkedSe=='1'?'code_checked':''" @click="selectCode(1)">
          <div>
            <img v-if="checkedSe=='1'" :src="selectIconImga" alt="" srcset="">
          </div>
          <p>仅为中国税收居民</p>
        </div>
        <div class="code_radio" :class="checkedSe=='2'?'code_checked':''" @click="selectCode(2)">
          <div>
            <img v-if="checkedSe=='2'" :src="selectIconImga" alt="" srcset="">
          </div>
          <p>仅为非居民</p>
        </div>
        <div class="code_radio" :class="checkedSe=='3'?'code_checked':''" @click="selectCode(3)">
          <div>
            <img v-if="checkedSe=='3'" :src="selectIconImga" alt="" srcset="">
          </div>
          <p>既是中国税收居民又是其他国家（地区）税收居民</p>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import alertWrong from "../components/alertWrong";
import { mapActions } from "vuex";
import { Toast } from "vant";
// import wx from "weixin-js-sdk";
export default {
  data() {
    return {
      isCrsExempt: "",
      dataList: "",
      delectImg: require("../../static/img/delectpt.png"), //删除小icon
      imgSrcZm: require("../../static/img/sfzicon.png"), //身份证背面照默认
      imgSrcZmTwo: require("../../static/img/sfzicontwo.png"), //身份证背面照默认
      imgSrchkb: require("../../static/img/hkicon.png"), //户口本
      selectIconImga: require("../../static/img/checkedicon.png"), //绿色小对勾
      selectIconImgb: require("../../static/img/unclickicon.png"), //灰色小对勾
      iscredit: false,//是否3
      checkedDatas: [
        '仅为中国税收居民',
        '仅为非居民',
        '既是中国税收居民又是其他国家（地区）税收居民'
      ],
      checkedData: '',  //国家的选择
      numOne: "",
      numTwo: "",
      checkedSe: '',
      imgSrcList: [
        {
          phIdentity: "投保人",
          phName: "张三",
          phCardName: "身份证",
          phCardType: "1",
          identityCardList: [
            {
              imgSrcTwo: require("../../static/img/sfzicon.png"), //身份证背面照默认
              imgSrc: "", //身份证背面照默认
              serverId: "",
              isDelectImg: false //默认不显示删除icon
            },
            {
              imgSrc: "",
              serverId: "",
              imgSrcTwo: require("../../static/img/sfzicontwo.png"), //身份证背面照默认
              isDelectImg: false //默认不显示删除icon
            }
          ]
        }
      ]
    };
  },
  created() {
    let policyBenes = JSON.parse(window.localStorage.getItem("policyBenes"));
    let policyDataList = JSON.parse(
      window.localStorage.getItem("policyDataList")
    );
    console.log(policyDataList)
    this.imgSrcList[0].phName = policyDataList.realName;
    for (let itemName of policyBenes[0].orderOneList) {
      let itemList = {
        phIdentity: "受益人",
        phName: itemName.realName,
        phCardName: "身份证",
        phCardType: "1",
        identityCardList: [
          {
            imgSrcTwo: require("../../static/img/sfzicon.png"), //身份证背面照默认
            imgSrc: "",
            serverId: "",
            isDelectImg: false //默认不显示删除icon
          },
          {
            imgSrcTwo: require("../../static/img/sfzicontwo.png"), //身份证背面照默认
            imgSrc: "",
            serverId: "",
            isDelectImg: false //默认不显示删除icon
          }
        ]
      };
      if (new Date().getFullYear() - itemName.birthday.slice(0, 4) < 15) {
        itemList = {
          phIdentity: "受益人",
          phName: itemName.realName,
          phCardName: "户口薄",
          phCardType: "1",
          identityCardList: [
            {
              imgSrcTwo: this.imgSrchkb, //身份证背面照默认
              imgSrc: "",
              serverId: "",
              isDelectImg: false //默认不显示删除icon
            }
          ]
        };
      }
      this.imgSrcList.push(itemList);
    }
    for (let itemName of policyBenes[1].orderOneList) {
      let itemList = {
        phIdentity: "受益人",
        phName: itemName.realName,
        phCardName: "身份证",
        phCardType: "1",
        identityCardList: [
          {
            imgSrcTwo: require("../../static/img/sfzicon.png"), //身份证背面照默认
            imgSrc: "",
            serverId: "",
            isDelectImg: false //默认不显示删除icon
          },
          {
            imgSrcTwo: require("../../static/img/sfzicontwo.png"), //身份证背面照默认
            imgSrc: "",
            serverId: "",
            isDelectImg: false //默认不显示删除icon
          }
        ]
      };
      if (new Date().getFullYear() - itemName.birthday.slice(0, 4) < 15) {
        itemList = {
          phIdentity: "受益人",
          phName: itemName.realName,
          phCardName: "户口薄",
          phCardType: "1",
          identityCardList: [
            {
              imgSrcTwo: this.imgSrchkb, //身份证背面照默认
              imgSrc: "",
              serverId: "",
              isDelectImg: false //默认不显示删除icon
            }
          ]
        };
      }
      this.imgSrcList.push(itemList);
    }
    let isCrsExempt = JSON.parse(window.localStorage.getItem("isCrsExempt"));
    console.log(isCrsExempt.isCrsExempt)
    this.isCrsExempt = isCrsExempt.isCrsExempt
  },
  components: {
    alertWrong
  },
  mounted() {
    let WxData = new FormData();
    WxData.append("url", window.location.href.split("#")[0]);
    this.WxDataFn({
      WxData,
      successCallback: data => {
        this.dataList = data;

        //掉微信接口方法
        wx.config({
          debug: false,
          appId: this.dataList.appid,
          timestamp: this.dataList.timestamp,
          nonceStr: this.dataList.nonce_Str,
          signature: this.dataList.signature,
          // jsApiList: ["chooseImage", "uploadImage ","translateVoice"]
          jsApiList: [
            "chooseImage",
            "uploadImage",
            "getLocalImgData",
            "downloadImage"
          ]
        });
      },
      failCallback: result => {}
    });
    // this.saveContent()
  },
  methods: {
    ...mapActions({
      uploadImg: "UPLOADCRADIMG",
      WxDataFn: "WXDATAFN"
    }),
    //取下标
    imgSrcFn(index, indexTwo) {
      this.numOne = index;
      this.numTwo = indexTwo;
      var imgSrcListTwo = this.imgSrcList;
      wx.ready(function() {
        var imageOne;
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
          success: function(res) {
            console.log(res);
            var localIds = res.localIds;
            imgSrcListTwo[index].identityCardList[indexTwo].imgSrc = localIds;
            imgSrcListTwo[index].identityCardList[indexTwo].isDelectImg = true;
            //上传图片方法
            wx.uploadImage({
              localId: imgSrcListTwo[index].identityCardList[
                indexTwo
              ].imgSrc.toString(),
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: function(res) {
                var serverId = res.serverId;
                imgSrcListTwo[index].identityCardList[indexTwo].serverId =
                  res.serverId; // 返回图片下载后的本地ID
              }
            });
          }
        });
      });
      this.imgSrcList = imgSrcListTwo;
    },
    imgDelectFn(indexOnw, indexTwo) {
      this.imgSrcList[indexOnw].identityCardList[indexTwo].imgSrc = "";
      this.imgSrcList[indexOnw].identityCardList[indexTwo].isDelectImg = false;
    },
    // 直接图片上传方法
    onRead(file) {
      this.imgSrcList[this.numOne].identityCardList[this.numTwo].imgSrc =
        file.content;
      this.imgSrcList[this.numOne].identityCardList[
        this.numTwo
      ].isDelectImg = true;
    },
    //选择是否是中国纳税人
    selectNsr(){
      for (let itemOne of this.imgSrcList) {
        for (let itemTwo of itemOne.identityCardList) {
          if (itemTwo.imgSrc == "") {
            this.$refs.alertFn.isworngFn("请上传证件图片！");
            return false;
          }
        }
      }
      if(this.isCrsExempt != 'Y'){
        this.iscredit = true
      }else{
        this.icSubmit()
      }
      
    },
    selectCode(key) {
      this.checkedSe = key;
      this.checkedData = this.checkedDatas[key-1]
      // console.log(this.checkedData)
    },
    codeClose() {
      // if (this.taxName == "统一社会信用代码") {
      //   this.checkedSe = "1";
      // } else {
      //   this.checkedSe = "2";
      // }
      this.iscredit = false;
    },
    //提交信息
    icSubmit() {
      // alert(this.checkedSe)
      if(this.isCrsExempt != 'Y'){
        if(this.checkedSe == ''){
          this.iscredit = true
          this.$refs.alertFn.isworngFn("温馨提示：您还没有选择您的税收居民身份类型，请先选择！");
          return false
        }
      }else{
        this.checkedSe = '1'
      }
      // console.log(this.checkedData)
      
      
      let toast1 = Toast.loading({
        mask: true,
        message: "提交中...",
        duration: 20000
      });
      var cardListDataList = JSON.stringify(this.imgSrcList);
      let cardListData = new FormData();
      cardListData.append("cardListData", cardListDataList);
      // cardListData.append("taxpayerType", this.checkedSe);this.checkedData
      window.localStorage.setItem("cardListData", cardListDataList);
      console.log(JSON.stringify(this.checkedData))
      window.localStorage.setItem("checkedData", JSON.stringify(this.checkedData));
      // if(this.checkedSe == '1'){
      //       this.$router.push({ path: "/previewpage" });
      //     }else{
      //       this.$router.push({ path: "/policyholder2" });
      //     }
      // return false
      this.uploadImg({
        cardListData,
        successCallback: () => {
          toast1.clear();
          if(this.checkedSe == '1'){
            this.$router.push({ path: "/previewpage" });
          }else{
            this.$router.push({ path: "/policyholder2" });
          }
          
        },
        failCallback: result => {
          // alert(result);
          this.$refs.alertFn.isworngFn(result);
          toast1.clear();
        }
      });
    },
    saveContent(){
      
      let cardListData = JSON.parse(window.localStorage.getItem("cardListData"));
      if (cardListData != '' && cardListData != undefined && cardListData !=null){
        console.log(cardListData)
        for(let j = 0; j < this.imgSrcList.length; j++){
        for(let i = 0; i < cardListData.length; i ++){
          if (this.imgSrcList[j].phName == cardListData[i].phName){
            console.log('=======>'+this.imgSrcList[i].phName)
            this.imgSrcList[j].identityCardList = cardListData[i].identityCardList
          }
        }
        }
        
        setTimeout(() => {
          console.log(this.$refs.icBoxTwo.offsetHeight+'-'+this.$refs.icBox.offsetHeight)
          if(this.$refs.icBoxTwo.offsetHeight >= this.$refs.icBox.offsetHeight){
            this.$refs.icBox.style.height = this.$refs.icBoxTwo.offsetHeight + 'px'
          }
        },1500)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.ic_box {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  // .ic-box-new{
    // height:auto;
    // height:100%;
    // width: 100%;
    // overflow-y: auto;
  // }
  .ic_box_two{
    width: 100%;
    padding-bottom: 1.7rem;
  }
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
    border-bottom: 1px solid #e7e7f5;
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
    margin-top: 0rem;
    height: auto;
    button {
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 9999;
    }
  }
}
.code_style {
  padding: 0.5rem 0.3rem;
  text-align: center;
  line-height: 0.75rem;
  position: relative;
  .code-close-icon {
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 0.6rem;
    color: #c9c9c9;
  }
  .code_title {
    font-size: 0.46rem;
    color: #333333;
    text-align: center;
    font-family: PingFangSC-Medium;
    margin-bottom: 0.3rem;
  }
  .code_radio {
    display: flex;
    font-size: 0.4rem;
    width: 80%;
    margin: 0 auto;
    div {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 0.6rem;
      border: 1px solid #c9c9c9;
      padding: 0px 2px 4px;
      box-sizing: border-box;
      img {
        width: 100%;
        margin-bottom: 8px;
      }
    }
    p {
      margin-left: 0.2rem;
      text-align: justify;
      flex: 1;
    }
  }
  .code_checked {
    color: #02ad4d;
  }
  .code_input {
    width: 100%;
    margin-top: 0.5rem;
    input {
      width: 100%;
      background: #ffffff;
      border: 1px solid #dddddd;
      line-height: 0.5rem;
      padding: 0.35rem;
      box-sizing: border-box;
    }
  }
}
</style>

