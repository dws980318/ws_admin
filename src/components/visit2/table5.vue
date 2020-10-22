<template>
  <div class="details">
    <div class="table">
      <el-row style="text-align: left;padding: 20px;border-right: 1px solid #000;">
        <img src="../../common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>广东外语外贸大学教职工因公临时出港出访报告</h2>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center" style="width: 241px">出访国家和地区</div>
          <el-input v-model="form.name" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">出访时间</div>
          <el-date-picker style="flex:1;" v-model="form.value1" type="date" placeholder="选择日期"></el-date-picker>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="flex">
          <div class="center" style="width: 241px">任务批件号</div>
          <el-col class="flex" style="flex:1;border-left: 1px solid #000;">
            <!-- <div class="one" style="padding: 0 0 0 30px;">粤府外出【2017】</div> -->
            <el-input class="input3" v-model="form.name" style="flex:1;padding: 0 15px;"></el-input>
            <p
              style="height: 32px;border: 1px solid #000;border-top: 0;border-left: 0;line-height: 32px;padding:0 20px 0 5px;"
            >号</p>
          </el-col>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center">出访天数</div>
          <el-input v-model="form.birthdate" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row class="flex">
        <div style="width: 241px;">
          <div class="center" style="width: 100%;height: 192px;">出访人员情况</div>
        </div>
        <div style="flex:1;border-left: 1px solid #000;">
          <el-col :span="24">
            <el-col :span="6">
              <div class="center2">姓名</div>
            </el-col>
            <el-col :span="18">
              <div class="center2">所在单位，职务和职级</div>
            </el-col>
          </el-col>
          <el-col :span="24" v-for="(item, index) in list" :key="index">
            <el-col :span="6">
              <el-input v-model="item.name1" class="input2"></el-input>
            </el-col>
            <el-col :span="18">
              <el-input v-model="item.name2" class="input2"></el-input>
            </el-col>
          </el-col>
        </div>
      </el-row>
      <el-row class="flex">
        <div class="center" style="width: 242px;border-right: 1px solid #000;">是否履行出访经费先行审核程序</div>
        <el-col style="flex:1;">
          <el-col :span="24">
            <el-col :span="6" class="flex" style>
              <el-select
                v-model="form.name10"
                class="input2"
                style="width: 100%;"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="18" class="flex">
              <div class="center" style="width: 274px">出访经费预算总额（请填写本次出访前所作预算的总金额）</div>
              <el-input v-model="form.birthdate" style="flex:1;"></el-input>
            </el-col>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="flex">
        <div style="width: 241px;">
          <div
            class="center"
            style="width: 100%;height: 96px;flex-direction: column"
          >本次出访使用经费（请按照出访实际所用经费填写，应与报销金额一致）</div>
        </div>
        <div style="flex:1;border-left: 1px solid #000;">
          <el-col :span="24">
            <el-col :span="12" class="flex">
              <div class="one">国际旅费</div>
              <el-input class="input3" v-model="form.name" style="flex:1;"></el-input>
              <p
                style="height: 32px;border: 1px solid #000;border-top: 0;border-left: 0;line-height: 32px;padding:0 20px 0 5px;"
              >元</p>
            </el-col>
            <el-col :span="12" class="flex">
              <div class="one">住宿费</div>
              <el-input class="input3" v-model="form.name" style="flex:1;"></el-input>
              <p
                style="height: 32px;border: 1px solid #000;border-top: 0;border-left: 0;line-height: 32px;padding:0 20px 0 5px;"
              >元</p>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12" class="flex">
              <div class="one">伙食费</div>
              <el-input class="input3" v-model="form.name" style="flex:1;"></el-input>
              <p
                style="height: 32px;border: 1px solid #000;border-top: 0;border-left: 0;line-height: 32px;padding:0 20px 0 5px;"
              >元</p>
            </el-col>
            <el-col :span="12" class="flex">
              <div class="one">公杂费</div>
              <el-input class="input3" v-model="form.name" style="flex:1;"></el-input>
              <p
                style="height: 32px;border: 1px solid #000;border-top: 0;border-left: 0;line-height: 32px;padding:0 20px 0 5px;"
              >元</p>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12" class="flex">
              <div class="one" style="padding: 0 0 0 30px;">其他费用(注明)</div>
              <el-input class="input3" v-model="form.name" style="flex:1;padding: 0 5px;"></el-input>
              <div class="one" style="padding: 0 10px 0 0;">费</div>
              <el-input class="input3" v-model="form.name" style="flex:1;padding: 0 5px;"></el-input>
              <p
                style="height: 32px;border: 1px solid #000;border-top: 0;border-left: 0;line-height: 32px;padding:0 20px 0 5px;"
              >元</p>
            </el-col>
            <el-col :span="12" class="flex">
              <div class="one">共计</div>
              <el-input class="input3" v-model="form.name" style="flex:1;"></el-input>
              <p
                style="height: 32px;border: 1px solid #000;border-top: 0;border-left: 0;line-height: 32px;padding:0 20px 0 5px;"
              >元</p>
            </el-col>
          </el-col>
        </div>
      </el-row>
      <el-row class="flex">
        <div style="width: 241px;">
          <div class="center" style="width: 100%;height: 84px;">报销经费来源（报销经费科目号）</div>
        </div>
        <div style="flex:1;border-left: 1px solid #000;height:84px;">
          <el-col :span="24" style="flex:1;height: 100%;">
            <el-input type="textarea" v-model="form.name" style="height: 100%;"></el-input>
          </el-col>
        </div>
      </el-row>
      <el-row class="flex">
        <div style="width: 241px;">
          <div
            class="center"
            style="width: 100%;height: 107px;flex-direction: column"
          >若出访实际使用经费与出访前所作预算不相符，请说明原因</div>
        </div>
        <div style="flex:1;border-left: 1px solid #000;height:107px;">
          <el-col :span="24" style="flex:1;height: 100%;">
            <el-input type="textarea" v-model="form.name" style="height: 100%;"></el-input>
          </el-col>
        </div>
      </el-row>
      <el-row class="flex">
        <div style="width: 241px;">
          <div class="center" style="width: 100%;height: 107px;">简述出访目的、任务</div>
        </div>
        <div style="flex:1;border-left: 1px solid #000;height:107px;">
          <el-col :span="24" style="flex:1;height: 100%;">
            <el-input type="textarea" v-model="form.name" style="height: 100%;"></el-input>
          </el-col>
        </div>
      </el-row>
      <el-row class="flex">
        <div style="width: 241px;">
          <div class="center" style="width: 100%;height: 144px;">日程安排（请根据此次出访实际日程简要填写）</div>
        </div>
        <div style="flex:1;border-left: 1px solid #000;height:144px;">
          <el-col :span="24" style="flex:1;height: 100%;">
            <el-input type="textarea" v-model="form.name" style="height: 100%;"></el-input>
          </el-col>
        </div>
      </el-row>
      <el-row class="flex">
        <el-col style="width: 241px;" class="flex">
          <div class="center" style="width: 100%;height: 144px;">有无未经批准擅自延长在外停留时间、更改行程、增加出访国家（地区）</div>
        </el-col>
        <el-col style="flex:1;height: 144px;">
          <el-col :span="24" style="height: 100%;">
            <el-col :span="6" style="height: 100%;">
              <el-select
                v-model="form.name10"
                class="input4"
                style="width: 100%;height: 100%;"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="18" style="height: 100%;">
              <el-input type="textarea" v-model="form.name" style="height: 100%;"></el-input>
            </el-col>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="flex">
        <div style="width: 241px;">
          <div class="center" style="width: 100%;height: 192px;">全程航班计划(请根据此次出访实际搭乘航班填写,请填写每一程航班)</div>
        </div>
        <div style="flex:1;border-left: 1px solid #000;">
          <el-col :span="24">
            <el-col :span="6">
              <div class="center2">（格式）搭乘日期：</div>
            </el-col>
            <el-col :span="6">
              <div class="center2">航班号：</div>
            </el-col>
            <el-col :span="12">
              <div class="center2">起止地点：</div>
            </el-col>
          </el-col>
          <el-col :span="24" v-for="(item, index) in list" :key="index">
            <el-col :span="6">
              <el-input v-model="item.name1" class="input2"></el-input>
            </el-col>
            <el-col :span="6">
              <el-input v-model="item.name1" class="input2"></el-input>
            </el-col>
            <el-col :span="12">
              <el-input v-model="item.name2" class="input2"></el-input>
            </el-col>
          </el-col>
        </div>
      </el-row>
      <el-row class="flex">
        <div style="width: 241px;">
          <div class="center" style="width: 100%;height: 144px;">邀请单位 邀请人 联系方式</div>
        </div>
        <div style="flex:1;border-left: 1px solid #000;height:144px;">
          <el-col :span="24" style="flex:1;height: 100%;">
            <el-input type="textarea" v-model="form.name" style="height: 100%;"></el-input>
          </el-col>
        </div>
      </el-row>
      <el-row class="flex">
        <div style="width: 241px;">
          <div class="center" style="width: 100%;height: 300px;">简述本次出访所取得的直接工作成果（要求尽可能量化说明）</div>
        </div>
        <div style="flex:1;border-left: 1px solid #000;height:300px;">
          <el-col :span="24" style="flex:1;height: 100%;">
            <el-col style="height: 100px;" class="colum">
              <p class="p1">1、开展访问交流活动情况</p>
              <el-input style="height: 70px;" type="textarea" v-model="form.name"></el-input>
            </el-col>
            <el-col style="height: 100px;">
              <p class="p1">2、任务完成情况</p>
              <el-input style="height: 70px;" type="textarea" v-model="form.name"></el-input>
            </el-col>
            <el-col style="height: 100px;">
              <p class="p1">3、其他出访成果</p>
              <el-input style="height: 70px;" type="textarea" v-model="form.name"></el-input>
            </el-col>
          </el-col>
        </div>
      </el-row>
      <el-row class="flex">
        <div style="width: 241px;">
          <div
            class="center"
            style="width: 100%;height: 144px;"
          >简述本次出访所延伸的潜在影响和成效（如对本地区、本单位工作部署、计划项目或关联业务的影响、借鉴意义等）</div>
        </div>
        <div style="flex:1;border-left: 1px solid #000;height:144px;">
          <el-col :span="24" style="flex:1;height: 100%;">
            <el-input type="textarea" v-model="form.name" style="height: 100%;"></el-input>
          </el-col>
        </div>
      </el-row>
      <el-row class="flex">
        <div style="width: 241px;">
          <div class="center" style="width: 100%;height: 144px;">下一步落实出访合作成果及其他后续工作的对策建议</div>
        </div>
        <div style="flex:1;border-left: 1px solid #000;height:144px;">
          <el-col :span="24" style="flex:1;height: 100%;">
            <el-input type="textarea" v-model="form.name" style="height: 100%;"></el-input>
          </el-col>
        </div>
      </el-row>
      <el-row class="flex">
        <div style="width: 241px;">
          <div class="center" style="width: 100%;height: 192px;">团组自评</div>
        </div>
        <div style="flex:1;border-left: 1px solid #000;height:192px;border-bottom: 1px solid #000;">
          <el-col :span="24" style="flex:1;height: 100%;">
            <el-input style="height: 100px;" type="textarea" v-model="form.name"></el-input>
            <el-col>
              <div style="flex-direction: row-reverse;display: flex;">
                <div style="display:flex;flex-direction:column;">
                  <div class="p1 flex">
                    <p>团长签名：</p>
                    <el-input
                      class="inp1"
                      style="width: 180px;height: auto;"
                      v-model="form.birthdate"
                    ></el-input>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col>
              <p
                class="p1"
              >备注：请组团单位对此次出访取得的实际成效进行考核，按三个等次（A.超出预期出访目的、B.达到预期出访目的、C.未达预期出访目的）确定等次，并提出综合评估意见。</p>
            </el-col>
          </el-col>
        </div>
      </el-row>
      <el-row class="flex">
        <div style="width: 241px;">
          <div class="center" style="width: 100%;height: 64px;">单位意见</div>
        </div>
        <div style="flex:1;border-left: 1px solid #000;height:64px;border-bottom: 1px solid #000;">
          <el-col :span="24" style="flex:1;height: 100%;">
            <div class="p1" style="line-height:64px;">
              <span style="margin-left: 36px;">以上情况属实，此报告已于</span>
              <!-- <el-input class="input1" style="width: 80px;" v-model="form.birthdate"></el-input>
              <span>年</span>
              <el-input class="input1" style="width: 80px;" v-model="form.birthdate"></el-input>
              <span>月</span>
              <el-input class="input1" style="width: 80px;" v-model="form.birthdate"></el-input>-->
              <el-date-picker
                class="input1"
                style="width: 160px;"
                v-model="form.value1"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
              <span>在学院内部公示。</span>
            </div>
          </el-col>
        </div>
      </el-row>
      <el-row class="flex" style="width: 100%;border-bottom: 1px solid #000;">
        <div class="p1" style="line-height:64px;width: 100%;">
          <span style="margin-left: 36px;">填 报 人：</span>
          <el-input class="input1" style="width: 160px;" v-model="form.birthdate"></el-input>
          <span>填报日期：</span>
          <el-date-picker
            class="input1"
            style="width: 160px;"
            v-model="form.value1"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
          <span>联系电话：</span>
          <el-input class="input1" style="width: 160px;" v-model="form.birthdate"></el-input>
          <span>（加盖单位公章）</span>
        </div>
      </el-row>
    </div>
    <el-row style="margin-top: 10px;;text-align: center;font-size: 14px;">
      <span>*此表一式三份，分别交至所在单位、职能部门以及国际合作与交流处。</span>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Details",
  data() {
    return {
      form: {},
      list: [
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" },
        { name1: "", name2: "", name3: "", name4: "" }
      ],
      list2: [
        { name1: "", name2: "", name3: "", name4: "", name5: "" },
        { name1: "", name2: "", name3: "", name4: "", name5: "" },
        { name1: "", name2: "", name3: "", name4: "", name5: "" }
      ],
      options: [
        {
          value: "1",
          label: "是"
        },
        {
          value: "0",
          label: "否"
        }
      ]
    };
  },
  watch: {},
  created() {},
  methods: {}
};
</script>

