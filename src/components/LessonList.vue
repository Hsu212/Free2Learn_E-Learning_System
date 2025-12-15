<template>
  <ul class="lesson-list">
    <li 
      v-for="lesson in lessons" 
      :key="lesson.id" 
      class="lesson-item"
      :class="{ 'active': lesson.id === selectedId }"
      @click="$emit('select-lesson', lesson.id)"
    >
      <div class="status-icon">
        <span v-if="lesson.completed" class="icon-check">✓</span>
        <span v-else class="icon-pending">○</span>
      </div>
      
      <div class="lesson-info">
        <span class="lesson-title">{{ lesson.title }}</span>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  lessons: {
    type: Array,
    required: true,
  },
  selectedId: {
    type: [String, Number],
    default: null
  }
});

const emit = defineEmits(['select-lesson']);
</script>

<style scoped>
.lesson-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.lesson-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--bg-card); /* Use variable */
  color: var(--text-main);
}

.lesson-item:last-child {
  border-bottom: none;
}

.lesson-item:hover {
  background-color: var(--bg-body); /* Slightly distinct from card */
  padding-left: 24px;
}

.lesson-item.active {
  background-color: var(--bg-secondary); /* Use the secondary green var */
  border-left: 4px solid var(--primary-color);
  padding-left: 16px;
}

.lesson-item.active .lesson-title {
  color: var(--primary-color);
  font-weight: 700;
}

.status-icon {
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
}

.icon-check {
  color: var(--success-color);
  font-weight: bold;
  font-size: 1.1rem;
}

.icon-pending {
  color: var(--text-muted);
  font-size: 1.2rem;
}

.lesson-info {
  flex-grow: 1;
}

.lesson-title {
  font-size: 0.95rem;
  color: var(--text-main);
  transition: color 0.2s;
}
</style>