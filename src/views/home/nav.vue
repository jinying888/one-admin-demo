<template>

<el-row class="tac">
    <el-col :span="20">
    <h5>默认颜色</h5>
    <el-menu
        :default-active="$router.path" exact
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose" router>
        
        <NavItem v-for="v in items" :key="v.url" :item="v" :path="v.url" />
    </el-menu>
    </el-col>
</el-row>

</template>

<script>
import NavItem from './navItem'

export default {
  name: 'Nav',
  components:{
      NavItem,
    
  },
  data(){
      return {
          items:[],
      }
  },
  mounted(){
      this.getNav()
  },
  methods: {
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
        console.log(key, keyPath);
    },
    getNav(){
        this.$http.get('/api/demo/nav').then(res=>{
            let {code, data} = res.data
            // console.log(data);
            this.items = data
        })
    }
  }
}
</script>

<style>

  .el-aside h5 {
    line-height: 2em;
  }


</style>
