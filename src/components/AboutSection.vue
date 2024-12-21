<template>
  <section class="about" id="about">
    <div class="about-content">
      <h2>About GDSC</h2>
      <p>Google Developer Student Clubs are university based community groups for students interested in Google developer technologies.</p>
      <div class="features">
        <div class="feature">
          <img src="../assets/learn.png" alt="Learn">
          <h3>Learn</h3>
          <p>Learn about new technologies</p>
        </div>
        <div class="feature">
          <img src="../assets/grow.png" alt="Grow">
          <h3>Grow</h3>
          <p>Grow as a developer</p>
        </div>
        <div class="feature">
          <img src="../assets/connect.png" alt="Connect">
          <h3>Connect</h3>
          <p>Connect with other developers</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding: 4rem 2rem;
  background: #f8f9fa;
}

.about-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

.feature {
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.feature img {
  width: 64px;
  height: 64px;
  margin-bottom: 1rem;
}
</style> 