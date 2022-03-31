<template>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head> 
 
 <h2>
   <b> Recipe Analyzer </b> 
 </h2>
 <br> 
<div class="container">
 <div class="row">
<div class="col-lg-7 col-md-8 col-sm-10">
   <div class="card " style="padding:4px 4px 4px 4px;"> 
  <div class="card-body">
    <div class="container">

  <table class="centred">
    <th>Food Item List</th>
    <th rowspan="4" class="panel">
      <br>
      <p v-if="Object.keys(get_response).length===0"  style="padding:80px 20px">
         Select a food item from the list to see its analysis in this panel
      </p>

      <div  class="results" v-else-if="Object.keys(get_response).length!==0"> 
        <img class="foodImage" :src="require(`@/${src}`)" >
        <table class="centred">
         <tr>Calories: {{get_response.calories}}</tr>
         <tr> Weight: {{get_response.totalWeight}} g</tr>
         <tr v-for="l in get_response.dietLabels" :key="l">
           {{l}}
        </tr> 
       </table>
       
    </div>
    </th>

    <tr>
       <div class="table-card" @click="getFacts('1 tomato')">
        <p >
          <em> Tomato</em> 
        
          </p>
       </div>
    </tr> 

    <tr>
       <div class="table-card" @click="getFacts('1 egg')">
    <p >
      <em> Egg</em>
      </p>
      </div>
    </tr>

    <tr>
       <div class="table-card" @click="getFacts('1 potato')">
       <p >
         <em> Potato</em>
         </p>
       </div>
    </tr>
  </table>

  </div>
  </div>
</div> 
</div>

<div class="col-lg-5 col-md-8 col-sm-10">
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
</div>
</div>
</div>
  <br> 
<br>
<h5 v-if="searchList.length===0">Enter some ingredients in the form to add to the  list, and then submit for analysis</h5>
<h4 v-if="searchList.length!==0">Ingredient List :</h4>
<br>
  <table id="ingredient-list" class="table table-light"  >
    <tr class="" v-for="s in searchList" :key="s" >
     <td>{{s+" "}} </td> 
     <td class="" style="width:1rem"><i class="fa fa-trash" style="font-size:20px" @click="deleteItem(s)"></i></td>
    </tr>
  </table>
  <br>
  <br>

  <button v-if="searchList.length!==0" class="btn btn-primary"  data-toggle="modal" data-target="#resultsModal" value="Submit" @click="submit">Submit</button>

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
        <b style="color:darkorchid">No of ingredients : {{searchList.length}}</b>
        <p data-toggle="tooltip" data-placement="top" title="Tooltip on top"> </p>
        <div v-if="loading1===true">
        <div class="spinner-border text-success" role="status">
        <span class="sr-only">Loading...</span>
        </div>
      </div> 

    <div class="container" v-else-if="Object.keys(post_response).length!==0">
         <table class="centred">
          <tr > <b> Calories: {{post_response.calories}} </b> </tr> 
          <tr> <b> Weight : {{round(post_response.totalWeight)}} g </b> </tr>
         <b>
         <tr v-for="l in post_response.dietLabels" :key="l">
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
  
  <br>
  <br>

</template>

<script>  

//api-id =4cc00ec3
//api-key=3ffd1eb7d2245ac2cf44739c395c9ff0, 862787ee84da281d5b0b31e3a70df086	

import paths from "@/assets/pathlist.json" 
import Axios from 'axios' 
//import FoodItemList from './Food_Item_List/FoodItemList.vue'
//import IngredientsForm from './Ingredients_Form/IngredientsForm.vue'





export default {
  components: { },
  setup () {
    return {
    }
  },

  data () {
    return {
      app_id:"4cc00ec3",
      app_key:'3ffd1eb7d2245ac2cf44739c395c9ff0',
      err:'',
      src:'',
      plist : paths,
      loading1:false,
      loading:false,
      qty:0,
      unit:'',
      food:'',
      searchItem:'',
      searchList:[] ,
      post_data :{
        "ingr":[]
         },
       post_response:{},
       get_response:{}
    }
  },

  methods: 
        {   
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

            getFacts(ingr){
            this.loading=true;
            this.src=this.getPath(ingr);
            Axios.get("https://api.edamam.com/api/nutrition-data?app_id="+this.app_id+"&app_key="+this.app_key + "&nutrition-type=cooking&ingr="+ingr).then(response=> {
                this.get_response=response.data;
                this.loading=false;
            }).catch(err=> {
                this.loading=false;
                this.err="An error has occurred. Please try again";
                console.log('Error',err);
            });

              },

              getPath (foodname) {
              var path = "";
             // console.log("blank");
              this.plist.forEach(element => {
                   if(element.name===foodname)
                   {
                       path= element.path;
                       console.log("Path: " +path);
                   }
                   
               });
               return path;
          }
        }

}

</script>

<style >

main-div{
  display: flexbox;
  justify-content: center;
}

 .centred {
     color: darkred;
     margin-left:auto; 
     margin-right:auto;
 }

 .table-card {
color: rgb(139, 130, 0);
border: 1px solid goldenrod;
padding: 10px;
width: 200px;
margin: 10px;
}

#add-btn{
  padding: 3px 3px;
  background-color:lightgreen;
}

label{
  color: indianred;
}

 #firstLabel{
  margin-right:auto;
  width:auto;
}

#pulser {
      animation: buttonpulse 1s infinite;
      border: 1px solid blue;
      background-color:cyan;
      cursor:pointer;
  }

  @keyframes buttonpulse {
      0% {
    box-shadow: 0 0 0 0px rgba(20, 180, 0, 0.2);
  }
  100% {
    box-shadow: 0 0 0 10px rgba(20, 0, 160, 0.3);
  }

  } 

h2{
  color:lightseagreen;
  text-transform: capitalize;
  
}

#ingredient-list{
  width:16rem;
  margin-left:auto; 
  margin-right:auto;
}

p{
  color: seagreen;
}

.container {
     justify-content: center;
     margin-left: auto;
     margin-right: auto;
     display: inline-block;
     /*margin-left:240px; */
 } 

.results {
  border: 0px solid darkseagreen;
  align-self: center;
}

.newrow {
  border: 0px;
}

.newrow:hover {
  border: 0px;
  background-color: antiquewhite;
}

 /* tr:hover {
  border: 3px solid gold;
  background-color: aqua;
  color:darkred;
} */

 

 .panel{
   justify-content: center;
   align-content: center;
   align-items: center;
   color:darkorchid;
   width: 220px;
 } 

 img{
   width: 160px;
   height: 120px;
 }

 * {
  box-sizing: border-box;
}

@media screen and (max-width: 900px) {
 .form {
   width: 90%;
    margin-top: 0;
    flex-direction: column;
    align-items: stretch;
  }
  #add-btn{
    padding: 3px 3px 3px 3px 0;
  }
  .card{
    margin-top: 30px;
    padding: 20px 20px 20px 20px;
  }
  }

</style>
  