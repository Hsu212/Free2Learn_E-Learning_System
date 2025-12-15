<template>
  <div class="landing-page">
    <div class="content-wrapper">
      <h1>Ton Duc Thang University</h1>
      <p class="intro-text">
        Unlock your potential with our modern, engaging courses. Learn the latest technologies at your own pace.
        Ready to start your learning journey?
      </p>
      <div class="action-area">
        <button class="cta-button" @click="goToAuth">
          Start Learning Now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToAuth = () => {
  router.push({ name: 'auth' });
};
</script>

<style scoped>
.landing-page {
  /* Green Gradient */
  background: linear-gradient(135deg, #064e3b 0%, #16a34a 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
}

.content-wrapper {
  background: rgba(0, 0, 0, 0.3); /* Dark transparent bg works well on both themes for landing */
  backdrop-filter: blur(10px);
  padding: 3rem;
  border-radius: 16px;
  max-width: 800px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #ffffff; /* Always white on the gradient */
  letter-spacing: -0.025em;
}

.intro-text {
  font-size: 1.25rem;
  line-height: 1.75;
  margin-bottom: 2.5rem;
  color: #dcfce7; /* Light green-white */
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-button {
  background-color: #ffffff;
  color: #16a34a; /* Green text */
  font-weight: 700;
  padding: 16px 32px;
  font-size: 1.125rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
  background-color: #f0fdf4;
}
</style>