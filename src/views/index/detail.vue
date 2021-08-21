<template>
<div>
  <ul>
    <li>brand:{{data.brand}}</li>
    <li>series:{{data.series}}</li>
    <li>name:{{data.name}}</li>
  </ul>
</div>
</template>
<script>
  export default {
    data() {
      return {
        data: []
      }
    },
    mounted() {
      console.log(this.$route.params.id)
      this.getDetailById(this.$route.params.id)
    },
    methods: {
      
      getDetailById(id){
        this.$http.get('/api/electron/getbyid',{'params':{'id': id}}).then(res=>{
        
        let {code, data} = res.data
        console.log(data)

        if(code == 1){
          this.data = data
          
        }else{
          console.log(data)
        }
          
      })
      }
    }
  }
</script>
<style>
</style>
