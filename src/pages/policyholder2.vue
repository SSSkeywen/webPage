<template>
  <div class="box">
    <div class="tb_box">
      <p class="tb_box_title" style="margin-top:0;">投保人(即被保险人)税收信息</p>
      <ul class="tb_box_content">
        <li class="tb_box_li">
          <p>姓（英文或拼音）<span style="color:red;">*</span></p>
          <div class="tb_box_date_two">
            <input type="text" maxlength="100" v-model="nonResidentTax.familyName" @change="nonResidentTax.familyName=nonResidentTax.familyName.replace(/(^[^a-zA-Z]*)|[^a-z A-Z]|([^a-z A-Z]$)/g, '')"  @keyup="nonResidentTax.familyName=nonResidentTax.familyName.replace(/(^[^a-zA-Z]*)|[^a-z A-Z]|([^a-z A-Z]$)/g, '')" placeholder="请输入姓" >
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>名（英文或拼音）<span style="color:red;">*</span></p>
          <div class="tb_box_date_two">
              <input type="text" maxlength="100" @change="nonResidentTax.givenNames=nonResidentTax.givenNames.replace(/(^[^a-zA-Z]*)|[^a-z A-Z]|([^a-z A-Z]$)/g, '')"  @keyup="nonResidentTax.givenNames=nonResidentTax.givenNames.replace(/(^[^a-zA-Z]*)|[^a-z A-Z]|([^a-z A-Z]$)/g, '')" v-model="nonResidentTax.givenNames" placeholder="请输入名"  >
          </div>
        </li>
        </ul>
        <ul class="tb_box_content jianxi">
        <li class="tb_box_li hasline">
          <p>现居地址国（英文或拼音）<span style="color:red;">*</span></p>
          <div class="tb_box_date three">
            <p @click="selectState(1)" :class="nonResidentTax.currentEnCountry=='请选择'?'color-cacaca':''">{{ nonResidentTax.currentEnCountry }}</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>现居地址省（英文或拼音）<span style="color:red;">*</span></p>
          <div class="tb_box_date_two">
            <input v-model="nonResidentTax.currentAddressEn1" @change="nonResidentTax.currentAddressEn1=nonResidentTax.currentAddressEn1.replace(/(^[^a-z0-9A-Z]*)|[^a-z0-9 A-Z]|([^a-z A-Z]$)/g, '')"  @keyup="nonResidentTax.currentAddressEn1=nonResidentTax.currentAddressEn1.replace(/(^[^a-z0-9A-Z]*)|[^a-z0-9 A-Z]|([^a-z0-9 A-Z]$)/g, '')" maxlength="200" type="text" placeholder="请输入省">
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>现居地址市（英文或拼音）<span style="color:red;">*</span></p>
          <div class="tb_box_date_two">
            <input v-model="nonResidentTax.currentAddressEn2" @change="nonResidentTax.currentAddressEn2=nonResidentTax.currentAddressEn2.replace(/(^[^a-z0-9A-Z]*)|[^a-z0-9 A-Z]|([^a-z0-9 A-Z]$)/g, '')"  @keyup="nonResidentTax.currentAddressEn2=nonResidentTax.currentAddressEn2.replace(/(^[^a-z0-9A-Z]*)|[^a-z0-9 A-Z]|([^a-z0-9 A-Z]$)/g, '')" maxlength="200" type="text" placeholder="请输入市">
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>现居地址详细地址（英文或拼音）<span style="color:red;">*</span></p>
          <div class="tb_box_date_two">
          </div>
        </li>
        <li class="tb_box_li hasline-two">
            <textarea  maxlength="500" name="" @change="nonResidentTax.currentAddressEn3=nonResidentTax.currentAddressEn3.replace(/(^[^a-z0-9A-Z]*)|[^a-z0-9 A-Z]|([^a-z0-9 A-Z]$)/g, '')"  @keyup="nonResidentTax.currentAddressEn3=nonResidentTax.currentAddressEn3.replace(/(^[^a-z0-9A-Z]*)|[^a-z0-9 A-Z]|([^a-z0-9 A-Z]$)/g, '')" v-model="nonResidentTax.currentAddressEn3" placeholder="请输入详细地址" id="" cols="30" rows="10"></textarea>
          
        </li>
        </ul>
        <ul class="tb_box_content jianxi" v-if="isChina">
          <li class="tb_box_li hasline">
            <p>现居地址国（中文）</p>
            <div class="tb_box_date three">
              <p @click="selectState(2)" :class="nonResidentTax.currentCountry=='请选择'?'color-cacaca':''">{{ nonResidentTax.currentCountry }}</p>
            </div>
          </li>
          <li class="tb_box_li hasline">
            <p>现居地址省（中文）</p>
            <div class="tb_box_date three">
              <p @click="selectState(3)" :class="nonResidentTax.currentAddress1=='请选择'?'color-cacaca':''">{{ nonResidentTax.currentAddress1 }}</p>
            </div>
          </li>
          <li class="tb_box_li hasline">
            <p>现居地址市（中文）</p>
            <div class="tb_box_date three">
              <p @click="selectState(4)" :class="nonResidentTax.currentAddress2=='请选择'?'color-cacaca':''">{{ nonResidentTax.currentAddress2 }}</p>
            </div>
          </li>
          <li class="tb_box_li hasline">
            <p>现居地址区（中文）</p>
            <div class="tb_box_date three">
              <p @click="selectState(5)" :class="nonResidentTax.currentAddress3=='请选择'?'color-cacaca':''">{{ nonResidentTax.currentAddress3 }}</p>
            </div>
          </li>
          <li class="tb_box_li hasline">
            <p>现居地详细地址（中文）</p>
            <div class="tb_box_date_two">
            </div>
          </li>
          <li class="tb_box_li hasline-two">
              <textarea  maxlength="500" name="" v-model="nonResidentTax.currentAddress4" placeholder="请输入详细地址" id="" cols="30" rows="10"></textarea>
          </li>
        </ul>
        <ul v-else class="tb_box_content jianxi" style="padding-bottom: 0rem;">
          <li class="tb_box_li hasline">
            <p>现居地址国（中文）</p>
            <div class="tb_box_date three">
              <p class="color-cacaca">境外地址不填此项</p>
            </div>
          </li>
        </ul>
        <ul class="tb_box_content jianxi">
        <li class="tb_box_li hasline">
          <p>出生地国（英文或拼音）<span style="color:red;">*</span></p>
          <div class="tb_box_date three">
            <p @click="selectState(6)" :class="nonResidentTax.birthEnCountry=='请选择'?'color-cacaca':''">{{ nonResidentTax.birthEnCountry }}</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>出生地省（英文或拼音）<span style="color:red;">*</span></p>
          <div class="tb_box_date_two">
            <input v-model="nonResidentTax.birthAddressEn1" @change="nonResidentTax.birthAddressEn1=nonResidentTax.birthAddressEn1.replace(/(^[^a-z0-9A-Z]*)|[^a-z0-9 A-Z]|([^a-z0-9 A-Z]$)/g, '')"  @keyup="nonResidentTax.birthAddressEn1=nonResidentTax.birthAddressEn1.replace(/(^[^a-z0-9A-Z]*)|[^a-z0-9 A-Z]|([^a-z0-9 A-Z]$)/g, '')" maxlength="200" type="text" placeholder="请输入省">
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>出生地市（英文或拼音）<span style="color:red;">*</span></p>
          <div class="tb_box_date_two">
            <input v-model="nonResidentTax.birthAddressEn2" @change="nonResidentTax.birthAddressEn2=nonResidentTax.birthAddressEn2.replace(/(^[^a-z0-9A-Z]*)|[^a-z0-9 A-Z]|([^a-z0-9 A-Z]$)/g, '')"  @keyup="nonResidentTax.birthAddressEn2=nonResidentTax.birthAddressEn2.replace(/(^[^a-z0-9A-Z]*)|[^a-z0-9 A-Z]|([^a-z0-9 A-Z]$)/g, '')" maxlength="200" type="text" placeholder="请输入市">
          </div>
        </li>
         <li class="tb_box_li hasline">
          <p>出生地详细地址（英文或拼音）<span style="color:red;">*</span></p>
          <div class="tb_box_date_two">
          </div>
        </li>
        <li class="tb_box_li hasline-two">
            <textarea  maxlength="500" name="" v-model="nonResidentTax.birthAddressEn3" @change="nonResidentTax.birthAddressEn3=nonResidentTax.birthAddressEn3.replace(/(^[^a-z0-9A-Z]*)|[^a-z0-9 A-Z]|([^a-z0-9 A-Z]$)/g, '')"  @keyup="nonResidentTax.birthAddressEn3=nonResidentTax.birthAddressEn3.replace(/(^[^a-z0-9A-Z]*)|[^a-z0-9 A-Z]|([^a-z0-9 A-Z]$)/g, '')" placeholder="请填写详细地址" id="" cols="30" rows="10"></textarea>
          
        </li>
      </ul>
      <!-- 出生地址中文 -->
      <ul v-if="isStarChina" class="tb_box_content jianxi">
        <li class="tb_box_li hasline">
          <p>出生地国（中文）</p>
          <div class="tb_box_date three">
            <p @click="selectState(7)" :class="nonResidentTax.birthCountry=='请选择'?'color-cacaca':''">{{ nonResidentTax.birthCountry }}</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>出生地省（中文）</p>
          <div class="tb_box_date three">
            <p @click="selectState(8)" :class="nonResidentTax.birthAddress1=='请选择'?'color-cacaca':''">{{ nonResidentTax.birthAddress1 }}</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>出生地市（中文）</p>
          <div class="tb_box_date three">
            <p @click="selectState(9)" :class="nonResidentTax.birthAddress2=='请选择'?'color-cacaca':''">{{ nonResidentTax.birthAddress2 }}</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>出生地区（中文）</p>
          <div class="tb_box_date three">
            <p @click="selectState(10)" :class="nonResidentTax.birthAddress3=='请选择'?'color-cacaca':''">{{ nonResidentTax.birthAddress3 }}</p>
          </div>
        </li>
         <li class="tb_box_li hasline">
          <p>出生地详细地址（中文）</p>
          <div class="tb_box_date_two">
          </div>
        </li>
        <li class="tb_box_li hasline-two">
            <textarea  maxlength="500" name="" v-model="nonResidentTax.birthAddress4" placeholder="请填写详细地址" id="" cols="30" rows="10"></textarea>
          
        </li>
      </ul>
      <ul v-else class="tb_box_content jianxi" style="padding-bottom: 0rem;">
        <li class="tb_box_li hasline">
          <p>出生地国（中文）</p>
          <div class="tb_box_date three">
            <p class="color-cacaca">境外地址不填此项</p>
          </div>
        </li>
      </ul>
      <!-- 税收居民国信息 -->
      <ul class="tb_box_content jianxi" v-for="(item, index) in nonResidentTax.taxInfo" :key="index">
        <li class="tb_box_li hasline" style="height:auto;">
          <p style="line-height: initial;
    padding-top: 0.4rem;
    width: 200px;">税收居民国（地区）<span style="color:red;">*</span></p>
          <div class="tb_box_date three">
            <p @click="selectState(11,index)" :class="item.taxCountry=='请选择'?'color-cacaca':''">{{ item.taxCountry }}</p>
          </div>
        </li>
        <li class="tb_box_li hasline">
          <p>居民国（地区）纳税人识别号</p>
          <div class="tb_box_date_two">
            <!-- <input v-model="provinceBirth" maxlength="30" type="text" placeholder="请输入"> -->
          </div>
        </li>
        <li class="tb_box_li">
          <div class="tb_box_date_two" style="flex:1;">
            <input class="padding-left5" v-model="item.taxPayerId" maxlength="200" type="text" placeholder="请输入" style="text-align:left;">
          </div>
        </li>
        <li class="tb_box_li hasline" v-if="item.taxPayerId == ''">
          <p>无居民国（地区）纳税人识别号的原因</p>
          <div class="tb_box_date_two">
            <!-- <input v-model="cityBirth" maxlength="30" type="text" placeholder="请输入"> -->
          </div>
        </li>
        <li class="tb_box_li" v-if="item.taxPayerId == ''">
          <div class="tb_box_date three"  style="flex:1;">
            <p class="padding-left5" @click="noHasWhyShowFn(index)" style="max-width:100%;text-align:left;" :class="item.taxIdNoneReason=='请选择'?'color-cacaca':''">{{ item.taxIdNoneReason }}</p>
          </div>
        </li>
         <li class="tb_box_li hasline" v-if="item.isInputCause&&item.taxPayerId == ''">
          <p>未能取得纳税人识别号的具体原因</p>
          <div class="tb_box_date_two">
          </div>
        </li>
        <li class="tb_box_li " v-if="item.isInputCause&&item.taxPayerId == ''">
            <textarea  maxlength="1000" name="" v-model="item.taxIdNoneNote" placeholder="请输入" id="" cols="30" rows="10"></textarea>
        </li>
      </ul>
    </div>
    <div class="add-btn-style hasline" @click="addList">
      <img :src="newAddIcon" >
    </div>
    <div class="bpclause bp_line">
        <div class="bp_checked" @click="isGreen=!isGreen">
            <img v-if="isGreen" src="../../static/img/checkedicon.png" >
        </div>
        <p class="bp_clause_content">本人确认上述信息的真实、准确和完整，且当这些信息发生变更时，将在30日内通知贵机构，否则本人承担由此造成的不利后果。</p>
    </div>
    <div class="tb_button">
      <button @click="nextpage">下一步</button>
    </div>
    
    <!-- 所在地区 -->
    <van-actionsheet v-model="nowAddress">
    <van-picker
      show-toolbar
      title="标题"
      :columns="columns"
      @cancel="onCancel"
      @confirm="onConfirm"
    />
    </van-actionsheet>
    <van-actionsheet v-model="nowAddressTwo">
    <van-picker
      show-toolbar
      title="标题"
      :columns="columnsStateChinaEn"
      @cancel="onCancel"
      @confirm="onConfirm"
    />
    </van-actionsheet>
    <van-actionsheet v-model="noHasWhyShow" :actions="noHasWhyData" cancel-text="取消" />
    <alertWrong ref="alertFn"></alertWrong>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import alertWrong from "../components/alertWrong.vue";
