<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lFf" container style="height: 600px" class="shadow-2 rounded-borders">
      <q-header elevated>
        <q-toolbar>
          <q-avatar>
            <img src="statics/icons/small_t.png">
          </q-avatar>
          <q-toolbar-title>
            A Guide to Turn Your Trash to Treasure
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page padding>
          <font size = "3" align="justify">
          This will turn your trash into treasure.
        </font>

          <!-- place QPageScroller at end of page -->
          <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
            <q-btn fab icon="keyboard_arrow_up" color="accent" />
          </q-page-scroller>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  name: 'Info'
}
</script>
