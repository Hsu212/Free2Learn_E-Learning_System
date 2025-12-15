<template>
  <div class="home-view">
    <section class="hero-section">
      <div class="hero-content">
        <h1>Free2Learn</h1>
        <p class="hero-text">
          Expand your horizons with our immersive language courses. 
          Connect with the world and learn a new language at your own pace.
        </p>
        <button class="cta-button" @click="scrollToCourses">
          Start Learning
        </button>
      </div>
      
      <div class="scroll-indicator" @click="scrollToCourses">
        <span>↓</span>
      </div>
    </section>

    <section id="courses" class="catalog-section">
      <div class="section-header">
        <h2>📚 Language Catalog</h2>
        <p v-if="!searchQuery">Select a language below to begin your journey.</p>
        <p v-else>
          Showing results for "<strong>{{ searchQuery }}</strong>" 
          ({{ filteredCourses.length }} found)
        </p>
      </div>
      
      <div class="course-grid">
        <CourseCard
          v-for="course in filteredCourses"
          :key="course.id"
          :course="course"
          @view-course="goToCourseDetail"
        />
        
        <div v-if="filteredCourses.length === 0" class="no-results">
          <h3>No courses found</h3>
          <p>Try searching for a different language (e.g., "Italian", "Thai").</p>
          <button @click="clearSearch" class="clear-btn">Clear Search</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import CourseCard from '@/components/CourseCard.vue';
import { courses as coursesData } from '@/data/courses.js'; // Import data directly if needed, or keep local ref

const router = useRouter();
const route = useRoute();

// Ensure this matches your src/data/courses.js or use the import above
const courses = ref([
  { id: 1, title: 'English Communication Mastery', description: 'Improve fluency and confidence in daily conversations.', progress: 0 },
  { id: 2, title: 'Spanish for Travelers', description: 'Essential vocabulary for your next trip to Spain.', progress: 0 },
  { id: 3, title: 'Introduction to Japanese (N5)', description: 'Master Hiragana, Katakana, and basic grammar.', progress: 0 },
  { id: 4, title: 'French for Beginners', description: 'Learn the language of love. Basics of pronunciation.', progress: 0 },
  { id: 5, title: 'Business Chinese (Mandarin)', description: 'Professional vocabulary for working in China.', progress: 0 },
  { id: 6, title: 'German Grammar Intensive', description: 'Deep dive into cases, articles, and sentence structure.', progress: 0 },
  { id: 7, title: 'Korean Hangul Basics', description: 'Read and write the Korean alphabet in hours.', progress: 0 },
  { id: 8, title: 'Italian for Foodies', description: 'Navigate menus, order wine, and speak with your hands.', progress: 0 },
  { id: 9, title: 'Russian Alphabet & Basics', description: 'Demystify the Cyrillic alphabet and survival phrases.', progress: 0 },
  { id: 10, title: 'Vietnamese Essentials', description: 'Master the 6 tones and essential daily phrases.', progress: 0 },
  { id: 11, title: 'Brazilian Portuguese', description: 'Learn the musical language of Brazil. Samba and greetings.', progress: 0 },
  { id: 12, title: 'Arabic (MSA) Beginners', description: 'Introduction to Arabic script and polite conversation.', progress: 0 },
  { id: 13, title: 'Thai for Travelers', description: 'Navigate Bangkok with confidence. Politeness particles.', progress: 0 },
  { id: 14, title: 'American Sign Language (ASL)', description: 'Communicate with your hands. Alphabet and basics.', progress: 0 },
  { id: 15, title: 'Hindi Conversation', description: 'Spoken Hindi for Bollywood fans and travelers.', progress: 0 },
  { id: 16, title: 'Dutch for Beginners', description: 'Close to English and German. Learn the guttural "G".', progress: 0 },
  { id: 17, title: 'Swedish Basics', description: 'Learn the melodic language of Scandinavia. Fika culture.', progress: 0 },
  { id: 18, title: 'Turkish Language 101', description: 'Agglutinative language basics. Vowel harmony.', progress: 0 },
  { id: 19, title: 'Modern Greek', description: 'Learn the alphabet and essential travel phrases.', progress: 0 },
]);

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
  const element = document.getElementById('courses');
  // Offset the scroll to account for the sticky header (approx 80px)
  const headerOffset = 80;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
};

const clearSearch = () => {
  router.push({ name: 'home' }); 
};
</script>

<style scoped>
.home-view {
  width: 100%;
}

/* --- HERO SECTION --- */
.hero-section {
  background: linear-gradient(135deg, #064e3b 0%, #16a34a 100%);
  /* Subtracting 74px (approx header height) from 100vh 
     ensures it fills exactly the remaining screen space.
  */
  min-height: calc(100vh - 74px); 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding: 20px;
  position: relative;
}

.hero-content {
  max-width: 800px;
  /* Shift content slightly up visually */
  transform: translateY(-20px); 
}

.hero-section h1 {
  color: white;
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-weight: 800;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.hero-text {
  font-size: 1.3rem;
  margin-bottom: 2.5rem;
  color: #dcfce7;
  line-height: 1.6;
}

.cta-button {
  background-color: white;
  color: var(--primary-color);
  font-weight: 700;
  padding: 16px 36px;
  font-size: 1.2rem;
  border-radius: 50px;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
}

/* Scroll Indicator (Bouncing Arrow) */
.scroll-indicator {
  position: absolute;
  bottom: 30px;
  color: white;
  font-size: 2rem;
  animation: bounce 2s infinite;
  cursor: pointer;
  opacity: 0.8;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

/* --- CATALOG SECTION --- */
.catalog-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px; /* Add top padding to separate from hero */
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-header h2 {
  font-size: 2.2rem;
  color: var(--text-main);
  margin-bottom: 15px;
}

.section-header p {
  color: var(--text-muted);
  font-size: 1.1rem;
}

.course-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}

/* No Results State */
.no-results {
  text-align: center;
  padding: 40px;
  color: var(--text-muted);
  width: 100%;
}

.clear-btn {
  margin-top: 15px;
  background-color: transparent;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s;
}

.clear-btn:hover {
  background-color: var(--primary-color);
  color: white;
}

@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2.5rem;
  }
}
</style>