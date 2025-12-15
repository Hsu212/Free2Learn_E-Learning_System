<template>
  <div class="my-courses-view">
    <div class="page-header">
      <h1>My Saved Courses</h1>
      <p>Continue where you left off or review your favorites.</p>
    </div>

    <div v-if="savedCoursesList.length > 0" class="course-grid">
      <CourseCard
        v-for="course in savedCoursesList"
        :key="course.id"
        :course="course"
        @view-course="goToCourseDetail"
      />
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">📂</div>
      <h3>No courses saved yet</h3>
      <p>Browse the catalog and click the heart icon to save courses here.</p>
      <router-link to="/" class="btn-primary">Browse Catalog</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { courses } from '@/data/courses.js'; // Import raw data
import { useAuth } from '@/composables/useAuth';
import CourseCard from '@/components/CourseCard.vue';

const router = useRouter();
const { user } = useAuth();

// Filter courses based on Saved IDs
const savedCoursesList = computed(() => {
  if (!user.value || !user.value.savedCourses) return [];
  return courses.filter(c => user.value.savedCourses.includes(c.id));
});

const goToCourseDetail = (courseId) => {
  router.push({ name: 'course', params: { id: courseId } });
};
</script>

<style scoped>
.my-courses-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 80vh;
}

.page-header {
  margin-bottom: 40px;
  text-align: center;
}

.page-header h1 {
  font-size: 2.5rem;
  color: var(--text-main);
  margin-bottom: 10px;
}

.page-header p {
  color: var(--text-muted);
  font-size: 1.1rem;
}

.course-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: var(--bg-card);
  border-radius: 16px;
  border: 1px solid var(--border-color);
  max-width: 500px;
  margin: 0 auto;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.empty-state h3 {
  font-size: 1.5rem;
  color: var(--text-main);
  margin-bottom: 10px;
}

.empty-state p {
  color: var(--text-muted);
  margin-bottom: 30px;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: var(--primary-hover);
}
</style>