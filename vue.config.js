// const { defineConfig } = require('@vue/cli-service');

/*
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },

  // Сервер для отладки
  // указать путь к своему
  devServer: {
    proxy: 'http://localhost:7777',
  },

});

*/

module.exports = {

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },

  devServer: {
    // proxy: 'http://localhost:9000',
    // proxy: 'http://dev-photoalbum.tigunov.com',
    proxy: 'http://k8s-photoalbum.tigunov.com/',
  },
};
