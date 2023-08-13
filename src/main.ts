import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import PrimeVue from 'primevue/config';
import i18n from './util/locale';
import './registerServiceWorker'
import 'primeicons/primeicons.css'
// import 'primeflex/primeflex.scss';


const app = createApp(App)
const pinia = createPinia()

app.use(i18n)
app.use(router)
app.use(pinia)
app.use(PrimeVue)

app.mount('#app')
