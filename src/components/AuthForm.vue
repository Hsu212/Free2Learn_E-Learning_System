<template>
  <form @submit.prevent="handleSubmit" class="auth-form">
    <h3>{{ isLogin ? 'Welcome Back' : 'Create Account' }}</h3>
    <p class="subtitle">{{ isLogin ? 'Enter your details to sign in.' : 'Get started with your free account.' }}</p>
    
    <div class="input-group">
      <label for="email">Email Address</label>
      <input type="email" id="email" v-model="email" placeholder="you@example.com" required>
    </div>

    <div class="input-group" v-if="!isLogin">
      <label for="name">Full Name</label>
      <input type="text" id="name" v-model="name" placeholder="John Doe" required>
    </div>

    <div class="input-group">
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" placeholder="••••••••" required>
    </div>

    <button type="submit" class="submit-btn">
      {{ isLogin ? 'Sign In' : 'Sign Up' }}
    </button>
  </form>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  isLogin: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['authenticate']);

const email = ref('');
const name = ref('');
const password = ref('');

const handleSubmit = () => {
  const userData = {
    email: email.value,
    password: password.value,
  };
  
  if (!props.isLogin) {
    userData.name = name.value;
  }
  
  emit('authenticate', userData, props.isLogin ? 'login' : 'signup');
};
</script>

<style scoped>
.auth-form {
  background: var(--bg-card);
  padding: 40px;
  border-radius: 16px;
  box-shadow: var(--shadow-md);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  border: 1px solid var(--border-color);
}

h3 {
  text-align: center;
  color: var(--text-main);
  margin-bottom: 8px;
  font-size: 1.5rem;
}

.subtitle {
  text-align: center;
  color: var(--text-muted);
  margin-bottom: 24px;
  font-size: 0.95rem;
  margin-top: 0;
}

.input-group {
  margin-bottom: 20px;
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
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
}

.input-group input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.2s;
}

.submit-btn:hover {
  background-color: var(--primary-hover);
}
</style>