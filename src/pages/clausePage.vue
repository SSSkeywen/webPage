<template>
    <div class="clause-box">
        <ul class="clause-header">
            <li v-for="(item, index) in clauseTitle" :key="index" @click="clauseTitleFn(index)">
                <a :class="item.clauseStyle" v-text="item.clauseName"></a>
            </li>
        </ul>
        <section class="clause-content" v-if="isShowPage == '0'">
            <header>个人税收递延型养老年金保险A款（2018）条款 </header>
            <ul class="cl-content-list">
                <!-- <li class="cl-content-li">
                    <div class="cl-content-title">
                        <p>特别提示</p>
                        <p><van-icon name="arrow" /></p>·
                    </div> -->
                    <!-- <div>
                        <p>感谢您选择了太平人寿保险有限公司。</p>
                        <p>为了方便您更好地理解保险条款，我们提供了以下常用的基本名词释义。</p>
                        <p>基本名词释义：</p>
                        <div>
                            <p>投保人:</p>
                            <p>是指与保险公司订立保险合同的人，按照保险合同负有支付保险费的义务。在本合同中以“您”代称。</p>
                        </div>
                        <div>
                            <p>被保险人:</p>
                            <p>在人身保险合同中是指人身受保险合同保障，享有保险金请求权的人。您也可以为自己投保，成为被保险人。</p>
                        </div>
                        <div>
                            <p>受益人:</p>
                            <p>是指人身保险合同中，由被保险人或者您指定的，享有保险金请求权的人。</p>
                        </div>
                        <hgroup>您应当特别注意的事项：</hgroup>
                        <ul>
                            <li>在部分情况下，我们不承担保险责任..................................第七条</li>
                            <li>发生重大疾病情况下，您可以解除保险合同..........................第十六条</li>
                            <li>请您留意产品账户的费用收取.................................账户利益条款</li>
                        </ul>
                        <p>本合同遵循个人税收递延型养老年金保险的相关政策规定，您所支付的保险费在规定额度内允许税前扣除。</p>
                    </div> -->
                <!-- </li> -->
                <li class="cl-content-li" v-for="(item, index) in clauseContent">
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
                <li class="cl-content-li" v-for="(item, index) in clauseContentTwo" :key="index">
                    <div class="cl-content-title" @click="clauseShowFnTwo(index)">
                        <p>{{ item.firstTitle }}</p>
                        <p><van-icon name="arrow" :class="item.selectStyle" /></p>
                    </div>
                    <div v-if="item.firstShow" class="cl-list-two">
                      <p style="text-align: right;">单位：人民币元 </p>
                      <table border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <th>领取年龄（周岁）</th>
                            <th colspan="2">每月领取金额</th>
                            <th>领取年龄（周岁）</th>
                            <th colspan="2">每年领取金额</th>
                        </tr>
                        <tr>
                            <td></td>
                            <td>男性</td>
                            <td>女性</td>
                            <td></td>
                            <td>男性</td>
                            <td>女性</td>
                        </tr>
                        <tr v-for="(itemTwo, indexTwo) in item.inContent" :key="indexTwo">
                          <td v-for="(itemThree, indexThree) in itemTwo.inContmuch" :key="indexThree">{{itemThree}}</td>
                        </tr>
                      </table>
                    </div>
                </li>
            </ul>
        </section>
        <section class="clause-content" v-if="isShowPage == '1'">
            <header>个人税收递延型养老年金保险A款（2018）账户利益条款</header>
            <ul class="cl-content-list">
                <li class="cl-content-li" v-for="(item, index) in clauseContentA" :key="index">
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
            <div class="cl-table">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td>保单年度</td>
                        <td>转出费用收取比例</td>
                    </tr>
                    <tr>
                        <td>第1保单年度</td>
                        <td>3%</td>
                    </tr>
                    <tr>
                        <td>第2保单年度</td>
                        <td>2%</td>
                    </tr>
                    <tr>
                        <td>第3保单年度</td>
                        <td>1%</td>
                    </tr>
                    <tr>
                        <td>第4保单年度及以后</td>
                        <td>0%</td>
                    </tr>
                </table>
            </div>
        </section>
        <section class="clause-content" v-if="isShowPage == '2'">
            <header>个人税收递延型养老年金保险B1款（2018）账户利益条款</header>
            <ul class="cl-content-list">
                <li class="cl-content-li" v-for="(item, index) in clauseContentB" :key="index">
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
            <div class="cl-table">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td>保单年度</td>
                        <td>转出费用收取比例</td>
                    </tr>
                    <tr>
                        <td>第1保单年度</td>
                        <td>3%</td>
                    </tr>
                    <tr>
                        <td>第2保单年度</td>
                        <td>2%</td>
                    </tr>
                    <tr>
                        <td>第3保单年度</td>
                        <td>1%</td>
                    </tr>
                    <tr>
                        <td>第4保单年度及以后</td>
                        <td>0%</td>
                    </tr>
                </table>
            </div>
        </section>
        <section class="clause-content" v-if="isShowPage == '3'">
            <header>个人税收递延型养老年金保险C款（2018）账户利益条款</header>
            <ul class="cl-content-list">
                <li class="cl-content-li" v-for="(item, index) in clauseContentC" :key="index">
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
            <div class="cl-table">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td>保单年度</td>
                        <td>转出费用收取比例</td>
                    </tr>
                    <tr>
                        <td>第1保单年度</td>
                        <td>3%</td>
                    </tr>
                    <tr>
                        <td>第2保单年度</td>
                        <td>2%</td>
                    </tr>
                    <tr>
                        <td>第3保单年度</td>
                        <td>1%</td>
                    </tr>
                    <tr>
                        <td>第4保单年度及以后</td>
                        <td>0%</td>
                    </tr>
                </table>
            </div>
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
          clauseName: "B1账户",
          clauseStyle: ""
        },
        {
          clauseName: "C账户",
          clauseStyle: ""
        }
      ],
      //条款C内容
      clauseContentC: [
        {
          firstShow: true,
          selectStyle: "",
          inContent: [
            {
              secondTitle1: "第1条",
              secondShow: false,
              secondTitle2: " 产品账户",
              secondContenst: [
                {
                  secondContent:
                    "自本合同生效日起至开始领取养老年金之前，我们为您建立产品账户，产品账户下设有投资账户。"
                }
              ]
            },
            {
              secondTitle1: "第2条",
              secondShow: false,
              secondTitle2: " 产品账户价值",
              secondContenst: [
                {
                  secondContent:
                    "自本合同生效日起至开始领取养老年金之前，产品账户价值按如下方法计算："
                },
                {
                  secondContent:
                    "在任意一个工作日，产品账户价值=投资账户的投资单位数×投资单位卖出价。"
                },
                {
                  secondContent:
                    "当发生产品账户注销或产品转换时，产品账户价值按下一个工作日的卖出价计算。"
                }
              ]
            },
            {
              secondTitle1: "第3条",
              secondShow: false,
              secondTitle2: " 投资账户",
              secondContenst: [
                {
                  secondContent:
                    "投资账户是我们依照国家有关法律法规设立、资产单独管理的资金账户。我们根据投资账户的投资策略决定相应的投资组合。投资账户的投资风险完全由您承担。"
                }
              ]
            },
            {
              secondTitle1: "第4条",
              secondShow: false,
              secondTitle2: " 投资账户评估",
              secondContenst: [
                {
                  secondContent:
                    "我们按照国家有关法律法规对投资账户进行评估，确定投资账户资产净值。"
                },
                {
                  secondContent:
                    "投资账户资产净值，是指投资账户下各项资产的价值总和扣除投资账户运作中依照国家有关法律法规应付的各项款项、税金及其他负债后的净值。"
                },
                {
                  secondContent:
                    "正常情况下，我们对每个工作日投资账户的价值评估一次，计算出该账户投资单位买入和卖出价，并且予以公布。"
                }
              ]
            },
            {
              secondTitle1: "第5条",
              secondShow: false,
              secondTitle2: " 投资单位价格",
              secondContenst: [
                {
                  secondContent:
                    "投资账户以投资单位为计量单位。我们根据投资账户评估结果，计算并公布投资单位价格。投资单位价格分为投资单位卖出价和投资单位买入价。"
                },
                {
                  secondContent:
                    "投资单位卖出价是您向我们卖出投资单位时的价格，投资单位卖出价＝（投资账户资产净值－投资账户资产管理费）÷投资账户投资单位数。"
                },
                {
                  secondContent:
                    "投资单位买入价是您向我们买入投资单位时的价格，投资单位买入价＝投资单位卖出价。"
                }
              ]
            },
            {
              secondTitle1: "第6条",
              secondShow: false,
              secondTitle2: " 资产管理费",
              secondContenst: [
                {
                  secondContent:
                    "投资账户资产管理费将于每个工作日根据前一工作日投资账户资产净值的一定比例收取，资产管理费收取比例为1.0%，每次收取的资产管理费金额为："
                },
                {
                  secondContent:
                    "前一工作日投资账户资产净值（距前一工作日的日数/365）1.0%。"
                }
              ]
            },
            {
              secondTitle1: "第7条",
              secondShow: false,
              secondTitle2: " 投资单位数确定",
              secondContenst: [
                {
                  secondContent:
                    "我们按您与我们约定，将您支付的保险费扣除初始费用后的余额或转入该产品账户的金额分配到投资账户购买投资单位。购买的投资单位数按如下公式进行计算："
                },
                {
                  secondContent:
                    "投资单位数=分配至投资账户的金额÷投资账户的投资单位买入价"
                },
                {
                  secondContent:
                    "对于我们收到的保险费，投资单位买入价为我们收到每笔保险费后下一个工作日的买入价。"
                },
                {
                  secondContent:
                    "对于我们收到的转入该产品账户的金额，投资单位买入价为我们收到每笔转入该产品账户的金额后下一个工作日的买入价。"
                }
              ]
            },
            {
              secondTitle1: "第8条",
              secondShow: false,
              secondTitle2: " 暂停或延迟评估和交易",
              secondContenst: [
                {
                  secondContent:
                    "出现下列情况，我们可以暂停或延迟投资账户交易和评估："
                },
                {
                  secondContent:
                    "一、投资账户主要投资的证券市场被关闭或被限制、暂停交易；"
                },
                {
                  secondContent: "二、投资账户的投资对象被暂停交易或计价；"
                },
                {
                  secondContent:
                    "三、如果因我们不能控制的因素导致无法按时对投资账户资产进行评估时，我们可以推迟投资账户的评估。"
                },
                {
                  secondContent:
                    "出现上述情形时，购买投资单位、产品转换、保险金给付或给付产品账户价值等将会顺延，直至上述情形消失。"
                }
              ]
            },
            {
              secondTitle1: "第9条",
              secondShow: false,
              secondTitle2: " 巨额卖出情形的确认及处理方式",
              secondContenst: [
                {
                  secondContent:
                    "投资账户在每个工作日能够卖出的投资单位数以该投资账户投资单位总数的10%为限，未被卖出的投资单位将结转至下一个工作日进行。下一个工作日能够卖出的投资单位数同样受10%的限制。"
                },
                {
                  secondContent:
                    "投资账户发生巨额卖出情形时，我们按当日该投资账户可以卖出的投资单位数占所有卖出申请总和的比例，确定当日您个人能够交易的投资单位数；未卖出的部分可延迟至下一个工作日办理，并以该日的投资单位卖出价计算，但您可在申请卖出时选择将未被卖出的部分予以撤销。"
                },
                {
                  secondContent:
                    "投资账户连续发生巨额卖出情形的，我们可以暂停接受卖出的申请；已经接受的申请可以延缓支付和操作，但不得超过正常支付或操作时间20个工作日，并应当在指定媒体上进行公告。"
                }
              ]
            },
            {
              secondTitle1: "第10条",
              secondShow: false,
              secondTitle2: " 费用收取",
              secondContenst: [
                {
                  secondContent: "1. 初始费用"
                },
                {
                  secondContent:
                    "您支付的每笔保险费，我们按该笔保险费的一定比例收取初始费用，初始费用收取比例为1%。"
                },
                {
                  secondContent:
                    "对于因产品转换而转入的账户金额，我们不收取初始费用，后续支付的保险费将按上述比例收取初始费用。"
                },
                {
                  secondContent: "2. 产品转换费用"
                },
                {
                  secondContent:
                    "您申请将本合同的产品账户价值转移至我们其他个人税收递延型养老年金保险产品时，我们收取的转出费用为0%。"
                },
                {
                  secondContent:
                    "您申请将本合同的产品账户价值转移至其他保险公司的个人税收递延型养老年金保险产品时，我们将申请产品转换时的转出金额按以下比例收取费用。"
                }
              ]
            }
          ]
        }
      ],
      //条款B内容
      clauseContentB: [
        {
          firstShow: true,
          selectStyle: "",
          inContent: [
            {
              secondTitle1: "第1条",
              secondShow: false,
              secondTitle2: " 产品账户",
              secondContenst: [
                {
                  secondContent:
                    "本合同生效后至开始领取养老年金前，我们为您建立产品账户。您支付的保险费或转入的账户金额计入产品账户后，按本合同相关规定进行运作。"
                }
              ]
            },
            {
              secondTitle1: "第2条",
              secondShow: false,
              secondTitle2: " 结算利息",
              secondContenst: [
                {
                  secondContent:
                    "本合同生效后至开始领取养老年金前，我们在每个结算日、产品账户注销或产品转换时对产品账户进行结算。"
                },
                {
                  secondContent:
                    "在每个结算日结算时，我们根据公布的结算利率对产品账户结算利息，并将结算利息等额计入产品账户价值。"
                },
                {
                  secondContent:
                    "在产品账户注销或产品转换时，我们根据保证利率对产品账户结算利息，并将结算利息等额计入产品账户价值。"
                }
              ]
            },
            {
              secondTitle1: "第3条",
              secondShow: false,
              secondTitle2: " 产品账户价值的计算",
              secondContenst: [
                {
                  secondContent:
                    "在本合同开始领取养老年金前，产品账户价值按如下方法计算："
                },
                {
                  secondContent:
                    "1.您每次支付保险费后，产品账户价值按该次支付的保险费扣除初始费用后的余额等额增加；"
                },
                {
                  secondContent:
                    "2. 我们进行账户结算后，产品账户价值按结算利息等额增加；"
                },
                {
                  secondContent:
                    "3. 产品账户价值转入时，产品账户价值按您向该账户转入的金额等额增加；"
                },
                {
                  secondContent:
                    "4. 产品账户价值转出时，产品账户价值按您从该账户转出的金额等额减少，并按转出金额扣除转出费用后的余额转出；"
                },
                {
                  secondContent:
                    "5. 出现本合同约定的其他影响产品账户价值的情形，产品账户价值按约定增加或减少。"
                }
              ]
            },
            {
              secondTitle1: "第4条",
              secondShow: false,
              secondTitle2: " 费用收取",
              secondContenst: [
                {
                  secondContent: "1. 初始费用"
                },
                {
                  secondContent:
                    "您支付的每笔保险费，我们按该笔保险费的一定比例收取初始费用，初始费用收取比例为1%。"
                },
                {
                  secondContent:
                    "对于因产品转换而转入的账户金额，我们不收取初始费用，后续支付的保险费将按上述比例收取初始费用。"
                },
                {
                  secondContent: "2. 产品转换费用"
                },
                {
                  secondContent:
                    "您申请将本合同的产品账户价值转移至我们其他个人税收递延型养老年金保险产品时，我们在前3个保单年度按转出金额的0.5%收取转出费用，自本合同的第4个保单年度起，转出费用为0%。"
                },
                {
                  secondContent:
                    "您申请将本合同的产品账户价值转移至其他保险公司的个人税收递延型养老年金保险产品时，我们将申请产品转换时的转出金额按以下比例收取费用。"
                }
              ]
            }
          ]
        }
      ],
      //条款A内容
      clauseContentA: [
        {
          firstShow: true,
          selectStyle: "",
          inContent: [
            {
              secondTitle1: "第1条",
              secondShow: false,
              secondTitle2: " 产品账户",
              secondContenst: [
                {
                  secondContent:
                    "本合同生效后至开始领取养老年金前，我们为您建立产品账户。您支付的保险费或转入的账户金额计入产品账户后，按本合同相关规定进行运作。"
                }
              ]
            },
            {
              secondTitle1: "第2条",
              secondShow: false,
              secondTitle2: " 结算利息",
              secondContenst: [
                {
                  secondContent:
                    "本合同生效后至开始领取养老年金前，我们在每个结算日、产品账户注销或产品转换时，按保证利率对产品账户结算利息，并将结算利息等额计入产品账户价值。"
                }
              ]
            },
            {
              secondTitle1: "第3条",
              secondShow: false,
              secondTitle2: " 产品账户价值的计算",
              secondContenst: [
                {
                  secondContent:
                    "在本合同开始领取养老年金前，产品账户价值按如下方法计算："
                },
                {
                  secondContent:
                    "1. 您每次支付保险费后，产品账户价值按该次支付的保险费扣除初始费用后的余额等额增加；"
                },
                {
                  secondContent:
                    "2. 我们进行账户结算后，产品账户价值按结算利息等额增加；"
                },
                {
                  secondContent:
                    "3. 产品账户价值转入时，产品账户价值按您向该账户转入的金额等额增加；"
                },
                {
                  secondContent:
                    "4. 产品账户价值转出时，产品账户价值按您从该账户转出的金额等额减少，并按转出金额扣除转出费用后的余额转出；"
                },
                {
                  secondContent:
                    "5. 出现本合同约定的其他影响产品账户价值的情形，产品账户价值按约定增加或减少。"
                }
              ]
            },
            {
              secondTitle1: "第4条",
              secondShow: false,
              secondTitle2: " 费用收取",
              secondContenst: [
                {
                  secondContent: "1. 初始费用"
                },
                {
                  secondContent:
                    "您支付的每笔保险费，我们按该笔保险费的一定比例收取初始费用，初始费用收取比例为1%。"
                },
                {
                  secondContent:
                    "对于因产品转换而转入的账户金额，我们不收取初始费用，后续支付的保险费将按上述比例收取初始费用。"
                },
                {
                  secondContent: "2. 产品转换费用"
                },
                {
                  secondContent:
                    "您申请将本合同的产品账户价值转移至我们其他个人税收递延型养老年金保险产品时，我们在前3个保单年度按转出金额的0.5%收取转出费用，自本合同的第4个保单年度起，转出费用为0%。"
                },
                {
                  secondContent:
                    "您申请将本合同的产品账户价值转移至其他保险公司的个人税收递延型养老年金保险产品时，我们将申请产品转换时的转出金额按以下比例收取费用。"
                }
              ]
            }
          ]
        }
      ],
      //表格内容
      clauseContentTwo: [
        {
          firstTitle:
            "养老年金终身领取标准表（每万元产品账户价值）",
          firstShow: false,
          selectStyle: "",
          inContent: [
            {
              inContmuch: ["45", "38.2", "36.5", "45", "448.3", "428.8"]
            },
            {
              inContmuch: ["46", "38.6", "36.8", "46", "453.1", "432.8"]
            },
            {
              inContmuch: ["47", "39", "37.2", "47", "458.2", "437"]
            },
            {
              inContmuch: ["48", "39.5", "37.6", "48", "463.4", "441.5"]
            },
            {
              inContmuch: ["49", "40", "38", "49", "469", "446.1"]
            },
            {
              inContmuch: ["50", "40.5", "38.4", "50", "474.8", "451"]
            },
            {
              inContmuch: ["51", "41", "38.9", "51", "480.9", "456.1"]
            },
            {
              inContmuch: ["52", "41.6", "39.3", "52", "487.3", "461.5"]
            },
            {
              inContmuch: ["53", "42.2", "39.8", "53", "494.1", "467.2"]
            },
            {
              inContmuch: ["54", "42.8", "40.3", "54", "501.2", "473.1"]
            },
            {
              inContmuch: ["55", "43.5", "40.9", "55", "508.7", "479.3"]
            },
            {
              inContmuch: ["56", "44.1", "41.5", "56", "516.7", "485.9"]
            },
            {
              inContmuch: ["57", "44.9", "42.1", "57", "525.1", "492.8"]
            },
            {
              inContmuch: ["58", "45.7", "42.7", "58", "533.9", "500.1"]
            },
            {
              inContmuch: ["59", "46.5", "43.4", "59", "543.3", "507.7"]
            },
            {
              inContmuch: ["60", "47.4", "44.1", "60", "553.2", "515.8"]
            },
            {
              inContmuch: ["61", "48.3", "44.8", "61", "563.6", "524.3"]
            },
            {
              inContmuch: ["62", "49.2", "45.6", "62", "574.7", "533.2"]
            },
            {
              inContmuch: ["63", "50.3", "46.4", "63", "586.4", "542.5"]
            },
            {
              inContmuch: ["64", "51.4", "47.3", "64", "598.7", "552.4"]
            },
            {
              inContmuch: ["65", "52.5", "48.2", "65", "611.7", "562.8"]
            },
            {
              inContmuch: ["66", "53.7", "49.2", "66", "625.6", "573.7"]
            },
            {
              inContmuch: ["67", "55", "50.2", "67", "640", "585.3"]
            },
            {
              inContmuch: ["68", "56.4", "51.3", "68", "655.4", "597.3"]
            },
            {
              inContmuch: ["69", "57.8", "52.4", "69", "671.7", "610"]
            },
            {
              inContmuch: ["70", "59.4", "53.6", "70", "688.7", "623.4"]
            },
            {
              inContmuch: ["71", "61", "54.8", "71", "706.8", "637.3"]
            },
            {
              inContmuch: ["72", "62.7", "56.1", "72", "725.7", "652"]
            },
            {
              inContmuch: ["73", "64.5", "57.5", "73", "745.5", "667.6"]
            },
            {
              inContmuch: ["74", "66.4", "58.9", "74", "766.8", "683.6"]
            },
            {
              inContmuch: ["75", "68.4", "60.5", "75", "788.5", "700.5"]
            },
            {
              inContmuch: ["76", "70.4", "62.1", "76", "811.5", "718.3"]
            },
            {
              inContmuch: ["77", "72.6", "63.7", "77", "836", "736.6"]
            },
            {
              inContmuch: ["78", "74.9", "65.5", "78", "860.8", "756"]
            },
            {
              inContmuch: ["79", "77.4", "67.3", "79", "887.3", "776.3"]
            },
            {
              inContmuch: ["80", "79.9", "69.2", "80", "915.4", "797.1"]
            },
            {
              inContmuch: ["81", "82.6", "71.2", "81", "943.8", "819.3"]
            },
            {
              inContmuch: ["82", "85.4", "73.3", "82", "974.5", "842.4"]
            },
            {
              inContmuch: ["83", "88.4", "75.5", "83", "1007.1", "866.2"]
            },
            {
              inContmuch: ["84", "91.5", "77.9", "84", "1039.9", "891.8"]
            },
            {
              inContmuch: ["85", "94.9", "80.3", "85", "1075.6", "918.6"]
            }
          ]
        },{
          firstTitle:
            "养老年金固定期限15年领取标准表（每万元产品账户价值）",
          firstShow: false,
          selectStyle: "",
          inContent: [
            {
              inContmuch: ["45", "69.4", "69.5", "45", "820.4", "821.3"]
            },
            {
              inContmuch: ["46", "69.4", "69.5", "46", "820.2", "821.3"]
            },
            {
              inContmuch: ["47", "69.4", "69.5", "47", "820.1", "821.2"]
            },
            {
              inContmuch: ["48", "69.4", "69.5", "48", "819.9", "821.1"]
            },
            {
              inContmuch: ["49", "69.4", "69.5", "49", "819.7", "821"]
            },
            {
              inContmuch: ["50", "69.4", "69.5", "50", "819.5", "820.9"]
            },
            {
              inContmuch: ["51", "69.3", "69.5", "51", "819.3", "820.8"]
            },
            {
              inContmuch: ["52", "69.3", "69.5", "52", "819.1", "820.7"]
            },
            {
              inContmuch: ["53", "69.3", "69.4", "53", "818.8", "820.6"]
            },
            {
              inContmuch: ["54", "69.3", "69.4", "54", "818.6", "820.4"]
            },
            {
              inContmuch: ["55", "69.2", "69.4", "55", "818.3", "820.3"]
            },
            {
              inContmuch: ["56", "69.2", "69.4", "56", "818", "820.1"]
            },
            {
              inContmuch: ["57", "69.2", "69.4", "57", "817.7", "819.9"]
            },
            {
              inContmuch: ["58", "69.1", "69.4", "58", "817.3", "819.6"]
            },
            {
              inContmuch: ["59", "69.1", "69.3", "59", "816.9", "819.4"]
            },
            {
              inContmuch: ["60", "69.1", "69.3", "60", "816.5", "819.1"]
            },
            {
              inContmuch: ["61", "69.0", "69.3", "61", "816", "818.7"]
            },
            {
              inContmuch: ["62", "69.0", "69.2", "62", "815.5", "818.4"]
            },
            {
              inContmuch: ["63", "68.9", "69.2", "63", "814.9", "818"]
            },
            {
              inContmuch: ["64", "68.9", "69.2", "64", "814.2", "817.5"]
            },
            {
              inContmuch: ["65", "68.8", "69.1", "65", "813.5", "817"]
            },
            {
              inContmuch: ["66", "68.7", "69.1", "66", "812.6", "816.3"]
            },
            {
              inContmuch: ["67", "68.6", "69.0", "67", "811.5", "815.6"]
            },
            {
              inContmuch: ["68", "68.5", "68.9", "68", "810.3", "814.8"]
            },
            {
              inContmuch: ["69", "68.4", "68.8", "69", "808.9", "813.9"]
            },
            {
              inContmuch: ["70", "68.2", "68.7", "70", "807.2", "812.8"]
            },
            {
              inContmuch: ["71", "68.0", "68.6", "71", "805.3", "811.5"]
            },
            {
              inContmuch: ["72", "67.8", "68.5", "72", "803", "810"]
            },
            {
              inContmuch: ["73", "67.6", "68.3", "73", "800.4", "808.3"]
            },
            {
              inContmuch: ["74", "67.3", "68.1", "74", "797.5", "806.4"]
            },
            {
              inContmuch: ["75", "67.0", "67.9", "75", "794.2", "804.2"]
            },
            {
              inContmuch: ["76", "66.7", "67.7", "76", "790.7", "801.7"]
            },
            {
              inContmuch: ["77", "66.3", "67.4", "77", "786.9", "798.9"]
            },
            {
              inContmuch: ["78", "65.9", "67.1", "78", "782.9", "796"]
            },
            {
              inContmuch: ["79", "65.6", "66.9", "79", "778.8", "792.8"]
            },
            {
              inContmuch: ["80", "65.2", "66.6", "80", "774.6", "789.5"]
            },
            {
              inContmuch: ["81", "64.8", "66.2", "81", "770.3", "786.1"]
            },
            {
              inContmuch: ["82", "64.4", "65.9", "82", "766.1", "782.6"]
            },
            {
              inContmuch: ["83", "64.0", "65.6", "83", "761.8", "779"]
            },
            {
              inContmuch: ["84", "63.6", "65.3", "84", "757.5", "775.3"]
            },
            {
              inContmuch: ["85", "63.2", "64.9", "85", "753.2", "771.6"]
            }
          ]
        },{
          firstTitle:
            "养老年金固定期限20年领取标准表（每万元产品账户价值）",
          firstShow: false,
          selectStyle: "",
          inContent: [
            {
              inContmuch: ["45", "56.1", "56.3", "45", "663.4", "664.9"]
            },
            {
              inContmuch: ["46", "56.1", "56.3", "46", "663.2", "664.8"]
            },
            {
              inContmuch: ["47", "56.1", "56.3", "47", "662.9", "664.7"]
            },
            {
              inContmuch: ["48", "56.1", "56.2", "48", "662.6", "664.6"]
            },
            {
              inContmuch: ["49", "56", "56.2", "49", "662.3", "664.4"]
            },
            {
              inContmuch: ["50", "56", "56.2", "50", "662", "664.2"]
            },
            {
              inContmuch: ["51", "56", "56.2", "51", "661.7", "664.1"]
            },
            {
              inContmuch: ["52", "55.9", "56.2", "52", "661.3", "663.9"]
            },
            {
              inContmuch: ["53", "55.9", "56.2", "53", "660.9", "663.6"]
            },
            {
              inContmuch: ["54", "55.9", "56.1", "54", "660.5", "663.4"]
            },
            {
              inContmuch: ["55", "55.8", "56.1", "55", "660", "663.1"]
            },
            {
              inContmuch: ["56", "55.8", "56.1", "56", "659.6", "662.8"]
            },
            {
              inContmuch: ["57", "55.7", "56", "57", "659", "662.4"]
            },
            {
              inContmuch: ["58", "55.7", "56", "58", "658.4", "662"]
            },
            {
              inContmuch: ["59", "55.6", "56", "59", "657.8", "661.5"]
            },
            {
              inContmuch: ["60", "55.6", "55.9", "60", "657", "661"]
            },
            {
              inContmuch: ["61", "55.5", "55.9", "61", "656.2", "660.4"]
            },
            {
              inContmuch: ["62", "55.4", "55.8", "62", "655.2", "659.8"]
            },
            {
              inContmuch: ["63", "55.3", "55.7", "63", "654.2", "659"]
            },
            {
              inContmuch: ["64", "55.2", "55.7", "64", "652.9", "658.2"]
            },
            {
              inContmuch: ["65", "55", "55.6", "65", "651.5", "657.2"]
            },
            {
              inContmuch: ["66", "54.9", "55.5", "66", "649.9", "656.1"]
            },
            {
              inContmuch: ["67", "54.7", "55.3", "67", "648.1", "654.8"]
            },
            {
              inContmuch: ["68", "54.5", "55.2", "68", "646", "653.4"]
            },
            {
              inContmuch: ["69", "54.3", "55.1", "69", "643.6", "651.7"]
            },
            {
              inContmuch: ["70", "54.1", "54.9", "70", "640.9", "649.8"]
            },
            {
              inContmuch: ["71", "53.8", "54.7", "71", "637.9", "647.7"]
            },
            {
              inContmuch: ["72", "53.5", "54.5", "72", "634.5", "645.4"]
            },
            {
              inContmuch: ["73", "53.2", "54.2", "73", "630.8", "642.7"]
            },
            {
              inContmuch: ["74", "52.8", "54", "74", "626.7", "639.8"]
            },
            {
              inContmuch: ["75", "52.4", "53.7", "75", "622.4", "636.5"]
            },
            {
              inContmuch: ["76", "52", "53.4", "76", "617.8", "633"]
            },
            {
              inContmuch: ["77", "51.6", "53", "77", "613.1", "629.3"]
            },
            {
              inContmuch: ["78", "51.1", "52.7", "78", "608.3", "625.3"]
            },
            {
              inContmuch: ["79", "50.7", "52.3", "79", "603.5", "621.3"]
            },
            {
              inContmuch: ["80", "50.3", "51.9", "80", "598.6", "617.1"]
            },
            {
              inContmuch: ["81", "49.9", "51.6", "81", "593.8", "612.8"]
            },
            {
              inContmuch: ["82", "49.4", "51.2", "82", "589.1", "608.6"]
            },
            {
              inContmuch: ["83", "49", "50.8", "83", "584.5", "604.3"]
            },
            {
              inContmuch: ["84", "48.6", "50.4", "84", "579.9", "600"]
            },
            {
              inContmuch: ["85", "48.3", "50", "85", "575.5", "595.8"]
            }
          ]
        }
      ],
      //前面的内容条款一的内容
      clauseContent: [
        {
          firstTitle:
            "第1部分 您（投保人）与我们（太平人寿保险有限公司）的合同",
          firstShow: false,
          selectStyle: "",
          inContent: [
            {
              secondTitle1: "第1条",
              secondShow: false,
              secondTitle2: " 保险合同的构成",
              secondContenst: [
                {
                  secondContent:
                    "本合同由以下几个部分构成：保险单及所附基本条款、账户利益条款、投保单（其复印件或电子影像印刷件与正本具有同等效力）、批注，以及经您与我们共同认可的、与本合同有关的其他书面文件。"
                },
                {
                  secondContent:
                    "本合同提供多个产品账户供您选择，有关产品账户利益，请参照账户利益条款。我们将每年至少向您提供一份保单状态报告。"
                }
              ]
            },
            {
              secondTitle1: "第2条",
              secondShow: false,
              secondTitle2: " 投保范围",
              secondContenst: [
                {
                  secondContent:
                    "一、被保险人范围：凡16周岁以上，符合个人税收递延型养老年金保险的相关政策规定，依法支付个人所得税且投保时年龄未达到国家规定退休年龄的个人，可作为本合同的被保险人。"
                },
                {
                  secondContent:
                    "二、投保人范围：本合同的投保人为被保险人本人。"
                },
                {
                  secondContent:
                    "您可直接向我们办理投保事宜，也可委托所在的单位代为办理投保相关事宜。"
                }
              ]
            },
            {
              secondTitle1: "第3条",
              secondShow: false,
              secondTitle2: " 保险合同成立与生效",
              secondContenst: [
                {
                  secondContent: "您提出保险申请、我们同意承保，本合同成立。"
                },
                {
                  secondContent:
                    "合同生效日期在保险单上载明。保单年度以该日期计算。"
                }
              ]
            },
            {
              secondTitle1: "第4条",
              secondShow: false,
              secondTitle2: " 保险期间",
              secondContenst: [
                {
                  secondContent:
                    "本合同的保险期间自本合同生效日零时起至本合同约定的终止时止，并在保险单上载明。"
                }
              ]
            }
          ]
        },
        {
          firstTitle: "第2部分 我们提供哪些保障利益",
          firstShow: false,
          selectStyle: "",
          inContent: [
            {
              secondTitle1: "第5条",
              secondShow: false,
              secondTitle2: " 养老年金开始领取日及领取方式",
              secondContenst: [
                {
                  secondContent:
                    "被保险人在达到国家规定退休年龄后，可以申请领取养老年金，确定养老年金开始领取日及养老年金领取方式。开始领取养老年金后，不得变更养老年金领取方式。养老年金领取方式包括保证返还账户价值终身月领（或年领）、固定期限15（或20）年月领（或年领）。"
                }
              ]
            },
            {
              secondTitle1: "第6条",
              secondShow: false,
              secondTitle2: " 保险责任",
              secondContenst: [
                {
                  secondContent:
                    "在本合同保险期间内且本合同有效，我们按照下列约定承担给付相应保险金的责任："
                },
                {
                  secondContent: "一、养老年金"
                },
                {
                  secondContent:
                    "如果被保险人申请领取养老年金，我们将养老年金开始领取日的产品账户价值，按被保险人选择的养老年金领取方式，根据我们提供的领取标准表确定被保险人月领（或年领）养老年金领取金额（有关领取标准表，请参照本合同附表），并按规定从当期给付的养老年金中扣除对应的应纳税款。被保险人开始领取养老年金后，我们注销产品账户。"
                },
                {
                  secondContent:
                    "我们提供的养老年金领取方式包括保证返还账户价值终身领取、固定期限15（或20）年领取："
                },
                {
                  secondContent: "1. 保证返还账户价值终身领取"
                },
                {
                  secondContent:
                    "如果被保险人在养老年金开始领取日及其后每月或每年的对应日生存，按确定的领取金额领取养老年金，每次领取金额要扣除对应的应纳税款，直至被保险人身故或全残（有关全残定义，请参照本合同第二十四条）。"
                },
                {
                  secondContent:
                    "如果被保险人身故或全残时已领取养老年金总和（扣除应纳税款前）小于养老年金开始领取日的产品账户价值，我们按两者的差额，扣除对应的应纳税款后的余额，向其受益人一次性给付，本合同终止。"
                },
                {
                  secondContent: "2. 固定期限15（或20）年领取"
                },
                {
                  secondContent:
                    "如果被保险人在养老年金开始领取日及其后每月或每年的对应日生存，按确定的领取金额领取养老年金，每次领取金额要扣除对应的应纳税款，直至固定领取期限届满。"
                },
                {
                  secondContent:
                    "如果被保险人在固定领取期限届满前身故或全残，我们按在固定领取期内尚未领取的养老年金之和（扣除应纳税款前），扣除对应的应纳税款后的余额，向其受益人一次性给付，本合同终止。"
                },
                {
                  secondContent: "二、身故保险金"
                },
                {
                  secondContent:
                    "如果被保险人在开始领取养老年金之前身故，且身故发生在60周岁的保险单周年日零时之前，我们给付申请身故保险金时的产品账户价值，并扣除对应的应纳税款，同时按申请身故保险金时的产品账户价值的5%额外给付身故保险金，注销产品账户，本合同终止。"
                },
                {
                  secondContent:
                    "如果被保险人在开始领取养老年金之前身故，且身故发生在60周岁的保险单周年日零时之后，我们给付申请身故保险金时的产品账户价值，并扣除对应的应纳税款，注销产品账户，本合同终止。"
                },
                {
                  secondContent: "三、全残保险金"
                },
                {
                  secondContent:
                    "如果被保险人在开始领取养老年金之前全残，且全残发生在60周岁的保险单周年日零时之前，我们给付申请全残保险金时的产品账户价值，并扣除对应的应纳税款，同时按申请全残保险金时的产品账户价值的5%额外给付全残保险金，注销产品账户，本合同终止。"
                },
                {
                  secondContent:
                    "如果被保险人在开始领取养老年金之前全残，且全残发生在60周岁的保险单周年日零时之后，我们给付申请全残保险金时的产品账户价值，并扣除对应的应纳税款，注销产品账户，本合同终止。"
                }
              ]
            },
            {
              secondTitle1: "第7条",
              secondShow: false,
              secondTitle2: " 责任免除",
              secondContenst: [
                {
                  secondContent:
                    "在开始领取养老年金前，因下列情形之一导致被保险人身故或全残的，我们不承担给付相应保险金的责任："
                },
                {
                  secondContent:
                    "1. 被保险人故意犯罪或抗拒依法采取的刑事强制措施；"
                },
                {
                  secondContent: "2. 被保险人主动吸食或注射毒品；"
                },
                {
                  secondContent:
                    "3. 被保险人自本合同成立之日起二年内自杀，但被保险人自杀时为无民事行为能力人的除外。"
                },
                {
                  secondContent:
                    "发生上述情形导致被保险人身故或全残的，本合同终止，同时注销产品账户，我们向您或其他权利人退还申请给付时的产品账户价值，并按规定扣除对应的应纳税款。"
                }
              ]
            }
          ]
        },
        {
          firstTitle: "第3部分 如何支付保险费",
          firstShow: false,
          selectStyle: "",
          inContent: [
            {
              secondTitle1: "第8条",
              secondShow: false,
              secondTitle2: " 保险费的支付",
              secondContenst: [
                {
                  secondContent:
                    "一、本合同生效后至被保险人达到国家规定退休年龄前，您可按本合同的约定按年或按月支付保险费，具体交费方式和交费标准由您在投保时与我们约定，约定的交费方式和交费标准将在保险单上载明。"
                },
                {
                  secondContent:
                    "二、您可申请变更交费方式或交费标准，变更后，您须按新的交费方式或交费标准支付保险费。"
                },
                {
                  secondContent:
                    "三、您在申请变更交费方式或交费标准时，应填写申请书，并提供下列证明和资料： "
                },
                {
                  secondContent: "1. 保险合同；"
                },
                {
                  secondContent: "2. 申请人的有效身份证件；"
                },
                {
                  secondContent: "3. 申请变更时需要的其他相关材料。"
                },
                {
                  secondContent:
                    "四、上述保险费的交纳事宜，应符合个人税收递延型养老年金保险的相关政策规定。"
                }
              ]
            }
          ]
        },
        {
          firstTitle: "第4部分 如何申请保险金",
          firstShow: false,
          selectStyle: "",
          inContent: [
            {
              secondTitle1: "第9条",
              secondShow: false,
              secondTitle2: " 受益人",
              secondContenst: [
                {
                  secondContent:
                    "除另有约定外，养老年金、全残保险金的受益人为被保险人本人。"
                },
                {
                  secondContent:
                    "您或者被保险人可以指定一人或多人为身故保险金的受益人。"
                },
                {
                  secondContent:
                    "身故保险金的受益人为多人时，可以确定受益顺序和受益份额；如果没有确定份额，各受益人按照相等份额享有受益权。"
                },
                {
                  secondContent:
                    "被保险人为无民事行为能力人或限制民事行为能力人的，可以由其监护人指定受益人。"
                },
                {
                  secondContent:
                    "您或者被保险人可以变更身故保险金的受益人并书面通知我们。我们收到变更受益人的书面通知后，在保险单或其他保险凭证上批注或附贴批单。"
                },
                {
                  secondContent:
                    "您在指定和变更身故保险金的受益人时，必须经过被保险人同意。"
                },
                {
                  secondContent:
                    "被保险人身故后，有下列情形之一的，保险金作为被保险人的遗产，由我们依照《中华人民共和国继承法》的规定履行给付保险金的义务："
                },
                {
                  secondContent:
                    "一、没有指定受益人，或者受益人指定不明无法确定的；"
                },
                {
                  secondContent:
                    "二、受益人先于被保险人身故，没有其他受益人的；"
                },
                {
                  secondContent:
                    "三、受益人依法丧失受益权或者放弃受益权，没有其他受益人的。"
                },
                {
                  secondContent:
                    "受益人与被保险人在同一事件中身故，且不能确定身故先后顺序的，推定受益人身故在先。"
                },
                {
                  secondContent:
                    "受益人故意造成被保险人身故、伤残、疾病的，或者故意杀害被保险人未遂的，该受益人丧失受益权。"
                }
              ]
            },
            {
              secondTitle1: "第10条",
              secondShow: false,
              secondTitle2: " 保险事故通知",
              secondContenst: [
                {
                  secondContent:
                    "您或受益人知道保险事故后应当在10日内通知我们。"
                },
                {
                  secondContent:
                    "如果您或受益人故意或者因重大过失未及时通知，致使保险事故的性质、原因、损失程度等难以确定的， 我们对无法确定的部分，不承担给付保险金的责任，但我们通过其他途径已经及时知道或者应当及时知道保 险事故发生或者虽未及时通知但不影响我们确定保险事故的性质、原因、损失程度的除外。"
                }
              ]
            },
            {
              secondTitle1: "第11条",
              secondShow: false,
              secondTitle2: " 诉讼时效",
              secondContenst: [
                {
                  secondContent:
                    "受益人向我们请求给付保险金的诉讼时效期间为5年，自其知道或者应当知道保险事故发生之日起计算。"
                }
              ]
            },
            {
              secondTitle1: "第12条",
              secondShow: false,
              secondTitle2: " 保险金申请",
              secondContenst: [
                {
                  secondContent: "一、养老年金的申请"
                },
                {
                  secondContent:
                    "在申请养老年金时，由养老年金受益人作为申请人填写保险金给付申请书，并提供下列证明和资料："
                },
                {
                  secondContent: "1. 保险合同；"
                },
                {
                  secondContent: "2. 申请人的有效身份证件；"
                },
                {
                  secondContent: "3. 被保险人已办理退休的有效证明。"
                },
                {
                  secondContent: "二、身故保险金的申请"
                },
                {
                  secondContent:
                    "在申请身故保险金时，由身故保险金的受益人作为申请人填写保险金给付申请书，并提供下列证明和资料："
                },
                {
                  secondContent: "1. 保险合同； "
                },
                {
                  secondContent: "2. 申请人的有效身份证件；  "
                },
                {
                  secondContent:
                    "3. 国务院卫生行政部门规定的医疗机构、公安机关或其他相关机构出具的被保险人的死亡证明； "
                },
                {
                  secondContent:
                    "4. 所能提供的与确认保险事故的性质、原因等有关的其他证明和资料。"
                },
                {
                  secondContent: "三、全残保险金的申请"
                },
                {
                  secondContent:
                    "在申请全残保险金时，由全残保险金的受益人作为申请人填写保险金给付申请书，并提供下列证明和资料："
                },
                {
                  secondContent: "1. 保险合同；"
                },
                {
                  secondContent: "2. 申请人的有效身份证件；"
                },
                {
                  secondContent:
                    "3. 医院或法定伤残鉴定机构出具的被保险人伤残程度鉴定证明文件；"
                },
                {
                  secondContent:
                    "4. 所能提供的与确认保险事故的性质、原因等有关的其他证明和资料。"
                },
                {
                  secondContent:
                    "如果委托他人代为申请，除上述证明和资料外，还须提供相关保险金受益人的授权委托书、受托人有效身份证件等相关证明文件。保险金作为被保险人遗产时，还须提供可证明合法继承权的相关权利文件。受益人或继承人为未成年人或无民事行为能力人时，由其合法监护人代其申请领取保险金，其合法监护人还必须提供受益人或继承人为未成年人或无民事行为能力人的证明和监护人具有合法监护权的证明。以上证明和资料不完整的，我们将及时一次性通知申请人补充提供有关证明和资料。"
                }
              ]
            },
            {
              secondTitle1: "第13条",
              secondShow: false,
              secondTitle2: " 保险金给付",
              secondContenst: [
                {
                  secondContent:
                    "我们在收到保险金给付申请书及合同约定的证明和资料后，将在5个工作日内作出核定；情形复杂的，在30日内作出核定。对属于保险责任的，我们在与受益人达成给付保险金的协议后10日内，履行给付保险金义务。"
                },
                {
                  secondContent:
                    "我们未及时履行前款规定义务的，除支付保险金外，应当赔偿受益人因此受到的损失。"
                },
                {
                  secondContent:
                    "对不属于保险责任的，我们自作出核定之日起3日内向受益人发出拒绝给付保险金通知书并说明理由。"
                },
                {
                  secondContent:
                    "我们在收到保险金给付申请书及有关证明和资料之日起60日内，对给付保险金的数额不能确定的，根据已有证明和资料可以确定的数额先予支付；我们最终确定给付保险金的数额后，将支付相应的差额。"
                }
              ]
            },
            {
              secondTitle1: "第14条",
              secondShow: false,
              secondTitle2: " 失踪处理",
              secondContenst: [
                {
                  secondContent:
                    "在本合同保险期间内且本合同有效，如果被保险人失踪，且经法院宣告死亡，申请人可以向我们申请身故保险金，我们以法院判决宣告之被保险人死亡日为被保险人死亡的日期，并且按本合同中与身故有关的约定处理。如果被保险人被宣告死亡之日在保险期间之外，但有证据证明下落不明之日在本合同有效期内，我们仍承担与身故有关的保险责任，并按合同终止日计算保险金的金额。"
                },
                {
                  secondContent:
                    "如果被保险人在宣告死亡后重新出现或确知其下落，身故保险金受益人应在知道被保险人生还之日起30日内，向我们退还已领取的身故保险金。退还保险金后，本合同的效力由您和我们协商处理。"
                }
              ]
            }
          ]
        },
        {
          firstTitle: "第5部分 您还享有哪些权益",
          firstShow: false,
          selectStyle: "",
          inContent: [
            {
              secondTitle1: "第15条",
              secondShow: false,
              secondTitle2: " 合同内容变更",
              secondContenst: [
                {
                  secondContent:
                    "您与我们协商同意后，有权变更本合同的有关内容，并由我们在保险单或保险凭证上批注，或签订合同变更的书面协议。合同的变更应符合个人税收递延型养老年金保险的相关政策规定。"
                }
              ]
            },
            {
              secondTitle1: "第16条",
              secondShow: false,
              secondTitle2: " 您解除合同的手续及风险",
              secondContenst: [
                {
                  secondContent:
                    "一、本合同生效后，若被保险人发生本合同约定的重大疾病，您可以申请解除本合同。若您在开始领取养老年金前申请解除本合同，我们退还申请解除合同时的产品账户价值，并按税延政策规定扣除对应的应纳税款。若您在开始领取养老年金后申请解除本合同，我们的处理方式如下："
                },
                {
                  secondContent:
                    "1. 如果您选择保证返还账户价值终身月领（或年领）方式，且申请解除合同时已领取养老年金总和（扣除应纳税款前）小于养老年金开始领取日的产品账户价值，我们按两者的差额，扣除对应的应纳税款后的余额，一次性退还。"
                },
                {
                  secondContent:
                    "2. 如果您选择固定期限15（或20）年月领（或年领）方式，我们按在固定领取期内尚未领取的养老年金之和（扣除应纳税款前），扣除对应的应纳税款后的余额，一次性退还。"
                },
                {
                  secondContent: "除上述情形外，您不得解除本合同。"
                },
                {
                  secondContent:
                    "二、您要求解除本合同时，应填写合同解除申请书，并提供下列证明和资料："
                },
                {
                  secondContent: "1. 保险合同；"
                },
                {
                  secondContent: "2. 您的有效身份证件；"
                },
                {
                  secondContent:
                    "3. 医院出具的附有被保险人病理、血液及其他科学方法检验报告等诊断证明文件；"
                },
                {
                  secondContent: "4. 解除合同时需要的其他证明和资料。"
                },
                {
                  secondContent:
                    "如果委托他人代为申请，除上述证明和资料外，还须提供您的授权委托书、受托人有效身份证件等相关证明文件。自我们收到合同解除申请书及上述证明和资料之日起，注销产品账户，本合同终止。"
                }
              ]
            },
            {
              secondTitle1: "第17条",
              secondShow: false,
              secondTitle2: " 产品转换",
              secondContenst: [
                {
                  secondContent:
                    "一、本合同生效后至开始领取养老年金前，您可申请将本合同的产品账户价值转移至我们其他个人税收递延型养老年金保险产品，或转移至其他保险公司的个人税收递延型养老年金保险产品。"
                },
                {
                  secondContent:
                    "二、您在申请产品转换时，应填写申请书，并提供下列证明和资料："
                },
                {
                  secondContent: "1. 保险合同；"
                },
                {
                  secondContent: "2. 您的有效身份证件；"
                },
                {
                  secondContent: "3. 办理产品转换时需要的其他相关材料。"
                },
                {
                  secondContent:
                    "三、我们接受您在其他保险公司投保的符合税延政策规定的个人税收递延型养老年金保险的产品账户价值转入，转入时须符合本合同的相关规定。"
                }
              ]
            }
          ]
        },
        {
          firstTitle: "第6部分 您必须了解的其他事项",
          firstShow: false,
          selectStyle: "",
          inContent: [
            {
              secondTitle1: "第18条",
              secondShow: false,
              secondTitle2: " 明确说明与如实告知",
              secondContenst: [
                {
                  secondContent: "订立本合同时，我们应向您说明本合同的内容。"
                },
                {
                  secondContent:
                    "对保险条款中免除我们责任的条款，我们在订立合同时应当在投保单、保险单或者其他保险凭证上作出足以引起您注意的提示，并对该条款的内容以书面或者口头形式向您作出明确说明，未作提示或者明确说明的，该条款不产生效力。"
                },
                {
                  secondContent:
                    "我们就您和被保险人的有关情况提出询问，您应当如实告知。"
                },
                {
                  secondContent:
                    "如果您故意或者因重大过失未履行前款规定的如实告知义务，足以影响我们决定是否同意承保或者提高保险费率的，我们有权解除本合同。"
                },
                {
                  secondContent:
                    "如果您故意不履行如实告知义务，对于本合同解除前发生的保险事故，我们不承担给付保险金的责任，并不退还保险费。"
                },
                {
                  secondContent:
                    "如果您因重大过失未履行如实告知义务，对保险事故的发生有严重影响的，对于本合同解除前发生的保险事故，我们不承担给付保险金的责任，但应当退还保险费。"
                },
                {
                  secondContent:
                    "我们在合同订立时已经知道您未如实告知的情况的，我们不得解除合同；发生保险事故的，我们承担给付保险金的责任。"
                }
              ]
            },
            {
              secondTitle1: "第19条",
              secondShow: false,
              secondTitle2: " 我们合同解除权的限制",
              secondContenst: [
                {
                  secondContent:
                    "前条规定的合同解除权，自我们知道有解除事由之日起，超过30日不行使而消灭。自本合同成立之日起超过2年的，我们不得解除合同；发生保险事故的，我们承担给付保险金的责任。"
                }
              ]
            },
            {
              secondTitle1: "第20条",
              secondShow: false,
              secondTitle2: " 年龄及性别错误",
              secondContenst: [
                {
                  secondContent: "一、被保险人的年龄以周岁计算。"
                },
                {
                  secondContent:
                    "二、您在申请投保时，应将与有效身份证件相符的被保险人的出生日期、性别在投保单上填明，如果发生错误，我们将按真实年龄和性别进行更改；如果已领取养老年金，将按真实年龄和性别重新计算养老年金领取标准。"
                }
              ]
            },
            {
              secondTitle1: "第21条",
              secondShow: false,
              secondTitle2: " 保险合同的终止",
              secondContenst: [
                {
                  secondContent:
                    "除本合同另有约定外，本合同在发生下列情况之一时自动终止："
                },
                {
                  secondContent: "一、在本合同保险期间内解除本合同的；"
                },
                {
                  secondContent: "二、我们已按本合同的约定履行完毕保险责任的；"
                },
                {
                  secondContent: "三、本合同内约定的其他终止情况。"
                }
              ]
            },
            {
              secondTitle1: "第22条",
              secondShow: false,
              secondTitle2: " 联系方式的变更",
              secondContenst: [
                {
                  secondContent:
                    "为了保障您的权益，如果您的联系方式（如联系地址、联系电话、电子邮箱等）发生变化，请及时通知我们。否则，我们将按已知的最后联系方式与您联系。"
                }
              ]
            },
            {
              secondTitle1: "第23条",
              secondShow: false,
              secondTitle2: " 争议处理",
              secondContenst: [
                {
                  secondContent:
                    "在合同履行过程中，双方发生争议时，可以从下列两种方式中选择一种争议处理方式："
                },
                {
                  secondContent:
                    "一、因履行本合同发生的争议，由双方协商解决，协商不成的，由双方达成仲裁协议通过仲裁解决； "
                },
                {
                  secondContent:
                    "二、因履行本合同发生的争议，由双方协商解决，协商不成的，依法向人民法院起诉。 "
                },
                {
                  secondContent:
                    "如果双方选择仲裁方式，应当达成仲裁协议并明确约定仲裁事项、仲裁机构。"
                }
              ]
            },
            {
              secondTitle1: "第24条",
              secondShow: false,
              secondTitle2: " 全残定义",
              secondContenst: [
                {
                  secondContent:
                    "本合同所指的全残，须满足下列一项或一项以上条件："
                },
                {
                  secondContent: "一、双目永久完全失明的（注1）；"
                },
                {
                  secondContent:
                    "二、两上肢腕关节以上或两下肢踝关节以上缺失的； "
                },
                {
                  secondContent:
                    "三、一上肢腕关节以上及一下肢踝关节以上缺失的；"
                },
                {
                  secondContent:
                    "四、一目永久完全失明及一上肢腕关节以上缺失的；"
                },
                {
                  secondContent:
                    "五、一目永久完全失明及一下肢踝关节以上缺失的；"
                },
                {
                  secondContent: "六、所有四肢关节机能永久完全丧失的（注2）；"
                },
                {
                  secondContent: "七、咀嚼、吞咽机能永久完全丧失的（注3）；"
                },
                {
                  secondContent:
                    "八、中枢神经系统机能或胸、腹部脏器机能极度障碍，终身不能从事任何工作，为维持生命必要的日常生活活动，全需他人扶助的（注4）。"
                },
                {
                  secondContent: "注释："
                },
                {
                  secondContent:
                    "1. 失明包括眼球缺失或摘除，或不能辨别明暗，或仅能辨别眼前手动者，最佳矫正视力低于国际标准视力表0.02，或视野半径小于5度，并由我们指定的有资格的眼科医生出具医疗诊断证明。永久完全是指自上述残疾发生之日起经过180日的所有可能恢复机能的治疗，机能仍然完全丧失。但眼球摘除等明显无法复原之情况，不在此限。"
                },
                {
                  secondContent:
                    "2. 关节机能的丧失是指关节永久完全僵硬或麻痹、或关节不能随意识活动。"
                },
                {
                  secondContent:
                    "3. 咀嚼、吞咽机能的丧失是指由于牙齿以外的原因引起器质障碍或机能障碍，以致不能作咀嚼、吞咽运动，除流质食物外不能摄取或吞咽的状态。"
                },
                {
                  secondContent:
                    "4. 为维持生命必要的日常生活活动，全需他人扶助系指食物摄取、大小便始末、穿脱衣服、起居、步行、入浴等，皆不能自己为之，需要他人帮助。"
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
        this.clauseContent[index].selectStyle = "";
      } else {
        this.clauseContent[index].firstShow = true;
        this.clauseContent[index].selectStyle = "aniselect";
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