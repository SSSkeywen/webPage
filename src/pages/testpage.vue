<template>
  <div>
      <div class="test_box" v-for="(item, index) in testContents" :key="index">
          <hgroup class="test_hgroup">
              <p class="test_p_one">{{ index+1 }}.</p>
              <p class="test_p_two">{{ item.testTitle }}</p>
            </hgroup>
          <ul class="test_list">
              <li @click="selectAnswerFn(index, indexNm)" class="test_li" v-for="(answerlist, indexNm) in item.testanswerlist" :key="indexNm">
                  <div class="test_checked">
                      <img v-if="answerlist.checkedanswer" :src="selectAnswer" alt="">
                  </div>
                  <p class="test_checked_content">{{ answerlist.answercontent }}</p>
              </li>
          </ul>
      </div>
      <div class="tb_button">
          <button @click="testanswer">提交</button>
      </div>
      <alertWrong ref="alertFn"></alertWrong>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Toast } from "vant";
import alertWrong from "../components/alertWrong.vue";
export default {
  data() {
    return {
      selectAnswer: require("../../static/img/checkedicon.png"), //选择答案的绿色箭头
      testContents: [
        {
          testTitle: "请问您的年龄处于：",
          testanswerlist: [
            {
              answercontent: "A. 30岁以下",
              checkedanswer: "",
              value: "3"
            },
            {
              answercontent: "B. 31-40岁",
              checkedanswer: "",
              value: "7"
            },
            {
              answercontent: "C. 41-50岁",
              checkedanswer: "",
              value: "9"
            },
            {
              answercontent: "D. 51-60岁",
              checkedanswer: "",
              value: "5"
            },
            {
              answercontent: "E. 60岁以上",
              checkedanswer: "",
              value: "1"
            }
          ]
        },
        {
          testTitle:
            "您家庭预计进行投资的资金占家庭现有总资产(不含自住、自用房产及汽车等固定资产)的比例是：",
          testanswerlist: [
            {
              answercontent: "A. 70%以上",
              checkedanswer: "",
              value: "1"
            },
            {
              answercontent: "B. 50%-70%",
              checkedanswer: "",
              value: "3"
            },
            {
              answercontent: "C. 30%－50%",
              checkedanswer: "",
              value: "5"
            },
            {
              answercontent: "D. 10%－30% ",
              checkedanswer: "",
              value: "7"
            },
            {
              answercontent: "E. 10%以下",
              checkedanswer: "",
              value: "9"
            }
          ]
        },
        {
          testTitle:
            "假设有两种不同的投资：投资A预期获得5%的收益，有可能承担非常小的损失；投资B预期获得20%的收益，但有可能面临25%甚至更高的亏损。您将您的投资资产分配为：",
          testanswerlist: [
            {
              answercontent: "A. 全部投资于A",
              checkedanswer: "",
              value: "0"
            },
            {
              answercontent: "B. 大部分投资于A",
              checkedanswer: "",
              value: "3"
            },
            {
              answercontent: "C. 两种投资各一半",
              checkedanswer: "",
              value: "5"
            },
            {
              answercontent: "D. 大部分投资于B",
              checkedanswer: "",
              value: "7"
            },
            {
              answercontent: "E. 全部投资于B",
              checkedanswer: "",
              value: "9"
            }
          ]
        },
        {
          testTitle: "如果您的投资暂时亏损了25%，您会如何操作？",
          testanswerlist: [
            {
              answercontent: "A. 无法承担风险，准备赎回",
              checkedanswer: "",
              value: "2"
            },
            {
              answercontent: "B. 3至6个月内如果还是亏损25%，准备赎回",
              checkedanswer: "",
              value: "4"
            },
            {
              answercontent: "C. 1年之内还是亏损25%，准备赎回",
              checkedanswer: "",
              value: "6"
            },
            {
              answercontent: "D. 2至3年内都可以持有，等待机会",
              checkedanswer: "",
              value: "8"
            },
            {
              answercontent: "E. 长期持有，等待机会",
              checkedanswer: "",
              value: "10"
            }
          ]
        },
        {
          testTitle: "当您进行投资时，您的首要目标是：",
          testanswerlist: [
            {
              answercontent: "A. 资产保值，我不愿意承担任何投资风险",
              checkedanswer: "",
              value: "1"
            },
            {
              answercontent: "B. 尽可能保证本金安全，不在乎收益率比较低",
              checkedanswer: "",
              value: "3"
            },
            {
              answercontent: "C. 投资风险可控的前提下，产生一定收益",
              checkedanswer: "",
              value: "5"
            },
            {
              answercontent: "D. 产生较多的收益，可以承担一定的投资风险",
              checkedanswer: "",
              value: "7"
            },
            {
              answercontent: "E. 实现资产大幅增长，愿意承担很大的投资风险",
              checkedanswer: "",
              value: "9"
            }
          ]
        },
        {
          testTitle: "您的投资经验可以被概括为：",
          testanswerlist: [
            {
              answercontent: "A. 无，一片空白",
              checkedanswer: "",
              value: "0"
            },
            {
              answercontent: "B. 有限，懂一些",
              checkedanswer: "",
              value: "3"
            },
            {
              answercontent: "C. 一般，自修有心得",
              checkedanswer: "",
              value: "5"
            },
            {
              answercontent: "D. 较好，相关专业科班毕业",
              checkedanswer: "",
              value: "7"
            },
            {
              answercontent: "E. 丰富，有专业执照或以此为职业",
              checkedanswer: "",
              value: "9"
            }
          ]
        },
        {
          testTitle: "您用于投资的资金不会用作其它用途的时间段为：",
          testanswerlist: [
            {
              answercontent: "A. 短期—0到1年",
              checkedanswer: "",
              value: "1"
            },
            {
              answercontent: "B. 中期—1到5年",
              checkedanswer: "",
              value: "5"
            },
            {
              answercontent: "C. 长期—5年以上",
              checkedanswer: "",
              value: "7"
            }
          ]
        }
      ],
      answerData: [] //答案数组
    };
  },
  components:{alertWrong},
  created() {
    for (let i = 0; i < this.testContents.length; i++) {
      this.answerData.push("无答案");
    }
  },
  mounted() {
    let answerData = JSON.parse(window.localStorage.getItem("answerData"));
    console.log(answerData);
    if (answerData != "" && answerData != undefined && answerData != null) {
      this.answerData = answerData;
      for (let i = 0; i < answerData.length; i++) {
        for (let j = 0; j < this.testContents[i].testanswerlist.length; j++) {
          if (this.testContents[i].testanswerlist[j].value == answerData[i]) {
            this.testContents[i].testanswerlist[j].checkedanswer = true;
          }
        }
      }
    }
  },
  methods: {
    ...mapActions({
      testanswerFn: "TESTASWER" //答题提交答案页面
    }),
    //选择答案操作
    selectAnswerFn(index, indexNm) {
      // console.log(index + "-" + indexNm);
      for (let i = 0; i < this.testContents[index].testanswerlist.length; i++) {
        this.testContents[index].testanswerlist[i].checkedanswer = false;
      }
      this.testContents[index].testanswerlist[indexNm].checkedanswer = true;
      //   this.answerData.push(index+'-'+indexNm)
      this.answerData.splice(
        index,
        1,
        this.testContents[index].testanswerlist[indexNm].value
      );
    },
    testanswer() {
      console.log(this.answerData);
      for (let item of this.answerData) {
        // console.log(item);
        if (item == "无答案") {
          this.$refs.alertFn.isworngFn("所有的问题都要勾选！");
          return false;
        }
      }
      const toast1 = Toast.loading({
        mask: true,
        message: "提交中...",
        duration: 20000
      });
      window.localStorage.setItem(
        "answerData",
        JSON.stringify(this.answerData)
      );
      let openidList = JSON.parse(window.localStorage.getItem("openidList"));
      let tepagentB = JSON.stringify(openidList.openId);
      // console.log(openidList)

      let answerDataB = this.answerData.join(",");
      console.log(answerDataB);
      let testAswerData = new FormData();
      testAswerData.append("testaswerData", answerDataB);
      testAswerData.append("openId", tepagentB);
      this.testanswerFn({
        testAswerData,
        successCallback: () => {
          toast1.clear();
          this.$router.push({ path: "/resultpage" });
        },
        failCallback: result => {
          toast1.clear();
          this.$dialog.alert({
            message: result
          });
        }
      });
    }
  },
  computed: {
    // userAuthed() {
    //   return this.$store.getters.userAuthed;
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/style.scss";
.test_box {
  font-size: $fontsize;
  padding: 0.66rem 0.4rem 0.66rem 0.66rem;
  position: relative;
  .test_hgroup {
    display: flex;
    margin-bottom: 0.3rem;
    .test_p_one {
      margin-right: 5px;
    }
    .test_p_two {
      line-height: 0.58rem;
      text-align: justify;
    }
  }
  .test_list {
    .test_li {
      margin-bottom: 0.3rem;
      display: flex;
      .test_checked {
        width: 0.55rem;
        height: 0.55rem;
        border: 1px solid #c9c9c9;
        border-radius: 50%;
        margin-right: 5px;
        padding: 0 3px;
        box-sizing: border-box;
        img {
          width: 100%;
          margin-bottom: 2px;
        }
      }
    }
    .test_li:last-child {
      margin-bottom: 0;
    }
  }
}
.test_box::before {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #efeff4;
  color: #efeff4;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}
</style>


