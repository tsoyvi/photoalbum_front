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
            <span class="text-h5">User Register</span>
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
                  label="Name*"
                  hint="Ваше Имя"
                  required
                  v-model="userData.name"
                  :error-messages="errors.name"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Username*"
                  hint="Укажите желаемое имя пользователя"
                  required
                  v-model="userData.username"
                  :error-messages="errors.username"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
              >
              <v-text-field
                  label="Email*"
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
                  label="Password*"
                  type="password"
                  hint="Придумайте пароль"
                  required
                  v-model="userData.password"
                  :error-messages="errors.password"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Confirm Password*"
                  type="password"
                  hint="Повторите пароль"
                  required
                  v-model="userData.password_confirmation"
                  :error-messages="errors.password_confirmation"
                ></v-text-field>
              </v-col>
              <small>*indicates required field</small>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-btn color="primary"
                  :loading="loading"
                  :disabled="loading"
                  @click="registrationUser()"
                  >Register
                </v-btn>
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
  name: 'RegistrationBlock',
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
    ...mapActions(['REGISTRATION_USER']),

    openWindow() {
      this.dialog = true;
    },
    closeWindow() {
      this.dialog = false;
    },

    async registrationUser() {
      this.loading = true;
      const result = await this.REGISTRATION_USER(this.userData);
      if (result.success) {
        this.closeWindow();
        window.location.reload();
      } else if (result.error?.response?.data?.errors) {
        this.errors = result.error.response.data.errors;
      }
      this.loading = false;
    },
  },

};
</script>

<style>

</style>
