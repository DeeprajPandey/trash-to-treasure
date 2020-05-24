<template>
  <q-pull-to-refresh @refresh="reload">
  <q-page class="q-pa-lg bg-grey-3 column">
    <q-table
      title="Leaderboard"
      :data="data"
      :columns="columns"
      :visible-columns="visibleColumns"
      :loading="loading"
      row-key="id"
      bordered
      card-class="text-brown"
      table-header-class="text-brown"
      table-class="text-grey-8"
      class="sticky-h"
    />
  </q-page>
  </q-pull-to-refresh>
</template>

<script>
import { axiosInstance } from 'boot/axios'

export default {
  name: 'Leaderboard',

  data() {
    return {
      loading: false,
      visibleColumns: ['name', 'points'],
      columns: [
        { name: 'id', label: 'Id', field: '_id', align: 'left' },
        { name: 'name', label: 'Name', field: 'name', align: 'left' },
        { name: 'points', label: 'Points', field: 'points', required:true, align: 'left', sortable: true }
      ],
      data: [
        {
          "_id": "5ec858db338a1881bbf78d7f",
          "email": "-",
          "name": "-",
          "points": -1
        },
      ]
    }
  },

  created() {
    // load data when page is created
    axiosInstance.get(`/users`)
    .then(response => {
      // empty response also comes with status 200
      if (!response.data) {
        throw new Error("Empty return");
      } else {
        this.data = response.data;
      }
    })
    .catch(err => {
      this.data = [
        {"_id": "001", "name": "Couldn't load data.", "points": 404}
      ]
    });
  },

  methods: {
    reload(done) {
      this.loading = true;

      axiosInstance.get(`/users`)
      .then(response => {
        // empty response also comes with status 200
        if (!response.data) {
          throw new Error("Empty return");
        } else {
          this.data = response.data;
        }
      })
      .catch(err => {
        this.data = [
          {"_id": "001", "name": "Couldn't load data.", "points": 404}
        ]
      })
      .finally( () => {
        this.loading = false;
        done();
      });
    }
  }
}
</script>

<style lang="sass" scoped>
.sticky-h
  /* height or max-height is important */
  max-height: 65vh

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    position: sticky
    /* bg color is important for th; just specify one */
    background-color: #c1f4cd

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>