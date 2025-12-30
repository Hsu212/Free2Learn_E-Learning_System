<template>
  <section class="recommendations-section">
    <div class="container">
      <div class="section-header">
        <span class="recommendation-badge">Featured Tracks</span>
        <h2>Personalized Recommendations</h2>
        <p>Curated languages based on global demand and cultural impact.</p>
      </div>

      <div class="recommendations-grid">
        <CourseCard 
          v-for="course in recommendedList" 
          :key="course.id" 
          :course="course" 
          @view-course="$emit('view-course', $event)"
          class="featured-card"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { courses } from '@/data/courses.js';
import CourseCard from '@/components/CourseCard.vue';

const emit = defineEmits(['view-course']);

const recommendedList = computed(() => {
  const featuredIds = [1, 2, 3]; 
  return courses.filter(course => featuredIds.includes(course.id));
});
</script>

<style scoped>
.recommendations-section {
  padding: 100px 20px;
  background: radial-gradient(circle at top right, var(--bg-secondary), var(--bg-body));
}

.container { max-width: 1200px; margin: 0 auto; }

.section-header { text-align: center; margin-bottom: 60px; }

.recommendation-badge {
  background: var(--primary-color);
  color: white;
  padding: 6px 16px;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1px;
  box-shadow: 0 4px 10px rgba(5, 150, 105, 0.3);
}

h2 {
  margin-top: 20px;
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -1px;
}

.recommendations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  justify-items: center;
}

.featured-card {
  transform: scale(1.02);
  border: 1px solid var(--primary-color) !important;
}
</style>