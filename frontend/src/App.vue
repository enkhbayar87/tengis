<template>
  <div id="app" class="app-shell">
    <TheHeader />

    <div class="app-body">
      <TheSidebar />

      <main class="app-main">
        <router-view />
      </main>
    </div>

    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from './components/TheHeader.vue';
import TheSidebar from './components/TheSidebar.vue';
import TheFooter from './components/TheFooter.vue';
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

.app-main {
  flex: 1;
  min-width: 0;
  padding: 1.25rem;
}
</style>