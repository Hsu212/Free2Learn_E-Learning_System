<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-content">
      <button class="close-btn" @click="$emit('close')">×</button>
      <AuthForm 
        :isLogin="isLoginMode" 
        @authenticate="handleAuth" 
      />
      <div class="toggle-container">
        <p>
          {{ isLoginMode ? "Don't have an account?" : "Already have an account?" }}
          <a href="#" @click.prevent="isLoginMode = !isLoginMode">
            {{ isLoginMode ? 'Sign Up' : 'Log In' }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue';
import AuthForm from '@/components/AuthForm.vue';

const props = defineProps({
  initialMode: {
    type: String,
    default: 'login' // 'login' or 'signup'
  }
});

const emit = defineEmits(['close']);
const isLoginMode = ref(true);

onMounted(() => {
  isLoginMode.value = props.initialMode === 'login';
});

const handleAuth = (data, type) => {
  console.log('Auth Data:', data, type);
  // Here you would handle the actual login logic
  // For now, we just close the modal to simulate success
  emit('close');
  alert(`Successfully ${type === 'login' ? 'Logged In' : 'Signed Up'}!`);
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--bg-card);
  padding: 20px;
  border-radius: 16px;
  width: 90%;
  max-width: 450px;
  position: relative;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  animation: slideIn 0.3s ease;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 1.5rem;
  background: none;
  color: var(--text-muted);
  line-height: 1;
}

.close-btn:hover {
  color: var(--primary-color);
}

.toggle-container {
  text-align: center;
  margin-top: 15px;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.toggle-container a {
  font-weight: 600;
  margin-left: 5px;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>