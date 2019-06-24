import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      rname:'',
      sex:''
  },
  mutations: {
    setNameSex(state,payload){
        console.log(payload.rname,payload.sex)
        state.rname=payload.rname
        state.sex=payload.sex
    }
  },
  actions: {

  }
})
