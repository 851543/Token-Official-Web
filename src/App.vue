<template>
  <div class="app">
    <NavBar />
    <HeroSection />
    <AboutSection />
    <TeamSection />
    <ContactSection />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import TeamSection from './components/TeamSection.vue'
import ContactSection from './components/ContactSection.vue'
</script>

<style>
.app {
  font-family: 'Arial', sans-serif;
}
</style> 