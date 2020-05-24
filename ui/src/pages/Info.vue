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
        <q-page padding class="q-pa-lg">
          <div class="text-subtitle1">
            <i>Get something more out of your practice of recycling.</i><br/>

            <p>We have tried to cover most of the features here. If you have any more questions, feel free to reach out to any of us by opening an issue on our <a href="https://github.com/DeeprajPandey/trash-to-treasure" target="_blank">GitHub page</a>.</p>

            <p><strong>Location:</strong> Recycling kiosks around you are marked on the map. Blue markers are kiosks which collect glass, yellow markers collect metal, and red markers collect plastic.</p>

            <p><strong>Point system:</strong> You get 100 points for depositing something to recycle. Once you are in a 10-meter radius (32.8084 ft for those following the imperial system) of a recycling kiosk, the point system gets activated. You can tap the recycle button after depositing your waste to get 100 points in your account.<br/>If you are not close to any kiosks, tapping the button will show you your distance from the closest recycling kiosk.</p>

            <p><strong>Leaderboard:</strong> People around you who are also using the app are showed on the leaderboard. Try beating them all to make it to the top.</p>

            <p><strong>Redeem Points:</strong> You can redeem your points any time for a wide range of gift cards on the Redeem page. Currently, this feature is under development and the page has dummy information. We will inform you when the feature is up. Thank you for your patience.</p>
          </div>

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
