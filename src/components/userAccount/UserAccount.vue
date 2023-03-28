<template>
<v-row>
  <v-col
    cols="4"
  >
  <VCard class="mx-5 my-2 pa-3" cols="4">
      <v-form @submit.prevent="updateProfile">
        <VCard class="mx-1 pa-3 mb-6">
          <v-container class="d-flex align-start mb-n9 mt-n4">
          <v-avatar size="x-large">
            <v-img v-if="USER.image" :src="USER.image"></v-img>
            <v-icon v-else icon="mdi-account-circle" color="info" style="font-size: 35pt;"></v-icon>
          </v-avatar>

          <v-file-input
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              prepend-icon="none"
              label="Avatar"
              show-size
              ref="file"
            ></v-file-input>
          </v-container>
        </VCard>

          <v-text-field
            v-model="USER.title"
            :rules="[rules.required, rules.counter]"
            label="Имя"
            counter
            maxlength="16"
          ></v-text-field>

          <v-text-field
            v-model="USER.username"
            label="Имя пользователя"
            readonly
          ></v-text-field>

          <v-text-field
            v-model="USER.email"
            label="E-mail"
            readonly
          ></v-text-field>

          <v-text-field
            v-model="USER.url"
            :rules="[rules.url]"
            label="Ссылка на личный сайт"
          ></v-text-field>

          <v-textarea
            v-model="USER.description"
            :rules="[rules.description]"
            variant="filled"
            auto-grow
            label="О себе"
            rows="2"
            row-height="10"
        ></v-textarea>
        <!--
          <v-checkbox
            value="1"
            label="Согласие на обработку персональных данных"
            type="checkbox"
          ></v-checkbox>
        -->
          <v-btn
            prepend-icon="mdi-check-circle"
            color="blue-grey"
            class="me-4 my-5"
            :loading="loading"
            :disabled="loading"
            type="submit"
          >
            Сохранить
          </v-btn>
      </v-form>

  </VCard>
</v-col>
</v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

// import { useField, useForm } from 'vee-validate';

export default {
  data() {
    return {
      file: '',

      rules: {
        required: (value) => !!value || 'Required.',
        counter: (value) => value.length <= 16 || 'Max 16 characters',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid e-mail.';
        },
        url: (value) => {
          // eslint-disable-next-line no-useless-escape
          const pattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
          return pattern.test(value) || 'Не верный формат ссылки';
        },
        description: (value) => value.length <= 16383 || 'Max 16383 characters',
      },
      loading: null, // "loading2"
    };
  },

  computed: {
    ...mapGetters(['USER']),
  },

  methods: {
    ...mapActions(['UPDATE_USER_PROFILE', 'UPLOAD_USER_AVATAR', 'GET_USER_PROFILE']),

    async updateProfile() {
      const formData = new FormData();
      formData.append('_method', 'PATCH');

      const userKeys = Object.keys(this.USER);
      const vm = this.$refs.file.files[0];
      userKeys.forEach((key) => {
        if (key !== 'image') {
          formData.append(key, this.USER[key]);
        } else {
          // this.file = this.$refs.file.files[0];
          console.log(vm);
          formData.append('image', vm);
        }
      });

      // console.log(process.env.VUE_APP_SERVER_APP_LOGIN);
      this.loading = true;
      const result = await this.UPDATE_USER_PROFILE(formData);
      if (result) {
        this.GET_USER_PROFILE();
      }
      this.loading = false;
    },

  },

  mounted() {
    // this.userUpdate = JSON.parse(JSON.stringify(this.USER));
    // this.userUpdate = [...JSON.parse(JSON.stringify(this.USER_PROFILE))];
    // console.log(this.userUpdate);
  },

};
</script>

<style>

</style>
