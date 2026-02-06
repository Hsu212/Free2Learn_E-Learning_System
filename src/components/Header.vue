<template>
  <header class="main-header">
    <div class="container">
      <div class="logo" @click="goHome">
        <a class="logo-link">F2L<span class="logo-icon">🌿</span></a>
      </div>

      <div class="search-container">
        <input 
          type="text" 
          v-model="searchQuery" 
          @keydown.enter="handleSearch" 
          placeholder="Search courses..." 
          class="search-input"
        />
        <span class="search-icon" @click="handleSearch">🔍</span>
      </div>
      
      <nav class="nav-links">
        <button 
          @click="toggleTheme" 
          class="icon-btn theme-btn" 
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          {{ isDark ? '☀' : '🌙' }}
        </button>

        <div class="auth-buttons" v-if="!isAuthenticated">
          <button @click="goToAuth('login')" class="btn-text">Sign In</button>
          <button @click="goToAuth('signup')" class="btn-primary">Sign Up</button>
        </div>
        
        <div class="user-menu" v-else>
          <button @click="goToProfile" class="profile-btn">
            <span class="user-name">{{ user?.name || 'Student' }}</span>
            <div class="avatar-circle">
              {{ (user?.name || 'S')[0].toUpperCase() }}
            </div>
          </button>
        </div>

        <button class="icon-btn menu-btn" @click="showSidebar = true">
          ☰
        </button>
      </nav>
    </div>

    <Transition name="slide">
      <div v-if="showSidebar" class="sidebar-overlay" @click="showSidebar = false">
        <div class="sidebar-content" @click.stop>
          <div class="sidebar-header">
            <h3>Menu</h3>
            <button class="close-btn" @click="showSidebar = false">×</button>
          </div>
          
          <ul class="sidebar-links">
            <li>
              <router-link to="/" @click="showSidebar = false">
                🏠 Home
              </router-link>
            </li>
            
            <li v-if="isAuthenticated">
              <router-link to="/profile" @click="showSidebar = false">
                👤 Profile
              </router-link>
            </li>

            <li v-if="isAuthenticated">
              <router-link to="/my-courses" @click="showSidebar = false">
                📚 My Courses
              </router-link>
            </li>
            
            <li>
              <router-link to="/settings" @click="showSidebar = false">
                ⚙️ Settings
              </router-link>
            </li>
            
            <li>
              <router-link to="/help" @click="showSidebar = false">
                ❓ Help Center
              </router-link>
            </li>

            <li v-if="isAuthenticated" class="sidebar-logout">
               <a href="#" @click.prevent="handleLogout">🚪 Log Out</a>
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const route = useRoute();
const { isAuthenticated, user, logout } = useAuth();

const isDark = ref(false);
const searchQuery = ref('');
const showSidebar = ref(false);

// Sync input with URL query params (so refreshing doesn't lose the search)
watch(() => route.query.search, (newVal) => {
  searchQuery.value = newVal || '';
}, { immediate: true });

// FIXED: Search Handler
const handleSearch = async () => {
  // 1. Prepare the query object
  const query = { ...route.query };
  
  if (searchQuery.value) {
    query.search = searchQuery.value;
  } else {
    delete query.search; // Remove param if empty
  }

  // 2. Navigate or Replace URL
  if (route.name !== 'home') {
    await router.push({ name: 'home', query: { search: searchQuery.value } });
  } else {
    await router.replace({ query });
  }

  // 3. SCROLL to the results (This is why it felt like it wasn't working!)
  setTimeout(() => {
    const coursesSection = document.getElementById('courses');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
};

const goHome = () => {
  if (route.name === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (route.hash || route.query.search) {
      // Clear search and hash when clicking logo
      router.replace({ name: 'home' });
    }
  } else {
    router.push({ name: 'home' });
  }
};

const goToAuth = (mode) => {
  router.push({ name: 'auth', query: { mode: mode } });
};

const goToProfile = () => {
  router.push({ name: 'profile' });
};

const handleLogout = () => {
  logout();
  showSidebar.value = false;
  router.push({ name: 'home' });
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  const theme = isDark.value ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('user-theme', theme);
};

onMounted(() => {
  const savedTheme = localStorage.getItem('user-theme');
  if (savedTheme === 'dark') {
    isDark.value = true;
    document.documentElement.setAttribute('data-theme', 'dark');
  }
});
</script>

<style scoped>
/* --- HEADER LAYOUT --- */
.main-header {
  background-color: var(--bg-card);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background-color 0.3s ease;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 20px;
  gap: 20px;
}

.logo {
  cursor: pointer;
}

.logo-link {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary-color);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

/* --- SEARCH BAR --- */
.search-container {
  flex-grow: 1;
  max-width: 400px;
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 10px 15px 10px 40px;
  border-radius: 99px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-body);
  color: var(--text-main);
  outline: none;
  transition: all 0.2s;
  font-size: 0.95rem;
}

.search-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);
  background-color: var(--bg-card);
}

