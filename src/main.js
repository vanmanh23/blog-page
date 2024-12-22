import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Aura from '@primevue/themes/aura';

createApp(App)
  .use(router)
  .use(ToastService)
  .use(PrimeVue, { theme: {preset: Aura} })
  .mount('#app')
