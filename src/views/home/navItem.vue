<template>

    <div>

        <el-menu-item :index="item.url" v-if="!item.child">
        <i class="el-icon-menu"></i>
        <span slot="title">{{item.name}}</span>
        </el-menu-item>

        <el-submenu :index="item.url" v-else>
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.name}}</span>
            </template>
            <NavItem v-for="child in item.child" :key="child.url" :item="child" />
        </el-submenu>
        
    </div>

</template>

<script>


export default {
  name: 'NavItem',
  data(){
      return {
          
      }
  },
  props:['item'],
  methods: {
    
  }
}
</script>

<style>

</style>
