// [AI_START TIMESTAMP=2025-06-15 12:00:00]
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

const auth = useAuthStore()
auth.restoreSession()

app.use(router)
app.mount('#app')
// [AI_END LINES=19 TIMESTAMP=2025-06-15 12:00:00]
