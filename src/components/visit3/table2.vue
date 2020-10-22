<template>
  <div class="details">
    <div class="table">
      <el-row style="text-align: left;padding: 20px;border-right: 1px solid #000;">
        <img src="../../common/images/logo.jpg" />
      </el-row>
      <el-row>
        <h2>大陆居民往来台湾地区申请审批表</h2>
      </el-row>
      <el-row class="flex">
        <div class="center">身份证号：</div>
        <el-input v-model="form.name" style="flex:1;"></el-input>
      </el-row>
      <el-row style="height: 98px;">
        <el-col :span="10" style="height: 100%;">
          <el-col :span="14" class="flex" style="height: 100%;">
            <div class="center" style="height: 100%;width: 70px;">姓</div>
            <el-input v-model="form.name" class="inp1" style="flex:1;"></el-input>
          </el-col>
          <el-col :span="10" class="flex" style="height: 100%;">
            <div class="center" style="height: 100%;width: 70px;">名</div>
            <el-input v-model="form.name" class="inp1" style="flex:1;"></el-input>
          </el-col>
        </el-col>
        <el-col :span="7" class="colum">
          <el-col :span="14" class="flex" style="width: 100%;">
            <div class="center">出生日期</div>
            <el-input v-model="form.name" style="flex:1;"></el-input>
          </el-col>
          <el-col :span="10" class="flex" style="width: 100%;height: 49px;">
            <div class="center">性别</div>
            <el-radio-group v-model="form.resource" class="redio_flex" style="flex:1;">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
            <!-- <el-input v-model="form.sex" style="flex:1;"></el-input> -->
          </el-col>
        </el-col>
        <el-col :span="7" class="flex" style="height: 100%;">
          <div class="center" style="height: 100%;">出生地</div>
          <el-input v-model="form.identity" class="inp1" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row style="height: 49px;">
        <el-col :span="10" style="height: 100%;">
          <el-col :span="14" class="flex" style="height: 100%;">
            <div class="center" style="height: 100%;width: 70px;padding: 0 10px;">拼音姓</div>
            <el-input v-model="form.name" class="inp1" style="flex:1;"></el-input>
          </el-col>
          <el-col :span="10" class="flex" style="height: 100%;">
            <div class="center" style="height: 100%;width: 70px;padding: 0 10px;">拼音名</div>
            <el-input v-model="form.name" class="inp1" style="flex:1;"></el-input>
          </el-col>
        </el-col>
        <el-col :span="14" class="flex" style="height: 100%;">
          <div class="center" style="height: 100%;">文化程度</div>
          <el-radio-group v-model="form.resource" class="redio_flex" style="flex:1;">
            <el-radio label="研究生以上"></el-radio>
            <el-radio label="本科"></el-radio>
            <el-radio label="专科"></el-radio>
            <el-radio label="高中"></el-radio>
            <el-radio label="初中"></el-radio>
            <el-radio label="小学"></el-radio>
            <el-radio label="其他"></el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" class="flex">
          <div class="center">现住址</div>
          <el-input v-model="form.name" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="8" class="flex">
          <div class="center">联系电话</div>
          <el-input v-model="form.birthdate" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row class="flex">
        <div class="center">本人是：</div>
        <el-radio-group v-model="form.resource" class="redio_flex" style="flex:1;height: 49px;">
          <el-radio label="国家公务员"></el-radio>
          <el-radio label="国有大中型企业中层以上管理人员"></el-radio>
          <el-radio label="国有控股、参股企业中的国有股权代表"></el-radio>
          <el-radio label="金融系统县级以上机构领导成员"></el-radio>
          <el-radio label="其他人员 "></el-radio>
        </el-radio-group>
      </el-row>
      <el-row>
        <el-col :span="16" class="flex">
          <div class="center">单位</div>
          <el-input v-model="form.name" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="8" class="flex">
          <div class="center">职务或级别</div>
          <el-input v-model="form.birthdate" style="flex:1;"></el-input>
        </el-col>
      </el-row>
      <el-row style="height: 98px;">
        <el-col :span="16" class="flex" style="height:100%;">
          <div class="center" style="height:100%;">单位地址</div>
          <el-input v-model="form.name" class="inp1" style="flex:1;"></el-input>
        </el-col>
        <el-col :span="8" class="colum">
          <el-col :span="14" class="flex" style="width: 100%;">
            <div class="center">联系电话</div>
            <el-input v-model="form.name" style="flex:1;"></el-input>
          </el-col>
          <el-col :span="10" class="flex" style="width: 100%;">
            <div class="center">邮政编码</div>
            <el-input v-model="form.birthdate" style="flex:1;"></el-input>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" class="flex">
          <div class="center">申请类别</div>
          <el-radio-group v-model="form.resource" class="redio_flex" style="flex:1;height: 49px;">
            <el-radio label="通行证和签注"></el-radio>
            <el-radio label="通行证"></el-radio>
            <el-radio label="旧证换发"></el-radio>
            <el-radio label="遗失补发"></el-radio>
            <el-radio label="申请签注"></el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="8" class="flex">
          <div class="center">拟出境时间</div>
          <el-date-picker style="flex:1;" v-model="form.value1" type="date" placeholder="选择日期"></el-date-picker>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" class="flex">
          <div class="center">原通行证号码：</div>
          <el-input style="flex:1;" v-model="form.birthdate"></el-input>
        </el-col>
        <el-col :span="8" class="flex">
          <div class="center">有效期至：</div>
          <el-date-picker style="flex:1;" v-model="form.value1" type="date" placeholder="选择日期"></el-date-picker>
        </el-col>
        <el-col :span="6" class="flex">
          <div class="center">签发地：</div>
          <el-input style="flex:1;" v-model="form.birthdate"></el-input>
        </el-col>
      </el-row>
      <el-row class="flex">
        <el-col :span="16" class="flex">
          <div class="center">申请事由</div>
          <el-radio-group v-model="form.resource" class="redio_flex" style="flex:1;height: 49px;">
            <el-radio label="定居"></el-radio>
            <el-radio label="探亲"></el-radio>
            <el-radio label="居留"></el-radio>
            <el-radio label="旅游"></el-radio>
            <el-radio label="应邀"></el-radio>
            <el-radio label="非公务应邀"></el-radio>
            <el-radio label="其他"></el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="8" class="flex">
          <div class="center">其他申请事由：</div>
          <el-input style="flex:1;" v-model="form.birthdate"></el-input>
        </el-col>
      </el-row>
      <el-row class="flex">
        <div class="center" style="height: 96px;">相应的证明材料</div>
        <el-col style="flex:1;" class="colum">
          <el-col>
            <el-col :span="16" class="flex">
              <el-radio-group
                v-model="form.resource"
                class="redio_flex"
                style="flex:1;height: 32px;"
              >
                <el-radio label="入台许可证"></el-radio>
              </el-radio-group>
            </el-col>
            <el-col :span="8" class="flex">
              <div class="center" style="height: 32px;">编号</div>
              <el-input class="input3" style="flex:1;height: 32px;" v-model="form.birthdate"></el-input>
            </el-col>
          </el-col>
          <el-col>
            <el-col :span="16" class="flex">
              <el-radio-group
                v-model="form.resource"
                class="redio_flex"
                style="flex:1;height: 32px;"
              >
                <el-radio label="国务院台办“赴台批件” "></el-radio>
              </el-radio-group>
            </el-col>
            <el-col :span="8" class="flex">
              <div class="center" style="height: 32px;">编号</div>
              <el-input class="input3" style="flex:1;height: 32px;" v-model="form.birthdate"></el-input>
            </el-col>
          </el-col>
          <el-col>
            <el-col :span="16" class="flex">
              <el-radio-group
                v-model="form.resource"
                class="redio_flex"
                style="flex:1;height: 32px;"
              >
                <el-radio label="国务院台办经济局“关于应邀往来台湾立项批复”"></el-radio>
              </el-radio-group>
            </el-col>
            <el-col :span="8" class="flex">
              <div class="center" style="height: 32px;">编号</div>
              <el-input class="input3" style="flex:1;height: 32px;" v-model="form.birthdate"></el-input>
            </el-col>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="flex">
        <el-col :span="12" class="flex">
          <div class="center">取证方式</div>
          <el-radio-group v-model="form.resource" class="redio_flex" style="flex:1;height: 49px;">
            <el-radio label="邮政速递"></el-radio>
            <el-radio label="回公安机关领取"></el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="12" class="flex">
          <div class="center" style="width:140px;">手机短信通知</div>
          <el-radio-group
            v-model="form.resource"
            class="redio_flex"
            style="width: auto;height: 49px;border-right: 0;"
          >
            <el-radio label="是"></el-radio>
          </el-radio-group>
          <el-input style="flex:1;" v-model="form.birthdate"></el-input>
        </el-col>
      </el-row>
      <p
        style="font-size: 16px;font-weight:600;border-bottom: 1px solid #000;border-right: 1px solid #000;padding-left: 30px;"
      >特别提示：如选择邮政速递方式领证，请按照如下要求详细填写，以免发生差错</p>
      <el-row class="flex">
        <div class="flex">
          <div class="center" style="height: 98px;">投递地址</div>
          <el-input v-model="form.name1" style="flex:1;height: 98px;" class="inp1"></el-input>
        </div>
        <div style="flex:1;">
          <el-col :span="24">
            <el-col :span="8">
              <div class="center2">收件人</div>
              <el-input v-model="form.name1" class="input2"></el-input>
            </el-col>
            <el-col :span="8">
              <div class="center2">邮政编码</div>
              <el-input v-model="form.name2" class="input2"></el-input>
            </el-col>
            <el-col :span="8">
              <div class="center2">联系电话</div>
              <el-input v-model="form.name3" class="input2"></el-input>
            </el-col>
          </el-col>
        </div>
      </el-row>
      <p
        style="font-size: 16px;font-weight:600;border-bottom: 1px solid #000;border-right: 1px solid #000;padding-left: 30px;"
      >注：①特快专递由服务商收取15元费用 ②短信通知由运营商收取3元费用</p>
      <el-row class="flex" style="height: 216px;">
        <div style="width: 120px;">
          <div
            class="center"
            style="width: 100%;height: 216px;"
          >右边栏目由公安出入境管理部门填写</div>
        </div>
        <div
          style="flex:1;border-left: 1px solid #000;display:flex;flex-direction:column;height: 216px;"
        >
          <div class="flex" style="height: 108px;">
            <div
              class="center"
              style="padding: 0 10px;height: 108px;border-right: 1px solid #000;"
            >受理单位意见</div>
            <el-col :span="24" style="flex:1;height: 100%;">
              <!-- writing-mode: vertical-lr; -->
              <el-input type="textarea" v-model="form.name" style="height: 100%;"></el-input>
            </el-col>
          </div>
          <div class="flex" style="height: 108px;">
            <div
              class="center"
              style="padding: 0 10px;height: 108px;border-right: 1px solid #000;"
            >审批单位意见</div>
            <el-col :span="24" style="flex:1;height: 100%;">
              <el-input type="textarea" v-model="form.name" style="height: 100%;"></el-input>
            </el-col>
          </div>
        </div>
      </el-row>
      <el-row class="flex" style="height: 264px;">
        <div style="width: 120px;">
          <div
            class="center"
            style="width: 100%;height: 264px;"
          >申请人单位或户口地公安派出所意见</div>
        </div>
        <div
          style="flex:1;border-left: 1px solid #000;display:flex;flex-direction:column;height: 264px;"
        >
          <el-col
            :span="24"
            style="flex:1;border-bottom: 1px solid #000;border-right: 1px solid #000;padding: 0 10px;"
          >
            <div class="flex">
              <p style="text-indent: 36px;">经审查，申请人</p>
              <el-input v-model="form.sex" class="input1" style="width: 80px;"></el-input>所填各项内容属实，
              <el-input v-model="form.sex" class="input1" style="width: 80px;"></el-input>其赴台湾地区的申请。
            </div>
            <p style="text-indent: 36px;line-height: 30px;">不同意的理由是：</p>
            <p style="text-indent: 36px;font-size: 14px;line-height: 30px;">法定不批准出境的五种情形是：</p>
            <p
              style="text-indent: 36px;font-size: 14px;line-height: 20px;"
            >1、刑事案件的被告人和公安机关或者人民检察院或者人民法院认定的犯罪嫌疑人；2、人民法院通知有未了结民事案件不能离境的；3、被判处刑罚正在服刑的；4、正在被劳动教养的；5、国务院有关主管机关认为出境后将对国家安全造成危害或者对国家利益造成重大损失的。</p>
          </el-col>
          <div>
            <el-col :span="12" class="flex">
              <div class="center" style="padding: 0 10px;">负责人签字：</div>
              <el-input v-model="form.name" style="flex:1;"></el-input>
            </el-col>
            <el-col :span="12" class="flex">
              <div class="center">单位盖章</div>
              <el-input v-model="form.birthdate" style="flex:1;"></el-input>
            </el-col>
            <el-col :span="12" class="flex">
              <div class="center">联系电话：</div>
              <el-input v-model="form.name" style="flex:1;"></el-input>
            </el-col>
            <el-col :span="12" class="flex">
              <div class="center">日期</div>
              <el-date-picker style="flex:1;" v-model="form.value1" type="date" placeholder="选择日期"></el-date-picker>
            </el-col>
          </div>
        </div>
      </el-row>
      <el-row class="flex" style="height: 264px;">
        <el-col style="width: 120px;height: 100%;" class="flex">
          <div class="center" style="width: 100%;height: 100%;">申请人身份证复印栏</div>
        </el-col>
        <el-col style="flex:1;height: 100%;">
          <el-upload
            class="avatar-uploader"
            style="height: 100%;border-left: 1px solid #000;"
            :action="$api.upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="form.photo"
              :src="form.photo?($api.download + form.photo) : ''"
              class="avatar"
            />
            <el-avatar v-else>user</el-avatar>
          </el-upload>
        </el-col>
      </el-row>
      <el-row class="flex" style="height: 264px;">
        <el-col style="width: 120px;height: 100%;" class="flex">
          <div class="center" style="width: 100%;height: 100%;">申请人户口簿复印栏</div>
        </el-col>
        <el-col style="flex:1;height: 100%;">
          <el-upload
            class="avatar-uploader"
            style="height: 100%;border-left: 1px solid #000;"
            :action="$api.upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="form.photo"
              :src="form.photo?($api.download + form.photo) : ''"
              class="avatar"
            />
            <el-avatar v-else>user</el-avatar>
          </el-upload>
          <!-- <el-input
            type="textarea"
            v-model="form.name"
            
          ></el-input>-->
        </el-col>
      </el-row>
    </div>
    <div class="message_box">
      <el-input type="textarea" placeholder="请输入申请编号条形码" v-model="form.name"></el-input>
      <div class="avater_box">
        <el-upload
          class="avatar-uploader"
          :action="$api.upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.photo" :src="form.photo?($api.download + form.photo) : ''" class="avatar" />
          <el-avatar v-else>贴照片处</el-avatar>
        </el-upload>
      </div>
      <div class="message">
        <p class="title">申请人声明：</p>
        <p
          style="text-indent: 36px;font-weight: 600;line-height:24px;"
        >本申请表格所填内容正确无误，所提交的身份证明文件和照片真实无假。本人明白，不如实填报或提交虚假的资料属违法行为，将会被取消申请资格，并被追究法律责任。</p>
        <p style="font-weight: 600;line-height:24px;margin-top: 20px;">申请人签名：</p>
        <el-input v-model="form.birthdate"></el-input>
        <div style="margin-top: 20px;">
          <el-date-picker style="width: 100%;" v-model="form.value1" type="date" placeholder="选择日期"></el-date-picker>
        </div>
        <p
          style="font-weight: 600;line-height:24px;margin-top: 80px;"
        >不满十四周岁的申请人，办理申请时，须由父母或法定监护人陪同。其父母或监护人须作如下声明：</p>
        <p>本人是申请人的：</p>
        <el-radio-group v-model="form.resource" class="redio_flex">
          <el-radio label="父亲"></el-radio>
          <el-radio label="母亲"></el-radio>
          <el-radio label="监护人"></el-radio>
        </el-radio-group>
        <p>，依法拥有对申请人的监护权，同意申请人提出申请，本人的居民身份证号码是：</p>
        <el-input v-model="form.birthdate"></el-input>
        <p style="margin-top: 20px;">声明人签名：</p>
        <el-input v-model="form.birthdate"></el-input>
        <div style="margin-top: 20px;">
          <el-date-picker style="width: 100%;" v-model="form.value1" type="date" placeholder="选择日期"></el-date-picker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Details",
  data() {
    return {
      form: {
        type: []
      }
    };
  },
  watch: {},
  created() {},
  methods: {
    handleAvatarSuccess(res, file) {
      this.form.photo = res.fileName;
    },
    beforeAvatarUpload(file) {
      const isIMG = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/pjpeg",
        "image/gif",
        "image/bmp",
        "image/x-png"
      ];
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (isIMG.indexOf(file.type) === -1) {
        this.$message.error("上传文件只能是 图片 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }
      return isIMG && isLt2M;
    }
  }
};
</script>

