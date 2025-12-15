// src/composables/useAuth.js
import { ref } from 'vue';

// Global state
const user = ref(null);
const isAuthenticated = ref(false);

const storedUser = localStorage.getItem('user-data');
if (storedUser) {
  user.value = JSON.parse(storedUser);
  // Ensure savedCourses exists
  if (!user.value.savedCourses) {
    user.value.savedCourses = [];
  }
  isAuthenticated.value = true;
}

export function useAuth() {
  const login = (userData) => {
    const fullUserData = {
        name: userData.name || 'Student',
        email: userData.email,
        notifications: true,
        savedCourses: [], // Initialize empty list
        ...userData
    };
    
    user.value = fullUserData;
    isAuthenticated.value = true;
    localStorage.setItem('user-data', JSON.stringify(fullUserData));
  };

  const logout = () => {
    user.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem('user-data');
  };

  const updateUser = (updates) => {
    if (!user.value) return;
    const updatedUser = { ...user.value, ...updates };
    user.value = updatedUser;
    localStorage.setItem('user-data', JSON.stringify(updatedUser));
  };

  // NEW: Toggle Saved Status
  const toggleSavedCourse = (courseId) => {
    if (!user.value) return;

    const saved = user.value.savedCourses || [];
    const index = saved.indexOf(courseId);

    if (index === -1) {
      // Add
      saved.push(courseId);
    } else {
      // Remove
      saved.splice(index, 1);
    }

    // Update state and storage
    updateUser({ savedCourses: saved });
  };

  // Helper to check if saved
  const isCourseSaved = (courseId) => {
    return user.value?.savedCourses?.includes(courseId) || false;
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
    updateUser,
    toggleSavedCourse,
    isCourseSaved
  };
}