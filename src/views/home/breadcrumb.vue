<template>
    <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="v.path" v-for="(v,i) in list" :key="i">
                {{v.meta.title}}
              </el-breadcrumb-item>
              
            </el-breadcrumb>
    </div>
</template>


<script>

export default {
  name: 'Breadcrumb',
  data() {
    return {
      list:[]
    }
  },
  created(){
    this.list = this.$route.matched
  },
  watch: {
    $route(to,from){
      let matched = to.matched
      this.list = matched
      // console.log(this.$route.path)
      
    }
  }
}
</script>

<style>

</style>
