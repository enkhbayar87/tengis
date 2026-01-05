<template>
  <footer class="footer">
    <div class="footer-inner">
      <span class="footer-text">© {{ year }} Minii App</span>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>

<style scoped>
.footer {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  background: white;
}

.footer-inner {
  padding: 0.75rem 1.25rem;
  display: flex;
  justify-content: center;
}

.footer-text {
  color: #666;
  font-size: 0.9rem;
}
</style>
