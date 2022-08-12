import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import App from './App.vue'

import UserListPage from './pages/UserListPage.vue'
import UserDetailPage from './pages/UserDetailPage.vue'

const routes = [
  { name: 'userList', path: '/', component: UserListPage },
  { name: 'userDetail', path: '/Detail/:userid?', component: UserDetailPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)

app.use(router)

app.mount('#app')
app.config.globalProperties.$axios = axios