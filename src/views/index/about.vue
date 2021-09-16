<template>
<div>
  <div>
  <el-row :gutter="0">
    <el-col :span="16" :offset="4"><div class="grid-content amd">AMD显卡</div></el-col>
  </el-row>
  </div>
  <el-row :gutter="20">
    <el-col :span="8">
      <div class="grid-content bg-purple">
      Radeon RX 6000 系列
      </div>
      <div>
        <ul>
          <li v-for="item in items_rx6000" :key="item.id">
            <router-link :to="{path:'/detail/'+item.id}">{{item.name}}</router-link>
          </li>
        </ul>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple">
      Radeon RX 5000 系列
      </div>
      <div>
        <ul>
          <li>Radeon RX 5700XT</li>
          <li>Radeon RX 5600XT</li>
          <li>Radeon RX 5500</li>
        </ul>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple">
      Radeon RX Vega 系列
      </div>
      <div>
        <ul>
          <li>Radeon RX 64</li>
          <li>Radeon RX 56</li>
        </ul>
      </div>
    </el-col>
  </el-row>

  <div>
  <el-row :gutter="0">
    <el-col :span="16" :offset="4"><div class="grid-content nvidia">NVIDIA显卡</div></el-col>
  </el-row>
  </div>
  <el-row :gutter="20">
    <el-col :span="8">
      <div class="grid-content bg-purple">
      GeForce RTX 30 系列
      </div>
      <div>
        <ul>
          <li v-for="item in items_rtx30" :key="item.id">{{item.name}}</li>
        </ul>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple">
      GeForce RTX 20 系列
      </div>
      <div>
        <ul>
          <li v-for="item in items_rtx20" :key="item.id">{{item.name}}</li>
        </ul>
      </div>
    </el-col>
    
    <el-col :span="8">
      <div class="grid-content bg-purple">
      RTX 16 系列
      </div>
      <div>
        <ul>
          <li>Radeon RX 6900XT</li>
          <li>Radeon RX 6800XT</li>
          <li>Radeon RX 6800</li>
          <li>Radeon RX 6700XT</li>
        </ul>
      </div>
    </el-col>
  </el-row>

  <baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler" ak="En9fLA7uAk6dsddwUSqSpebFIICmMIQ5">
  </baidu-map>

</div>
</template>

<script>
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  export default {
    components: {
      BaiduMap
    },
    data() {
      return {
        items_rtx30: [
          
        ],
        items_rtx20: [
          
        ],
        items_rx6000: [
          
        ],

        center: {lng: 0, lat: 0},
        zoom: 3
        
      }
    },
    mounted() {
      this.getList('rtx30');
      this.getList('rtx20');
      this.getList('rx6000');
    },
    methods: {
      
      getList(series){
        this.$http.get('/api/electron/frontendlist',{'params':{'series':series}}).then(res=>{
        
          let {code, data} = res.data
          

          if(code == 1){
            // according to series get items data
            if(series == 'rtx30'){
              this.items_rtx30 = data;
            }else if(series == 'rtx20'){
              this.items_rtx20 = data;
            }else if(series == 'rx6000'){
              this.items_rx6000 = data;
            }
            
          }else{
            console.log(data)
          }
            
        })
      },
      handler ({BMap, map}) {
        console.log(BMap, map)
        this.center.lng = 112.404
        this.center.lat = 33.915
        this.zoom = 8
      },
    }
  }
</script>

<style>
.el-row {
    margin-bottom: 20px;
  }

  .el-col {
    border-radius: 4px;
  }
  .el-col .amd {
    font-size: 24px;
    background-color: #FF4500;
  }
  .el-col .nvidia {
    font-size: 24px;
    background-color: #00FF00;
  }
  
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .bm-view {
    width: 100%;
    height: 300px;
  }
</style>
