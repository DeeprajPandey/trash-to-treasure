<template>
  <q-page padding>
    <div class="q-pa-md row justify-center items-start q-gutter-lg">
      <q-card class="my-card">
        <q-item>
          <q-item-section>
            <q-item-label>Amazon Gift Card</q-item-label>
            <q-item-label caption>$50</q-item-label>
          </q-item-section>
        </q-item>
        <q-img src="https://renespoints.boardingarea.com/wp-content/uploads/2015/06/50-amazon-gift-card.png"/>

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

      <q-card class="my-card">
        <q-item>
          <q-item-section>
            <q-item-label>Walmart Gift Card</q-item-label>
            <q-item-label caption>$100</q-item-label>
          </q-item-section>
        </q-item>
        <q-img src="https://marketingcdn.giftcardgranny.com/merchant-images/lg/walmart-gift-card.png"/>

        <q-card-actions>
          <q-btn flat @click="redeem=true">Redeem</q-btn>
        </q-card-actions>
      </q-card>

      <q-card class="my-card">
        <q-item>
          <q-item-section>
            <q-item-label>Starbucks Gift Card</q-item-label>
            <q-item-label caption>$15</q-item-label>
          </q-item-section>
        </q-item>
        <q-img src="https://www.ngc-group.com/uploads/media_resized/211_card_img_SBUX2017.jpg"/>

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
