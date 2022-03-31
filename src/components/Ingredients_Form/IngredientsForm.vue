<template>
    
   <div class="card" > 
  <div class="card-body">
    
  <div class= "form-group">
    <label  for="qty" data-toggle="tooltip" title="Hooray!" >Quantity </label>
    <input type="number" class="form-control mb-1" min="1" v-model="qty">

    <label for="unit">Unit</label> 
    <select class="form-control mb-1" name="" id="unit" v-model="unit">
      <option value="cup">Cup</option>
      <option value="ounce">Ounce (oz)</option>
      <option value="pinch">Pinch</option>
      <option value="tablespoon">Tablespoon</option>
      <option value="teaspoon">Teaspoon</option>
      <option value="pint">Pint</option>
    </select>

    <label for="food">Food item</label>
    <input type="text" id="food" class="form-control" v-model="food"> 
<br>
    <button id="" class="btn btn-info"  @click="add" style="width:75px"> Add </button>

  </div>
  </div> 

</div>

</template>

<script>
import Axios from 'axios'

    export default {
        data(){
            return {
                app_id:"4cc00ec3",
                app_key:'3ffd1eb7d2245ac2cf44739c395c9ff0',
                loading1:false,
                err:'',
                qty:0,
                unit:'',
                food:'',
                searchItem:'',
                searchList:[] ,
                post_data :{
                 "ingr":[]
                    },
                 post_response:{}

            }
        },

  methods: {
    add() { 
      if(this.qty!==0 && this.unit!=='' && this.food!=='' ) {
      this.searchItem= this.qty +" "+ this.unit +" "+ this.food;
      
      this.searchList.push(this.searchItem);
      }
      else {
        alert("Enter a value for each field before adding");
      }
    }, 

    deleteItem(foodItem) { 
      alert('The item "'+foodItem+'" is going to be deleted');
      this.searchList=this.searchList.filter(function(value){
        return !(value===foodItem);
       }); 
    },

    round(n){
       return n.toFixed(2);
    },

    submit () {
      
      this.post_data.ingr=this.searchList;
      this.loading1=true;
      Axios.post("https://api.edamam.com/api/nutrition-details?app_id="+this.app_id+"&app_key="+this.app_key, this.post_data).then(response=> { 
             console.log('SUCCESS', response.data);
             this.post_response=response.data;
             this.loading1=false;

             });
    },

   
  }
}
</script>

<style >
   
</style>