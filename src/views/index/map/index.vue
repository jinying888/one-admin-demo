<template>


  <baidu-map class="bm-view" :center="center" :zoom="zoom"
  @click="onMapClick" @ready="handler" ak="En9fLA7uAk6dsddwUSqSpebFIICmMIQ5">
    <boundary :name="currentProvince" :strokeWeight="1"
    fillColor="lightblue" strokeColor="blue" fillOpacity="0"></boundary>
    <bm-info-window :position="currentPoint" title="行政区" :show="infoWindow.show" @close="infoWindowClose" @open="infoWindowOpen">
      <p v-html="infoWindow.contents"></p>
    </bm-info-window>
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" offset=10></bm-navigation>

    <bm-marker :position="{lng: 116.404, lat: 39.915}" :icon="myIcon" :dragging="false">
      <bm-label content="我爱北京天安门" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
    </bm-marker>
    
  </baidu-map>

</template>

<script>

  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  import BmInfoWindow  from 'vue-baidu-map/components/overlays/InfoWindow.vue'
  import Boundary  from 'vue-baidu-map/components/others/Boundary.vue'
  import BmNavigation  from 'vue-baidu-map/components/controls/Navigation.vue'
  import BmMarker  from 'vue-baidu-map/components/overlays/Marker.vue'
  import BmLabel  from 'vue-baidu-map/components/overlays/Label.vue'

  export default {
    components: {
      BaiduMap,
      BmInfoWindow,
      Boundary,
      BmNavigation,
      BmMarker,
      BmLabel
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
        myIcon: '',
        
      }
    },

    methods: {
      
      handler ({BMap, map}) {
        this.center.lng = 112.404
        this.center.lat = 33.915
        this.zoom = 5
        this.enableScrollWheelZoom = true

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
          //获取当前点击到了那个省
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
