<template>
  <div class="course-detail-view" v-if="course">
    <div class="detail-header">
      <div class="header-content">
        <router-link to="/home" class="back-link">
          <span class="arrow">←</span> Back to Courses
        </router-link>
        <h1>{{ course.title }}</h1>
        <p class="course-desc">{{ course.description }}</p>
      </div>
      
      <div class="header-progress">
        <div class="progress-label">
          <span>Course Progress</span>
          <span>{{ course.progress }}%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: course.progress + '%' }"></div>
        </div>
      </div>
    </div>

    <div class="detail-content-grid">
      <aside class="lesson-sidebar">
        <div class="sidebar-header">
          <h2>Course Syllabus</h2>
        </div>
        <div class="sidebar-content">
          <LessonList 
            :lessons="course.lessons" 
            :selectedId="selectedLessonId"
            @select-lesson="selectLesson" 
          />
        </div>
      </aside>

      <main class="lesson-viewer">
        <div class="viewer-card">
          <div class="viewer-header">
            <h3 class="current-lesson-title">{{ currentLesson.title }}</h3>
            <span v-if="currentLesson.completed" class="badge-completed">Completed</span>
          </div>
          
          <div class="video-section">
            <div class="video-placeholder" v-if="!getEmbedUrl(currentLesson.videoUrl)">
              <p>🎥 <strong>Video Resource</strong></p>
              <p>No video available for this lesson.</p>
            </div>
            
            <iframe 
              v-else
              class="video-frame"
              :src="getEmbedUrl(currentLesson.videoUrl)" 
              title="Lesson Video" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
            ></iframe>
          </div>

          <div class="lesson-content">
            <p class="content-text">{{ currentLesson.content }}</p>
          </div>

          <div class="viewer-footer">
            <button 
              class="complete-btn" 
              :class="{ 'is-completed': currentLesson.completed }"
              @click="toggleCompletion"
            >
              {{ currentLesson.completed ? 'Mark as Incomplete' : 'Mark as Complete' }}
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
  
  <div v-else class="not-found">
    <div class="error-card">
      <h2>Course Not Found</h2>
      <p>The requested course could not be loaded.</p>
      <router-link to="/home" class="btn-primary">Return Home</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getCourseById } from '@/data/courses.js';
import LessonList from '@/components/LessonList.vue';

const route = useRoute();
const course = ref(null);
const selectedLessonId = ref(null);

// --- NEW HELPER FUNCTION ---
const getEmbedUrl = (url) => {
  // If url is missing, empty, or just a placeholder '#', return null
  if (!url || url === '#') return null;

  // Regex to find the video ID from various YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  // Return the embed URL if we find a valid ID (11 chars)
  return (match && match[2].length === 11)
    ? `https://www.youtube.com/embed/${match[2]}`
    : null;
};
// ---------------------------

const loadCourse = (id) => {
  const courseData = getCourseById(id);
  if (courseData) {
    course.value = JSON.parse(JSON.stringify(courseData));
    if (course.value.lessons.length > 0) {
      selectedLessonId.value = course.value.lessons[0].id;
    }
  }
};

watch(() => route.params.id, (newId) => {
  if (newId) loadCourse(newId);
}, { immediate: true });

const selectLesson = (lessonId) => {
  selectedLessonId.value = lessonId;
};

const currentLesson = computed(() => {
  if (course.value && selectedLessonId.value) {
    return course.value.lessons.find(lesson => lesson.id === selectedLessonId.value) || {};
  }
  return {};
});

const toggleCompletion = () => {
  if (!currentLesson.value) return;
  currentLesson.value.completed = !currentLesson.value.completed;

  if (course.value && course.value.lessons) {
    const totalLessons = course.value.lessons.length;
    const completedCount = course.value.lessons.filter(l => l.completed).length;
    course.value.progress = Math.round((completedCount / totalLessons) * 100);
  }
};
</script>

<style scoped>
.course-detail-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
}

/* Header Styles */
.detail-header {
  background: var(--bg-card);
  padding: 30px;
  border-radius: 16px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 30px;
  border: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
}

.header-content { flex: 1; min-width: 300px; }
.back-link {
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  margin-bottom: 15px;
  font-size: 0.9rem;
  color: var(--text-muted);
}
.back-link:hover { color: var(--primary-color); }
.arrow { margin-right: 5px; }
.detail-header h1 { font-size: 2rem; margin-bottom: 10px; color: var(--text-main); }
.course-desc { color: var(--text-muted); font-size: 1.1rem; max-width: 700px; margin: 0; }

.header-progress {
  width: 250px;
  background: var(--bg-body);
  padding: 15px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}
.progress-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 8px;
}
.progress-track {
  height: 8px;
  background-color: var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background-color: var(--success-color);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.detail-content-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 30px;
  align-items: start;
}

/* Sidebar */
.lesson-sidebar {
  background: var(--bg-card);
  border-radius: 16px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  overflow: hidden;
  position: sticky;
  top: 100px;
}
.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-body);
}
.sidebar-header h2 { font-size: 1.1rem; margin: 0; color: var(--text-main); }
.sidebar-content { max-height: calc(100vh - 200px); overflow-y: auto; }

/* Viewer */
.viewer-card {
  background: var(--bg-card);
  border-radius: 16px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  min-height: 500px;
  display: flex;
  flex-direction: column;
}

.viewer-header {
  padding: 30px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.current-lesson-title { font-size: 1.5rem; margin: 0; color: var(--text-main); }
.badge-completed {
  background-color: var(--bg-secondary);
  color: var(--primary-color);
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  border: 1px solid var(--border-color);
}

/* Video Section */
.video-section {
  background-color: black;
  width: 100%;
  aspect-ratio: 16 / 9; /* Standard video ratio */
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-frame {
  width: 100%;
  height: 100%;
}

.video-placeholder {
  color: white;
  text-align: center;
  padding: 20px;
  background-color: #333;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.lesson-content {
  padding: 40px;
  flex-grow: 1;
}

.content-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-muted);
  white-space: pre-wrap;
}

.viewer-footer {
  padding: 20px 30px;
  background-color: var(--bg-body);
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
}
.complete-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}
.complete-btn:hover { background-color: var(--primary-hover); transform: translateY(-1px); }
.complete-btn.is-completed {
  background-color: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-muted);
}
.complete-btn.is-completed:hover {
  border-color: var(--text-main);
  background-color: var(--bg-card);
}

@media (max-width: 900px) {
  .detail-content-grid { grid-template-columns: 1fr; }
  .lesson-sidebar { position: static; margin-bottom: 20px; }
  .sidebar-content { max-height: 300px; }
}
</style>
