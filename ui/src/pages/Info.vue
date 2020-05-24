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
          <h4 class = "text-center">Trash to Treasure Guide:</h4>
          <p>Welcome to Trash to Treasure, a way to turn your recycling into value. We will be 
          going over how the application works and ways to earn points.</p>

          <p><strong>Location:</strong> As you can see on the home page, a map is brought up with your location. 
          In addition to that, there are several markers placed all around the map. Through the integrated use of geolocation 
          technology, we are able to get your position. This will help us in determining if you are eligible to earn points or not. 
          Markers are place all throughout the map. These markers represent the recycling points in which you can earn points from.</p>

          <p><strong>Point system:</strong> Once you are 500 meters or 0.30 miles away from one of our recycling points, you are able to see a button appear.
          If you click the button, you will be rewarded with 100 points for your visit to the recycling point.</p>

          <p><strong>Leaderboard:</strong> There are other participants that you are able to view on the leaderboard. The users with the top 20 points 
          will be displayed.</p>

          <p><strong>Redeem Points:</strong> After gaining enough points, you are able to then redeem your points. 
          This can be from the wide variety of options that we have available. 
          Once a product is redeemed the points will be ducted from the total amount of points you have. 
          In order for you to redeem a product you must have an equal or greater amount of points.</p>

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
