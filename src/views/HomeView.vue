<template>
  <div class="home-view">
    <section class="hero-section">
      <div class="hero-mesh"></div>
      <div class="hero-content">
        <h1 class="hero-title">Master any language, <span class="text-gradient">anywhere.</span></h1>
        <p class="hero-text">
          Join 50,000+ people at Free2Learn breaking barriers through 
          immersive, expert-led language training.
        </p>
        <div class="hero-btns">
          <button class="cta-button primary" @click="scrollToSection('courses')">Explore Catalog</button>
          <button class="cta-button secondary" @click="scrollToSection('how-it-works')">How it works</button>
        </div>
      </div>
    </section>

    <section id="how-it-works" class="how-it-works-section">
      <div class="hiw-container">
        <div class="section-header">
          <h2 class="text-gradient">How it works</h2>
          <p>Start your journey to fluency in three simple steps.</p>
        </div>
        
        <div class="steps-grid">
          <div class="step-card">
            <div class="step-number">01</div>
            <h3>Choose your Path</h3>
            <p>Select from over 19 languages tailored for your skill level, from absolute beginner to advanced conversation.</p>
          </div>
          
          <div class="step-card">
            <div class="step-number">02</div>
            <h3>Immersive Learning</h3>
            <p>Watch expert-led video lessons and track your progress through our interactive dashboard.</p>
          </div>
          
          <div class="step-card">
            <div class="step-number">03</div>
            <h3>Track & Master</h3>
            <p>Save your favorite courses, mark lessons as complete, and build your personal learning library.</p>
          </div>
        </div>
      </div>
    </section>

    <CourseRecommendations @view-course="goToCourseDetail" />

    <section id="courses" class="catalog-section">
      <div class="catalog-container">
        <div class="section-header-row">
          <div>
            <h2>Full Language Catalog</h2>
            <p v-if="!searchQuery">Pick your next challenge from 19+ languages.</p>
          </div>
          <div v-if="searchQuery" class="search-indicator">
            Results for: <strong>{{ searchQuery }}</strong>
          </div>
        </div>
        
        <div class="course-grid">
          <CourseCard
            v-for="course in filteredCourses"
            :key="course.id"
            :course="course"
            @view-course="goToCourseDetail"
            :id="'course-' + course.id"
          />
        </div>

        <div v-if="filteredCourses.length === 0" class="no-results">
          <div class="empty-icon">🔍</div>
          <h3>No languages match your search</h3>
          <button @click="clearSearch" class="clear-btn">Show all courses</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import CourseCard from '@/components/CourseCard.vue';
import CourseRecommendations from '@/components/CourseRecommendations.vue';
import { courses as coursesData } from '@/data/courses.js';

const router = useRouter();
const route = useRoute();
const courses = ref(coursesData);

const searchQuery = computed(() => route.query.search || '');

const filteredCourses = computed(() => {
  if (!searchQuery.value) return courses.value;
  const term = searchQuery.value.toLowerCase();
  return courses.value.filter(course => 
    course.title.toLowerCase().includes(term) || 
    course.description.toLowerCase().includes(term)
  );
});

const goToCourseDetail = (courseId) => {
  router.push({ name: 'course', params: { id: courseId } });
};

// Generic Scroll Function for Hero Buttons
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const clearSearch = () => router.push({ name: 'home' });

// "Back to Course" Logic: Scrolls to specific course if Hash exists
onMounted(() => {
  if (route.hash) {
    nextTick(() => {
      const element = document.querySelector(route.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' }); 
      }
    });
  }
});
</script>

<style scoped>
/* HERO STYLES */
.hero-section {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  overflow: hidden;
  background-color: #020617; 
}

.hero-mesh {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: 
    radial-gradient(at 0% 0%, rgba(16, 185, 129, 0.15) 0, transparent 50%),
    radial-gradient(at 100% 100%, rgba(5, 150, 105, 0.15) 0, transparent 50%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 900px;
  text-align: center;
}

.hero-title {
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  line-height: 1.1;
  font-weight: 800;
  color: white;
  margin-bottom: 24px;
}

.text-gradient {
  background: linear-gradient(to right, #10b981, #34d399);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-text {
  font-size: 1.25rem;
  color: #94a3b8;
  max-width: 700px;
  margin: 0 auto 40px;
  line-height: 1.6;
}

.hero-btns { display: flex; gap: 16px; justify-content: center; }

.cta-button {
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  cursor: pointer;
}

.cta-button.primary {
  background: var(--primary-color);
  color: white;
  box-shadow: 0 10px 15px -3px rgba(5, 150, 105, 0.4);
}

.cta-button.secondary {
  background: rgba(255,255,255,0.05);
  color: white;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.1);
}

.cta-button.secondary:hover {
  background: rgba(255,255,255,0.1);
}

/* HOW IT WORKS STYLES */
.how-it-works-section {
  padding: 80px 20px;
  background-color: #0f172a;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.hiw-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-header h2 {
  font-size: 2.5rem;
  margin-bottom: 16px;
  display: inline-block;
}

.section-header p {
  color: #94a3b8;
  font-size: 1.1rem;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.step-card {
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(255,255,255,0.05);
  padding: 40px 30px;
  border-radius: 20px;
  position: relative;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.step-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
}

.step-number {
  font-size: 3rem;
  font-weight: 900;
  color: rgba(16, 185, 129, 0.2);
  margin-bottom: 20px;
  line-height: 1;
}

.step-card h3 {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.step-card p {
  color: #94a3b8;
  line-height: 1.6;
}

/* CATALOG STYLES */
.catalog-section { padding: 100px 20px; }
.catalog-container { max-width: 1200px; margin: 0 auto; }

.section-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 50px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 24px;
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
}

.no-results {
  text-align: center;
  padding: 100px 0;
}

.empty-icon { font-size: 3rem; margin-bottom: 20px; }
</style>