.search-icon {
  position: absolute;
  left: 15px;
  color: var(--text-muted);
  font-size: 0.9rem;
  /* UPDATED: Made icon clickable */
  cursor: pointer; 
  pointer-events: auto;
  transition: color 0.2s;
}

.search-icon:hover {
  color: var(--primary-color);
}

/* --- NAV LINKS & BUTTONS --- */
.nav-links {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-shrink: 0;
}

.icon-btn {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-main);
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.2s;
  cursor: pointer;
}

.icon-btn:hover {
  background-color: var(--bg-secondary);
  color: var(--primary-color);
}

.menu-btn {
  font-size: 1.4rem;
  padding: 6px 10px;
}

.auth-buttons {
  display: flex;
  gap: 12px;
}

.btn-text {
  background: transparent;
  color: var(--text-main);
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 6px;
  transition: color 0.2s;
}

.btn-text:hover {
  color: var(--primary-color);
  background-color: var(--bg-body);
}

.btn-primary {
  background-color: var(--primary-color);
  color: #fff;
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: 600;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.btn-primary:hover {
  background-color: var(--primary-hover);
}

/* --- PROFILE BUTTON --- */
.profile-btn {
  background: transparent;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 8px;
  border-radius: 99px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.profile-btn:hover {
  background-color: var(--bg-body);
  border-color: var(--border-color);
}

.user-name {
  color: var(--text-main);
  font-weight: 600;
  font-size: 0.9rem;
}

.avatar-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1rem;
}

/* --- SIDEBAR STYLES --- */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.5);
  backdrop-filter: blur(2px);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
}

.sidebar-content {
  width: 300px;
  height: 100%;
  background-color: var(--bg-card);
  box-shadow: -5px 0 15px rgba(0,0,0,0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 15px;
}

.sidebar-header h3 {
  margin: 0;
  color: var(--text-main);
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--text-muted);
  cursor: pointer;
  line-height: 1;
}

.close-btn:hover {
  color: var(--primary-color);
}

.sidebar-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-links li {
  margin-bottom: 10px;
}

.sidebar-links a {
  display: block;
  padding: 12px 15px;
  color: var(--text-main);
  text-decoration: none;
  font-weight: 500;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.sidebar-links a:hover {
  background-color: var(--bg-body);
  color: var(--primary-color);
}

.sidebar-links a.router-link-active {
  background-color: var(--bg-secondary);
  color: var(--primary-color);
}

.sidebar-logout {
  margin-top: 20px;
  border-top: 1px solid var(--border-color);
  padding-top: 20px;
}

.sidebar-logout a {
  color: #ef4444; /* Red color */
}

.sidebar-logout a:hover {
  background-color: #fee2e2;
  color: #ef4444;
}

/* --- TRANSITIONS --- */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-active .sidebar-content {
  animation: slideIn 0.3s ease-out forwards;
}

.slide-leave-active .sidebar-content {
  animation: slideOut 0.3s ease-in forwards;
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

@keyframes slideOut {
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .search-container {
    display: none;
  }
  .user-name {
    display: none; 
  }
}
</style>
