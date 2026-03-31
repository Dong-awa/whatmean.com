import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import App from './App.vue'
import router from './router'

const head = createHead()

createApp(App).use(router).use(head).mount('#app')
