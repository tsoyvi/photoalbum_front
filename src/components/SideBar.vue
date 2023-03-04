<template>
    <v-navigation-drawer
        expand-on-hover
        rail
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            title="Sander Adams"
            subtitle="test8@test.ru"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
           <router-link to="/">
            <v-list-item prepend-icon="mdi-home" title="Home" value="home"></v-list-item>
          </router-link>
          <router-link to="/image-gallery">
            <v-list-item prepend-icon="mdi-image" title="My Gallery" value="myGallery"></v-list-item>
          </router-link>

          <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
        </v-list>

      </v-navigation-drawer>
</template>
