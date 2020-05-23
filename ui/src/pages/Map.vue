<template>
    <div>
        <google-map
            :center="userCoordinates"
            :zoom="zoom"
            style="width:100vw; height:65vh;"
            ref="mapRef"
            @dragend="handleDrag"
        ></google-map>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                map: null,
                userCoordinates: {
                    lat: 0,
                    lng: 0
                },
                zoom: 7
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
        methods: {
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
        },
        computed: {
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
        }
    }
</script>