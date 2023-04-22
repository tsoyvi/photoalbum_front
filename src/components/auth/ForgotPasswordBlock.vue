<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="600">
      <v-card>
        <v-card-title>
          <div class="d-flex justify-space-between">
            <span class="text-h5">Забыли пароль?</span>
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
            <div
              class="mb-4 text-body-1 text-grey-darken-2 dark:text-grey-lighten-2"
            >
              Забыли пароль? Нет проблем. Просто сообщите Ваш адрес электронной
              почты и мы пришлём Вам ссылку для сброса пароля.
            </div>

            <div
              v-if="status"
              class="mb-4 font-weight-medium text-body-1 text-green-darken-2 dark:text-green-accent-2"
            >
              {{ status }}
            </div>

            <v-form @submit.prevent>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Email"
                    id="email"
                    type="email"
                    v-model="form.email"
                    required
                    :rules="emailRules"
                    :error-messages="errors.email"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-btn color="primary" type="submit" @click="submit()"
                    >Ссылка для сброса пароля</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  data: () => ({
    dialog: false,
    form: {},
    status: '',
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
  }),

  methods: {
    ...mapActions(['addError']),
    openWindow() {
      this.dialog = true;
    },
    closeWindow() {
      this.dialog = false;
    },

    async submit() {
      axios
        .post('/api/forgot-password', this.form)
        .then((response) => {
          this.status = response.data.status;
        })
        .catch((error) => {
          if (error.response?.data?.message) {
            this.addError(error.response.data.message);
          }
          if (error.response?.data?.errors) {
            this.errors = error.response.data.errors;
          }
        });
    },
  },
};
</script>

<style></style>
