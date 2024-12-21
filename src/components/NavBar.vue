<template>
  <nav class="navbar">
    <div class="logo">
      <img src="../assets/logo.png" alt="GDSC Logo">
    </div>
    <div class="nav-links">
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#team">Team</a>
      <a href="#contact">Contact</a>
    </div>
  </nav>
</template>

<script setup lang="ts">
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: #333;
}
</style> 