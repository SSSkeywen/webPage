<template>
    <div class="pre_box">
        <section class="pre_message" v-for="(preItem, index) in preContents" :key="index">
            <hgroup class="pre_hgroup">{{ preItem.preTitle }}</hgroup>
            <ul class="pre_ul">
                <li v-for="(item, index) in preItem.precontent" :key="index" :class="item.preaddress">
                    <p :class="item.preaddressleft">{{ item.contentleft }}</p>
                    <div class="pre_content">
                        <p>{{ item.contentright }}</p>
                    </div>
                </li>
            </ul>
        </section>
        <section class="pre_message">
            <hgroup class="pre_hgroup">证件信息</hgroup>
            <ul class="pre_ul_pt">
                <li>
                    <p class="pre_pt_title">1. 投保人张三身份证</p>
                    <div class="pre_pt_content">
                        <div>
                            <img src="../../static/img/sfzicon.png" alt="" srcset="">
                        </div>
                        <div>
                            <img src="../../static/img/sfzicon.png" alt="" srcset="">
                        </div>
                    </div>
                </li>
                <li>
                    <p class="pre_pt_title">2. 被保人李四身份证</p>
                    <div class="pre_pt_content">
                        <div>
                            <img src="../../static/img/sfzicon.png" alt="" srcset="">
                        </div>
                        <div>
                            <img src="../../static/img/sfzicon.png" alt="" srcset="">
                        </div>
                    </div>
                </li>
                <li>
                    <p class="pre_pt_title">3. 受益人王五身份证</p>
                    <div class="pre_pt_content">
                        <div>
                            <img src="../../static/img/sfzicon.png" alt="" srcset="">
                        </div>
                        <div>
                            <img src="../../static/img/sfzicon.png" alt="" srcset="">
                        </div>
                    </div>
                </li>
            </ul>
        </section>
        <div class="tb_button">
          <button @click="buypage">提交</button>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      preContents: [
        {
          preTitle: "投保信息",
          precontent: [
            {
              contentleft: "投保人(即被保人)姓名",
              contentright: "张三"
            },
            {
              contentleft: "证件类型",
              contentright: "身份证"
            },
            {
              contentleft: "证件号码",
              contentright: "123456789012345678"
            },
            {
              contentleft: "证件有效期",
              contentright: "长期有效"
            },
            {
              contentleft: "出生日期",
              contentright: "1968-10-10"
            },
            {
              contentleft: "性别",
              contentright: "女"
            },
            {
              contentleft: "职业",
              contentright: "小类(大类-中类)"
            },
            {
              contentleft: "所在地区",
              contentright: "江苏省-南京市-昌安县"
            },
            {
              contentleft: "详细地址",
              contentright: "江苏省南京市昌安县江南大道22号3楼号101室",
              preaddress: "addressstyle",
              preaddressleft: "addressstyleleft"
            },
            {
              contentleft: "邮政编码",
              contentright: "123456"
            },
            {
              contentleft: "电子邮箱",
              contentright: "13812345678@163.com"
            },
            {
              contentleft: "手机号码",
              contentright: "13812345678"
            },
            {
              contentleft: "续期缴费成功通知方式",
              contentright: "短信"
            },
            {
              contentleft: "各类通知书查询方式",
              contentright: "自助查询"
            }
          ]
        },
        {
          preTitle: "个税信息",
          precontent: [
            {
              contentleft: "单位名称",
              contentright: "太平人寿保险有限公司"
            },
            {
              contentleft: "统一社会信用代码",
              contentright: "91310000710928436A"
            },
            {
              contentleft: "证件号码",
              contentright: "123456789012345678"
            },
            {
              contentleft: "个税征收方式",
              contentright: "单位代扣代缴"
            },
            {
              contentleft: "纳税地",
              contentright: "上海市 上海市 浦东新区"
            },
            {
              contentleft: "纳税分局名称",
              contentright: "上海市税务第三分局"
            }
          ]
        },
        {
          preTitle: "身故受益人信息",
          precontent: [
            {
              contentleft: "身故受益人",
              contentright: "法定受益人"
            }
          ]
        },
        {
          preTitle: "保障方案",
          precontent: [
            {
              contentleft: "交费年限",
              contentright: "交至国家规定退休年龄"
            },
            {
              contentleft: "交费方式",
              contentright: "月交"
            },
            {
              contentleft: "交费金额",
              contentright: "1000 元"
            },
            {
              contentleft: "税延养老A款",
              contentright: "50% | 500元"
            },
            {
              contentleft: "税延养老B款",
              contentright: "40% | 400元"
            },
            {
              contentleft: "税延养老C款",
              contentright: "10% | 100元"
            },
            {
              contentleft: "C款投资时间",
              contentright: "承保日后的下一个交易日"
            }
          ]
        }
      ]
    };
  },
  methods: {
    buypage() {
      this.$router.push({ path: "/buypage" });
    }
  }
};
</script>

<style lang="scss" scoped>
.pre_box {
  background-color: #e7e7f5;
  height: 100%;
  overflow-y: auto;
  .pre_message {
    background: #fff;
    margin-top: 0.37rem;
    box-sizing: border-box;
    font-size: 0.4rem;
    .pre_hgroup {
      width: 100%;
      height: 1.4rem;
      line-height: 1.4rem;
      background: #fafafa;
      color: #333333;
      text-align: center;
    }
    .pre_ul {
      li {
        width: 100%;
        height: 1.1rem;
        line-height: 1.1rem;
        background: #fafafa;
        color: #666;
        display: flex;
        padding: 0 15px;
        box-sizing: border-box;
        justify-content: space-between;
        .pre_content {
          color: #333333;
        }
      }
      li.addressstyle {
        height: auto;
        .addressstyleleft {
          flex: 0.3;
        }
        div {
          flex: 0.6;
          line-height: 0.7rem;
          padding: 0.2rem 0 0 0;
          box-sizing: border-box;
          text-align: right;
        }
      }
    }
    .pre_ul_pt {
      background-color: #e7e7f5;
      li {
        width: 100%;
        padding: 0 15px 15px;
        box-sizing: border-box;
        margin-bottom: 5px;
        background: #fff;
        .pre_pt_title {
          height: 1.4rem;
          line-height: 1.4rem;
          font-size: 0.4rem;
          color: #333333;
        }
        .pre_pt_content {
          display: flex;
          justify-content: space-between;
          flex: 0.43;
          text-align: center;
          position: relative;
          img {
            width: 100%;
          }
        }
      }
    }
  }
  .tb_button {
    margin-top: 0.37rem;
  }
}
</style>