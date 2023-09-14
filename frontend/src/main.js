import { createApp } from 'vue'
import App from './App.vue'
import kitStore from './store/kitStore'

createApp(App).use(kitStore).mount('#app')
