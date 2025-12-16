// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CourseDetail from '@/views/CourseDetail.vue';
import LessonView from '@/views/LessonView.vue'; // <-- NEW IMPORT
import AuthPage from '@/views/AuthPage.vue';
import ProfileView from '@/views/ProfileView.vue';
import MyCoursesView from '@/views/MyCoursesView.vue';
import SettingsView from '@/views/SettingsView.vue'; 
import HelpCenterView from '@/views/HelpCenterView.vue'; 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthPage,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/my-courses',
      name: 'my-courses',
      component: MyCoursesView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
    },
    {
      path: '/help',
      name: 'help',
      component: HelpCenterView,
    },
    {
      path: '/course/:id',
      name: 'course',
      component: CourseDetail,
      props: true,
    },
    // --- NEW ROUTE FOR LESSON VIDEO PLAYER ---
    {
      path: '/course/:courseId/lesson/:lessonId',
      name: 'lesson',
      component: LessonView,
      props: true,
    },
    // -----------------------------------------
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'home' }
    }
  ],
});

export default router;
