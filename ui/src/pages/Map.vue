<template>
    <q-page class="q-pa-sm bg-grey-3">
        <google-map
            :center="userCoordinates"
            :zoom="zoom"
            style="width:100%; height:70vh;"
            ref="mapRef"
            @dragend="handleDrag"
        >
          <google-marker
            v-for="(m, index) in markers"
            :key="index"
            :position="m.pos"
            :clickable="false"
            :icon="m.url"
          />
        </google-map>
        <div
          class="q-pa-md text-body1"
        >
          <span
            v-if="dist">
            Distance from closest recycling kiosk: {{ dist.toFixed(2) }} metres<br/> 
          </span>
          <span
            v-else>
            Click on recycle to check distance from closest kiosk.
          </span>
        </div>
        <q-page-sticky class="desktop-only" position="bottom-right" :offset="[84, 44]">
          <q-btn fab icon="add" color="accent" label="Recycle"
            @click="addPoints"
          />
        </q-page-sticky>
        <q-page-sticky class="mobile-only" position="bottom-left" :offset="[36, 36]">
          <q-btn fab icon="add" color="accent" label="Recycle"
            dense @click="addPoints"
          />
        </q-page-sticky>
    </q-page>
</template>
<script>
import {gmapApi} from 'vue2-google-maps'

export default {
  data() {
    return {
      map: null,
      dist: null,
      userCoordinates: {
        lat: 27.9323137,
        lng: 77.1007919
      },
      markers: {
        0: {
          pos: {lat:28.744395,lng:77.069552},
          url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        },
        1: {
          pos: {lat:28.9084289,lng:77.009952},
          url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        },
        2: {
          pos: {lat:28.9984289,lng:77.009952},
          url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        },
        3: {
          pos: {lat:28.9084289,lng:77.239952},
          url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        },
        4: {
          pos: {lat:28.9473277,lng:77.1021563},
          url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
        }
      },
      zoom: 12
    }
  },

  created() {
    // does the user have a saved center? use it instead of the default
    if(localStorage.center) {
      const now = Math.floor(Date.now() / 1000);
      if(now - localStorage.time > 600) {
        // if the saved location is >10 min old, read again
        this.getLocation();
      } else {
        this.userCoordinates = JSON.parse(localStorage.center);
      }
    } else {
      this.getLocation();
    }
    // does the user have a saved zoom? use it instead of the default
    if(localStorage.zoom) {
      this.zoom = parseInt(localStorage.zoom);
    }
  },

  mounted() {
    // add the map to a data object
    this.$refs.mapRef.$mapPromise.then(map => this.map = map);
  },

  computed: {
    usr_email() {
      return this.$store.getters['userstore/usr_email'];
    },
    usr_name() {
      return this.$store.getters['userstore/usr_name'];
    },
    usr_points() {
      return this.$store.getters['userstore/usr_points'];
    },
    mapCoordinates() {
      if(!this.map) {
        return {
          lat: 0,
          lng: 0
        };
      }
      return {
        lat: this.map.getCenter().lat().toFixed(4),
        lng: this.map.getCenter().lng().toFixed(4)
      }
    }
  },

  methods: {
    update_pt(number) {
      this.$store.dispatch('userstore/update_pt', number);
    },
    addPoints() {
      if(this.map) {
        let closeToNone = true;
        // get current location
        this.getLocation();

        let closestMarker = {
          marker_obj: null,
          distance: 99999
        };
        // check if user is close to any marker
        for(const m in this.markers) {
          this.dist = google.maps.geometry.spherical.computeDistanceBetween(
              new google.maps.LatLng(this.userCoordinates), new google.maps.LatLng(this.markers[m].pos)
            );
          console.log(this.dist);
          if(this.dist <= 10 && this.dist < closestMarker.distance) {
            closeToNone = false;
            closestMarker.marker_obj = m;
            closestMarker.distance = this.dist;
          } else {
            continue;
          }
        }
        if (closeToNone) {
          this.$q.notify({
            message: "You aren't near any recycling kiosks.",
            color: 'neutral',
            timeout: 500,
            icon: 'info',
            actions: [{ icon: 'close', color: 'white' }]
          });
        } else {
          this.update_pt(this.usr_points + 100);
          this.$q.notify({
            message: '100 points added to your account for recycling.',
            color: 'primary',
            timeout: 500
          });
        }
      }
    },
    handleDrag() {
      // store last known user location in localstorage
      let zoom = this.map.getZoom();
      localStorage.center = JSON.stringify(this.userCoordinates);
      localStorage.zoom = zoom;
      localStorage.time = Math.floor(Date.now() / 1000);
    },
    getLocation() {
      // get user's coordinates from browser request
      this.$getLocation({})
        .then(coordinates => {
          this.userCoordinates = coordinates;
        })
        .catch(error => alert(error));
    }
  }
}
</script>