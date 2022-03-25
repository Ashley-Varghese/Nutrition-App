<template>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.2.1/dist/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
</head> 
 
 <h2>
   Recipe Analyzer
 </h2>
 <br>

  <div >
  <div class= "form" style="display:flex">
    <label  for="qty">Quantity</label>
    <input type="number" id=qty class="inputs" v-model="qty">
    <br>

    <label for="unit">Unit</label> 
    <select class="inputs" name="" id="unit" v-model="unit">
      <option value="cup">Cup</option>
      <option value="ounce">Ounce (oz)</option>
      <option value="pinch">Pinch</option>
      <option value="tablespoon">Tablespoon</option>
      <option value="teaspoon">Teaspoon</option>
      <option value="pint">Pint</option>
    </select>
    <br>

    <label for="food">Food item</label>
    <input type="text" id="food" class="inputs" v-model="food"> 
    <br>

    <button id="add-btn" class="btn-warning"  @click="add" style="width:75px"> Add </button>

  </div> 
  <br>
 
 <div class="" >
  <table >
    <tr class="newrow" v-for="s in searchList" :key="s"> <span>{{s+" "}} </span>  <button class="delete-btn" @click="deleteItem(s)"><i class="fa fa-trash"></i></button></tr>
  </table>
  </div>

  <br>
  <br>

  <button  id="pulser" value="Submit" @click="submit">Submit</button>

  </div>
  <br>
  <div v-if="loading1===true">
        <div class="spinner-border text-success" role="status">
        <span class="sr-only">Loading...</span>
        </div>
      </div>

  <div class="container" v-else-if="Object.keys(post_response).length!==0">
    <table>
    <tr > <b> Calories: {{post_response.calories}} </b> </tr> 
     <tr> <b> Weight : {{post_response.totalWeight}} g </b> </tr>
     <b>
      <tr v-for="l in post_response.dietLabels" :key="l">
        {{l}}
      </tr> 
      </b>

    </table>
  </div>
  <br>
   <br>
   <br>
  <p>Nutritional Facts about common food items: </p>
  <br>

  <div class="container">

  <table class="centred">
    <th>Food Item List</th>
    <th rowspan="4" class="panel">
      <br>
      <p v-if="Object.keys(get_response).length===0" style="color:darkslateblue">
         Select a food item from the list to see its analysis in this panel
      </p>

      <div v-else-if="loading===true">
        <div class="spinner-border text-danger" role="status">
        <span class="sr-only">Loading...</span>
        </div>
      </div>

      <div  class="results" v-else-if="Object.keys(get_response).length!==0"> 
        <table>
      <tr>Calories: {{get_response.calories}}</tr>
      <tr> Weight: {{get_response.totalWeight}} g</tr>
      <tr v-for="l in get_response.dietLabels" :key="l">
        {{l}}
      </tr> 
      </table>
       <img class="foodImage" :src="require(`@/${src}`)" >
    </div>
    </th>

    <tr>
       <div class="card" @click="getFacts('1 tomato')">
        <p >
          <em> Tomato</em> 
        
          </p>
       </div>
    </tr> 

    <tr>
       <div class="card" @click="getFacts('1 egg')">
    <p >
      <em> Egg</em>
      </p>
      </div>
    </tr>

    <tr>
       <div class="card" @click="getFacts('1 potato')">
       <p >
         <em> Potato</em>
         </p>
       </div>
    </tr>
  </table>

  </div>

</template>

<script> 
//api-id =4cc00ec3
//api-key=3ffd1eb7d2245ac2cf44739c395c9ff0, 862787ee84da281d5b0b31e3a70df086	
import Axios from 'axios'
import paths from "../assets/pathlist.json"

export default {
  setup () {
    return {
    }
  },

  data () {
    return {
      app_id:"4cc00ec3",
      app_key:'3ffd1eb7d2245ac2cf44739c395c9ff0',
      plist : paths,
      src:'',
      loading1:false,
      loading:false,
      err:'',
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

  /*validations : {
    qty: { required, minValue:0}
  },*/

  methods: {
    add() {
      this.searchItem= this.qty +" "+ this.unit +" "+ this.food;
      this.searchList.push(this.searchItem);
    }, 

    deleteItem(foodItem) {
      this.searchList=this.searchList.filter(function(value){
        return !(value===foodItem);
       }); 
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
                       console.log("This is: " +path);
                   }
                   
               });
               return path;
          }
   
  }
}

</script>

<style >
.inputs{
  margin-left: 15px;
  margin-right: 15px;
  padding: 5px;
}

.form{
  
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  align-items: center;
}

#add-btn{
  padding: 3px 3px;
  background-color:lightgreen;
}

 #firstLabel{
  margin-right:auto;
  width:auto;
}

span{
  min-width:100px;
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
  text-decoration: underline;
  
}
p{
  color: seagreen;
}

b{
  color:coral;
}

.container {
     justify-content: center;
     margin-left: auto;
     margin-right: auto;
     display: inline-block;
     /*margin-left:240px; */
 } 

.card {
color: darkcyan;
border: 2px solid goldenrod;
padding: 10px;
width: 250px;
margin: 10px;
}

table {
    border: 0px solid slateblue;
    display: inline-block;
}

.results {
  border: 0px solid darkseagreen;
  align-self: center;
}

td {
    border: 2px solid goldenrod;
}

.newrow {
  border: 0px;
}

.newrow:hover {
  border: 0px;
  background-color: antiquewhite;
}
 tr:hover {
  border: 3px solid gold;
  background-color: aqua;
  color:darkred;
}

th {
    border: 3px solid royalblue;
    background-color: aquamarine;    
} 

 .centred {
     margin-left:auto; 
     margin-right:auto;
 }

 .panel{
   justify-content: center;
   border: 2px solid springgreen;
   background-color:powderblue;
   color:darkorchid;
   width: 220px;
 } 

 img{
   width: 160px;
   height: auto;
 }

 * {
  box-sizing: border-box;
}

@media screen and (max-width: 650px) {
 .form {
   width: 85%;
    margin-top: 0;
    flex-direction: column;
    align-items: stretch;
  }
  #add-btn{
    padding: 3px 3px 3px 3px 0;
  }
  }

</style>
  