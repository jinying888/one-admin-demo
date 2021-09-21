<template>


  <baidu-map class="bm-view" :center="center" :zoom="zoom"
  @click="onMapClick" @ready="handler" ak="En9fLA7uAk6dsddwUSqSpebFIICmMIQ5">
    <boundary :name="currentProvince" :strokeWeight="1"
    fillColor="lightblue" strokeColor="blue" fillOpacity="0"></boundary>
    <bm-info-window :position="currentPoint" title="行政区" :show="infoWindow.show" @close="infoWindowClose" @open="infoWindowOpen">
      <p v-html="infoWindow.contents"></p>
    </bm-info-window>
    
  </baidu-map>

</template>

<script>

  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  import BmInfoWindow  from 'vue-baidu-map/components/overlays/InfoWindow.vue'
  import Boundary  from 'vue-baidu-map/components/others/Boundary.vue'

  export default {
    components: {
      BaiduMap,
      BmInfoWindow,
      Boundary
    },
    data() {
      return {

        // BMap,
        // BMapGL,
        // map,
        center: {lng: 0, lat: 0},
        zoom: 3,
        infoWindow: {
          show: true,
          contents: 'haha'
        },
        currentPoint: {},
        currentProvince: '',
        
      }
    },

    methods: {
      
      handler ({BMap, map}) {
        console.log(BMap, map)
        this.center.lng = 112.404
        this.center.lat = 33.915
        this.zoom = 5
        this.enableScrollWheelZoom = true;

      },

      onMapClick(e){
        // alert('点击位置经纬度：' + e.point.lng + ',' + e.point.lat);
        this.currentPoint = e.point
        this.center.lng = e.point.lng;
        this.center.lat = e.point.lat;
        this.enableScrollWheelZoom = true;
        
        
        var point = new BMap.Point(e.point.lng, e.point.lat);
        var gc = new BMap.Geocoder();
        gc.getLocation(point, (rs) => {
          this.zoom = 7
          this.currentProvince = rs.addressComponents.province;
          this.infoWindow.contents = '<div>省：' + rs.addressComponents.province + '</div>'
                      + '<div>市：' + rs.addressComponents.city + '</div>'
                      + '<div>区：' + rs.addressComponents.district + '</div>';
          this.infoWindowOpen();
          
            

        });


      },
      infoWindowClose (e) {
        this.infoWindow.show = false
      },
      infoWindowOpen (e) {
        this.infoWindow.show = true
      },
      clear () {
        this.infoWindow.contents = ''
      }

    }
  }
</script>

<style>

  .bm-view {
    width: 100%;
    height: 800px;
  }
</style>
