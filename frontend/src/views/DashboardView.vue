<template>
  <div class="dashboard-container">
    <main class="dashboard-content">
      <div class="dashboard-top">
        <h1 class="dashboard-title">Dashboard</h1>
        <button @click="handleLogout" class="logout-btn">Гарах</button>
      </div>

      <div class="welcome-card">
        <h2>Тавтай морил!</h2>
        <p>Та амжилттай нэвтэрлээ. Dashboard хуудас руу тавтай морил.</p>
      </div>
      
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Нийт хэрэглэгч</h3>
          <p class="stat-number">1,234</p>
        </div>
        <div class="stat-card">
          <h3>Идэвхтэй</h3>
          <p class="stat-number">892</p>
        </div>
        <div class="stat-card">
          <h3>Шинэ өнөөдөр</h3>
          <p class="stat-number">45</p>
        </div>
        <div class="stat-card">
          <h3>Нийт захиалга</h3>
          <p class="stat-number">5,678</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  // Энд logout логик байх болно
  // Жишээ нь: localStorage.removeItem('token')
  
  // Нэвтрэх хуудас руу буцах
  router.push('/login')
}
</script>

<style scoped>
.dashboard-container {
  background: transparent;
}

.logout-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background: #c82333;
}

.dashboard-content {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.dashboard-title {
  margin: 0;
  color: #333;
}

.welcome-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  text-align: center;
}

.welcome-card h2 {
  color: #333;
  margin-bottom: 1rem;
}

.welcome-card p {
  color: #666;
  font-size: 1.1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-card h3 {
  color: #666;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #667eea;
  margin: 0;
}
</style> 