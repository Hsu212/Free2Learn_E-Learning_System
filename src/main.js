// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // <-- Import the router
import './assets/main.css'; // <-- Import global styles

const app = createApp(App);
app.use(router); // <-- Use the router
app.mount('#app');