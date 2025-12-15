<template>
  <div class="profile-page">
    <div class="profile-card">
      
      <div v-if="activeView === 'overview'" class="view-section">
        <div class="profile-header">
          <div class="avatar-large">
            {{ (user?.name || 'S')[0].toUpperCase() }}
          </div>
          <h2>{{ user?.name || 'Student' }}</h2>
          <p class="email">{{ user?.email || 'student@example.com' }}</p>
        </div>

        <div class="profile-actions">
          <button class="action-btn" @click="activeView = 'edit'">Edit Profile</button>
          <button class="action-btn" @click="activeView = 'settings'">Account Settings</button>
          <hr class="divider">
          <button class="logout-btn" @click="handleLogout">Log Out</button>
        </div>
      </div>

      <form v-if="activeView === 'edit'" @submit.prevent="saveProfile" class="view-section">
        <h3>Edit Profile</h3>
        
        <div class="input-group">
          <label>Full Name</label>
          <input type="text" v-model="editForm.name" required />
        </div>

        <div class="input-group">
          <label>Email Address</label>
          <input type="email" v-model="editForm.email" required />
        </div>

        <div class="form-actions">
          <button type="button" class="btn-cancel" @click="cancelEdit">Cancel</button>
          <button type="submit" class="btn-save">Save Changes</button>
        </div>
      </form>

      <form v-if="activeView === 'settings'" @submit.prevent="saveSettings" class="view-section">
        <h3>Account Settings</h3>

        <div class="setting-group">
          <label class="toggle-label">
            <span>Email Notifications</span>
            <input type="checkbox" v-model="settingsForm.notifications" />
          </label>
        </div>

        <hr class="divider-small">
        
        <h4>Change Password</h4>
        <div class="input-group">
          <label>Current Password</label>
          <input type="password" placeholder="••••••••" />
        </div>
        <div class="input-group">
          <label>New Password</label>
          <input type="password" v-model="settingsForm.newPassword" placeholder="••••••••" />
        </div>

        <div class="form-actions">
          <button type="button" class="btn-cancel" @click="cancelEdit">Back</button>
          <button type="submit" class="btn-save">Update Settings</button>
        </div>
      </form>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { user, logout, updateUser } = useAuth();

// State to control which view is shown: 'overview', 'edit', 'settings'
const activeView = ref('overview');

// Temporary state for forms
const editForm = ref({ name: '', email: '' });
const settingsForm = ref({ notifications: true, newPassword: '' });

// Initialize form data when view changes
onMounted(() => {
  if (user.value) {
    editForm.value = { 
      name: user.value.name, 
      email: user.value.email 
    };
    settingsForm.value.notifications = user.value.notifications !== false;
  }
});

const saveProfile = () => {
  updateUser({ 
    name: editForm.value.name, 
    email: editForm.value.email 
  });
  activeView.value = 'overview';
  alert('Profile updated successfully!');
};

const saveSettings = () => {
  // Simulate password change logic
  updateUser({ notifications: settingsForm.value.notifications });
  
  if (settingsForm.value.newPassword) {
    alert('Settings and Password updated!');
  } else {
    alert('Settings updated!');
  }
  settingsForm.value.newPassword = ''; // Clear password field
  activeView.value = 'overview';
};

const cancelEdit = () => {
  // Reset form data to current user state
  if (user.value) {
    editForm.value = { name: user.value.name, email: user.value.email };
  }
  activeView.value = 'overview';
};

const handleLogout = () => {
  logout();
  router.push({ name: 'home' });
};
</script>

<style scoped>
.profile-page {
  display: flex;
  justify-content: center;
  padding: 60px 20px;
  background-color: var(--bg-body);
  min-height: 80vh;
}

.profile-card {
  background: var(--bg-card);
  padding: 40px;
  border-radius: 16px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  width: 100%;
  max-width: 450px;
  height: fit-content;
  /* Add smooth height transition if desired */
}

/* --- Overview Styles --- */
.profile-header {
  margin-bottom: 30px;
  text-align: center;
}

.avatar-large {
  width: 100px;
  height: 100px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 50%;
  font-size: 2.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
}

h2 {
  color: var(--text-main);
  margin-bottom: 5px;
}

.email {
  color: var(--text-muted);
  margin: 0;
}

.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* --- Form Styles --- */
h3, h4 {
  margin-top: 0;
  color: var(--text-main);
  text-align: center;
  margin-bottom: 20px;
}

h4 {
  font-size: 1rem;
  text-align: left;
  margin-bottom: 10px;
  color: var(--text-muted);
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-main);
}

.input-group input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-body);
  color: var(--text-main);
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
}

.input-group input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.2);
}

/* --- Settings Specific --- */
.setting-group {
  margin-bottom: 20px;
  text-align: left;
}

.toggle-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: var(--text-main);
  font-weight: 500;
}

.divider-small {
  border: 0;
  border-top: 1px solid var(--border-color);
  margin: 20px 0;
}

/* --- Buttons --- */
.action-btn {
  background-color: var(--bg-body);
  color: var(--text-main);
  border: 1px solid var(--border-color);
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s;
  cursor: pointer;
  width: 100%;
}

.action-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 25px;
}

.btn-save {
  flex: 1;
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.btn-save:hover {
  background-color: var(--primary-hover);
}

.btn-cancel {
  flex: 1;
  background-color: transparent;
  color: var(--text-muted);
  border: 1px solid var(--border-color);
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.btn-cancel:hover {
  background-color: var(--bg-body);
  color: var(--text-main);
}

.divider {
  border: 0;
  border-top: 1px solid var(--border-color);
  width: 100%;
  margin: 10px 0;
}

.logout-btn {
  background-color: #fee2e2;
  color: #ef4444;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.2s;
  cursor: pointer;
  width: 100%;
}

.logout-btn:hover {
  background-color: #fecaca;
}

[data-theme="dark"] .logout-btn {
  background-color: #7f1d1d;
  color: #fca5a5;
}

[data-theme="dark"] .logout-btn:hover {
  background-color: #991b1b;
}
</style>