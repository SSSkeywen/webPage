<template>
    <div class="add_box">
        <!-- 添加受益人 -->
      <van-popup class="addmen_style" v-model="showcontent" position="right" :overlay="false">
        <div class="box">
    <div class="tb_box">
      <p class="tb_box_title">身故受益人信息</p>
      <ul class="tb_box_content">
        <li class="tb_box_li hasline">
          <p>姓名</p>
          <div class="tb_box_date_two">
            <input v-model="adrealName" type="text" placeholder="请输入">
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>是被保人的</p>
          <div class="tb_box_date three" @click="isShowRelationship=!isShowRelationship">
              <p>{{relationshipName}}</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>证件类型</p>
          <div class="tb_box_date three">
              <p>身份证</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>证件号码</p>
          <div class="tb_box_date_two">
            <input v-model="adcertiCode" type="text" placeholder="请输入">
          </div>
        </li>
        
        <li class="tb_box_li hasline">
          <p>出生日期</p>
          <div class="tb_box_date" @click="bfDate=!bfDate">
            <!-- <input type="date"> -->
            <p class="ph_date">{{ bfbirthdayData }}</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>性别</p>
          <div class="tb_box_date bfSex">
            <p :class="sexmen?'sex_checked':''" @click="sexmen=true;adsexMF='M'">男</p>
            <p :class="sexmen?'':'sex_checked'" @click="sexmen=false;adsexMF='F'">女</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>证件有效期</p>
          <div class="tb_box_date three" @click="isHowLongTime=!isHowLongTime">
              <p>{{ howLongTimeData }}</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>受益顺序</p>
          <div class="tb_box_date three" @click="isShowOrder=!isShowOrder">
            <p>{{ orderData }}</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>受益比例</p>
          <div class="tb_box_date_two">
            <input v-model="beneRate" type="number" placeholder="请输入"> &nbsp;&nbsp;%
          </div>
        </li>
      </ul>
    </div>
    <div class="tb_button">
      <button @click="addSubmit">确定</button>
    </div>
  </div>
      </van-popup>
      <!-- 与投保人关系 -->
      <van-actionsheet v-model="isShowRelationship" :actions="relationshipList" cancel-text="取消" />
      <!-- 受益人顺序 -->
      <van-actionsheet v-model="isShowOrder" :actions="roderList" cancel-text="取消" />
      <van-actionsheet v-model="isHowLongTime" :actions="howLongTime" cancel-text="取消" />
    <!-- 出生时间日期弹出框 -->
    <van-actionsheet v-model="bfDate">
    <van-datetime-picker
      v-model="bfDateNow"
      type="date"
      :min-date="bfminDate"
      :max-date="bfmaxDate"
      @confirm="bfdateFn"
      @cancel="bfDate = false"
    />
    </van-actionsheet>
    <!-- 证件有效期弹出框 -->
    <van-actionsheet v-model="bfHowLongDate">
    <van-datetime-picker
      v-model="bfHowLongDateNow"
      type="date"
      :min-date="bfHowLongminDate"
      :max-date="bfHowLongmaxDate"
      @confirm="bfHowLongdateFn"
      @cancel="bfHowLongDate = false"
    />
    </van-actionsheet>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      adrealName: '',//姓名
      sexmen: true,//性别
      showcontent: false, //添加受益人
      adcertiCode: '',//证件号码
      adsexMF: 'M', //性别
      //与投保人关系
      isShowRelationship: false,
      relationshipName: "请选择",
      //与投保人关系列表
      relationshipList: [
        {
          name: "父母",
          callback: this.relationshipFn
        },
        {
          name: "配偶",
          callback: this.relationshipFn
        },
        {
          name: "子女",
          callback: this.relationshipFn
        },
        {
          name: "其他",
          callback: this.relationshipFn
        }
      ],
      // 受益人出生日期
      bfDate: false,
      bfbirthdayData: "",
      bfDateNow: new Date(), //时间插件
      bfmaxDate: new Date(),
      bfminDate: new Date(1900, 1, 1),
      //证件有效期
      isHowLongTime: false,
      howLongTimeData: '请选择',
      howLongTime: [
        {
          name: "永久有效",
          callback: this.howLongTimeFn
        },
        {
          name: "有效值...",
          callback: this.howLongTimeFnTwo
        }
      ],
      bfHowLongDate: false,
      bfHowLongDateNow: new Date(), //时间插件
      bfHowLongmaxDate: new Date(2900, 1, 1),
      bfHowLongminDate: new Date(),
      //受益人顺序
      isShowOrder: false,
      orderData: "请选择",
      orderDataNm: '',
      beneRate: '', //受益人比例
      roderList: [
        {
          name: "受益人顺序1",
          callback: this.orderFn,
          value: '1'
        },
        {
          name: "受益人顺序2",
          callback: this.orderFn,
          value: '2'
        }
      ]
    };
  },
  methods: {
    // ...mapActions({
    //   addPolicy: "ADDPOLICY",//添加受益人方法
    // }),
    //模块关闭
    addSubmit() {
      console.log(this.showcontent);
      
      let policyBenes = {
        realName: this.adrealName, //姓名
        relationId: this.relationshipName, //于被保人关系
        certiType: '1',  //证件类型身份证 传1
        certiCode: this.adcertiCode, //证件号码
        birthday: this.bfbirthdayData, //出生日期
        gender: this.adsexMF, //客户性别
        certiValidate: this.howLongTimeData, //证件有效期
        beneOrder: this.orderDataNm, //受益人顺序 1 2
        beneRate: this.beneRate, //受益人收益比例
      }
      this.$emit('fetch',policyBenes)
      this.showcontent = false;
      // let policyBenesA = JSON.stringify(policyBenes);
      // console.log(policyBenesA)
      // let policyBenesData = new FormData()
      // policyBenesData.append("policyBenes", policyBenesA);
      // this.addPolicy({
      //   policyBenesData,
      //   successCallback: () => {
      //     this.showcontent = false;
      //   },
      //   failCallback: () => {}
      // });
    },
    //模块打开
    openModle() {
      // console.log(this.showcontent)
      this.showcontent = true;
    },
    //受益人顺序选择方法
    orderFn(item) {
      this.orderData = item.name;
      this.orderDataNm = item.value;
      this.isShowOrder = false;
    },
    //证件有效期
    howLongTimeFn(item){
        this.howLongTimeData = item.name;
        this.isHowLongTime = false
    },
    //证件有效期掉时间插件
    howLongTimeFnTwo(){
      this.bfHowLongDate = true;
      this.isHowLongTime = false
    },
    //有效期的时间插件
    bfHowLongdateFn(item) {
      this.howLongTimeData = item.toISOString().slice(0, 10);
      this.bfHowLongDate = false;
    },
    //受益人出生日期方法
    bfdateFn(item) {
      this.bfbirthdayData = item.toISOString().slice(0, 10);
      this.bfDate = false;
    },
    //与投保人关系选择
    relationshipFn(item) {
      this.relationshipName = item.name;
      this.isShowRelationship = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.add_box {
  width: 100%;
  height: 100%;
  // position: fixed;
  // left: 0;
  // top: 0;
  // z-index: 99;
  .addmen_style {
    width: 100%;
    height: 100%;
  }
}

// 弹出层样式
@import "../style/style.scss";
.box {
  background-color: rgb(231, 231, 245);
  width: 100%;
  height: 100%;
}
.tb_box {
  overflow: hidden;
  position: relative;
  .tb_box_title {
    color: #333333;
    background-color: #fafafa;
    height: 1.2rem;
    font-size: $fontsize;
    line-height: 1.2rem;
    text-align: center;
    margin-top: 0.24rem;
  }
  .tb_min_title {
    font-family: PingFangSC-Regular;
    font-size: 0.35rem;
    line-height: 0.58rem;
    color: #ff6333;
    text-align: center;
    background-color: rgba(255, 99, 51, 0.15);
  }
  .tb_box_content {
    background-color: #ffffff;
    .tb_box_li {
      height: $heightline;
      line-height: $heightline;
      font-size: $fontsize;
      color: $fontcolor;
      position: relative;
      padding-left: 15px;
      display: flex;
      justify-content: space-between;
      .tb_box_date {
        padding-right: 15px;
        line-height: $heightline;
        flex: 0.8;
        .ph_date {
          line-height: $heightline;
          height: $heightline;
          width: 100%;
          font-size: $fontsize;
          background: url(../../static/img/dateicon.svg) no-repeat right center;
          padding-right: 0.8rem;
        }
        p {
          text-align: right;
          padding-right: 0.3rem;
          box-sizing: border-box;
        }
        .tb_box_select {
          line-height: $heightline;
          width: 100%;
          font-size: $fontsize;
          background-color: #fff;
          text-align: right;
          direction: rtl;
          padding-right: 20px;
        }
      }
      .bfSex {
        display: flex;
        justify-content: flex-end;
        p {
          width: 1.6rem;
          border: 1px solid #dddddd;
          height: 0.8rem;
          text-align: center;
          padding: 0;
          line-height: 0.8rem;
          margin-top: 0.3rem;
          margin-left: 0.3rem;
          color: #999999;
          border-radius: 2px;
        }
      }
      .tb_box_date_two {
        padding-right: 15px;
        line-height: $heightline;
        flex: 0.8;
        display: flex;
        justify-content: flex-end;
        input {
          line-height: $heightline;
          font-size: $fontsize;
          text-align: right;
          width: 100%;
        }
      }
      textarea {
        outline: none;
        line-height: $heightline/2;
        font-size: $fontsize;
        width: 95%;
        border: none;
        outline: 0px;
        resize: none;
      }
    }
    .hasline:before {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 0px;
      border-top: 1px solid #dddddd;
      color: #dddddd;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      left: 15px;
      z-index: 2;
    }
    .three:after {
      content: " ";
      display: inline-block;
      height: 6px;
      width: 6px;
      border-width: 2px 2px 0 0;
      border-color: #c8c8cd;
      border-style: solid;
      -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
      transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
      position: relative;
      top: -2px;
      position: absolute;
      top: 50%;
      right: 15px;
      margin-top: -4px;
    }
  }
}
.tb_tk {
  padding: 15px 0 15px 15px;
  display: flex;
  .tb_checked {
    width: 16px;
    height: 16px;
    background: #ffffff;
    border: 1px solid #d0d0d0;
    border-radius: 2px;
    img {
      width: 100%;
    }
  }
  .tb_tk_content {
    padding-left: 5px;
    color: #333333;
    a {
      color: #02ad4d;
    }
  }
}
.tb_button {
  margin-top: 0.24rem;
}
//性别选择的样式
.sex_checked {
    background: rgba(2, 173, 77, 0.1);
    border: 1px solid rgba(2, 173, 77, 0.5);
    color: #02ad4d;
}
</style>