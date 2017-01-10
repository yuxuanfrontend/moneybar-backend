import dynamic from '../pages/dynamic/dynamic'
import dynamicDetail from '../pages/dynamic/dynamic-detail'
import team from '../pages/team/team'
import topic from '../pages/topic/topic'
import user from '../pages/user/user'
import managementcontent from '../components/managementContent'
import teamlist from '../pages/team/teamList'
import newaddteam from '../pages/team/newAddTeam'

module.exports = [
  // {
  //   path:'/',
  //   name:'',
  //   component:managementcontent
  // },

  {
    path: '/dynamic',
    component: dynamic,
  },

  {
    path: '/dynamic-detail',
    component: dynamicDetail
  },
  {
    path: '/team',
    component: team
  },

  {
    path:'/teamlist/:id',
    component:teamlist
  },

  {
    path:'/newaddteam',
    component:newaddteam
  },

  {
    path: '/topic',
    component: topic
  },

  {
    path: '/user',
    component: user
  },
];
