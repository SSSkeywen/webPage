<template>
    <div class="tcz_box">
        <header class="tcz_header">
            <img :src="headerImg" width="100%">
            <div class="tcz_title1">
                <p>{{ minHeader }}</p>
                <p>{{allEarnings}}</p>
                <p>{{ isNowTitle }}&nbsp;<span>{{allMoneny}}</span>{{ dwData }}</p>
            </div>  
            <div class="tcz_icon">
                <img :src="iconImg" height="100%">
            </div>
        </header>
        <div class="tcz_section">
            <ul class="tcz_ab" v-if="isShowC">
                <li v-for="(item, index) in earningsList" :key="index">
                    <p>{{ item.earningsName }}</p>
                    <p>{{ item.earningsContent }}</p>
                </li>
            </ul>
            <ul class="tcz_c" v-else>
              <li>
                <p>总领取金额（元）</p>
                <p>{{ totalCOne }}</p>
              </li>
              <li>
                <p>总投入金额（元）</p>
                <p>{{ totalCTwo }}</p>
              </li>
            </ul>
        </div>
        <div class="tcz_footer">
            <div class="tcz_footer_title">
                <div class="lilv">
                    <span class="one"></span>{{ minTitle }}
                </div>
                <div class="lilv">
                    <span class="two"></span>利率
                </div>
            </div>
            <div id="linePoto">

            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      headerImg: require("../../static/img/bg1.png"),
      iconImg: "",
      iconA: require("../../static/img/A.png"),
      iconB: require("../../static/img/B.png"),
      iconC: require("../../static/img/C.png"),
      isShowC: true,
      isNowTitle: '',
      minHeader: "",
      lineXData: [], //折线X轴数据
      accountData: {},
      lineContentData: [], //折线图内容
      earningsList: [],
      allEarnings: "", //累计收益
      allMoneny: "", //
      minTitle: "",
      dwData: '',
    };
  },
  created() {
    // console.log(this.$route.query.id);
    // switch (this.$route.query.id) {
    //   case 0:
    //     this.iconImg = this.iconA;
    //     this.lineXData = ["一月", "二月", "三月", "四月", "五月"]
    //     this.lineContentData = [3.5, 4.8, 4, 3.7, 3.6]
    //     break;
    //   case 1:
    //     this.iconImg = this.iconB;
    //     this.lineXData = ["一月", "二月", "三月", "四月", "五月"]
    //     this.lineContentData = [3.5, 4.8, 4, 3.7, 3.6]
    //     break;
    //   case 2:
    //     this.isShowC = false
    //     this.iconImg = this.iconC;
    //     this.lineXData = ['07','08','09','10','11','12','13','14','15','16']
    //     this.lineContentData = [3.5,4.8, 4, 3.7, 3.6,5.5,3.7, 3.6,5.5,3.6,5.5]
    //     break;
    // }
    this.accountData = JSON.parse(window.localStorage.getItem("account"));
  },
  mounted() {
    this.enterContent();
    this.drawLine();
  },
  methods: {
    //初始数值载入
    enterContent() {
      if (this.$route.query.id == 0) {
        let accountA = this.accountData.mapA;
        console.log(accountA);
        this.iconImg = this.iconA;
        this.minHeader = "累积收益(元)";
        this.allEarnings = accountA.totalDepositAmount;
        this.allMoneny = accountA.universalValue;
        this.minTitle = "近五个月利率表";
        this.isNowTitle = '现有帐户价值：'
        this.dwData = '元'
        this.earningsList = [
          {
            earningsName: "近一月收益（元）",
            earningsContent: accountA.oneMonthProfit
          },
          {
            earningsName: "近一年收益（元）",
            earningsContent: accountA.oneYearProfit
          },
          {
            earningsName: "总领取金额（元）",
            earningsContent: accountA.totalPayAmount
          },
          {
            earningsName: "总投入金额（元）",
            earningsContent: accountA.totalReceiveAmount
          }
        ];
        for (let item of accountA.accountRateInfo) {
          this.lineContentData.push(item.intRate);
        }
        this.lineContentData.reverse();
        let startDateNo = accountA.accountRateInfo[
          accountA.accountRateInfo.length - 1
        ].startDate.slice(5, 7);
        // let startDateNo = '11'
        startDateNo--;
        // console.log(startDateNo++)
        for (let i = 0; i < 5; i++) {
          startDateNo++;
          if (startDateNo > "12") {
            startDateNo = "1";
          }
          // parseInt(accountA.accountRateInfo[accountA.accountRateInfo.length-1].startDate.slice(5,7))++
          this.lineXData.push(startDateNo + "月");
        }
      }
      if (this.$route.query.id == 1) {
        let accountB = this.accountData.mapB;
        console.log(accountB);
        this.iconImg = this.iconB;
        this.minHeader = "累积收益(元)";
        this.allEarnings = accountB.totalDepositAmount;
        this.allMoneny = accountB.universalValue;
        this.minTitle = "近五个月利率表";
        this.isNowTitle = '现有帐户价值：'
        this.dwData = '元'
        // this.lineContentData = [3.5, 4.8, 4, 3.7, 3.6];
        this.earningsList = [
          {
            earningsName: "近一月收益（元）",
            earningsContent: accountB.oneMonthProfit
          },
          {
            earningsName: "近一年收益（元）",
            earningsContent: accountB.oneYearProfit
          },
          {
            earningsName: "总领取金额（元）",
            earningsContent: accountB.totalPayAmount
          },
          {
            earningsName: "总投入金额（元）",
            earningsContent: accountB.totalReceiveAmount
          }
        ];
        for (let item of accountB.accountRateInfo) {
          this.lineContentData.push(item.intRate);
        }
        this.lineContentData.reverse();
        let startDateNo = accountB.accountRateInfo[
          accountB.accountRateInfo.length - 1
        ].startDate.slice(5, 7);
        startDateNo--;
        for (let i = 0; i < 5; i++) {
          startDateNo++;
          if (startDateNo > "12") {
            startDateNo = "1";
          }
          this.lineXData.push(startDateNo + "月");
        }
      }
      if (this.$route.query.id == 2) {
        let accountC = this.accountData.mapC;
        console.log(accountC);
        this.isShowC = false;
        this.iconImg = this.iconC;
        this.minHeader = "现有帐户价值(元)";
        this.isNowTitle = '投资单位数：'
        this.dwData = '份'
        this.minTitle = "近十天单位投资价格";
        this.allEarnings = this.accountData.accountValueC;
        this.allMoneny = accountC.accumunits;
        for (let item of accountC.castPriceInfo) {
          console.log(item.fundPrice);
          this.lineContentData.push(item.fundPrice);
          this.lineXData.push(item.priceDate.slice(8, 10)+'日');
        }
        this.lineContentData.reverse();
        this.lineXData.reverse();
        this.totalCOne = accountC.castTotalPayAmount;
        this.totalCTwo = accountC.castTotalReceiveAmount;
      }
    },
    drawLine() {
      var echarts = require("echarts");
      let myChart = echarts.init(document.getElementById("linePoto"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          position: function(pt) {
            // 固定在顶部//指示框的位置
            return [pt[0], "0%"];
          },
          // 提示框内容
          formatter: "{b}<br/> {c}",
          axisPointer: { type: "none" } //去掉指示线
        },
        grid: {
          top: 10,
          bottom: 10,
          left: 20,
          right: 20,
          containLabel: true
        },
        toolbox: {
          show: false
        },
        xAxis: {
          type: "category",
          // boundaryGap: false,
          data: this.lineXData,
          axisLine: {
            lineStyle: {
              color: "#333",
              width: 2
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#666",
              fontSize: 12
            }
          },
          axisTick: {
            inside: false,
            length: 5
          },
          axisPointer: {
            label: {}
          }
        },
        yAxis: {
          nameGap: 300,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#666",
              fontSize: 12
            }
          },

          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        lineStyle: {
          //折线的颜色渐变

          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            { offset: 0.5, color: "#12AFC1" },
            { offset: 1, color: "#1AC0A5" }
          ])
        },
        series: [
          {
            name: "利率",
            type: "line",
            symbolSize: 8, //圆圈的大小
            smooth: true, //平滑曲线
            lineStyle: {
              normal: { width: 4 }
            },
            itemStyle: {
              //圆圈颜色渐变
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "#12AFC1" },
                  { offset: 1, color: "#1AC0A5" }
                ]
              },
              borderWidth: 2 //圆圈的边
            },

            data: this.lineContentData
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.tcz_box {
  background: #f3f3f5;
  width: 100%;
  height: 100%;
}
.tcz_header {
  position: relative;
  .tcz_title1 {
    position: absolute;
    top: 0.67rem;
    font-size: 0.32rem;
    text-align: center;
    color: #fff;
    width: 100%;
    p:first-child {
      color: rgba(255, 255, 255, 0.63);
    }
    p:nth-child(2) {
      font-size: 0.85rem;
      font-weight: 700;
      margin-top: 0.13rem;
      margin-bottom: 0.27rem;
    }
  }
  .tcz_icon {
    height: 0.8rem;
    position: absolute;
    top: 16%;
  }
}
.tcz_section {
  width: 100%;
  height: 25%;
  margin-top: 0.1rem;
  background-color: #fff;
}
.tcz_ab {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  li {
    width: 50%;
    height: 50%;
    p {
      text-align: center;
      display: block;
      width: 100%;
    }
    p:first-child {
      font-size: 0.32rem;
      color: #9b9b9b;
      margin-top: 0.4rem;
    }
    p:nth-child(2) {
      font-size: 0.64rem;
      color: #fe8c28;
      margin-top: 0.13rem;
    }
  }
}
.tcz_c {
  height: 100%;
  position: relative;
  display: block;
  display: flex;
  li {
    height: 100%;
    width: 50%;
    p {
      text-align: center;
      display: block;
      width: 100%;
    }
    p:first-child {
      font-size: 0.32rem;
      color: #9b9b9b;
      margin-top: 1.5rem;
    }
    p:nth-child(2) {
      font-size: 0.64rem;
      color: #fe8c28;
      margin-top: 0.13rem;
    }
  }
}
.tcz_c:before {
  content: "";
  display: block;
  background-color: #dddddd;
  width: 1px;
  height: 2.1rem;
  position: absolute;
  top: 24%;
  left: 50%;
}
.tcz_ab:first-child:before {
  content: "";
  display: block;
  background-color: #dddddd;
  width: 1px;
  height: 2.2rem;
  position: absolute;
  top: 22%;
  left: 50%;
  transform: scaleX(0.5);
}
.tcz_ab:first-child:after {
  content: "";
  display: block;
  background-color: #dddddd;
  /* border-top: 1px solid #DDDDDD; */
  /* border-top: none; */
  -webkit-box-shadow: 0 -3px 1px #f3f3f5 inset;
  box-shadow: 0 2px 1px #f3f3f5 inset;
  width: 6.43rem;
  height: 1px;
  position: absolute;
  bottom: 50%;
  left: 17%;
}

.tcz_footer {
  margin-top: 0.17rem;
  background-color: #fff;
  height: 50%;
  .tcz_footer_title {
    display: flex;
    justify-content: space-between;
    padding: 0.27rem 0.54rem;
    .lilv {
      position: relative;
      color: #666666;
      span.one {
        display: inline-block;
        background: -webkit-linear-gradient(to top, #2de46f, #008df3);
        background: linear-gradient(to top, #2de46f, #008df3);
        width: 0.08rem;
        margin-right: 0.13rem;
        height: 0.27rem;
      }
      span.two {
        display: inline-block;
        border: 2px solid transparent;
        border-radius: 50%;
        -webkit-border-radius: 50%;
        border-color: #12afc1 #1ac0a5;
        width: 0.16rem;
        height: 0.16rem;
        margin-right: 0.13rem;
      }
    }
  }
}
#linePoto {
  width: 100%;
  height: 80%;
}
</style>