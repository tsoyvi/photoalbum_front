<template>

    <v-alert

    border="start"
      variant="tonal"
      color="primary"
      icon="mdi-vuetify"
      title="404 Страница не найдена"
      prominent
      class="mx-5 my-5"
    >
      <v-divider class="my-5" />
      <div>- неправильно введён адрес ссылки;</div>
      <div>- страница была удалена.</div>

       <div class="my-5"><v-btn :to="'/'">На главную</v-btn></div>
    </v-alert>

</template>

<script>
export default {

};
</script>

<style>

</style>
