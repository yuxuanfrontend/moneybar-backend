import dynamic from '../pages/dynamic/dynamic'
import dynamicDetail from '../pages/dynamic/dynamic-detail'
import team from '../pages/team/team'
import teamlist from '../pages/team/teamList'
import newaddteam from '../pages/team/newAddTeam'

import topic from '../pages/topic/topic'
import addtopic from '../pages/topic/add-topic'


import user from '../pages/user/user'
import reportdynamic from '../pages/user/report-dynamic'
import reportcomment from '../pages/user/report-comment'

import managementwrap from '../components/managementWrap'
import managementmenu from '../components/managementMenu'

import login from '../components/login'



module.exports = [
  {
    path:'/',
    component:login
  },

  {
    path:'/login',
    component:login
  },

  {
    path:'/managementwrap',
    name:'',
    component:managementwrap,

    children:[

      {
        path:'dynamic',
        name:'动态管理',
        component: dynamic,
      },

      {
        path: 'dynamicDetail/:id',
        name:'动态详情',
        component: dynamicDetail
      },

      {
        path: 'team',
        name:'小组管理',
        component: team
      },

      {
        path:'user',
        name:'用户管理',
        component:user
      },

      {
        path:'reportdynamic',
        component:reportdynamic
      },

      {
        path:'reportcomment',
        component:reportcomment
      },

      {
        path:'teamlist/:id',
        component:teamlist
      },

      {
        path:'newaddteam',
        component:newaddteam
      },

      {
        path: 'topic',
        component: topic
      },

      {
        path:'addtopic',
        component:addtopic
      },

      {
        path: 'user',
        component: user
      }
    ]
  },


];
