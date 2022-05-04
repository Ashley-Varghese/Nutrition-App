<template>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head> 
 
 <h2>
   <b> Recipe Analyzer </b> 
 </h2>
 <br> 
<div class="container">
 <div class="row">
<div class="col-lg-7 col-md-8 col-sm-10">
  <food-item-list />
</div>

<div class="col-lg-5 col-md-8 col-sm-10">
    <ingredients-form  @sendIngredient="add" />
</div>
</div>
</div>
  <br> 

<br>

<analysis :ingredient="searchItem"/>
  <br>
  <br>

</template>

<script>  

//api-id =4cc00ec3
//api-key=3ffd1eb7d2245ac2cf44739c395c9ff0, 862787ee84da281d5b0b31e3a70df086	

import paths from "@/assets/pathlist.json" 
import FoodItemList from './Food_Item_List/FoodItemList.vue'
import IngredientsForm from './Ingredients_Form/IngredientsForm.vue'
import Analysis from './Analysis/Analysis.vue'


export default {
  components: { FoodItemList, IngredientsForm, Analysis},
  setup () {
    return {
    }
  },

  data () {
    return {

      searchItem:'',
      searchList:[] ,
      post_data :{
        "ingr":[]
         },
       post_response:{},
       get_response:{}
    }
  },

  methods:  {
         
           add(event) { 
             this.searchItem=event;
        }, 

        }

}

</script>

<style>

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


p{
  color: seagreen;
}


.results {
  border: 0px solid darkseagreen;
  align-self: center;
}

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
  