import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '',
      name: 'Layout',
      redirect: '/',
      component: () => import(/* webpackChunkName: "navigator" */ '@/components/layout/IndexLayout'),
      children: [
        {
          path: '/',
          name: 'Index',
          component: () => import(/* webpackChunkName: "navigator" */ '@/views/Index')
        },
        {
          path: '/server',
          name: 'Server',
          redirect: '/server/care',
          component: () => import(/* webpackChunkName: "navigator" */ '@/components/layout/UserLayout'),
          children: [
            {
              path: 'information',
              name: 'Information',
              redirect: '/server/information/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'server_information_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/server/information/List'),
                },
              ]
            },
            {
              path: 'backlog',
              name: 'Backlog',
              redirect: '/server/backlog/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'server_backlog_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/server/backlog/Details'),
                },
                {
                  path: 'add',
                  name: 'server_backlog_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/server/backlog/Details'),
                },
                {
                  path: ':id',
                  name: 'server_backlog_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/server/backlog/List')
                }
              ]
            },

            {
              path: 'authorization',
              name: 'Authorization',
              redirect: '/server/authorization/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'server_authorization_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/server/authorization/List'),
                },
                {
                  path: 'add',
                  name: 'server_authorization_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/server/authorization/Details'),
                },
                {
                  path: ':id',
                  name: 'server_authorization_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/server/authorization/Details')
                }
              ]
            },

            {
              path: 'flowQuery',
              name: 'FlowQuery',
              redirect: '/server/flowQuery/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'info',
                  name: 'server_flowQuery_info',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/server/flowQuery/Info'),
                },
                {
                  path: 'list',
                  name: 'server_flowQuery_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/server/flowQuery/List'),
                },
                {
                  path: 'add',
                  name: 'server_flowQuery_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/server/flowQuery/Details'),
                },
                {
                  path: ':id',
                  name: 'server_flowQuery_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/server/flowQuery/Details')
                }
              ]
            },
            {
              path: 'contract',
              name: 'Contract',
              redirect: '/server/contract/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'server_contract_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/server/contract/List'),
                },
                {
                  path: 'add',
                  name: 'server_contract_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/server/contract/Details'),
                },
                {
                  path: ':id',
                  name: 'server_contract_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/server/contract/Details')
                }
              ]
            },
            {
              path: 'present',
              name: 'Present',
              redirect: '/server/present/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'server_present_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/server/present/List'),
                },
                {
                  path: 'add',
                  name: 'server_present_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/server/present/Details'),
                },
                {
                  path: ':id',
                  name: 'server_present_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/server/present/Details')
                }
              ]
            },
            {
              path: 'notice',
              name: 'Notice',
              redirect: '/server/notice/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'server_notice_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/server/notice/List'),
                },
                {
                  path: 'add',
                  name: 'server_notice_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/server/notice/Details'),
                },
                {
                  path: ':id',
                  name: 'server_notice_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/server/notice/Details')
                }
              ]
            },
            {
              path: 'coupon',
              name: 'Coupon',
              redirect: '/server/coupon/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'info',
                  name: 'server_coupon_info',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/server/coupon/Info'),
                },
                {
                  path: 'list',
                  name: 'server_coupon_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/server/coupon/List'),
                },
                {
                  path: 'add',
                  name: 'server_coupon_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/server/coupon/Details'),
                },
                {
                  path: ':id',
                  name: 'server_coupon_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/server/coupon/Details')
                }
              ]
            },
          ]
        },
        {
          path: '/picture',
          name: 'Picture',
          redirect: '/picture/visit1',
          component: () => import(/* webpackChunkName: "navigator" */ '@/components/layout/ConLayout'),
          children: [
            {
              path: 'standards',
              name: 'picture_standards',
              redirect: '/picture/standards/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'picture_standards_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/picture/standards/List'),
                },
                {
                  path: 'add',
                  name: 'picture_standards_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/picture/standards/Details'),
                },
                {
                  path: ':id',
                  name: 'picture_standards_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/picture/standards/Details'),
                }
              ]
            },
            {
              path: 'visit1',
              name: 'picture_visit1',
              redirect: '/picture/visit1/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'picture_visit1_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/picture/visit1/List'),
                },
                {
                  path: 'add',
                  name: 'picture_visit1_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/picture/visit1/Details'),
                },
                {
                  path: ':id',
                  name: 'picture_visit1_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/picture/visit1/Details'),
                }
              ]
            },
            {
              path: 'visit2',
              name: 'picture_visit2',
              redirect: '/picture/visit2/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'picture_visit2_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/picture/visit2/List'),
                },
                {
                  path: 'add',
                  name: 'picture_visit2_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/picture/visit2/Details'),
                },
                {
                  path: ':id',
                  name: 'picture_visit2_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/picture/visit2/Details'),
                }
              ]
            },
            {
              path: 'visit3',
              name: 'picture_visit3',
              redirect: '/picture/visit3/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'picture_visit3_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/picture/visit3/List'),
                },
                {
                  path: 'add',
                  name: 'picture_visit3_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/picture/visit3/Details'),
                },
                {
                  path: ':id',
                  name: 'picture_visit3_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/picture/visit3/Details'),
                }
              ]
            },
            {
              path: 'foreign1',
              name: 'picture_foreign1',
              redirect: '/picture/foreign1/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: ':list',
                  name: 'picture_foreign1_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/picture/foreign1/List'),
                },
                {
                  path: 'add',
                  name: 'picture_foreign1_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/picture/foreign1/Details'),
                },
                {
                  path: ':id',
                  name: 'picture_foreign1_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/picture/foreign1/Details'),
                }
              ]
            },
            {
              path: 'exchange1',
              name: 'picture_exchange1',
              redirect: '/picture/exchange1/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: ':list',
                  name: 'picture_exchange1_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/picture/exchange1/List'),
                },
                {
                  path: 'add',
                  name: 'picture_exchange1_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/picture/exchange1/Details'),
                },
                {
                  path: ':id',
                  name: 'picture_exchange1_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/picture/exchange1/Details'),
                }
              ]
            },
          ]
        },
        {
          path: '/article',
          name: 'Article',
          redirect: '/article/story',
          component: () => import(/* webpackChunkName: "navigator" */ '@/components/layout/UserLayout'),
          children: [
            {
              path: 'type',
              name: 'article_type',
              redirect: '/article/type/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'article_type_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/type/List'),
                },
                {
                  path: 'listType',
                  name: 'article_listType_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/type/ListType'),
                },
                {
                  path: 'add',
                  name: 'article_type_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/type/Details'),
                },
                {
                  path: ':id',
                  name: 'article_type_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/type/Details'),
                },

                {
                  path: 'listType/add',
                  name: 'article_listType_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/type/DetailsType'),
                },
                {
                  path: 'listType/:id',
                  name: 'article_listType_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/type/DetailsType'),
                },

              ]
            },
            {
              path: 'coupon',
              name: 'Coupon',
              redirect: '/article/coupon/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'info',
                  name: 'article_coupon_info',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/coupon/Info'),
                },
                {
                  path: 'list',
                  name: 'article_coupon_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/coupon/List'),
                },
                {
                  path: 'add',
                  name: 'article_coupon_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/coupon/Details'),
                },
                {
                  path: ':id',
                  name: 'article_coupon_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/coupon/Details')
                }
              ]
            },
            {
              path: 'department',
              name: 'article_department',
              redirect: '/article/department/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'article_department_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/department/List'),
                },
                {
                  path: 'add',
                  name: 'article_department_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/department/Details'),
                },
                {
                  path: ':id',
                  name: 'article_department_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/department/Details'),
                }
              ]
            },
            {
              path: 'configuration',
              name: 'article_configuration',
              redirect: '/article/configuration/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'article_configuration_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/configuration/List'),
                },
                {
                  path: 'add',
                  name: 'article_configuration_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/configuration/Details'),
                },
                {
                  path: ':id',
                  name: 'article_configuration_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/configuration/Details'),
                }
              ]
            },
            {
              path: 'duty',
              name: 'article_duty',
              redirect: '/article/duty/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'article_duty_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/duty/List'),
                },
                {
                  path: 'add',
                  name: 'article_duty_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/duty/Details'),
                },
                {
                  path: ':id',
                  name: 'article_duty_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/duty/Details'),
                }
              ]
            },
            {
              path: 'order',
              name: 'article_order',
              redirect: '/article/order/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'article_order_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/order/List'),
                },
                {
                  path: ':id',
                  name: 'article_order_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/order/Details'),
                }
              ]
            },
            {
              path: 'background',
              name: 'article_background',
              redirect: '/article/background/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'article_background_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/background/List'),
                },
                {
                  path: 'add/:ids',
                  name: 'article_background_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/background/addDetails'),
                },
                {
                  path: ':id',
                  name: 'article_background_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/background/Details'),
                }
              ]
            },
            {
              path: 'login',
              name: 'article_login',
              redirect: '/article/login/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'article_login_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/login/List'),
                },
                {
                  path: ':id',
                  name: 'article_login_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/login/Details'),
                }
              ]
            },
            {
              path: 'system',
              name: 'article_system',
              redirect: '/article/system/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'article_system_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/system/List'),
                },
                {
                  path: ':id',
                  name: 'article_system_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/system/Details'),
                }
              ]
            },
            {
              path: 'story',
              name: 'article_story',
              redirect: '/article/story/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'article_story_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/story/List'),
                },
                {
                  path: 'add',
                  name: 'article_story_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/story/Details'),
                },
                {
                  path: ':id',
                  name: 'article_story_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/story/Details')
                },
              ]
            },
            {
              path: 'news',
              name: 'article_news',
              redirect: '/article/news/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'article_news_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/news/List'),
                },
                {
                  path: 'add',
                  name: 'article_news_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/news/Details'),
                },
                {
                  path: ':id',
                  name: 'article_news_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/news/Details')
                },
                {
                  path: 'menu/:id',
                  name: 'role_menu_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/news/menuDetails'),
                },
                {
                  path: 'authManager',
                  name: 'article_authManager',
                  redirect: '/article/authManager/access',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/news/authManager/Main'),
                  children: [
                    {
                      path: 'access/:access',
                      name: 'article_authManager_access',
                      component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/news/authManager/Access'),
                    },
                    {
                      path: 'category/:category',
                      name: 'article_authManager_category',
                      component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/news/authManager/Category'),
                    },
                    {
                      path: 'user/:user',
                      name: 'article_authManager_user',
                      component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/news/authManager/User'),
                    },
                  ]
                },
              ]
            },
            {
              path: 'update',
              name: 'article_updateNickname',
              redirect: '/article/update/updateNickname',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/update/Main'),
              children: [
                {
                  path: 'updateNickname',
                  name: 'article_update_updateNickname',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/update/updateNickname'),
                },
                {
                  path: 'updatePassword',
                  name: 'article_update_updatePassword',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/article/update/updatePassword'),
                },
              ]
            },
          ]
        },
      ]
    },

    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "navigator" */ '@/views/Login')
    },
    {
      path: '/404',
      name: 'Undefine',
      component: () => import(/* webpackChunkName: "navigator" */ '@/views/Undefine')
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
