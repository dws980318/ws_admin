<template>
  <div class="details">
    <p class="header_title" style="font-size: 24px;">{{form.name}}的个人信息</p>
    <div class="form">
      <el-form :inline="true" ref="checkForm" :rules="formrules" :model="form" label-width="150px">
        <el-form-item label class="btn_block" style=" margin-left: 150px;">
          <el-upload
            class="avatar-uploader"
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
            <el-avatar v-else :size="80">user</el-avatar>
            <div class="el-upload__tip" slot="tip">点击图片上传头像，只能上传jpg文件，且不超过2MB</div>
          </el-upload>
        </el-form-item>
        <el-form-item size="small" label="账户名" prop="username">
          <el-input type="text" v-model="form.username" placeholder="请输入账户名"></el-input>
        </el-form-item>
        <el-form-item size="small" label="昵称" prop="accountname">
          <el-input type="text" v-model="form.accountname" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!-- <el-form-item size="small" label="密码" prop="password">
          <el-input
            :disabled="$route.params.id? true: false"
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>-->
        <el-form-item size="small" label="真实姓名" prop="realName">
          <el-input type="text" v-model="form.realName" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item size="small" label="角色" prop="rolist">
          <el-select v-model="rolist" multiple placeholder="请选择角色">
            <el-option
              v-for="(item, key, index) in roleList"
              :key="index"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="small" label="性别" prop="rolist">
          <el-select v-model="form.value" placeholder="请选择性别">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="small" label="出生日期" prop="birthday">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item size="small" label="身份证" prop="phone">
          <el-input type="text" v-model="form.phone" placeholder="请输入身份证"></el-input>
        </el-form-item>
         <el-form-item size="small" label="出生地" prop="phone">
          <el-input type="text" v-model="form.phone" placeholder="请输入出生地"></el-input>
        </el-form-item>
         <el-form-item size="small" label="户籍地" prop="phone">
          <el-input type="text" v-model="form.phone" placeholder="请输入户籍地"></el-input>
        </el-form-item>
        <el-form-item size="small" label="手机号码" prop="phone">
          <el-input type="text" v-model="form.phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
         <el-form-item size="small" label="办公电话" prop="phone">
          <el-input type="text" v-model="form.phone" placeholder="请输入办公电话"></el-input>
        </el-form-item>
        <el-form-item size="small" label="电子邮箱" prop="mail">
          <el-input type="text" v-model="form.mail" placeholder="请输入电子邮箱"></el-input>
        </el-form-item>
        <el-form-item size="small" label="所在单位" prop="departmentId">
          <el-input type="text" v-model="form.departmentId" placeholder="请输入所在单位"></el-input>
        </el-form-item>
        <el-form-item size="small" label="政治面貌" prop="rolist">
          <el-select v-model="form.value1" placeholder="请选择政治面貌">
            <el-option
              v-for="item in option1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="small" label="职务" prop="positionId">
          <el-input type="text" v-model="form.positionId" placeholder="请输入职务"></el-input>
        </el-form-item>
        <el-form-item size="small" label="职级" prop="rolist">
          <el-select v-model="form.value2" placeholder="请选择职级">
            <el-option
              v-for="item in option2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        
        <!-- <el-form-item size="small" label="国籍" prop="country">
          <el-select v-model="form.country" placeholder="请选择国籍">
            <el-option
              :label="item.label + '（' + item.value + '）'"
              :value="item.label"
              v-for="(item, index) in country"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="small" label="年龄" prop="age">
          <el-input type="text" v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item> -->
        <!-- <el-form-item size="small" label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>-->
        <el-form-item size="small" label="状态" prop="delFlag">
          <el-switch
            v-model="form.delFlag"
            :active-value="'1'"
            :inactive-value="'0'"
            active-text="启用"
            inactive-text="禁用"
          ></el-switch>
        </el-form-item>
        <el-form-item size="small" label="个人介绍" prop="remark" class="btn_block textarea">
          <el-input
            type="textarea"
            :autosize="{ minRows: 5 }"
            v-model="form.remark"
            placeholder="请输入个人介绍"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn_block" label="创建人" prop="createBy" v-if="$route.params.id">
          <p>{{form.createBy}}</p>
        </el-form-item>
        <el-form-item class="btn_block" label="创建时间" prop="createDate" v-if="$route.params.id">
          <p>{{form.createDate}}</p>
        </el-form-item>
        <el-form-item class="btn_block" label="更新人" prop="updateBy" v-if="$route.params.id">
          <p>{{form.updateBy}}</p>
        </el-form-item>
        <el-form-item class="btn_block" label="更新时间" prop="updateDate" v-if="$route.params.id">
          <p>{{form.updateDate}}</p>
        </el-form-item>

        <el-form-item class="btn_block" style="margin-left: 150px;">
          <el-button size="small" type="primary" @click="dialogFormEdit()">确 定</el-button>
          <el-button size="small" @click="$router.back()">取 消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Details",
  data() {
    let checkData = (rule, value, callback) => {
      if (value) {
        if (/[\u4E00-\u9FA5]/g.test(value)) {
          // this.form.title = this.form.title.replace(/[!^\u4e00-\u9fa5]*/g, "");
          callback(new Error("账号不能为中文"));
        } else {
          callback();
        }
      }
      callback();
    };
    var checkUserCode = (rule, value, callback) => {
      if (!Number.isInteger(Number(value))) {
        callback(new Error("请输入正确职工号"));
      } else {
        callback();
      }
    };
    var checkAge = (rule, value, callback) => {
      if (!Number.isInteger(Number(value))) {
        callback(new Error("年龄必须为数字值"));
      } else {
        callback();
      }
    };
    return {
      options: [
        {value: '1', label:'男'},
        {value: '2', label: '女'}
      ],
      option1: [
        {value: '1', label:'中共党员'},
        {value: '2', label: '中共预备党员'},
        {value: '3', label: '共青团员'},
        {value: '4', label: '民革党员'},
        {value: '5', label: '民盟盟员'},
        {value: '6', label: '民建会员'},
        {value: '7', label: '民进会员'},
        {value: '8', label: '农工党党员'},
        {value: '9', label: '致公党党员'},
        {value: '10', label: '九三学社社员'},
        {value: '11', label: '台盟盟员'},
        {value: '12', label: '无党派人士'},
        {value: '13', label: '群众'},
      ],
      option2: [
        {value: '1', label:'正厅级'},
        {value: '2', label: '副厅级'},
        {value: '3', label: '正处级'},
        {value: '4', label: '副处级'},
        {value: '5', label: '副科级'},
        {value: '6', label: '普通'},
      ],
      formrules: {
        username: [
          { required: true, message: "请输入账户名", trigger: "blur" },
          { validator: checkData, trigger: ["blur", "change"] },
          {
            min: 5,
            max: 16,
            message: "长度在 5 到 16 个字符",
            trigger: ["blur", "change"]
          }
        ],
        accountname: [
          { required: true, message: "请输入账户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        realName: [
          { required: true, message: "请输入账户名", trigger: "blur" },
          {
            pattern: /^[\u0391-\uFFE5A-Za-z]+$/,
            message: "请输入正确姓名格式",
            trigger: ["blur", "change"]
          }
        ],
        userCode: [
          {
            validator: checkUserCode,
            trigger: ["blur", "change"],
            required: false
          }
        ],
        rlist: [{ trigger: "change", message: "请选择角色", required: true }],
        mail: [
          { required: false, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phone: [
          {
            pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
            message: "请输入手机格式",
            trigger: "blur"
          }
        ]
      },
      form: {
        name: "张三",
        sex: "男",
        delFlag: 0,
        rolist: [],
        photo: ""
      },
      rolist: [],
      roleList: [],
      country: [
        { value: "Angola", label: "安哥拉" },
        { value: "Afghanistan", label: "阿富汗" },
        { value: "Albania", label: "阿尔巴尼亚" },
        { value: "Algeria", label: "阿尔及利亚" },
        { value: "Andorra", label: "安道尔共和国" },
        { value: "Anguilla", label: "安圭拉岛" },
        { value: "Antigua and Barbuda", label: "安提瓜和巴布达" },
        { value: "Argentina", label: "阿根廷" },
        { value: "Armenia", label: "亚美尼亚" },
        { value: "Ascension", label: "阿森松" },
        { value: "Australia", label: "澳大利亚" },
        { value: "Austria", label: "奥地利" },
        { value: "Azerbaijan", label: "阿塞拜疆" },
        { value: "Bahamas", label: "巴哈马" },
        { value: "Bahrain", label: "巴林" },
        { value: "Bangladesh", label: "孟加拉国" },
        { value: "Barbados", label: "巴巴多斯" },
        { value: "Belarus", label: "白俄罗斯" },
        { value: "Belgium", label: "比利时" },
        { value: "Belize", label: "伯利兹" },
        { value: "Benin", label: "贝宁" },
        { value: "Bermuda Is", label: "百慕大群岛" },
        { value: "Bolivia", label: "玻利维亚" },
        { value: "Botswana", label: "博茨瓦纳" },
        { value: "Brazil", label: "巴西" },
        { value: "Brunei", label: "文莱" },
        { value: "Bulgaria", label: "保加利亚" },
        { value: "Burkina Faso", label: "布基纳法索" },
        { value: "Burma", label: "缅甸" },
        { value: "Burundi", label: "布隆迪" },
        { value: "Cameroon", label: "喀麦隆" },
        { value: "Canada", label: "加拿大" },
        { value: "Cayman Is", label: "开曼群岛" },
        { value: "Central African Republic", label: "中非共和国" },
        { value: "Chad", label: "乍得" },
        { value: "Chile", label: "智利" },
        { value: "China", label: "中国" },
        { value: "Colombia", label: "哥伦比亚" },
        { value: "Congo", label: "刚果" },
        { value: "Cook Is", label: "库克群岛" },
        { value: "Costa Rica", label: "哥斯达黎加" },
        { value: "Cuba", label: "古巴" },
        { value: "Cyprus", label: "塞浦路斯" },
        { value: "Czech Republic", label: "捷克" },
        { value: "Denmark", label: "丹麦" },
        { value: "Djibouti", label: "吉布提" },
        { value: "Dominica Rep", label: "多米尼加共和国" },
        { value: "Ecuador", label: "厄瓜多尔" },
        { value: "Egypt", label: "埃及" },
        { value: "EI Salvador", label: "萨尔瓦多" },
        { value: "Estonia", label: "爱沙尼亚" },
        { value: "Ethiopia", label: "埃塞俄比亚" },
        { value: "Fiji", label: "斐济" },
        { value: "Finland", label: "芬兰" },
        { value: "France", label: "法国" },
        { value: "French Guiana", label: "法属圭亚那" },
        { value: "French Polynesia", label: "法属玻利尼西亚" },
        { value: "Gabon", label: "加蓬" },
        { value: "Gambia", label: "冈比亚" },
        { value: "Georgia", label: "格鲁吉亚" },
        { value: "Germany", label: "德国" },
        { value: "Ghana", label: "加纳" },
        { value: "Gibraltar", label: "直布罗陀" },
        { value: "Greece", label: "希腊" },
        { value: "Grenada", label: "格林纳达" },
        { value: "Guam", label: "关岛" },
        { value: "Guatemala", label: "危地马拉" },
        { value: "Guinea", label: "几内亚" },
        { value: "Guyana", label: "圭亚那" },
        { value: "Haiti", label: "海地" },
        { value: "Honduras", label: "洪都拉斯" },
        { value: "Hungary", label: "匈牙利" },
        { value: "Iceland", label: "冰岛" },
        { value: "India", label: "印度" },
        { value: "Indonesia", label: "印度尼西亚" },
        { value: "Iran", label: "伊朗" },
        { value: "Iraq", label: "伊拉克" },
        { value: "Ireland", label: "爱尔兰" },
        { value: "Israel", label: "以色列" },
        { value: "Italy", label: "意大利" },
        { value: "Ivory Coast", label: "科特迪瓦" },
        { value: "Jamaica", label: "牙买加" },
        { value: "Japan", label: "日本" },
        { value: "Jordan", label: "约旦" },
        { value: "Kampuchea (Cambodia )", label: "柬埔寨" },
        { value: "Kazakstan", label: "哈萨克斯坦" },
        { value: "Kenya", label: "肯尼亚" },
        { value: "Korea", label: "韩国" },
        { value: "Kuwait", label: "科威特" },
        { value: "Kyrgyzstan", label: "吉尔吉斯坦" },
        { value: "Laos", label: "老挝" },
        { value: "Latvia", label: "拉脱维亚" },
        { value: "Lebanon", label: "黎巴嫩" },
        { value: "Lesotho", label: "莱索托" },
        { value: "Liberia", label: "利比里亚" },
        { value: "Libya", label: "利比亚" },
        { value: "Liechtenstein", label: "列支敦士登" },
        { value: "Lithuania", label: "立陶宛" },
        { value: "Luxembourg", label: "卢森堡" },
        { value: "Madagascar", label: "马达加斯加" },
        { value: "Malawi", label: "马拉维" },
        { value: "Malaysia", label: "马来西亚" },
        { value: "Maldives", label: "马尔代夫" },
        { value: "Mali", label: "马里" },
        { value: "Malta", label: "马耳他" },
        { value: "Mariana Is", label: "马里亚那群岛" },
        { value: "Martinique", label: "马提尼克" },
        { value: "Mauritius", label: "毛里求斯" },
        { value: "Mexico", label: "墨西哥" },
        { value: "Moldova", label: "摩尔多瓦" },
        { value: "Monaco", label: "摩纳哥" },
        { value: "Mongolia", label: "蒙古" },
        { value: "Montserrat Is", label: "蒙特塞拉特岛" },
        { value: "Morocco", label: "摩洛哥" },
        { value: "Mozambique", label: "莫桑比克" },
        { value: "Namibia", label: "纳米比亚" },
        { value: "Nauru", label: "瑙鲁" },
        { value: "Nepal", label: "尼泊尔" },
        { value: "Netheriands Antilles", label: "荷属安的列斯" },
        { value: "Netherlands", label: "荷兰" },
        { value: "New Zealand", label: "新西兰" },
        { value: "Nicaragua", label: "尼加拉瓜" },
        { value: "Niger", label: "尼日尔" },
        { value: "Nigeria", label: "尼日利亚" },
        { value: "North Korea", label: "朝鲜" },
        { value: "Norway", label: "挪威" },
        { value: "Oman", label: "阿曼" },
        { value: "Pakistan", label: "巴基斯坦" },
        { value: "Panama", label: "巴拿马" },
        { value: "Papua New Cuinea", label: "巴布亚新几内亚" },
        { value: "Paraguay", label: "巴拉圭" },
        { value: "Peru", label: "秘鲁" },
        { value: "Philippines", label: "菲律宾" },
        { value: "Poland", label: "波兰" },
        { value: "Portugal", label: "葡萄牙" },
        { value: "Puerto Rico", label: "波多黎各" },
        { value: "Qatar", label: "卡塔尔" },
        { value: "Reunion", label: "留尼旺" },
        { value: "Romania", label: "罗马尼亚" },
        { value: "Russia", label: "俄罗斯" },
        { value: "Saint Lueia", label: "圣卢西亚" },
        { value: "Saint Vincent", label: "圣文森特岛" },
        { value: "Samoa Eastern", label: "东萨摩亚(美)" },
        { value: "Samoa Western", label: "西萨摩亚" },
        { value: "San Marino", label: "圣马力诺" },
        { value: "Sao Tome and Principe", label: "圣多美和普林西比" },
        { value: "Saudi Arabia", label: "沙特阿拉伯" },
        { value: "Senegal", label: "塞内加尔" },
        { value: "Seychelles", label: "塞舌尔" },
        { value: "Sierra Leone", label: "塞拉利昂" },
        { value: "Singapore", label: "新加坡" },
        { value: "Slovakia", label: "斯洛伐克" },
        { value: "Slovenia", label: "斯洛文尼亚" },
        { value: "Solomon Is", label: "所罗门群岛" },
        { value: "Somali", label: "索马里" },
        { value: "South Africa", label: "南非" },
        { value: "Spain", label: "西班牙" },
        { value: "SriLanka", label: "斯里兰卡" },
        { value: "St.Lucia", label: "圣卢西亚" },
        { value: "St.Vincent", label: "圣文森特" },
        { value: "Sudan", label: "苏丹" },
        { value: "Suriname", label: "苏里南" },
        { value: "Swaziland", label: "斯威士兰" },
        { value: "Sweden", label: "瑞典" },
        { value: "Switzerland", label: "瑞士" },
        { value: "Syria", label: "叙利亚" },
        { value: "Tajikstan", label: "塔吉克斯坦" },
        { value: "Tanzania", label: "坦桑尼亚" },
        { value: "Thailand", label: "泰国" },
        { value: "Togo", label: "多哥" },
        { value: "Tonga", label: "汤加" },
        { value: "Trinidad and Tobago", label: "特立尼达和多巴哥" },
        { value: "Tunisia", label: "突尼斯" },
        { value: "Turkey", label: "土耳其" },
        { value: "Turkmenistan", label: "土库曼斯坦" },
        { value: "Uganda", label: "乌干达" },
        { value: "Ukraine", label: "乌克兰" },
        { value: "United Arab Emirates", label: "阿拉伯联合酋长国" },
        { value: "United Kiongdom", label: "英国" },
        { value: "United States of America", label: "美国" },
        { value: "Uruguay", label: "乌拉圭" },
        { value: "Uzbekistan", label: "乌兹别克斯坦" },
        { value: "Venezuela", label: "委内瑞拉" },
        { value: "Vietnam", label: "越南" },
        { value: "Yemen", label: "也门" },
        { value: "Yugoslavia", label: "南斯拉夫" },
        { value: "Zimbabwe", label: "津巴布韦" },
        { value: "Zaire", label: "扎伊尔" },
        { value: "Zambia", label: "赞比亚" }
      ]
    };
  },
  watch: {},
  created() {
    this.roleInit();
    if (this.$route.params.id) {
      // this.init();
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    roleInit() {
      let URLparams = {
        pageNumber: 1,
        pageSize: 1000
      };
      this.$api.role.list(URLparams).then(res => {
        this.roleList = res.data;
      });
    },
    init() {
      let URLparams = {
        pageNumber: 1,
        pageSize: 10000
      };
      this.$api.user
        .item({ id: this.$route.params.id })
        .then(res => {
          if (res.data.rlist.length > 0) {
            let two = [];
            for (let i in res.data.rlist) {
              two.push(res.data.rlist[i].id);
            }
            this.rolist = two;
          }
          this.$api.user.list(URLparams).then(response => {
            for (let i in response.data) {
              if (res.data.createBy === response.data[i].id) {
                res.data.createBy = response.data[i].accountname;
              }
              if (res.data.updateBy === response.data[i].id) {
                res.data.updateBy = response.data[i].accountname;
              }
            }
          });
          setTimeout(() => {
            this.form = res.data;
          }, 100);
        })
        .catch(err => {
          this.$message.error("查询失败！");
        });
    },
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
    },
    dialogFormEdit() {
      let one = {};
      let two = [];
      for (let i in this.rolist) {
        one = {
          id: this.rolist[i]
        };
        two.push(one);
      }
      this.form.rlist = two;
      this.$refs["checkForm"].validate(valid => {
        if (valid) {
          if (this.$route.params.id) {
            this.$api.user
              .edit(this.form)
              .then(res => {
                if (res.status === 200) {
                  this.$message.success(res.message);
                  this.$router.back();
                } else {
                  this.$message.error(res.message);
                }
              })
              .catch(err => {
                this.$message.error("编辑失败！");
              });
          } else {
            this.$api.user
              .add(this.form)
              .then(res => {
                if (res.status === 200) {
                  this.$message.success(res.message);
                  this.$router.back();
                } else {
                  this.$message.error(res.message);
                }
              })
              .catch(err => {
                this.$message.error("添加失败！");
              });
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.el-input {
  width: 350px;
}
.el-select {
  width: 350px;
}
.textarea /deep/ .el-form-item__content {
  display: block;
  margin-left: 100px;
}
.textarea /deep/ .el-textarea__inner {
  min-height: 110px !important;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 350px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  /* border-radius: 50%; */
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.el-avatar {
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  overflow: hidden;
  color: #fff;
  background: #c0c4cc;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  border-radius: 50%;
}
.avatar {
  width: 80px;
  height: 80px;
  /* border-radius: 50%; */
  overflow: hidden;
  display: block;
}
</style>
