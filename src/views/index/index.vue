<template>
  <div class="index">
    <el-container>

          <router-view />

    </el-container>
    
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import Nav from './nav'
// import Breadcrumb from './breadcrumb'

export default {
  name: 'Index',
  components: {
    // HelloWorld,
    //  Nav,
    //  Breadcrumb
  },
  methods: {
    logout(){
      sessionStorage.removeItem('username')
      this.$router.push('/login')

    },
  }
}
</script>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }


</style>
