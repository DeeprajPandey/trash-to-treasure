<template>
  <q-page padding>
    <div class="q-pa-md row items-start q-gutter-lg">
      <q-card class="my-card">
        <q-item>
          <q-item-section>
            <q-item-label>Amazon Gift Card</q-item-label>
            <q-item-label caption>$25</q-item-label>
          </q-item-section>
        </q-item>
        <q-img src="https://66.media.tumblr.com/e646ad827fb5f81ee337ab8b8eb1cf77/903c1158c00e1ee9-aa/s1280x1920/e590888aa63f9580e3d71c888c8f7b51c03601bc.png"/>

        <q-card-actions>
          <q-btn flat @click="redeem=true">Redeem</q-btn>
        </q-card-actions>
      </q-card>

      <q-card class="my-card">
        <q-item>
          <q-item-section>
            <q-item-label>Spotify Gift Card</q-item-label>
            <q-item-label caption>$10</q-item-label>
          </q-item-section>
        </q-item>
        <q-img src="https://www.paypalobjects.com/digitalassets/c/gifts/media/catalog/product/r/e/rev2_spotifygreencard_digital_1.jpg"/>

        <q-card-actions>
          <q-btn flat @click="redeem=true">Redeem</q-btn>
        </q-card-actions>
      </q-card>

      <q-dialog v-model="redeem">
        <q-card>
          <q-card-section>
            <div class="text-h6">Alert</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Thank you for redeeming your points. This feature is still under development and currently has no effect on your points.
            When the feature is ready, you will get your gift card details on your registered email ID and the points will be deducted as per the redeem policy.
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <!-- <div class = "row">
      <img width="25%" height="25%" style="border:0px;margin:50px;" src = "https://66.media.tumblr.com/e646ad827fb5f81ee337ab8b8eb1cf77/903c1158c00e1ee9-aa/s1280x1920/e590888aa63f9580e3d71c888c8f7b51c03601bc.png">
      <img width="25%" height="25%" style="border:0px;margin:50px;" src = "https://66.media.tumblr.com/e646ad827fb5f81ee337ab8b8eb1cf77/903c1158c00e1ee9-aa/s1280x1920/e590888aa63f9580e3d71c888c8f7b51c03601bc.png">
      <img width="25%" height="25%" style="border:0px;margin:50px;" src = "https://66.media.tumblr.com/e646ad827fb5f81ee337ab8b8eb1cf77/903c1158c00e1ee9-aa/s1280x1920/e590888aa63f9580e3d71c888c8f7b51c03601bc.png">
    </div>
    <div class = "row">
      <h5 style="border:0px;margin:0px;padding-left:50px;padding-right:100px;">$25</h5>
      <q-btn color="primary" label="Redeem" style="border:0px;margin:0px;"/>
      <h5 style="border:0px;margin:0px;padding-left:200px;padding-right:100px;">$50</h5>
      <q-btn color="primary" label="Redeem" style="border:0px;margin:0px;"/>
      <h5 style="border:0px;margin:0px;padding-left:200px;padding-right:100px;">$100</h5>
      <q-btn color="primary" label="Redeem" style="border:0px;margin:0px;"/>
    </div> -->
  </q-page>
</template>

<script>
export default {
  name: 'RedeemPage',

  data() {
    return {
      redeem: false
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
