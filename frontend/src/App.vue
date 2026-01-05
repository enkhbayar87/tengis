<template>
  <div id="app" class="app-shell">
    <TheHeader />

    <div class="app-body" :class="{ 'app-body--no-chrome': !showChrome }">
      <TheSidebar v-if="showChrome" />

      <main class="app-main">
        <router-view />
      </main>
    </div>

    <TheFooter v-if="showChrome" />
  </div>
</template>

<script setup>
import TheHeader from './components/TheHeader.vue';
import TheSidebar from './components/TheSidebar.vue';
import TheFooter from './components/TheFooter.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const showChrome = computed(() => route.meta?.chrome !== false);
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  background-color: #f5f5f5;
}

.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-body {
  flex: 1;
  display: flex;
  min-height: 0;
}

.app-body--no-chrome {
  display: block;
}

.app-main {
  flex: 1;
  min-width: 0;
  padding: 1.25rem;
}
</style>