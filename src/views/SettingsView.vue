<template>
  <div class="settings-view">
    <div class="settings-container">
      <h1>Settings</h1>
      
      <section class="settings-section">
        <h2>App Preferences</h2>
        
        <div class="setting-item">
          <div class="setting-info">
            <h3>Dark Mode</h3>
            <p>Switch between light and dark themes</p>
          </div>
          <label class="switch">
            <input type="checkbox" v-model="isDark" @change="toggleTheme">
            <span class="slider round"></span>
          </label>
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <h3>Language</h3>
            <p>Select your preferred language</p>
          </div>
          <select class="setting-select">
            <option>English</option>
            <option>Vietnamese</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
      </section>

      <section class="settings-section">
        <h2>Notifications</h2>
        
        <div class="setting-item">
          <div class="setting-info">
            <h3>Email Alerts</h3>
            <p>Receive updates about course progress</p>
          </div>
          <label class="switch">
            <input type="checkbox" checked>
            <span class="slider round"></span>
          </label>
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <h3>New Course Recommendations</h3>
            <p>Get notified when new languages are added</p>
          </div>
          <label class="switch">
            <input type="checkbox" checked>
            <span class="slider round"></span>
          </label>
        </div>
      </section>

      <div class="actions">
        <button class="btn-save">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isDark = ref(false);

const toggleTheme = () => {
  const theme = isDark.value ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('user-theme', theme);
};

onMounted(() => {
  const savedTheme = localStorage.getItem('user-theme');
  if (savedTheme === 'dark') {
    isDark.value = true;
  }
});
</script>

<style scoped>
.settings-view {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

.settings-container {
  width: 100%;
  max-width: 600px;
}

h1 {
  margin-bottom: 30px;
  color: var(--text-main);
}

.settings-section {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
}

.settings-section h2 {
  font-size: 1.2rem;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 10px;
  color: var(--text-main);
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.setting-info h3 {
  font-size: 1rem;
  margin: 0 0 5px 0;
  color: var(--text-main);
}

.setting-info p {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.setting-select {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  background: var(--bg-body);
  color: var(--text-main);
}

/* Switch Toggle Styles */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background-color: var(--primary-color);
}

input:checked + .slider:before {
  transform: translateX(24px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.btn-save {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
}
</style>