<template>
  <aside class="sidebar">
    <div class="sidebar-inner">
      <div class="sidebar-title">Menu</div>

      <nav class="nav">
        <div v-for="group in menu" :key="group.id" class="nav-group">
          <div class="nav-group-title">{{ group.label }}</div>

          <ul class="nav-list">
            <li v-for="item in group.children" :key="item.id" class="nav-item">
              <RouterLink :to="item.to" class="nav-link">
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </aside>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getSidebarMenu } from '../services/menu';

const menu = ref([]);

onMounted(async () => {
  menu.value = await getSidebarMenu();
});
</script>

<style scoped>
.sidebar {
  width: 260px;
  background: white;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
}

.sidebar-inner {
  position: sticky;
  top: 64px; /* header өндөртэй ойролцоо */
  max-height: calc(100vh - 64px);
  overflow: auto;
  padding: 1rem;
}

.sidebar-title {
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
}

.nav-group + .nav-group {
  margin-top: 1rem;
}

.nav-group-title {
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 0.5rem;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.25rem;
}

.nav-link {
  display: block;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  transition: background-color 0.2s ease, transform 0.05s ease;
}

.nav-link:hover {
  background: #f3f4f6;
}

.nav-link.router-link-active {
  background: rgba(102, 126, 234, 0.12);
  color: #4c5bd4;
  font-weight: 600;
}

@media (max-width: 900px) {
  .sidebar {
    display: none;
  }
}
</style>

