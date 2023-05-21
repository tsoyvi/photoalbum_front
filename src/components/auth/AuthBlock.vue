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
                  :rules="emailRules"
                  :error-messages="errors.email"
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
                  :error-messages="errors.password"
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
                  :error-messages="errors.remember"
                ></v-checkbox>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-btn color="primary"
                  :loading="loading"
                  :disabled="loading"
                  @click="loginUser()"
                >LOGIN</v-btn>

                <v-btn color="primary" variant="plain" class="mx-5"
                @click="openForgotPasswordWindow()"
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
    userData: {},
    errors: {},
    emailRules: [
      (value) => {
        if (value) return true;
        return 'Поле Email обязательно.';
      },
      (value) => {
        if (/.+@.+\..+/.test(value)) return true;
        return 'Значение поля Email должно быть действительным электронным адресом.';
      },
    ],
    loading: null,
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
      this.loading = true;
      const result = await this.LOGIN_USER(this.userData);
      if (result.success) {
        this.closeWindow();
      } else if (result.error?.response?.data?.errors) {
        this.errors = result.error.response.data.errors;
      }
      this.loading = false;
    },

    check_login() {
      this.СНЕК_LOGIN();
    },

    logout() {
      this.LOGOUT();
    },

    openForgotPasswordWindow() {
      this.closeWindow();
      this.$parent.openForgotPasswordWindow();
    },
  },

};
</script>

<style>

</style>
