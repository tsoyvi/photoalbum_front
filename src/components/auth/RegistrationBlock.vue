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
                ></v-text-field>
              </v-col>
              <small>*indicates required field</small>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-btn color="primary"
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

    userData: {
      name: 'test',
      username: 'test',
      email: 'test@inddcd.tu',
      password: 'Test12345678',
      password_confirmation: 'Test12345678',

    },
  }),

  computed: {
    // ...mapGetters(['']),
  },

  methods: {
    ...mapActions(['REGISTRATION_USER']),

    openWindow() {
      this.dialog = true;
    },
    closeWindow() {
      this.dialog = false;
    },

    registrationUser() {
      this.REGISTRATION_USER(this.userData);
    },
  },

};
</script>

<style>

</style>
