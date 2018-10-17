import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import admin from '@/components/admin'
import login from '@/components/login'
import ad from '@/components/admin/index.js'
import p from '@/components/p/index'
import pIndex from '@/components/p'

import store from '../store/';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/p/:id/',
      component: pIndex,
      children:[
        {
          path: '',
          name: 'checkin',
          component: p.checkin
        },
        {
          path: 'survey',
          name: 'survey',
          component: p.survey,
          beforeEnter: (to, from, next) => {
            //console.log(store);
            // console.log(router);
            let power = store.state.power;
            if(power === 1){
              next()
            }else{
              next('/p/' + to.params.id)
            }
          }
        },
        {
          path: 'score',
          name: 'score',
          component: p.score,
          beforeEnter: function(to, from, next) {
            let power = store.state.power;
            if(power === 2){
              next()
            }else{
              next('/p/' + to.params.id)
            }
          }
        }
      ],
    },
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/admin/',
      component: admin,
      beforeEnter: (to, from, next) => {
        if(store.state.power === 3){
          next()
        }else{
          next('/login')
        }
      },
      children:[
        {
          path: '',
          name: 'admin',
          component: ad.index
        },
        {
          path: 'new',
          name: 'newApaper',
          component: ad.newApaper
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
