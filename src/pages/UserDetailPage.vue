<template>
  <!-- 왜 if로 변수명을 넣으면 객체로 인정하느냐? -->
  <div v-if="userDetail" class="user_profile">
    <a href="https://t1.daumcdn.net/cfile/blog/999E9A355B6ED7F910"><img class="user_img" src="https://t1.daumcdn.net/cfile/blog/999E9A355B6ED7F910" /></a>
    <p>{{userDetail.name}}</p>
    
    <p> {{ userDetail.address.zipcode }} {{ userDetail.address.street }} </p>
    <p> {{ userDetail.address.geo }} </p>
    <p> <a :href="'mailto:' + userDetail.email">{{userDetail.email}}</a> </p>
    <p> <a :href="'tel:+' + userDetail.phone">+ {{userDetail.phone}}</a> </p>

    <template v-if="userDetail.address">
    <iframe class="user_map" :src="'https://www.latlong.net/c/?long=' + userDetail.address.geo.lng + '&lat=' + userDetail.address.geo.lat " width="600" height="350" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </template>
  </div>



</template>
<script>
  export default {
    data(){
      return{
        userDetail:null,
      }
    },
    methods:{
      fetchData: function(){
        let self = this;

        this.$axios.get('https://jsonplaceholder.typicode.com/users/'+ this.$route.params.userid)
        .then(function(response){
          if(response.status !== 200){
            console.log("통신에러")
            self.userDetail = []
          } else{
            self.userDetail = response.data
          }
        })
        .catch(function(error){
          console.log(error)
        })
      },
    },
    mounted(){
      this.fetchData()
    }
  }
</script>

<style>

  .user_profile{
    text-align: center;
    box-shadow: 3px 3px 20px;

    margin: 40px auto;
    min-width: 300px;
    max-width: 500px;
    padding: 20px;
  }

  .user_img{
    border-radius: 100px;
    width: 180px;
    height: 180px;
  }

  .user_profile > p{
    font-weight: bold;
    font-size: 22px;
  }

  .user_map{
    width: 80%;
  }
</style>