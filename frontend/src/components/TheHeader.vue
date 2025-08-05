<template>
    <div id="app">
      <nav class="navbar">
        <div class="nav-container">
          <router-link to="/" class="nav-brand">Миний Апп</router-link>
          <div class="nav-links">
            <router-link to="/home" class="nav-link">Нүүр</router-link>
            <router-link to="/about" class="nav-link">Тухай</router-link>
            <router-link to="/login" class="nav-link">Нэвтрэх</router-link>
          </div>
        </div>
      </nav>
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </template>
  
  <script setup>
  // Router-view нь автоматаар маршрутуудыг харуулна
  </script>
  
  <style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    position: fixed;
    top: 0;
    left: 0;
    font-family: Arial, sans-serif;
    line-height: 1.6;
  }
  
  #app {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .navbar {
    background: #333;
    color: white;
    padding: 1rem 0;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 1000;
  }
  
  .nav-container {
    max-width: 100vh;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .nav-brand {
    color: white;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .nav-links {
    display: flex;
    gap: 2rem;
  }
  
  .nav-link {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .nav-link:hover {
    background: #555;
  }
  
  .main-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    flex: 1;
    z-index: 1;
  }
  </style>