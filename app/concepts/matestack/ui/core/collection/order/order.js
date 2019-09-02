import Vue from 'vue/dist/vue.esm'
import matestackEventHub from 'js/event-hub'
import queryParamsHelper from 'js/helpers/query-params-helper'
import componentMixin from 'component/component'

const componentDef = {
  mixins: [componentMixin],
  data: function(){
    return {
      ordering: {}
    }
  },
  methods: {
    toggleOrder: function(key){
      if (this.ordering[key] == undefined) {
        this.ordering[key] = "asc"
      } else if (this.ordering[key] == "asc") {
        this.ordering[key] = "desc"
      } else if (this.ordering[key] = "desc") {
        this.ordering[key] = undefined
      }
      var url;
      url = queryParamsHelper.updateQueryParams(this.componentConfig["id"] + "-order-" + key, this.ordering[key])
      url = queryParamsHelper.updateQueryParams(this.componentConfig["id"] + "-offset", 0, url)
      window.history.pushState({matestackApp: true, url: url}, null, url);
      matestackEventHub.$emit(this.componentConfig["id"] + "-update")
      this.$forceUpdate()
    },
    orderIndicator(key, indicators){
      return indicators[this.ordering[key]]
    },
    resetFilter: function(){
      var url;
      for (var key in this.filter) {
        url = queryParamsHelper.updateQueryParams(this.componentConfig["id"] + "-filter-" + key, null)
        this.filter[key] = null;
        this.$forceUpdate();
      }
      window.history.pushState({matestackApp: true, url: url}, null, url);
      matestackEventHub.$emit(this.componentConfig["id"] + "-update")
    }
  },
  created: function(){
    var self = this;
    var queryParamsObject = queryParamsHelper.queryParamsToObject()
    Object.keys(queryParamsObject).forEach(function(key){
      if (key.startsWith(self.componentConfig["id"] + "-order-")){
        self.ordering[key.replace(self.componentConfig["id"] + "-order-", "")] = queryParamsObject[key]
      }
    })
  }
}

let component = Vue.component('matestack-ui-core-collection-order', componentDef)

export default componentDef
