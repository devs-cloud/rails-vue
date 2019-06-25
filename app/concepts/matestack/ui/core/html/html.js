import Vue from 'vue/dist/vue.esm'
import componentMixin from 'component/component'

const componentDef = {
  mixins: [componentMixin]
}

let component = Vue.component('matestack-ui-core-html', componentDef)

export default component
