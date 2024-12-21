<template>
  <section class="team" id="team">
    <h2>Our Team</h2>
    <div class="team-grid">
      <div v-for="member in teamMembers" :key="member.id" class="team-member">
        <img :src="member.image" :alt="member.name">
        <h3>{{ member.name }}</h3>
        <p>{{ member.role }}</p>
        <div class="social-links">
          <a :href="member.github" target="_blank">GitHub</a>
          <a :href="member.linkedin" target="_blank">LinkedIn</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface TeamMember {
  id: number
  name: string
  role: string
  image: string
  github: string
  linkedin: string
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Lead",
    image: "../assets/team1.jpg",
    github: "https://github.com",
    linkedin: "https://linkedin.com"
  },
  // 添加更多团队成员
]
</script>

<style scoped>
.team {
  padding: 4rem 2rem;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.team-member {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.team-member img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 1rem;
}
</style> 