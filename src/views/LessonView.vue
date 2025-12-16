<script setup>
import { useRoute } from 'vue-router';
import { courses } from '@/data/courses'; // Importing your data

const route = useRoute();

// 1. LOCATE THE DATA
// We grab the IDs from the URL (assuming your router uses /course/:courseId/lesson/:lessonId)
// If your router uses different param names, adjust 'courseId' and 'lessonId' below.
const courseId = parseInt(route.params.courseId);
const lessonId = route.params.lessonId;

// Find the course and the specific lesson
const course = courses.find(c => c.id === courseId);
const lesson = course ? course.lessons.find(l => l.id === lessonId) : null;

// 2. THE YOUTUBE FIX
// This function transforms 'youtu.be/...' or 'youtube.com/watch?v=...' into an Embed URL
const getEmbedUrl = (url) => {
  if (!url || url === '#') return null;

  // Regex to strip the ID from various YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  // If a valid 11-character ID is found, return the embed link
  return (match && match[2].length === 11)
    ? `https://www.youtube.com/embed/${match[2]}`
    : null;
};
</script>

<template>
  <div class="lesson-container">
    <div v-if="lesson">
      <h1 class="lesson-title">{{ lesson.title }}</h1>
      <p class="course-breadcrumb">Course: {{ course.title }}</p>

      <div class="video-wrapper" v-if="getEmbedUrl(lesson.videoUrl)">
        <iframe
          :src="getEmbedUrl(lesson.videoUrl)"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      
      <div class="no-video" v-else>
        <p>No video available for this lesson.</p>
      </div>

      <div class="lesson-content">
        <h3>Description</h3>
        <p>{{ lesson.content }}</p>
      </div>
    </div>

    <div v-else class="error-state">
      <h2>Lesson not found</h2>
      <p>Please return to the course list.</p>
    </div>
  </div>
</template>

<style scoped>
.lesson-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.lesson-title {
  margin-bottom: 5px;
  font-size: 2rem;
  color: #2c3e50;
}

.course-breadcrumb {
  color: #666;
  margin-bottom: 30px;
  font-size: 0.9rem;
}

/* RESPONSIVE VIDEO CONTAINER */
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
  overflow: hidden;
  border-radius: 12px;
  background: #000;
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
  margin-bottom: 30px;
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.lesson-content {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 8px;
  line-height: 1.6;
}

.no-video {
  background: #eee;
  padding: 40px;
  text-align: center;
  border-radius: 12px;
  margin-bottom: 30px;
  color: #666;
}
</style>