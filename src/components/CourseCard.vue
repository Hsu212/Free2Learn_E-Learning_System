<template>
  <div class="course-card" @click="$emit('view-course', course.id)">
    <div class="card-body">
      <div class="card-header-row">
        <h3>{{ course.title }}</h3>
        
        <button 
          class="save-btn" 
          :class="{ 'is-saved': isSaved }" 
          @click.stop="handleSave"
          title="Save Course"
        >
          <span v-if="isSaved">♥</span> <span v-else>♡</span>       </button>
      </div>
      
      <p class="card-description">{{ course.description }}</p>
    </div>
    
    <div class="card-footer">
      <div class="progress-container">
        <div class="progress-bar" :style="{ width: course.progress + '%' }"></div>
      </div>
      <small>{{ course.progress }}% Complete</small>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuth } from '@/composables/useAuth';

const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['view-course']);
const { isAuthenticated, toggleSavedCourse, isCourseSaved } = useAuth();

// Check if this specific course is saved
const isSaved = computed(() => {
  return isCourseSaved(props.course.id);
});

const handleSave = () => {
  if (!isAuthenticated.value) {
    alert("Please sign in to save courses!");
    return;
  }
  toggleSavedCourse(props.course.id);
};
</script>

<style scoped>
.course-card {
  background: var(--bg-card);
  border-radius: 12px;
  margin: 10px;
  width: 320px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
}

.course-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-color);
}

.card-body {
  padding: 24px;
}

.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.card-header-row h3 {
  margin: 0;
  color: var(--text-main);
  font-size: 1.25rem;
  padding-right: 10px; /* Space for button */
}

/* Save Button Styles */
.save-btn {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: var(--text-muted);
  cursor: pointer;
  line-height: 1;
  padding: 0;
  transition: transform 0.2s, color 0.2s;
}

.save-btn:hover {
  transform: scale(1.1);
  color: var(--primary-color);
}

.save-btn.is-saved {
  color: #ef4444; /* Red for saved state */
}

.card-description {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

.card-footer {
  padding: 16px 24px;
  background-color: var(--bg-body);
  border-top: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.progress-container {
  flex-grow: 1;
  height: 6px;
  background-color: var(--border-color);
  border-radius: 3px;
  margin-right: 12px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: var(--success-color);
  border-radius: 3px;
  transition: width 0.5s ease-in-out;
}

.card-footer small {
  font-size: 0.85em;
  font-weight: 600;
  color: var(--text-muted);
}
</style>