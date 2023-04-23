<template>
  <v-form @submit.prevent>
    <slot name="fields"></slot>
    <v-btn color="primary" type="submit" @click="submit()">{{
      this.btnText
    }}</v-btn>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex';
import requests from '@/store/blocks/requests';

// TODO: Does not work
export default {
  props: ['url', 'method', 'btnText'],
  data: () => ({
    form: {},
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
  computed: {
    methodMap() {
      return new Map([
        ['POST', (data) => requests.postJson(this.url, data)],
        ['PUT', (data) => requests.putJson(this.url, data)],
        ['PATCH', (data) => requests.patchJson(this.url, data)],
      ]);
    },
  },

  methods: {
    ...mapActions(['addError']),
    async submit() {
      const result = this.methodMap.get(this.method);
      if (result.success) {
        return result.data;
      }
      this.addError(result.error);
      if (result.error.response?.data?.errors) {
        this.errors = result.error.response.data.errors;
      }
      return result.error;
    },
  },
};
</script>
