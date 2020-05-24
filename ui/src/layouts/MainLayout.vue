<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-space></q-space>
        <q-btn
          flat
          icon='exit_to_app'
          label='Logout'
          type="a"
          href="/auth/logout"
          @click="logout"
        />
        <!-- <q-toolbar-title>
          SPLIDWISE
        </q-toolbar-title> -->
      </q-toolbar>
      <div class="q-px-lg q-pt-lg q-mb-md">
        <div class="text-h3">Trash to Treasure</div>
        <div class="text-subtitle1">{{ todaysDate }}</div>
      </div>
      <q-img
        src="statics/road.jpg"
        class="header-image absolute-top" />
    </q-header>

    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="250"
        :breakpoint="600"
      >
        <q-scroll-area style="height: calc(100% - 168px); margin-top: 168px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item
            to="/app"
            exact
            clickable
            v-ripple>
              <q-item-section avatar>
                <q-icon name="map" />
              </q-item-section>

              <q-item-section>
                Map
              </q-item-section>
            </q-item>

            <q-item
            to="/app/leaderboard"
            exact
            clickable
            v-ripple>
              <q-item-section avatar>
                <q-icon name="dashboard" />
              </q-item-section>

              <q-item-section>
                Leaderboard
              </q-item-section>
            </q-item>

            <q-item
            to="/app/redeem"
            exact
            clickable
            v-ripple>
              <q-item-section avatar>
                <q-icon name="redeem" />
                <!-- <q-icon name="all_inbox" /> -->
              </q-item-section>

              <q-item-section>
                Redeem Points
              </q-item-section>
            </q-item>

            <q-item
            to="/app/info"
            exact
            clickable
            v-ripple>
              <q-item-section avatar>
                <q-icon name="help" />
              </q-item-section>

              <q-item-section>
                Info
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="statics/road.png" style="height: 168px;">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img :src="usr_img">
            </q-avatar>
            <div class="text-weight-bold">{{ usr_name }}</div>
            <div class="text-weight-light">Points: {{ usr_points }}</div>
          </div>
        </q-img>
      </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'MainLayout',

  computed: {
    usr_name() {
      return this.$store.getters['userstore/usr_name']
    },
    usr_points() {
      return this.$store.getters['userstore/usr_points']
    },
    usr_img() {
      return this.$store.getters['userstore/usr_img']
    },
    todaysDate() {
      let timeStamp = Date.now()
      return date.formatDate(timeStamp, 'dddd D MMMM')
    }
  },

  methods: {
    logout(e, go) {
      e.navigate = false;
      // clear user info from state and clear the session
      this.clear_data();
      sessionStorage.clear();
      localStorage.clear();
      go();
    },
    clear_data() {
      this.$store.dispatch('userstore/clear_data')
    }
  },

  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>

<style lang="scss">
  .header-image {
    height: 100%;
    z-index: -1;
    opacity: 0.2;
    filter: grayscale(100%);
  }
</style>
