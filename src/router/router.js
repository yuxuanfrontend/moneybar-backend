import dynamic from '../pages/dynamic/dynamic'
import dynamicDetail from '../pages/dynamic/dynamic-detail'
import team from '../pages/team/team'
import topic from '../pages/topic/topic'
import user from '../pages/user/user'
import managementcontent from "../components/managementContent"

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
    path: '/topic',
    component: topic
  },

  {
    path: '/user',
    component: user
  },
];
