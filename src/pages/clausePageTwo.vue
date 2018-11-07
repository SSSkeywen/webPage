<template>
    <div class="clause-box">
        <section class="clause-content" v-if="isShowPage == '0'">
            <!-- <header>太平保宝税延产品前端展示内容</header> -->
            <ul class="cl-content-list">
                <li class="cl-content-li" v-for="(item, index) in clauseContent" :key="index">
                    <div class="cl-content-title" @click="clauseShowFn(index)">
                        <p>{{ item.firstTitle }}</p>
                        <p><van-icon name="arrow" :class="item.selectStyle" /></p>
                    </div>
                    <ul v-if="item.firstShow" class="cl-list">
                        <li class="cl-list-li" v-for="(itemTwo, indexTwo) in item.inContent" :key="indexTwo">
                            <hgroup><span>{{ itemTwo.secondTitle1 }}</span>{{ itemTwo.secondTitle2 }}</hgroup>
                            <ul class="cl_list_min">
                                <li v-for="(itemThree, indexThree) in itemTwo.secondContenst" :key="indexThree">{{ itemThree.secondContent }}</li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isShowPage: "0",
      clauseTitle: [
        {
          clauseName: "基本条款",
          clauseStyle: "active"
        },
        {
          clauseName: "A账户",
          clauseStyle: ""
        },
        {
          clauseName: "B账户",
          clauseStyle: ""
        },
        {
          clauseName: "C账户",
          clauseStyle: ""
        }
      ],
      //前面的内容条款一的内容
      clauseContent: [
        {
          firstTitle:
            "常见问题",
          firstShow: true,
          selectStyle: "",
          inContent: [
            {
              secondShow: false,
              secondTitle2: "Q：哪些地区可以购买此产品？",
              secondContenst: [
                {
                  secondContent:
                    "A：纳税地：上海市、福建省（含厦门市）和苏州工业园区"
                }
              ]
            },
            {
              secondShow: false,
              secondTitle2: "Q：无论交多少保费都能税前扣除吗？",
              secondContenst: [
                {
                  secondContent:
                    "A：不是的，每个人每月税前扣除的额度上限是按以下标准计算的，建议您购买本产品时不要超过该限额。多交的部分无法进行个税抵扣。"
                },
                {
                  secondContent:
                    "个人：当月工资薪金、连续性劳务报酬收入的6%和1000元，哪个低算哪个。"
                },
                {
                  secondContent:
                    "企业主：当年应税收入的6%和12000元，哪个低算哪个。"
                }
              ]
            },
            {
              secondShow: false,
              secondTitle2: "Q：如何操作个税抵扣？",
              secondContenst: [
                {
                  secondContent: "A：第一步：投保本产品，缴纳首期保费，保单生效；"
                },
                {
                  secondContent:"第二步：当月25日之后从中保信平台下载《个人税收递延型商业养老保信扣除凭证》。如生效日晚于25日，则需在次月25日下载该凭证；"
                },
                {
                  secondContent:"第三步：您需将该凭证与保单信息一同提供给您就职单位的人力资源部门；"
                },
                {
                  secondContent:"第四步：您所在单位将个税递延信息报送税务机关，由单位帮您办理税前扣除有关事项。"
                }
              ]
            },
            {
              secondShow: false,
              secondTitle2: "Q：养老金何时开始领取，怎么领，领多久？",
              secondContenst: [
                {
                  secondContent:
                    "A：被保险人在达到国家规定退休年龄后，可以申请领取养老年金。可选择“终身领、15年领、20年领”三种领取方式，可按月领取或者按年领取。个人身故、发生保险合同约定的全残、罹患25种重大疾病，可一次性领取。"
                }
              ]
            },
            {
              secondShow: false,
              secondTitle2: "Q：领取时怎么纳税？",
              secondContenst: [
                {
                  secondContent:
                    "A：无论您交费期间通过本产品抵扣个税的比例是多少，在退休领取养老金时，统一按照此标准纳税：商业养老金收入的25%部分免税，75%部分按照10%税率纳税"
                }
              ]
            },
            {
              secondShow: false,
              secondTitle2: "Q：如何缴纳保费",
              secondContenst: [
                {
                  secondContent:
                    "A：我公司将从您授权的银行账号中自动扣取首期和续期保费。首期保费缴纳成功日期为当月1日至24日的保单，续期保险费扣费日为从下月开始的每月15日；首期保费缴纳成功日期为当月25日至31日的保单，续期保险费扣费日为从隔月开始的每月15日。"
                }
              ]
            },
            {
              secondShow: false,
              secondTitle2: "Q：如果我以后不想交费了，行不行？",
              secondContenst: [
                {
                  secondContent:
                    "A：可以的，您随时可以中止交费，保单继续有效。您也可以随时恢复交费，但中止交费阶段将无法享受个税抵扣。"
                }
              ]
            },
            {
              secondShow: false,
              secondTitle2: "Q：如果某次交费时，因银行卡余额不足而扣费失败，如何处理？",
              secondContenst: [
                {
                  secondContent:
                    "A：如果在该扣费日因银行卡余额不足而扣费失败，我公司将不再进行补扣。该月将无法享受个税抵扣。"
                }
              ]
            }
          ]
        },
        {
          firstTitle: "投保须知",
          firstShow: true,
          selectStyle: "",
          inContent: [
            {
              secondTitle1: "",
              secondShow: false,
              secondTitle2: "1、	销售区域：",
              secondContenst: [
                {
                  secondContent:
                    "本产品由太平人寿保险有限公司承保，面向全国销售。本公司在港澳台地区、西藏和宁夏未设有分公司，在该地区购买本产品的后续服务可能会受影响。"
                }
              ]
            },
            {
              secondTitle1: "",
              secondShow: false,
              secondTitle2: "2、	投保单的填写：",
              secondContenst: [
                {
                  secondContent:
                    "本（电子）投保单为投保人与保险公司所订立保险合同的组成部分，在填写投保单之前，请仔细阅读投保单的内容并确认条款含义。本投保单应由投保人本人亲自真实、完整填写各项客户信息，且投保填写内容已征得被保险人同意，否则将影响您的合法权益。"
                }
              ]
            },
            {
              secondTitle1: "",
              secondShow: false,
              secondTitle2: "3、	投保人：",
              secondContenst: [
                {
                  secondContent:
                    "16周岁以上，依法交纳个人所得税且投保时年龄未达到国家规定退休年龄（投保人为被保险人本人）"
                }
              ]
            },
            {
              secondTitle1: "",
              secondShow: false,
              secondTitle2: "4、	交费期限：",
              secondContenst: [
                {
                  secondContent:
                    "合同生效日至开始领取养老金前。"
                }
              ]
            },
            {
              secondTitle1: "",
              secondShow: false,
              secondTitle2: "5、	保险期限：",
              secondContenst: [
                {
                  secondContent:
                    "自合同生效至约定的终止时止。"
                }
              ]
            },
            {
              secondTitle1: "",
              secondShow: false,
              secondTitle2: "6、	起售金额：",
              secondContenst: [
                {
                  secondContent:
                    "100元起售，以100元为单位递增，年交总保费不超过12000元。"
                }
              ]
            },
            {
              secondTitle1: "",
              secondShow: false,
              secondTitle2: "7、	被保险人：",
              secondContenst: [
                {
                  secondContent:
                    "投保人为被保险人本人。"
                }
              ]
            },
            {
              secondTitle1: "",
              secondShow: false,
              secondTitle2: "8、	受益人：",
              secondContenst: [
                {
                  secondContent:
                    "养老年金、全残保险金的受益人为被保险人本人，投保人可以指定一人或多人为身故保险金的受益人。"
                }
              ]
            },
            {
              secondTitle1: "",
              secondShow: false,
              secondTitle2: "9、	保单权益转移：",
              secondContenst: [
                {
                  secondContent:
                    "本合同生效后至开始领取养老年金前，投保人可申请将本合同的保单权益全部或部分转移至本公司其他个人税收递延型养老年金保险，或将本合同的保单权益全部转移至其他保险公司的个人税收递延型养老年金保险。"
                }
              ]
            },
            {
              secondTitle1: "",
              secondShow: false,
              secondTitle2: "10、	养老年金转换方式：",
              secondContenst: [
                {
                  secondContent:
                    "养老年金转换领取方式为保证返还账户价值终身月领（年领）、固定期限15/20年月领（年领），在实际领取养老年金后，不得变更养老年金领取方式。"
                }
              ]
            },
            {
              secondTitle1: "",
              secondShow: false,
              secondTitle2: "11、	投保限制：",
              secondContenst: [
                {
                  secondContent:
                    "本公司太平微信平台不销售税延C款产品。"
                }
              ]
            },
            {
              secondTitle1: "",
              secondShow: false,
              secondTitle2: "12、	等待期：",
              secondContenst: [
                {
                  secondContent:
                    "本产品无等待期。"
                }
              ]
            },
            {
              secondTitle1: "",
              secondShow: false,
              secondTitle2: "13、	犹豫期：",
              secondContenst: [
                {
                  secondContent:
                    "本产品犹豫期为0天。"
                }
              ]
            },
            {
              secondTitle1: "",
              secondShow: false,
              secondTitle2: "14、	退保规则：",
              secondContenst: [
                {
                  secondContent:
                    "自保单承保后至开始领取养老年金前，若被保险人未发生保险事故，但被保险人发生本合同所指的重大疾病（行业25种重疾），投保人可以申请解除本合同。"
                },{
                  secondContent:
                    "除上述情形外，投保人不得解除本合同。"
                }
              ]
            },
            {
              secondTitle1: "",
              secondShow: false,
              secondTitle2: "15、	阅读条款：",
              secondContenst: [
                {
                  secondContent:
                    "请确认您已认真阅读产品条款，您了解、同意并确认上述条款内容，特别是保险责任及责任免除的部分。"
                }
              ]
            },
            {
              secondTitle1: "",
              secondShow: false,
              secondTitle2: "16、	保单形式：",
              secondContenst: [
                {
                  secondContent:
                    "本保险提供电子保单合同，根据《中华人民共和国合同法》第十一条规定，数据电文是合法的合同表现形式，电子保单与纸质保单具有同等法律效力。保单承保后，太平人寿将向投保人指定的手机号码，发送电子保单下载地址及密码。"
                }
              ]
            },
            {
              secondTitle1: "",
              secondShow: false,
              secondTitle2: "17、	保密协议：",
              secondContenst: [
                {
                  secondContent:
                    "本公司承诺未经您的同意，不会将您的信息用于其他人身保险公司和第三方机构的销售活动。"
                }
              ]
            },
            {
              secondTitle1: "",
              secondShow: false,
              secondTitle2: "18、	保单查询：",
              secondContenst: [
                {
                  secondContent:
                    "保单承保后，投保人可拨打太平官方客服电话95589查询保单信息、验证保单。"
                }
              ]
            },
            {
              secondTitle1: "",
              secondShow: false,
              secondTitle2: "19、	信息变更：",
              secondContenst: [
                {
                  secondContent:
                    "拨打官方客服电话95589咨询变更信息办理流程，或前往太平人寿就近网点进行办理。"
                }
              ]
            },
            {
              secondTitle1: "",
              secondShow: false,
              secondTitle2: "20、	电子发票：",
              secondContenst: [
                {
                  secondContent:
                    "您可至太平人寿网上营业厅，注册并登录后，在“电子账单”-“增值税电子发票”模块查询并下载电子发票。网上营业厅地址：http://life.cntaiping.com/eservice。"
                }
              ]
            }
          ]
        },
        {
          firstTitle: "投保声明与授权",
          firstShow: true,
          selectStyle: "",
          inContent: [
            {
              secondTitle1: "",
              secondShow: false,
              secondTitle2: "",
              secondContenst: [
                {
                  secondContent:
                    "1、本人对保险条款中关于保险责任、责任免除条款和其他免除贵公司责任的条款、保险责任等待期、保险期间、保险合同犹豫期、保险合同中止或复效、保险合同解除条款、理赔申请资料要求、投保人相关权利义务的条款等内容已经充分了解并且同意遵守。"
                },
                {
                  secondContent:
                    "2．所有保险责任以保险合同所载为准，除由贵公司经正式程序修改或者批注的内容外，其他任何人的口头及书面陈述、报告或合约，贵公司无需负责。"
                },
                {
                  secondContent:
                    "3. 本人授权贵公司在审核本人投保、保全、理赔申请时根据需要委派医师或指定医疗机构安排被保险人进行身体检查，或向任何医生、医院、诊所、农村合作医疗机构、公安机关、保险公司或其他任何组织单位，就有关投保、保全、理赔事宜，查询、复印有关投保人及被保险人的资料或索取其他有关证明文件。 "
                },
                {
                  secondContent: "4. 本人确认以上所做的各项声明和陈述、所提供的与投保申请有关文件均完全属实无误，所有声明、陈述及所提供的文件均可作为贵公司判断是否能够承保的依据并成为保险合同的一部分，若不属实，贵公司可以依法解除本合同。"
                },
                {
                  secondContent: "5. 本人同意提供给中国太平（指中国太平保险集团有限责任公司及其直接或间接控股的公司）的个人资料（包括本单证签署之前提供的以及本人接受中国太平各项服务时产生的信息），可用于中国太平及因服务必要而委托的第三方为本人提供服务及推荐产品，接收信息的主体对上述信息负有保密义务。本条款自本单证签署时生效，具有独立的法律效力，不受合同成立与否及效力状态变化的影响。"
                },
                {
                  secondContent: "6. 本人同意在法律允许的范围内，将本人提供的个人信息和因签署本保险合同而产生的保险信息，贵公司根据本保险合同之需要而查询和收集的相关信息以及履行本保险合同可能涉及的医疗信息授权中国保信通过商业健康保险信息平台进行信息管理及合理利用。本人授权同意上述信息可在贵公司及其他保险公司为本人提供服务时，通过商业健康保险信息平台查询、收集与其提供服务相关的必要信息。同时本人亦授权上述公司在依据行业监管及为实现服务目的之需要而与其他机构进行必要合作的前提下对上述信息进行合理使用及信息共享（包括但不限于：因保险监督管理及风险控制之需要而进行的行业内信息分享；因信息数据使用、存储、下载之需要而与第三方合作机构进行的数据互通；为提高保险服务水平之需要而与医疗卫生和健康管理机构进行的诊疗信息和健康记录的查询和共享；为公共服务之需要与其他政府机构、监管部门、司法机关及第三方信息信用平台进行的信息共享等）。"
                },
                {
                  secondContent:
                    "7.本人同意授权中国保险信息技术管理有限责任公司获取本人在税务系统的扣缴义务人信息用于本人本产品税收优惠权益实现，包括但不限于企业名称、纳税识别码等，涉及收入等敏感信息除外。"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    //条款标题切换
    clauseTitleFn(index) {
      console.log(index);
      for (let item of this.clauseTitle) {
        item.clauseStyle = "";
      }
      this.isShowPage = index;
      this.clauseTitle[index].clauseStyle = "active";
    },
    clauseShowFnTwo(index) {
      console.log(index)
      if (this.clauseContentTwo[index].firstShow) {
        this.clauseContentTwo[index].firstShow = false;
        this.clauseContentTwo[index].selectStyle = "";
      } else {
        this.clauseContentTwo[index].firstShow = true;
        this.clauseContentTwo[index].selectStyle = "aniselect";
      }
    },
    clauseShowFn(index) {
      console.log(index)
      if (this.clauseContent[index].firstShow) {
        this.clauseContent[index].firstShow = false;
        this.clauseContent[index].selectStyle = "aniselect";
      } else {
        this.clauseContent[index].firstShow = true;
        this.clauseContent[index].selectStyle = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.clause-box {
  background: #eee;
  height: 100%;
  overflow-y: auto;
}
.clause-header {
  display: flex;
  height: 1.2rem;
  line-height: 1.2rem;
  li {
    width: 25%;
    text-align: center;
    border-bottom: 1px solid #c1c1c1;
    background: #fff;
    a {
      display: block;
      //   border-right: 1px solid #fff;
      font-size: 0.4rem;
      color: #fff;
      background: #08a439;
      box-sizing: border-box;
      border-right: 1px solid rgba(255,255,255,.3);
    }
    // li:last-child {
    //   a {
    //     border-right: none;
    //   }
    // }
    a.active {
      background: transparent;
      color: #22b22c;
    }
  }
}
.clause-content {
  header {
    text-align: center;
    padding: 15px 2%;
    box-sizing: border-box;
    color: #006cb7;
    font-size: 0.4rem;
  }
  .cl-content-list {
    background: #fff;
    li.cl-content-li {
      border-top: 1px solid #d9d9d9;

      .cl-content-title {
        display: flex;
        // line-height: 1.25rem;
        padding: 15px 2%;
        box-sizing: border-box;
        font-size: 0.4rem;
        justify-content: space-between;
        i {
          color: #666;
          animation: all 0.5s;
        }
        i.aniselect {
          transform: rotateZ(90deg);
        }
      }
    }
    .cl-list {
      padding: 10px 15px;
      box-sizing: border-box;
      border-top: 1px solid #d9d9d9;
      .cl-list-li {
        margin-top: 0.1rem;
      }
      hgroup {
        font-size: 15px;
        margin: 0.1rem 0;
        span {
          font-weight: bold;
        }
      }
      .cl_list_min {
        li {
          text-indent: 2em;
          font-size: 12px;
        }
      }
    }
    .cl-list-two {
      background: #fff;
      width: 100%;
      padding: 0 10px 10px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      table {
        width: 100%;
        tr {
          width: 100%;
          th {
            border-bottom: 1px solid #dddddd;
            border-right: 1px solid #dddddd;
            width: 25%;
            text-align: center;
            padding: 2px 3px;
          }
          th:first-child {
            border-left: 1px solid #dddddd;
          }
          td {
            border-bottom: 1px solid #dddddd;
            border-right: 1px solid #dddddd;
            width: 16.6%;
            text-align: center;
            padding: 2px 3px;
          }
          td:first-child {
            border-left: 1px solid #dddddd;
          }
        }
        tr:first-child {
          th {
            border-top: 1px solid #dddddd;
          }
        }
      }
    }
  }
}
.cl-table {
  background: #fff;
  width: 100%;
  padding: 0 10px 10px;
  box-sizing: border-box;
  table {
    width: 100%;
  }
  tr {
    width: 100%;
    // border-top: 1px solid #dddddd;
    // border-left: 1px solid #dddddd;
    td {
      border-bottom: 1px solid #dddddd;
      border-right: 1px solid #dddddd;
      width: 50%;
      text-align: center;
      padding: 2px 3px;
    }
    td:first-child {
      border-left: 1px solid #dddddd;
    }
  }
  tr:first-child {
    td {
      border-top: 1px solid #dddddd;
    }
  }
}
</style>