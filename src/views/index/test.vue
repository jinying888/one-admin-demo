<template>
  <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="15">
    <bm-info-window :position="{lng: 116.404, lat: 39.915}" title="Info Window Title" :show="infoWindow.show" @close="infoWindowClose" @open="infoWindowOpen">
      <p v-text="infoWindow.contents"></p>
      <button @click="clear">Clear</button>
    </bm-info-window>
  </baidu-map>
</template>

<script>

import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmInfoWindow  from 'vue-baidu-map/components/map/MapView.vue'

export default {
  components: {
      BaiduMap,
      BmInfoWindow
    },
  data () {
    return {
      infoWindow: {
        show: true,
        contents: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      }
    }
  },
  methods: {
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