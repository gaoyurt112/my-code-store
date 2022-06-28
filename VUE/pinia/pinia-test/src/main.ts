import { createApp } from 'vue'
import App from './App.vue'

//引入pinia
import { createPinia} from 'pinia'
//实例化pinia
const pinia = createPinia()

const app = createApp(App)

//挂载pinia
app.use(pinia)
app.mount('#app')
