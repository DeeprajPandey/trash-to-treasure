<template>
  <!-- row    -->
  <q-page class="flex q-pa-lg justify-center bg-grey-3">
    <q-card
      :class="{ 'full-width':$q.platform.is.mobile, 'login-desktop':!$q.platform.is.mobile }">
        <q-tabs
          v-model="tab"
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
        >
          <q-route-tab name="login" label="Login" to="/" />
          <q-route-tab name="register" label="Register" to="/#register" exact/>
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated swipeable>
          <q-tab-panel name="login" class="q-pa-xl">
            <q-form @submit="submitLogin">
              <q-input outlined 
                v-model="loginData.email"
                class="q-mb-md"
                type="email" label="Email" />
              <q-input outlined 
                v-model="loginData.phash"
                class="q-mb-md"
                type="password" label="Password" />
              <q-btn
                class="full-width q-pa-xs q-mt-lg"
                type="submit"
                color="primary"
                size="2vh"
                label="Login" />
            </q-form>
            <br/><br/><br/><br/><br/><br/><br/>
          </q-tab-panel>

          <q-tab-panel name="register" class="q-pa-xl">
            <q-form @submit="submitRegister">
              <q-input outlined 
                v-model="regData.name"
                class="q-mb-md"
                label="Name" />
              <q-input outlined 
                v-model="regData.email"
                class="q-mb-md"
                type="email" label="Email" />
              <q-input outlined 
                v-model="regData.phash"
                class="q-mb-md"
                type="password" label="Password" />
              <q-btn
              class="full-width q-pa-xs q-mt-lg"
              type="submit"
              size="2vh"
              color="primary"
              label="Register" />
            </q-form>
            <div class="login-panelr"></div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
  </q-page>
</template>

<script>
import { axiosInstance } from 'boot/axios'

export default {
  name: 'LoginPage',
  mounted() {
    if (this.$route.query.r) {
      this.notify_and_push(this.$route.query.r);
    }
  },
  data () {
    return {
      tab: 'login',
      loginData: {
        email: '',
        phash: '',
      },
      regData: {
        name: '',
        email: '',
        phash: '',
      }
    }
  },
  methods: {
    submitRegister(e) {
      e.preventDefault();
      axiosInstance.post('/register', this.regData)
      .then(response => {
        console.log(response.status);
      })
      .catch(err => {
        console.log(err.response.status);
      });
    },
    submitLogin(e) {
      e.preventDefault();
      axiosInstance.post('/login', this.loginData)
      .then(response => {
        console.log(response.status);
      })
      .catch(err => {
        console.log(err.response.status);
      });
    },
    notify_and_push(reason) {
      let msg = '';
      let where = '/';
      if (reason == 'unregistered') {
        msg = 'Please register before trying to log in'
        where = '/#register'
      }
      else if (reason == 'reregister') {
        msg = 'You already have an account, please log in with this ID'
      }
      this.$q.notify({
        color: 'neutral',
        position: 'bottom',
        message: msg,
        icon: 'report_problem',
        actions: [
          { label: 'Dismiss', color: 'white' }
        ]
      });
      this.$router.push(where);
    }
  }
}
</script>

<style>
.login-desktop {
  width: 600px;
}
.login-panel {
  height: 60px;
  width: 100%;
}
.login-panelr {
  height: 200px;
  width: 100%;
}
.google-btn {
  background: #de5246;
  color: white;
}
</style>