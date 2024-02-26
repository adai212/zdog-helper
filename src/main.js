import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import zdogHelper from './components/index.js'

createApp(App)
  .use(zdogHelper)
  .mount('#app')
