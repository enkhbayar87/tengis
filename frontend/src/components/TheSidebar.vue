<template>
  <aside class="sidebar">
    <div class="sidebar-inner">
      <div class="sidebar-title">Menu</div>

      <nav class="nav">
        <ul class="nav-list">
          <li v-for="item in items" :key="item.id" class="nav-item">
            <RouterLink :to="item.to" class="nav-link">
              <span class="nav-text">{{ item.label }}</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script setup>
const items = [
  { id: 'dashboard', label: 'Dashboard', to: '/dashboard' },
  { id: 'home', label: 'Home', to: '/home' },
  { id: 'about', label: 'About', to: '/about' },
  { id: 'login', label: 'Login', to: '/login' },
  { id: 'register', label: 'Register', to: '/register' },
];
</script>

<style scoped>
.sidebar {
  width: 260px;
  background: white;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
}

.sidebar-inner {
  position: sticky;
  top: 0;
  max-height: calc(100vh - 0px);
  overflow: auto;
  padding: 1rem;
}

.sidebar-title {
  font-weight: 800;
  color: #333;
  margin-bottom: 0.75rem;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.35rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.75rem;
  border-radius: 10px;
  text-decoration: none;
  color: #222;
  background: transparent;
  border: 1px solid transparent;
  transition:
    background-color 180ms ease,
    border-color 180ms ease,
    transform 120ms ease,
    box-shadow 180ms ease;
}

/* hover effect */
.nav-link:hover {
  background: #f3f4f6;
  border-color: rgba(0, 0, 0, 0.06);
  transform: translateX(4px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}

.nav-link.router-link-active {
  background: rgba(102, 126, 234, 0.12);
  border-color: rgba(102, 126, 234, 0.25);
  color: #4c5bd4;
  font-weight: 700;
}

@media (max-width: 900px) {
  .sidebar {
    display: none;
  }
}
</style>

