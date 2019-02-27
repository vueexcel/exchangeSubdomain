import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    baseUrl: 'https://gar8ww5eab.execute-api.us-east-2.amazonaws.com/dev',
    exchangeNameDomain: '',
    //COGNITO CREDENTIALS ===
    cognito_clientID: '',
    cognito_identityPoolID: '',
    cognito_region: '',
    cognito_userPoolID: ''
    //COGNITO CREDENTIALS ENDS====
  },
  mutations: {
    setDomainPath: (state, data) => {
      state.exchangeNameDomain = data;
    },
    setcognitoCredentials: (state, data) => {
      state.cognito_clientID = data.clientID; //==
      state.cognito_identityPoolID = data.identityPoolID; //====
      state.cognito_region = data.region; //==
      state.cognito_userPoolID = data.userPoolID; //==
    },
  },
  actions: {
    // -------------- GET COGNITO CREDENTIALS VIA URL ----------
    async getCognitoCredentials({
      state,
      commit
    }, payload) {
      var exUserFromUrl = state.exchangeNameDomain
      try {
        if (state.exchangeNameDomain !== '') {
          let response = await axios.get(`${state.baseUrl}/cognito/getCognitoCredentials/${exUserFromUrl}`)
          if (response) {
            commit('setcognitoCredentials', response.data.data)
          }
        }
      } catch (err) {
        return err
      }
    },
    // -------------- GET COGNITO CREDENTIALS VIA URL ENDS----------
  }
})
export default store