import { Toast } from "vant";
export default {
  data() {
    return {
      nonResidentTax: {
        familyName: "", //姓（英文或拼音）
        givenNames: "", //名（英文或拼音）
        currentCountry: "请选择", // 现居住地址（中文）国家
        currentCountryCode: "CN", // 现居住地址（中文）国家
        currentAddress1: "请选择", // 现居住地址（中文）省
        currentAddress2: "请选择", // 现居住地址（中文）市
        currentAddress3: "请选择", //现居住地址（中文）区
        currentAddress4: "", // 现居住地址（中文）详细地址
        currentEnCountry: "请选择", // 现居住地址（英文或拼音）国家
        currentEnCountryCode: "", //现居住地址（英文或拼音）国家简写
        currentAddressEn1: "", //现居住地址（英文或拼音）省
        currentAddressEn2: "", // 现居住地址（英文或拼音）市
        currentAddressEn3: "", //现居住地址（英文或拼音）详细地址
        birthCountry: "请选择", // 出生地地址（中文）国家
        birthCountryCode: "CN", // 出生地地址（中文）国家
        birthAddress1: "请选择", // 出生地地址（中文）省
        birthAddress2: "请选择", // 出生地地址（中文）市
        birthAddress3: "请选择", // 出生地地址（中文）区
        birthAddress4: "", // 出生地地址（中文）详细地址
        birthEnCountry: "请选择", // 出生地地址（英文或拼音）国家
        birthEnCountryCode: "", // 出生地地址（英文或拼音）国家简写
        birthAddressEn1: "", // 出生地地址（英文或拼音）省
        birthAddressEn2: "", // 出生地地址（英文或拼音）市
        birthAddressEn3: "", // 出生地地址（英文或拼音）详细地址
        taxInfo: [
          {
            taxCountry: "请选择", // 税收居民国
            taxCountryCode: "", // 税收居民国简写
            taxPayerId: "", // 居民国纳税人识别号
            taxIdNoneReason: "请选择", // 无居民地纳税人识别号原因
            taxIdNoneNote: "", // 未能取得纳税人识别号具体原因
            isInputCause: false //是否录入未取得纳税人识别号的原因
          }
        ]
      },
      taxIndex: "", //无居民地纳税人识别号原因的下标
      selectStateIndex: "", //国家选择下标
      selectStateIndexSs: "", //税收国家选择下标
      addNum: 0, //添加的个数
      shengNum: "", //省的下标
      shiNum: "", //市的下标
      shengNumTwo: "", //省的下标
      shiNumTwo: "", //市的下标
      quNum: "", //区的下标
      isChina: true, //现居地是否是中国
      isStarChina: true, //出生地是否是中国

      isGreen: false, //是否选择同意
      newAddIcon: require("../../static/img/newAddIcon.png"), //
      plicyNameFirst: "", //姓（英文或拼音）
      plicyNameContent: "", //名（英文或拼音）
      stateNow: "", //现居地址国（英文或拼音）
      provinceNow: "", //现居地址省（英文或拼音）
      provinceCity: "", //现居地址市（英文或拼音）
      provinceAddress: "", //现居地详细地址（英文或拼音）
      stateNowChina: "", //现居地址国（中文）
      provinceNowChina: "", //现居地址省（中文）
      provinceCityChina: "", //现居地址市（中文）
      provinceAddressChina: "", //现居地详细地址（中文）
      stateBirth: "", // 出生地国
      provinceBirth: "", //出生地
      cityBirth: "", //出生地
      columns: [
        {
          text: "无"
        }
      ],
      //各个国家的参数
      columnsState: [
        {
          text: "Andorra",
          chanese: "安道尔"
        },
        {
          text: "china",
          chanese: "中国"
        }
      ],
      columnsStateChina: [
        {
          text: "中国",
          chanese: "中国"
        }
      ],
      columnsStateChinaEn: [], //各个国家中英文
      //国内省市区
      getChinaCityAllArray: [],
      columnsProvice: [
        // {
        //   text: "上海市",
        //   textCode: "310000",
        //   cityList: [
        //     {
        //       text: "上海市",
        //       textCode: "310100",
        //       countyList: [
        //         {
        //           text: "徐汇区",
        //           textCode: "310104"
        //         },{
        //           text: "长宁区",
        //           textCode: "310105"
        //         },{
        //           text: "普陀区",
        //           textCode: "310107"
        //         },{
        //           text: "闸北区",
        //           textCode: "310108"
        //         },{
        //           text: "虹口区",
        //           textCode: "310109"
        //         },{
        //           text: "闵行区",
        //           textCode: "310112"
        //         },{
        //           text: "宝山区",
        //           textCode: "310113"
        //         },{
        //           text: "浦东新区",
        //           textCode: "310115"
        //         },{
        //           text: "金山区",
        //           textCode: "310116"
        //         },{
        //           text: "青浦区",
        //           textCode: "310118"
        //         },{
        //           text: "奉贤区",
        //           textCode: "310120"
        //         },{
        //           text: "崇明县",
        //           textCode: "310230"
        //         }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   text: "江苏省",
        //   textCode: "320000",
        //   cityList: [
        //     {
        //       text: "苏州市",
        //       textCode: "320500",
        //       countyList: [
        //         {
        //           text: "苏州工业园区",
        //           textCode: "320599"
        //         }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   text: "福建省",
        //   textCode: "350000",
        //   cityList: [
        //     {
        //       text: "福州市",
        //       textCode: "350100"
        //     },
        //     {
        //       text: "厦门市",
        //       textCode: "350200"
        //     },
        //     {
        //       text: "莆田市",
        //       textCode: "350300"
        //     },
        //     {
        //       text: "三明市",
        //       textCode: "350400"
        //     },
        //     {
        //       text: "泉州市",
        //       textCode: "350500"
        //     },
        //     {
        //       text: "漳州市",
        //       textCode: "350600"
        //     },
        //     {
        //       text: "南平市",
        //       textCode: "350700"
        //     },
        //     {
        //       text: "龙岩市",
        //       textCode: "350800"
        //     },
        //     {
        //       text: "宁德市",
        //       textCode: "350900"
        //     }
        //   ]
        // }
      ],
      nowAddress: false, //英文国家
      nowAddressTwo: false, //中文国家
      nowAddressData: "请选择",
      noHasWhyShow: false,
      noHasWhyData: [
        //为什么没有的原因
        {
          name: "居民国（地区）不发放纳税人识别号",
          value: "1",
          callback: this.taxClick
        },
        {
          name: "账户持有人未能取得纳税人识别号",
          value: "2",
          callback: this.taxClick
        }
      ]
    };
  },
  watch: {
    // familyName: function() {
    // if (this.familyName) {
    //  if (/(^[^a-zA-Z]*)|[^a-z A-Z]|([^a-z A-Z]$)/g.test(this.familyName)) {
    // this.familyName = JSON.stringify(this.familyName)
    // this.familyName.replace(/![^\u4E00-\u9FA5]/g, "");
    // console.log(this.familyName);
    //  callback(new Error('编码不能输入汉字!'));
    //  } else {
    //  callback();
    //  }
    //  }
    // var title = "字符串zifuchuan";
    // var reg = /(^[^a-zA-Z]*)|[^a-z A-Z]|([^a-z A-Z]$)/g;
    // var result = title.replace(reg, "");
    // alert(result);
    // }
  },
  components: { alertWrong },
  created() {
    this.getChinaCityAll();
    this.getNationalityAll({
      successCallback: result => {
        // console.log(result)
        this.columnsState = result;
        for (let item of this.columnsState) {
          item.text = item.countryOrRegionEnglishName;
        }
      },
      failCallback: result => {}
    });
    this.getNationalityAll({
      successCallback: result => {
        this.columnsStateChinaEn = result;
        for (let item of this.columnsStateChinaEn) {
          item.text =
            item.chinesIdiomaticName + "/" + item.countryOrRegionEnglishName;
          if (item.countryOrRegionEnglishName == "China") {
            item.disabled = true;
          }
        }
      },
      failCallback: result => {}
    });
    let policyDataList = JSON.parse(
      window.localStorage.getItem("policyDataList")
    );
    this.nonResidentTax.currentCountry = "中国";
    this.nonResidentTax.currentAddress1 = policyDataList.provinceName;
    this.nonResidentTax.currentAddress2 = policyDataList.cityName;
    this.nonResidentTax.currentAddress3 = policyDataList.districtName;
    this.nonResidentTax.currentAddress4 = policyDataList.addressData;
    if(this.nonResidentTax.currentAddress1 =='上海市'){
      this.nonResidentTax.currentAddress2 = '上海市'
    }
    let nonResidentTax = JSON.parse(
      window.localStorage.getItem("nonResidentTax")
    );
    if (
      nonResidentTax != "" &&
      nonResidentTax != undefined &&
      nonResidentTax != null
    ) {
      this.nonResidentTax = nonResidentTax;
    }
  },
  mounted() {},
  methods: {
    ...mapActions({
      getNationalityAll: "GET_NATIONALITY_ALL", //获取国家码表GET_CHINA_CITY_ALL
      crsIndexFn: "CRS_INDEX", //CRS_INDEX数据提交接口方法
      getChinaCityAllFn: "GET_CHINA_CITY_ALL" //CRS_INDEX数据提交接口方法
    }),
    //获取全国地区
    getChinaCityAll() {
      this.getChinaCityAllFn({
        successCallback: result => {
          this.getChinaCityAllArray = result;
          for (let i = 0; i < result.length; i++) {
            this.getChinaCityAllArray[i].text = result[i].AREA_NAME;
            this.getChinaCityAllArray[i].textCode = result[i].AREA_ID;
            // this.getChinaCityAllArray[i].cityList = []
            // this.getChinaCityAllArray[i].countyList = []
            if (this.getChinaCityAllArray[i].CLASS_ID == "1") {
              this.getChinaCityAllArray[i].cityList = [];
            }
            if (this.getChinaCityAllArray[i].CLASS_ID == "2") {
              this.getChinaCityAllArray[i].countyList = [];
            }
          }
          for (let item of this.getChinaCityAllArray) {
            if (item.CLASS_ID == "1") {
              item.cityList = [];
              this.columnsProvice.push(item);
            }
          }
          for (let j = 0; j < this.getChinaCityAllArray.length; j++) {
            if (this.getChinaCityAllArray[j].CLASS_ID == "2") {
              for (let i = 0; i < this.columnsProvice.length; i++) {
                if (
                  this.columnsProvice[i].AREA_ID ==
                  this.getChinaCityAllArray[j].PARENT_ID
                ) {
                  this.columnsProvice[i].cityList.push(
                    this.getChinaCityAllArray[j]
                  );
                }
              }
            }
          }
          for (let j = 0; j < this.getChinaCityAllArray.length; j++) {
            if (this.getChinaCityAllArray[j].CLASS_ID == "3") {
              for (let i = 0; i < this.columnsProvice.length; i++) {
                for (
                  let z = 0;
                  z < this.columnsProvice[i].cityList.length;
                  z++
                ) {
                  if (
                    this.columnsProvice[i].cityList[z].AREA_ID ==
                    this.getChinaCityAllArray[j].PARENT_ID
                  ) {
                    this.columnsProvice[i].cityList[z].countyList.push(
                      this.getChinaCityAllArray[j]
                    );
                  }
                }
              }
            }
          }

          
        },
        failCallback: result => {}
      });
    },
    //国家选择函数
    selectState(index, indexNum) {
      this.selectStateIndex = index;
      // console.log(index)
      //国家的选择英文
      if (index == "1" || index == "6") {
        this.columns = this.columnsState;
        // console.log(this.columns)
        this.nowAddress = true;
      }
      //国家选择中文
      if (index == "2" || index == "7") {
        this.columns = this.columnsStateChina;
        this.nowAddress = true;
      }
      //国家选择中英文
      // if (index == "11") {
      //   this.columns = this.columnsState;
      // }
      //现居地址省市区中文
      if (index == "3") {
        this.columns = this.columnsProvice;
        this.nowAddress = true;
      }
      if (index == "4") {
        
        
        

        if (this.columnsProvice[this.shengNum] != undefined) {
          this.columns = this.columnsProvice[this.shengNum].cityList;
        } else {
          // this.columns = [];
            let policyDataList = JSON.parse(
            window.localStorage.getItem("policyDataList")
          );
          for(let i = 0; i < this.columnsProvice.length; i ++){
            if(this.columnsProvice[i].textCode == policyDataList.provinceCode ){
              this.columns = this.columnsProvice[i].cityList;
            }
          }
        }
        this.nowAddress = true;
      }
      if (index == "5") {
        if (
          this.columnsProvice[this.shengNum] != undefined &&
          this.columnsProvice[this.shengNum].cityList[this.shiNum] != undefined
        ) {
          this.columns = this.columnsProvice[this.shengNum].cityList[
            this.shiNum
          ].countyList;
        } else {
          // this.columns = [];
          let policyDataList = JSON.parse(
            window.localStorage.getItem("policyDataList")
          );
          for(let i = 0; i < this.columnsProvice.length; i++){
            for(let j = 0; j < this.columnsProvice[i].cityList.length; j++){
              if(this.columnsProvice[i].cityList[j].textCode == policyDataList.cityCode ){
                      this.columns = this.columnsProvice[i].cityList[j].countyList;
                    }
            }
          }
          if(this.nonResidentTax.currentAddress2 == "请选择"){
            this.columns = [];
          }
        }
        this.nowAddress = true;
      }

      //出生地址省市区中文
      if (index == "8") {
        this.columns = this.columnsProvice;
        this.nowAddress = true;
      }
      if (index == "9") {
        // console.log(this.columnsProvice[this.shengNum]);
        if (this.columnsProvice[this.shengNumTwo] != undefined) {
          this.columns = this.columnsProvice[this.shengNumTwo].cityList;
        } else {
          this.columns = [];
        }
        this.nowAddress = true;
      }
      if (index == "10") {
        if (
          this.columnsProvice[this.shengNumTwo] != undefined &&
          this.columnsProvice[this.shengNumTwo].cityList[this.shiNumTwo] !=
            undefined
        ) {
          this.columns = this.columnsProvice[this.shengNumTwo].cityList[
            this.shiNumTwo
          ].countyList;
        } else {
          this.columns = [];
        }
        this.nowAddress = true;
      }

      //税收居民国（地区）
      if (index == "11") {
        console.log(indexNum);
        this.selectStateIndexSs = indexNum;
        this.nowAddressTwo = true;
      }
    },
    onConfirm(value, index) {
      //Toast(`当前值：${value.text}, 当前索引：${index}`);
      if (this.selectStateIndex == "1") {
        this.nonResidentTax.currentEnCountry = value.text;
        this.nonResidentTax.currentEnCountryCode = value.twoBitLetters;
        if (this.nonResidentTax.currentEnCountry == "China") {
          this.nonResidentTax.currentCountry = "中国";
          this.isChina = true;
        } else {
          this.isChina = false;
        }
      }
      //现居地中文国家
      if (this.selectStateIndex == "2") {
        this.nonResidentTax.currentCountry = value.text;
      }

      //现居地址省市区中文
      if (this.selectStateIndex == "3") {
        this.nonResidentTax.currentAddress1 = value.text;
        this.nonResidentTax.currentAddress2 = "请选择";
        this.nonResidentTax.currentAddress3 = "请选择";
        this.shengNum = index;
      }
      if (this.selectStateIndex == "4") {
        this.nonResidentTax.currentAddress2 = value.text;
        this.nonResidentTax.currentAddress3 = "请选择";
        this.shiNum = index;
      }
      if (this.selectStateIndex == "5") {
        this.nonResidentTax.currentAddress3 = value.text;
      }

      //出生地英文国家
      if (this.selectStateIndex == "6") {
        this.nonResidentTax.birthEnCountry = value.text;
        this.nonResidentTax.birthEnCountryCode = value.twoBitLetters;
        if (this.nonResidentTax.birthEnCountry == "China") {
          this.nonResidentTax.birthCountry = "中国";
          this.isStarChina = true;
        } else {
          this.isStarChina = false;
        }
      }
      //出生地英文国家
      if (this.selectStateIndex == "7") {
        this.nonResidentTax.birthCountry = value.text;
      }
      //出生地址省市区中文
      if (this.selectStateIndex == "8") {
        this.nonResidentTax.birthAddress1 = value.text;
        this.nonResidentTax.birthAddress2 = "请选择";
        this.nonResidentTax.birthAddress3 = "请选择";
        this.shengNumTwo = index;
      }
      if (this.selectStateIndex == "9") {
        this.nonResidentTax.birthAddress2 = value.text;
        this.nonResidentTax.birthAddress3 = "请选择";
        this.shiNumTwo = index;
      }
      if (this.selectStateIndex == "10") {
        this.nonResidentTax.birthAddress3 = value.text;
      }

      //税收国家的选择
      if (this.selectStateIndex == "11") {
        this.nonResidentTax.taxInfo[this.selectStateIndexSs].taxCountry =
          value.text;
        this.nonResidentTax.taxInfo[this.selectStateIndexSs].taxCountryCode =
          value.twoBitLetters;
        this.nowAddressTwo = false;
      }
      this.nowAddress = false;
    },
    onCancel() {
      this.nowAddress = false;
      this.nowAddressTwo = false;
    },
    //数据提交
    nextpage() {
      console.log(this.nonResidentTax);
      //判断是否录入姓名
      if (
        this.nonResidentTax.familyName == "请选择" ||
        this.nonResidentTax.givenNames == ""
      ) {
        this.$refs.alertFn.isworngFn("请录入姓(英文或拼音)或名(英文或拼音)！");
        return false;
      }
      //判断是否录入现居地址 (英文或拼音)
      if (
        this.nonResidentTax.currentEnCountry == "请选择" ||
        this.nonResidentTax.currentAddressEn1 == "" ||
        this.nonResidentTax.currentAddressEn2 == "" ||
        this.nonResidentTax.currentAddressEn3 == ""
      ) {
        this.$refs.alertFn.isworngFn("请录入完整的现居地址 (英文或拼音)！");
        return false;
      }
      //当录入中国时必须录入详细省市区
      if (
        this.nonResidentTax.currentEnCountry == "China" &&
        (this.nonResidentTax.currentCountry == "" ||
          this.nonResidentTax.currentAddress1 == "请选择" ||
          this.nonResidentTax.currentAddress2 == "请选择" ||
          this.nonResidentTax.currentAddress4 == "")
      ) {
        this.$refs.alertFn.isworngFn(
          "境内地址，请录入完整的现居住地址（中文）！"
        );
        return false;
      } else {
      }
      //判断是否录入出生地(英文或拼音)
      if (
        this.nonResidentTax.birthEnCountry == "请选择" ||
        this.nonResidentTax.birthAddressEn1 == "" ||
        this.nonResidentTax.birthAddressEn2 == "" ||
        this.nonResidentTax.birthAddressEn3 == ""
      ) {
        this.$refs.alertFn.isworngFn(
          "请录入出生地 (英文或拼音)的国家、省、市！"
        );
        return false;
      }
      //当录入中国时必须录入详细省市区
      if (
        this.nonResidentTax.birthEnCountry == "China" &&
        (this.nonResidentTax.birthCountry == "" ||
          this.nonResidentTax.birthAddress1 == "请选择" ||
          this.nonResidentTax.birthAddress2 == "请选择" ||
          this.nonResidentTax.birthAddress4 == "")
      ) {
        // console.log(this.nonResidentTax.birthCountry )
        // console.log(this.nonResidentTax.birthAddress1 )
        // console.log(this.nonResidentTax.birthAddress2 )
        // console.log(this.nonResidentTax.birthAddress4 )
        this.$refs.alertFn.isworngFn("境内地址，请录入完整的出生地（中文）！");
        return false;
      }
      for (let item of this.nonResidentTax.taxInfo) {
        if (item.taxCountry == "请选择") {
          this.$refs.alertFn.isworngFn("请录入税收居民国（地区）！");
          return false;
        }
        if (item.taxPayerId == "" && item.taxIdNoneReason == "请选择") {
          this.$refs.alertFn.isworngFn(
            "税收居民国（地区）纳税人识别号和无税收居民国（地区）纳税人识别号的原因两者必录其一"
          );
          return false;
        }

        if (
          item.taxIdNoneReason == "账户持有人未能取得纳税人识别号" &&
          item.taxIdNoneNote == ""
        ) {
          this.$refs.alertFn.isworngFn(
            "请录入未能取得纳税人识别号的具体原因！"
          );
          return false;
        }
        if (
          item.taxPayerId != "" &&
          item.taxPayerId != undefined &&
          item.taxPayerId != null
        ) {
          // console.log(item.taxPayerId)
          item.taxIdNoneReason = "";
          item.taxIdNoneNote = "";
        }
        console.log(this.nonResidentTax.taxInfo);
        if (item.taxPayerId != "") {
          item.taxIdNoneReason == "";
        }
        if (item.taxIdNoneReason == "请选择") {
          item.taxIdNoneReason = "";
        }
      }

      //判断是否本人已经确认
      if (!this.isGreen) {
        this.$refs.alertFn.isworngFn(
          "请先勾选《非居民金融账户涉税信息表》声明！"
        );
        return false;
      }

      // let messageDataList = JSON.parse(
      //   window.localStorage.getItem("messageDataList")
      // );
      // let messageDataListB = JSON.stringify(messageDataList);
      // if (this.plicyName == "") {
      //   this.$refs.alertFn.isworngFn(" 用户名不能为空！");
      //   return false;
      // }
      if (this.nonResidentTax.currentEnCountry != "China") {
        this.nonResidentTax.currentCountry = ""; // 现居住地址（中文）国家
        this.nonResidentTax.currentCountryCode = ""; // 现居住地址（中文）国家
        this.nonResidentTax.currentAddress1 = ""; // 现居住地址（中文）省
        this.nonResidentTax.currentAddress2 = ""; // 现居住地址（中文）市
        this.nonResidentTax.currentAddress3 = ""; //现居住地址（中文）区
        this.nonResidentTax.currentAddress4 = "";
      }

      if (this.nonResidentTax.birthEnCountry != "China") {
        this.nonResidentTax.birthCountry = ""; // 现居住地址（中文）国家
        this.nonResidentTax.birthCountryCode = ""; // 现居住地址（中文）国家
        this.nonResidentTax.birthAddress1 = ""; // 现居住地址（中文）省
        this.nonResidentTax.birthAddress2 = ""; // 现居住地址（中文）市
        this.nonResidentTax.birthAddress3 = ""; //现居住地址（中文）区
        this.nonResidentTax.birthAddress4 = "";
      }

      if (this.nonResidentTax.birthAddress1 == "请选择") {
        this.nonResidentTax.birthAddress1 = "";
      }
      if (this.nonResidentTax.birthAddress2 == "请选择") {
        this.nonResidentTax.birthAddress2 = "";
      }
      if (this.nonResidentTax.birthAddress3 == "请选择") {
        this.nonResidentTax.birthAddress3 = "";
      }
      if (this.nonResidentTax.birthCountry == "请选择") {
        this.nonResidentTax.birthCountry = "";
      }
      console.log("--------消息通过--------");
      const toast1 = Toast.loading({
        mask: true,
        message: "提交中...",
        duration: 20000
      });

      // let policyDataList = {
      // };
      // let policyDataB = JSON.stringify(policyDataList);
      // window.localStorage.setItem("policyDataList", policyDataB);
      // console.log(policyDataB);
      let checkedData = JSON.parse(window.localStorage.getItem("checkedData"));
      let crsIndexData = new FormData();
      crsIndexData.append(
        "nonResidentTax",
        JSON.stringify(this.nonResidentTax)
      );
      // crsIndexData.append("taxpayerType", JSON.stringify(checkedData));
      // console.log(JSON.stringify(checkedData))
      console.log(JSON.stringify(this.nonResidentTax));
      window.localStorage.setItem(
        "nonResidentTax",
        JSON.stringify(this.nonResidentTax)
      );
      this.crsIndexFn({
        crsIndexData,
        successCallback: () => {
          toast1.clear();
          // this.$router.push({ path: "/beneficiarypag" });
          this.$router.push({ path: "/previewpage" });
        },
        failCallback: result => {
          toast1.clear();
          this.$refs.alertFn.isworngFn(result);
        }
      });
    },

    //未取得纳税人识别号的原因选择
    noHasWhyShowFn(index) {
      this.noHasWhyShow = true;
      this.taxIndex = index;
    },

    //未能取得纳税人识别号的原因
    taxClick(item) {
      this.nonResidentTax.taxInfo[this.taxIndex].taxIdNoneReason = item.name;
      if (
        this.nonResidentTax.taxInfo[this.taxIndex].taxIdNoneReason ==
        "账户持有人未能取得纳税人识别号"
      ) {
        this.nonResidentTax.taxInfo[this.taxIndex].isInputCause = true;
      } else {
        this.nonResidentTax.taxInfo[this.taxIndex].isInputCause = false;
      }

      this.noHasWhyShow = false;
    },

    //添加税收居民国列表
    addList() {
      // this.addNum++;
      let newContent = {
        taxCountry: "请选择", // 税收居民国
        taxPayerId: "", // 居民国纳税人识别号
        taxIdNoneReason: "请选择", // 无居民地纳税人识别号原因
        taxIdNoneNote: "" // 未能取得纳税人识别号具体原因
      };
      if (this.nonResidentTax.taxInfo.length < 5) {
        this.nonResidentTax.taxInfo.push(newContent);
      } else {
        this.$refs.alertFn.isworngFn("当前页面仅支持录入五组纳税人身份信息！");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/style.scss";
.box {
  background-color: rgb(231, 231, 245);
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
        // flex: 0.8;
        .ph_date {
          line-height: $heightline;
          height: $heightline;
          padding-right: 0.8rem;
          width: 100%;
          font-size: $fontsize;
          background: url(../../static/img/dateicon.svg) no-repeat right center;
          min-width: 6rem;
        }
        p {
          text-align: right;
          padding-right: 0.3rem;
          box-sizing: border-box;
          height: 1.4rem;
          overflow-x: auto;
          width: 100%;
          white-space: nowrap;
          max-width: 6.5rem;
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
      .ph_sex {
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
        .sex_checked {
          background: rgba(2, 173, 77, 0.1);
          border: 1px solid rgba(2, 173, 77, 0.5);
          color: #02ad4d;
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
        padding: 5px;
        padding-left: 0.3rem;
      }
      //验证码样式
      .yz_code {
        display: flex;
        div {
          flex: 1;
          input {
            width: 100%;
            text-align: right;
            padding: 0 5px;
            box-sizing: border-box;
          }
        }
        button {
          flex: 0.8;
          text-align: right !important;
          padding-right: 15px;
          box-sizing: border-box;
          text-align: center;
          border-left: 1px solid #dddddd;
          color: #02ad4d;
          background-color: transparent;
          width: 3rem;
        }
      }
    }
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
//职业弹出层样式
.occupation_box {
  width: 90%;
  height: 100%;
}
.occupation_style {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .occupation_ul_two {
    height: 90%;
    overflow: auto;
  }
  .occupation_ul {
    li {
      display: flex;
      justify-content: space-between;
      padding: 10px 15px;
      line-height: 0.7rem;
      .occuption_content {
        display: flex;
        hgroup {
          font-size: 0.4rem;
          color: #333333;
        }
        p {
          font-size: 0.37rem;
          color: rgb(145, 145, 145);
        }
      }
      .occuption_img {
        width: 0.35rem;
        img {
          width: 100%;
        }
      }
    }
  }
  .openAll {
    font-size: 0.4rem;
    color: #02ad4d;
    text-align: center;
    margin-top: 1.5rem;
  }
  //所有职业样式
  .occupation_list {
    display: flex;
    height: 1.32rem;
    color: #333333;
    font-size: 0.4rem;
    box-sizing: border-box;
    border-bottom: 1px solid #ddd;
    li {
      flex: 1;
      height: 1.32rem;
      padding: 10px 0;
      box-sizing: border-box;
      p {
        text-align: center;

        line-height: 0.8rem;
        border-right: 1px solid #ddd;
        box-sizing: border-box;
      }
    }
    li:last-child p {
      border-right: none;
    }
    li.checkedSelect {
      color: #02ad4d;
      border-bottom: 5px solid #02ad4d;
    }
  }
}
// newstyle-0717
.jianxi {
  margin-top: 0.24rem;
  padding-bottom: 0.24rem;
}
.add-btn-style {
  text-align: center;
  background-color: #fff;
  padding: 0.24rem 0;
  position: relative;
  img {
    width: 1.47rem;
  }
}
.bpclause {
  display: flex;
  position: relative;
  padding: 15px;
  .bp_checked {
    width: 16px;
    height: 16px;
    background: #ffffff;
    border: 1px solid #d0d0d0;
    border-radius: 2px;
    box-sizing: border-box;
    img {
      width: 100%;
      margin-bottom: 6px;
    }
  }
  .bp_clause_content {
    font-size: 0.37rem;
    color: #999999;
    margin-left: 15px;
    flex: 0.95;
    text-align: justify;
    a {
      color: #02ad4d;
    }
  }
}
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
.hasline-two:before {
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
  left: 15px;
  z-index: 2;
}
.padding-left5 {
  padding-left: 0.3rem;
}
</style>



