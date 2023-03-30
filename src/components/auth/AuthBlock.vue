<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="600"
    >
      <v-card>
        <v-card-title>
          <div class="d-flex justify-space-between">
            <span class="text-h5">User Auth</span>
            <v-btn
              color="primary"
              variant="plain"
              class="text-h6 me-n3"
              @click="closeWindow()"
            >
              <v-icon icon="mdi-close"></v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
              <v-text-field
                  label="Email"
                  required
                  v-model="userData.email"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Password"
                  type="password"
                  required
                  v-model="userData.password"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="my-1">
              <v-col cols="12">
                <v-checkbox
                  label="Remember Me"
                  color="primary"
                  hide-details
                  v-model="userData.remember"
                ></v-checkbox>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-btn color="primary"
                  @click="loginUser()"
                >LOGIN</v-btn>

                <v-btn color="primary" variant="plain" class="mx-5"
                @click="check_login()"
                >Forgot Your Password?</v-btn>
<!--
                <v-btn color="primary" variant="plain" class="mx-5"
                @click="logout()"
                >logout</v-btn>
-->
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions /* mapGetters */ } from 'vuex';

export default {
  data: () => ({
    dialog: false,

    userData: {
      email: 'test@inddcd.tu',
      password: 'Test12345678',
      remember: false,
    },
  }),

  methods: {
    ...mapActions(['LOGIN_USER', 'СНЕК_LOGIN']),

    openWindow() {
      this.dialog = true;
    },
    closeWindow() {
      this.dialog = false;
    },

    async loginUser() {
      const result = await this.LOGIN_USER(this.userData);
      if (result) {
        this.closeWindow();
      }
    },

    check_login() {
      this.СНЕК_LOGIN();
    },

    logout() {
      this.LOGOUT();
    },
  },

};
</script>

<style>

</style>
