import {createStore} from 'vuex'
import Axios from 'axios'

export default createStore({
    state:{
        ingredientList:[],
        post_data :{
            "ingr":[]
             },
        responsePOST:{},
        reponseGET:{},
        loading:false,
        app_id:"4cc00ec3",
        app_key:'3ffd1eb7d2245ac2cf44739c395c9ff0',
        err:'',
    },

  getters:{},

  mutations: {
      INSERT_INGREDIENT (state, ingredient){
          state.ingredientList.push(ingredient)
      },

      REMOVE_INGREDIENT (state,ingredient){
          state.ingredientList = state.ingredientList.filter(function(value){
              return !(value===ingredient)
          })
      },

      ADD_POST_RESPONSE (state, response) {
        state.responsePOST= response;
      },

      ADD_GET_RESPONSE (state, response) {
         state.reponseGET=response;
      },

      ADD_POST_DATA (state, ingr){
          state.post_data.ingr=ingr;
      },
        
      UPDATE_LOADING (state, loading) {
          state.loading=loading;
      }
  },
  actions:{
      addIngredient ( context, payload){
          context.commit('INSERT_INGREDIENT', payload);
      },

      deleteIngredient (context, payload){
          context.commit('REMOVE_INGREDIENT',payload);
      },

      submitPOST (context) {
        context.commit('ADD_POST_DATA',this.state.ingredientList);
        context.commit('UPDATE_LOADING',true);
        Axios.post("https://api.edamam.com/api/nutrition-details?app_id="+this.state.app_id+"&app_key="+this.state.app_key, this.state.post_data).then(response=> { 
            console.log('SUCCESS', response.data);
            context.commit('ADD_POST_RESPONSE', response.data);
            context.commit('UPDATE_LOADING',false);
            });
      },

      /*submitGET (context, payload) {
        context.commit('UPDATE_LOADING',true);

      } */
  }
})