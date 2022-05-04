<template>
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
         <tr>CALORIES: {{get_response.calories}}</tr>
         <tr> WEIGHT: {{get_response.totalWeight}} g</tr>
         <tr v-for="l in get_response.dietLabels" :key="l">
           {{removeUnderscore(l)}}
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
</template>


<script>
import paths from "@/assets/pathlist.json" 
import Axios from 'axios'

    export default {
        data() {
            return{
                app_id:"4cc00ec3",
                app_key:'3ffd1eb7d2245ac2cf44739c395c9ff0',
                plist : paths,
                src:'',
                loading:false,
                err:'',
                get_response:{}

            }
        },

        methods: 
        {
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
          },

           removeUnderscore (label) {
            var newLabel=  label.replaceAll('_',' ');
            return newLabel;
            }
        }
    }
</script>

<style >
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
</style>