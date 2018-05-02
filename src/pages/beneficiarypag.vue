<template>
  <div class="ben_box">
      <hgroup class="ben_hgroup">
          <p>请选择您保单的身故受益人</p>
      </hgroup>
      <section class="ben_section">
          <hgroup>身故受益人</hgroup>
          <p @click="ispeopleShow=!ispeopleShow">{{ beneficiaryPeople }}</p>    
      </section>
      <section class="ben_sectiontwo" v-if="beneficiaryPeople!='法定受益人'">
          <button class="ben_btn" @click="addbp">添加受益人</button>
      </section>
      <section class="add_box" v-if="ispeopleAdd">
        <ul class="add_box_ul">
          <li class="add_box_li" v-for="(orderItem, index) in orderDataList" :key="index">
            <hgroup>{{ orderItem.orderOne }}</hgroup>
            <ul>
              <li v-for="(orderNumItem, index) in orderItem.orderOneList" :key="index" class="three">
                <p>{{orderNumItem.orderName}}</p>
                <p>比例：{{orderNumItem.orderNum}}%</p>
              </li>
            </ul>
          </li>
        </ul>
      </section>
      <div class="tb_button">
        <button @click="bc_submit">下一步</button>
      </div>
      <!-- 法定受益人和指定受益人选择 -->
      <van-actionsheet v-model="ispeopleShow" :actions="peopleName" cancel-text="取消" />
      <!-- 添加受益人 -->
    <addvf-modelo ref="addModelfn" @fetch="addbenficiary"></addvf-modelo>
  </div>
</template>

<script>
import addvfModelo from '../components/addbfModelo'
import { mapActions } from "vuex";
export default {
  data() {
    return {
      showcontent: false,
      ispeopleShow: false, //法定受益人和指定受益人
      beneficiaryPeople: "法定受益人", //默认为法定受益人
      ispeopleAdd: false, //添加收益人
      addPeopleList: [],
      peopleName: [
        {
          name: "法定受益人",
          callback: this.peopleFn
        },
        {
          name: "指定受益人",
          callback: this.peopleFn
        }
      ],
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
      //受益人顺序
      isShowOrder: false,
      orderData: '请选择',
      roderList: [
        {
          name: "受益人顺序1",
          callback: this.orderFn
        },
        {
          name: "受益人顺序2",
          callback: this.orderFn
        }
      ],
      //受益人顺序内容
      orderDataList: [
        {
          orderOne: '受益顺序 1',
          orderOneList: [
          ]
        },{
          orderOne: '受益顺序 2',
          orderOneList: [
          ]
        }
      ]
    };
  },
  components: {
    addvfModelo
  },
  methods: {
    ...mapActions({
      addPolicy: "ADDPOLICY",//添加受益人方法
    }),
    //增加受益人方法
    addbp() {
      // this.showcontent = !this.showcontent;
      this.$refs.addModelfn.openModle(); 
    },
    //增加收益人
    addbenficiary(policyList){
      console.log(policyList)
      this.addPeopleList.push(policyList)
      let policyListOne = {
        orderName: policyList.realName + ' (' + policyList.relationId + ')',
        orderNum: policyList.beneRate
      }
      if(policyList.beneOrder == '1'){
        this.orderDataList[0].orderOneList.push(policyListOne)
      }else{
        this.orderDataList[1].orderOneList.push(policyListOne)
      }
      this.ispeopleAdd = true
    },
    //受益人选择方法
    peopleFn(item) {
      this.beneficiaryPeople = item.name;
      this.ispeopleShow = false;
    },
    //下一步
    bc_submit() {
      let messageDataList = JSON.parse(window.localStorage.getItem("messageDataList"));
      let messageDataListB = JSON.stringify(messageDataList);
      let policyDataList = JSON.parse(window.localStorage.getItem("policyDataList"));
      let policyDataListB = JSON.stringify(policyDataList);
      let policyBenesA = JSON.stringify(this.addPeopleList);
      let policyBenesData = new FormData()
      policyBenesData.append("policyBenes", policyBenesA);
      policyBenesData.append("messageData", messageDataListB);
      policyBenesData.append("policyData", policyDataListB);
      this.addPolicy({
        policyBenesData,
        successCallback: () => {
          this.$router.push({ path: "/identitycardpage" });
        },
        failCallback: () => {}
      });
      
    }
  }
};
</script>

<style lang="scss" scoped>
.ben_box {
  background-color: rgb(231, 231, 245);
  font-family: PingFangSC-Regular;
  min-height: 100%;
  width: 100%;
  .ben_hgroup {
    background-color: rgba(2, 173, 77, 0.15);
    color: rgb(2, 173, 77);
    text-align: center;
    line-height: 0.68rem;
    font-size: 0.34rem;
  }
  .ben_section {
    height: 2.1rem;
    font-family: PingFangSC-Regular;
    line-height: 2.1rem;
    background: #fff;
    position: relative;
    padding: 0 0.76rem 0 0.66rem;
    font-size: 0.47rem;
    color: #666666;
    display: flex;
    hgroup {
      flex: 1;
    }
    p {
      flex: 1;
      color: #333333;
      text-align: right;
    }
  }
  .ben_sectiontwo {
    height: 2.1rem;
    background: #fff;
    position: relative;
    padding: 0 0.76rem 0 0.66rem;
    display: flex;
    text-align: center;
    padding-top: 0.52rem;
    box-sizing: border-box;
    .ben_btn {
      width: 4.24rem;
      height: 1.06rem;
      border: 1px solid #02ad4d;
      color: #02ad4d;
      border-radius: 1.06rem;
      margin: 0 auto;
      background: #fff;
      font-size: 0.47rem;
    }
  }
  .tb_button {
    button {
      position: fixed;
      bottom: 0;
      z-index: 9;
    }
  }
  .ben_section:after {
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
  .ben_section:before {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #dddddd;
    color: #dddddd;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 10px;
    right: 10px;
    z-index: 2;
  }
}
.addmen_style {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: rgb(231, 231, 245);
  //   .tb_button {
  //     button {
  //       position: inherit;
  //       bottom: 0;
  //     }
  //   }
}

//受益人顺序块
.add_box{
  .add_box_ul{
    .add_box_li{
      background-color: #fff;
      margin-top: 10px;
      hgroup{
        text-align: center;
        background: #FAFAFB;
        color: #333333;
        font-size: 0.42rem;
        line-height: 1.2rem;
      }
      ul{
        li{
          display: flex;
          justify-content: space-between;
          color: #666666;
          font-size: 0.42rem;
          padding: 0 15px;
          height: 1.4rem;
          line-height: 1.4rem;
          position: relative;
          P:last-child{
            padding-right: 15px;
          }
        }
      }
    }
  }
}
//小三角和横线样式
.hasline:before {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
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
      top: 48%;
      right: 15px;
      margin-top: -4px;
    }
</style>


