import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import store from './store'
import DateFilter from '@/filters/date'
import 'nprogress/nprogress.css'

Vue.filter('dateFormat', DateFilter)
Vue.use(Vuelidate)
Vue.config.productionTip = false

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  Vue.component(componentName, componentConfig.default || componentConfig)
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
