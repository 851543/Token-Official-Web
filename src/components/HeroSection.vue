<template>
  <section class="hero">
    <div class="hero-content">
      <h1>Google Developer Student Clubs VIT</h1>
      <p>Building Developers. Creating Impact.</p>
      <button class="cta-button">Join Us</button>
    </div>
    <div class="hero-image">
      <img src="../assets/hero-image.png" alt="Hero">
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 2rem;
  min-height: 80vh;
}

.hero-content {
  flex: 1;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero-image {
  flex: 1;
}

.cta-button {
  padding: 1rem 2rem;
  background: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style> 