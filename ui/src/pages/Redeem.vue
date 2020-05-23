<template>
  <q-pull-to-refresh @refresh="reload">
  <q-page padding>
    <div class = "row">
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
    </div>
  </q-page>
  </q-pull-to-refresh>
</template>

<script>
export default {
  name: 'RedeemPage',

  methods: {
    reload(done) {
      done();
    }
  }
}
</script>
