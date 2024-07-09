import { createApp } from 'vue';
import App from './App.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faEye);

const app = createApp(App);

// Use FontAwesome
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
