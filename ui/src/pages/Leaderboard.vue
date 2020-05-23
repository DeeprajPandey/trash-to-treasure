<template>
  <q-pull-to-refresh @refresh="reload">
  <q-page class="q-pa-lg bg-grey-3 column">
    
  </q-page>
  </q-pull-to-refresh>
</template>

<script>
export default {
  name: 'Leaderboard',

  methods: {
    reload(done) {
      done();
    }
  }
}
</script>
