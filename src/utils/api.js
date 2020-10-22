import { get, post, form, deletes, put, derive } from './request.js';//导入axios实例文件中方法
// let bsae_api = process.env.BASE_API ? './'+process.env.BASE_API :'..' //获取项目api请求地址
//根据id获取用户信息
let base_api = 'http://192.168.0.109:8081'
// let base_api = 'http://193.112.76.40:7071'

const api = {
  // 检查session
  checkSession() {
    return post('/checkSession', '')
  },
  // 文件下载
  download: base_api + '/downloadfile/',
  // 文件上传
  upload: base_api + '/uploadfile',
  // 登录
  login(data) {
    return form('/login', data)
  },
  // 退出
  logout() {
    return post('/logout', '')
  },
  // 修改密码
  updatePass(data) {
    return form('/updateuserpassword', data)
  },
  // 公用文件上传
  uploadPicture(data) {
    // return form(base_api + `/addImageManagement`, data)
    return form(`/uploadfile`, data)
  },
  // 获取字典表类型
  selectdic(data) {
    return form('/selectdic', data)
  },
  // 流水号
  util(data) {
    return post('/util/getserialnumber', data)
  },
  // 通用管理
  base: {
    // 通用列表
    list(data) {
      return form('/base/get', data)
    },
    // 通用删除
    delete(data) {
      return form('/base/del', data)
    },
    // 通用详情
    item(data) {
      return form('/base/getbyid', data)
    },
    // 通用修改
    edit(data) {
      return form('/base/update', data)
    },
    // 通用新增
    add(data) {
      return form('/base/add', data)
    }
  },
  // 流程管理
  process: {
    // 办理任务
    completeTask(data) {
      return form('/process/completeTask', data)
    },
    // 获取流程下一个节点
    getnextnode(data) {
      console.log(data)
      return form('/process/getnextnode', data)
    },
    // 查询流程的最新任务
    getthisprocess(params, data) {
      return post('/activitiTask/getthisprocess?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },

  },

  // 流程任务
  activitiTask: {
    // 查询流程任务
    get(params, data) {
      return post('/activitiTask/get?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },
    // 查询待办流程任务
    getbacklog(params, data) {
      return post('/activitiTask/getbacklog?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },
    // 查询抄送流程任务
    getcarbonCopy(params, data) {
      return post('/activitiTask/getcarbonCopy?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },
    // 查询已完成流程任务
    getfinished(params, data) {
      return post('/activitiTask/getfinished?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },
    // 查询我发起的流程任务
    getinitiate(params, data) {
      return post('/activitiTask/getinitiate?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },
    // 查询已办流程任务
    getunderway(params, data) {
      return post('/activitiTask/getunderway?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },
  },
  // 流程任务
  getbacklog(id, params) {
    var request_url = '/activitiTask'
    if (Math.floor(id) === 1) {
      request_url += ('/getbacklog?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize) // 查询待办流程任务
    } else if (Math.floor(id) === 2) {
      request_url += ('/getcarbonCopy?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize) // 查询抄送流程任务
    } else if (Math.floor(id) === 3) {
      request_url += ('/getfinished?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize) // 查询已完成流程任务
    } else if (Math.floor(id) === 4) {
      request_url += ('/getinitiate?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize) // 查询我发起的流程任务
    } else if (Math.floor(id) === 5) {
      request_url += ('/getunderway?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize) // 查询已办流程任务
    }
    return post(request_url) //resfulapi风格
  },
  // 公告管理
  notice: {
    // 公告列表
    list(params, data) {
      return post('/notice/get?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },
    // 公告列表表单
    form(params, data) {
      return post('/notice/getform?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },
    // 公告删除
    delete(data) {
      return form('/notice/del', data)
    },
    // 公告详情
    item(data) {
      return form('/notice/getbyid', data)
    },
    // 公告修改
    edit(data) {
      return post('/notice/edit', data)
    },
    // 公告新增
    add(data) {
      return post('/notice/add', data)
    }
  },
  // 礼品管理
  present: {
    // 礼品列表
    list(params, data) {
      return post('/present/get?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },
    // 礼品列表表单
    form(params, data) {
      return post('/present/getform?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },
    // 礼品删除
    delete(data) {
      return form('/present/del', data)
    },
    // 礼品详情
    item(data) {
      return form('/present/getbyid', data)
    },
    // 礼品修改
    edit(data) {
      return post('/present/edit', data)
    },
    // 礼品新增
    add(data) {
      return post('/present/add', data)
    }
  },
  // 协议管理
  agreement: {
    // 协议列表
    list(params, data) {
      return post('/agreement/get?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },
    // 协议列表表单
    form(params, data) {
      return post('/agreement/getform?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },
    // 协议删除
    delete(data) {
      return form('/agreement/del', data)
    },
    // 协议详情
    item(data) {
      return form('/agreement/getbyid', data)
    },
    // 协议修改
    edit(data) {
      return post('/agreement/edit', data)
    },
    // 协议新增
    add(data) {
      return post('/agreement/add', data)
    }
  },
  // 开支标准管理
  visitfundinfo: {
    // 开支标准列表
    list(params, data) {
      return post('/visitfundinfo/get?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },
    // 开支标准列表表单
    form(params, data) {
      return post('/visitfundinfo/getform?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },
    // 开支标准删除
    delete(data) {
      return form('/visitfundinfo/del', data)
    },
    // 开支标准详情
    item(data) {
      return form('/visitfundinfo/getbyid', data)
    },
    // 开支标准修改
    edit(data) {
      return post('/visitfundinfo/edit', data)
    },
    // 开支标准新增
    add(data) {
      return post('/visitfundinfo/add', data)
    }
  },
  // 字典管理
  dic: {
    // 字典列表
    list(params, data) {
      return post('/admin/selectdicpage?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },
    // 字典删除
    delete(data) {
      return form('/admin/deletedic', data)
    },
    // 字典详情
    item(data) {
      return form('/selectdicbyid', data)
    },
    // 字典新增/修改
    addEdit(data) {
      return post('/admin/updatedic', data)
    },
    // 字典类型列表
    listType(params, data) {
      return post('/admin/selectdictypepage?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },
    // 字典类型删除
    deleteType(data) {
      return form('/admin/deletedictypepage', data)
    },
    // 字典类型详情
    itemType(data) {
      return form('/selectdictypbyid', data)
    },
    // 字典类型修改
    editType(data) {
      return post('/admin/updatedictype', data)
    },
    // 字典类型新增
    addType(data) {
      return post('/admin/insertdictype', data)
    }
  },
  // 流程模型管理
  models: {
    // 流程模型列表
    list() {
      return get('/models/getAll')
    },
    // 流程模型分类列表
    form(data) {
      return form('/models/getbycategory', data)
    },
    // 流程模型删除
    delete(params, data) {
      return post('/models/delete?modelId=' + params.modelId, data)
    },
    // 流程模型详情
    item(data) {
      return form('/models/getById', data)
    },
    // 流程模型修改
    edit(data) {
      return post('/models/update', data)
    },
    // 流程模型新增
    add(data) {
      return form('/models/newModel', data)
    }
  },
  // 授权管理
  accredit: {
    // 授权列表
    list(params, data) {
      return post('/accredit/get?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },
    // 授权删除
    delete(data) {
      return form('/accredit/delete', data)
    },
    // 授权详情
    item(data) {
      return form('/accredit/getbyid', data)
    },
    // 授权修改
    edit(data) {
      return post('/accredit/edit', data)
    },
    // 授权新增
    add(data) {
      return post('/accredit/add', data)
    }
  },
  // 部门管理
  dept: {
    // 部门列表
    list(params, data) {
      return post('/dept/get?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },
    // 部门表单列表
    form(params, data) {
      return post('/dept/getform?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },
    // 部门删除
    delete(data) {
      return form('/dept/delete', data)
    },
    // 部门详情
    item(data) {
      return form('/dept/getById', data)
    },
    // 部门修改
    edit(data) {
      return post('/dept/update', data)
    },
    // 部门新增
    add(data) {
      return post('/dept/add', data)
    }
  },
  // 职务管理
  post: {
    // 职务列表
    list(params, data) {
      return post('/post/get?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },
    // 职务表单列表
    form(params, data) {
      return post('/post/getform?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },
    // 职务删除
    delete(data) {
      return form('/post/delete', data)
    },
    // 职务详情
    item(data) {
      return form('/post/getById', data)
    },
    // 职务修改
    edit(data) {
      return post('/post/update', data)
    },
    // 职务新增
    add(data) {
      return post('/post/add', data)
    }
  },
  // 表单管理
  comForm: {
    // 表单列表
    list(params, data) {
      return post('/com/form/getList?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },
    // 表单删除
    delete(data) {
      return form('/com/form/delete', data)
    },
    // 表单详情
    item(data) {
      return form('/com/form/getById', data)
    },
    // 表单修改
    edit(data) {
      return post('/com/form/update', data)
    },
    // 表单新增
    add(data) {
      return post('/com/form/add', data)
    }
  },
  // 菜单管理
  menu: {
    // 菜单列表
    list(params, data) {
      return post('/menu/get?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },
    // 菜单列表管理员
    admin(params, data) {
      return post('/menu/getadmin?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },
    // 菜单表单
    form(params, data) {
      return post('/menu/getform?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },
    // 菜单删除
    deletes(data) {
      return form('/menu/delete', data)
    },
    // 菜单详情
    item(data) {
      return form('/menu/getById', data)
    },
    // 角色菜单权限
    tree(data) {
      return form('/menu/getroleaciontree', data)
    },
    // 角色菜单权限
    editTree(data) {
      return post('/menu/updateroleaciontree', data)
    },
    // 菜单新增
    add(data) {
      return post('/menu/add', data)
    },
    // 菜单修改
    edit(data) {
      return post('/menu/update', data)
    },
  },
  // 角色管理
  role: {
    // 角色列表
    list(params, data) {
      return post('/role/get?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },
    // 角色表单列表
    form(params, data) {
      return post('/role/getform?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },
    // 角色权限列表
    listTree(data) {
      // return pro('/pro/getroleaciontree?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
      return form('/pro/getroleaciontree', data)
    },
    // 角色权限修改
    editTree(data) {
      return post('/pro/updateroleaciontree', data)
    },
    // 角色删除
    delete(data) {
      return form('/role/delete', data)
    },
    // 角色详情
    item(data) {
      return form('/role/getById', data)
    },
    // 角色修改
    edit(data) {
      return post('/role/update', data)
    },
    // 角色新增
    add(data) {
      return post('/role/add', data)
    }
  },
  // 用户管理
  user: {
    // 用户列表
    list(params, data) {
      return post('/user/get?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize, data)
    },
    // 用户删除
    delete(data) {
      return form('/user/delete', data)
    },
    // 用户详情
    item(data) {
      return form('/user/getById', data)
    },
    // 用户修改
    edit(data) {
      return post('/user/update', data)
    },
    // 用户新增
    add(data) {
      return post('/user/add', data)
    }
  },

  // 日志管理
  log: {
    // 日志列表
    list(params, data) {
      let url = '/admin/selectlog?pageNumber=' + params.pageNumber + '&pageSize=' + params.pageSize
      return post(url, data)
    },
    // 日志详情
    item(data) {
      return form('/admin/selectlogbyid', data)
    }
  },
}
export default api;
