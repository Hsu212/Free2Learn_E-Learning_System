<template>
  <div class="auth-page-container">
    <AuthForm :isLogin="isLoginMode" @authenticate="handleAuthentication" />
    
    <p class="toggle-text">
      {{ isLoginMode ? "Don't have an account?" : "Already have an account?" }}
      <a href="#" @click.prevent="isLoginMode = !isLoginMode">
        {{ isLoginMode ? 'Sign Up' : 'Log In' }}
      </a>
    </p>
    
    <div v-if="message" :class="['auth-message', messageType]">
        {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import AuthForm from '@/components/AuthForm.vue';
import { useAuth } from '@/composables/useAuth'; // <-- Import Auth

const router = useRouter();
const route = useRoute();
const { login } = useAuth(); // <-- Get login function

const isLoginMode = ref(true); 
const message = ref('');
const messageType = ref('');

onMounted(() => {
  if (route.query.mode === 'signup') {
    isLoginMode.value = false;
  } else {
    isLoginMode.value = true;
  }
});

const handleAuthentication = (userData, type) => {
  // Simulate successful login/signup for both cases
  // In a real app, you would validate with a backend here first
  
  const successMsg = type === 'login' ? 'Login successful!' : 'Account created!';
  message.value = `${successMsg} Redirecting...`;
  messageType.value = 'success';
  
  // Update Global State
  login({ 
    name: userData.name || 'Student', // Use provided name or default
    email: userData.email 
  });
  
  setTimeout(() => {
    router.push({ name: 'home' }); 
  }, 1000);
};
</script>

<style scoped>
.auth-page-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: var(--bg-body);
  padding: 20px;
}

.toggle-text {
  margin-top: 20px;
  font-size: 0.95em;
  color: var(--text-muted);
}

.toggle-text a {
  color: var(--primary-color);
  font-weight: bold;
}

.auth-message {
    padding: 10px 20px;
    border-radius: 4px;
    margin-top: 15px;
    font-weight: 600;
}

.auth-message.success {
    background-color: var(--bg-secondary);
    color: var(--primary-color);
    border: 1px solid var(--border-color);
}
</style>