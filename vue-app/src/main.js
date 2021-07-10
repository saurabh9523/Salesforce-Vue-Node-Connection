import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import '@mdi/font/css/materialdesignicons.css'
import 'leaflet/dist/leaflet.css';
import { Icon }  from 'leaflet'
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' 
import 'quill/dist/quill.snow.css' 
import 'quill/dist/quill.bubble.css' 

Vue.use(VueQuillEditor)

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
   iconUrl: require('leaflet/dist/images/marker-icon.png'),
   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

Vue.config.productionTip = false

Vue.use(Buefy)

new Vue({
  render: h => h(App),
}).$mount('#app')