<style lang="stylus" scoped>
.details {
  width: 1200px;
  display: flex;
  margin: 20px auto;

  .el-avatar--circle {
    border-radius: 0;
  }
}

.table {
  border: 1px solid #000;
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
    height: 49px;
    font-size: 14px;
  }

  .flex {
    flex-col-center();
  }

  .colum {
    flex-ver-center();
  }

  h2 {
    font-size: 26px;
    text-align: center;
    line-height: 64px;
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
    color: #385b83;
  }

  .center {
    text-align: center;
    height: 49px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #000;
    width: 100px;
    padding: 0 10px;
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
    line-height: 24px;
  }

  .center2 {
    text-align: center;
    height: 49px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #000;
    border-top: 0;
    border-left: 0;
    padding: 0 20px;
    font-weight: 600;
  }

  .input2 {
    height: 49px;
    border: none;
    border: 1px solid #000;
    border-top: 0;
    border-left: 0;

    /deep/ .el-input__inner {
      border-left: 0;
      border-right: 0;
    }
  }

  .input1 {
    max-width: 250px;
    height: 22px;

    /deep/ .el-input__inner {
      padding: 0 5px;
      height: 22px;
      border-radius: 0;
      border: 0;
      border-bottom: 1px solid #000;
    }
  }

  .input3 {
    height: 32px;

    /deep/ .el-input__inner {
      padding: 0 5px;
      height: 32px;
      border-radius: 0;
      border: 1px solid #000;
      border-top: 0;
    }
  }

  .avatar-uploader {
    border: 1px solid #000;
    border-top: 0;
    border-left: 0;

    /deep/ .el-upload {
      border: 1px dashed #d9d9d9;
      width: 100%;
      height: 100%;

      &:hover {
        border-color: $theme-color;
      }

      .el-avatar {
        display: inline-block;
        box-sizing: border-box;
        text-align: center;
        overflow: hidden;
        color: #fff;
        // background: #c0c4cc;
        width: 100%;
        height: 100%;
        line-height: 264px;
        font-size: 24px;
      }
    }
  }

  .avatar {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: block;
  }

  .inp1 {
    height: 100%;

    /deep/ .el-input__inner {
      height: 100%;
    }
  }

  .redio_flex {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    height: 100%;
    border: 1px solid #000;
    border-top: 0;
    text-align: center;
    padding: 0 15px;

    /deep/ .el-radio {
      // height: 100%;
      line-height: 24px;
    }
  }
}

.message_box {
  flex: 1;
  margin-left: 20px;

  /deep/ .el-textarea__inner {
    resize: none;
    font-size: 16px;
  }

  .avater_box {
    padding-top: 20px;

    /deep/ .avatar-uploader {
      .el-upload {
        border: 1px dashed #d9d9d9;
        cursor: pointer;
        overflow: hidden;
        width: 100%;

        &:hover {
          border-color: $theme-color;
        }
      }
    }

    .el-avatar {
      display: inline-block;
      box-sizing: border-box;
      text-align: center;
      overflow: hidden;
      color: #fff;
      // background: #c0c4cc;
      width: 100%;
      height: 220px;
      line-height: 220px;
      font-size: 24px;
    }

    .avatar {
      width: 100%;
      height: 220px;
      overflow: hidden;
      display: block;
    }
  }

  .message {
    width: 100%;
    border: 1px solid #000;
    padding: 30px 15px 80px;
    margin-top: 30px;

    .title {
      text-decoration: underline;
      font-weight: 600;
      text-indent: 36px;
    }
  }
}
</style>