<style lang="stylus" scoped>
.table {
  border: 1px solid #000;
  margin-top: 20px;
  width: 100%;
  max-width: 880px;
  margin: 20px auto;
  height: auto;
  border-right: 0;
  border-bottom: 0;
  font-size: 12px;

  /deep/ .el-input__icon {
    line-height: 0;
  }

  /deep/ .el-textarea__inner {
    height: 100%;
    border: 1px solid #000;
    border-top: 0;
    border-left: 0;
    border-radius: 0;
    resize: none;
    font-size: 14px;
  }

  /deep/ .el-input__inner {
    border: none;
    border-radius: 0;
    border: 1px solid #000;
    border-top: 0;
    height: 32px;
    font-size: 14px;
    line-height: 32px;
  }

  .flex {
    flex-col-center();
  }

  h2 {
    font-size: 26px;
    text-align: center;
    line-height: 54px;
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
    color: #385b83;
  }

  .center {
    text-align: center;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #000;
    width: 120px;
    padding: 0 20px;
    font-weight: 600;
  }

  .content {
    height: auto;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
    width: 100%;
    padding: 0 20px;
    font-weight: 600;
  }

  .center2 {
    text-align: center;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #000;
    border-top: 0;
    border-left: 0;
    padding: 0 15px;
    font-weight: 600;
  }

  .input2 {
    height: 32px;
    border: none;
    border: 1px solid #000;
    border-top: 0;
    border-left: 0;

    /deep/ .el-input__inner {
      border-left: 0;
      border-right: 0;
      line-height: 32px;
    }
  }

  .input4 {
    height: 100%;
    border: none;
    border: 1px solid #000;
    border-top: 0;
    border-left: 0;

    /deep/ .el-input {
      height: 100%;
    }

    /deep/ .el-input__inner {
      height: 100%;
      border-right: 0;
      border-bottom: 0;
      line-height: 32px;
    }
  }

  .one {
    height: 32px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #000;
    padding: 0 30px;
    font-weight: 600;
  }

  .input1 {
    max-width: 250px;
    height: 32px;

    /deep/ .el-input__inner {
      height: 32px;
      border-radius: 0;
      border: 0;
      border-bottom: 1px solid #000;
    }
  }

  .input3 {
    height: 32px;
    border: none;
    border: 1px solid #000;
    border-top: 0;
    border-left: 0;
    border-right: 0;

    /deep/ .el-input__inner {
      border-left: 0;
      border-right: 0;
      padding: 0;
      line-height: 32px;
    }
  }

  .p1 {
    font-size: 12px;
    line-height: 30px;
    padding-left: 10px;
    font-weight: 600;
    border-right: 1px solid #000;
  }

  .inp1 {
    height: 32px;

    /deep/ .el-input__inner {
      padding: 0 5px;
      height: 32px;
      border-radius: 0;
      border: 0;
    }
  }
}
</style>
