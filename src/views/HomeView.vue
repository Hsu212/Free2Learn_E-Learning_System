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
          <button class="cta-button primary" @click="scrollToCourses">Explore Catalog</button>
          <button class="cta-button secondary">How it works</button>
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
import { ref, computed } from 'vue';
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

const scrollToCourses = () => {
  document.getElementById('courses').scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const clearSearch = () => router.push({ name: 'home' });
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  overflow: hidden;
  background-color: #020617; /* Deep dark base */
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

