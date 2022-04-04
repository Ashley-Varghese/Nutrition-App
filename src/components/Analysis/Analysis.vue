<template>

<h5 v-if="$store.state.ingredientList.length===0">Enter some ingredients in the form to add to the  list, and then submit for analysis</h5>
<h4 v-if="$store.state.ingredientList.length!==0">Ingredient List :</h4>

<br>
  <table id="ingredient-list" class="table table-light"  >
    <tr class="" v-for="s in $store.state.ingredientList" :key="s" >
     <td>{{s+" "}} </td> 
     <td class="" style="width:1rem"><i class="fa fa-trash" style="font-size:20px" @click="deleteItem(s)"></i></td>
    </tr>
  </table>
  <br>
  <br>

  <button v-if="$store.state.ingredientList.length!==0" class="btn btn-primary"  data-toggle="modal" data-target="#resultsModal" value="Submit" @click="submit">Submit</button>

  <br>
  <br>
  

  <div class="modal fade" id="resultsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Results of Recipe analysis</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body"> 
          <p>{{$store.state.apiResponse}}</p>
        <b style="color:darkorchid">No of ingredients : {{$store.state.ingredientList.length}}</b>
        <p data-toggle="tooltip" data-placement="top" title="Tooltip on top"> </p>
        <div v-if="$store.state.loading===true">
        <div class="spinner-border text-success" role="status">
        <span class="sr-only">Loading...</span>
        </div>
      </div> 

    <div class="container" v-else-if="Object.keys($store.state.apiResponse).length!==0">
         <table class="centred">
          <tr > <b> Calories: {{$store.state.apiResponse.calories}} </b> </tr> 
          <tr> <b> Weight : {{round($store.state.apiResponse.totalWeight)}} g </b> </tr>
         <b>
         <tr v-for="l in $store.state.apiResponse.dietLabels" :key="l">
        {{l}}
      </tr> 
      </b>

        </table>
  </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>
</template>


<script>
//import Axios from 'axios' 

    export default {
    props:['ingredient'],
     data(){
     return {
      app_id:"4cc00ec3",
      app_key:'3ffd1eb7d2245ac2cf44739c395c9ff0',
      err:'',
      loading1:false,
      searchItem:'',
      searchList:[] ,
      post_data :{
        "ingr":[]
         },
       post_response:{},
            }
        },

        methods: {

      add() { 

      this.searchList.push(this.ingredient);
    },

            deleteItem(foodItem) { 
              alert('The item "'+foodItem+'" is going to be deleted');
              this.$store.dispatch('deleteIngredient',foodItem);
            
            },

    round(n){
       return n.toFixed(2);
    },

    submit () {
      /*
      this.post_data.ingr=this.searchList;
      this.loading1=true;
      Axios.post("https://api.edamam.com/api/nutrition-details?app_id="+this.app_id+"&app_key="+this.app_key, this.post_data).then(response=> { 
             console.log('SUCCESS', response.data);
             this.post_response=response.data;
             this.loading1=false;

             }); */
             this.$store.dispatch('submitPOST');
        }
      },

      watch: {
         ingredient(newIngredient){
             //this.searchList.push(newIngredient);
             this.$store.dispatch('addIngredient',newIngredient);
         }
      }
    }
</script>

<style >

 #ingredient-list{
  width:16rem;
  margin-left:auto; 
  margin-right:auto;
}  

.container {
     justify-content: center;
     margin-left: auto;
     margin-right: auto;
     display: inline-block;
     /*margin-left:240px; */
 } 



</style>