<template>
  <div class="help-view">
    <div class="help-header">
      <h1>How can we help you?</h1>
      <div class="search-box">
        <input type="text" placeholder="Search for help..." />
      </div>
    </div>

    <div class="faq-container">
      <h2>Frequently Asked Questions</h2>
      
      <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
        <button class="faq-question" @click="toggleFaq(index)">
          {{ faq.question }}
          <span class="icon">{{ faq.open ? '−' : '+' }}</span>
        </button>
        <div class="faq-answer" v-show="faq.open">
          <p>{{ faq.answer }}</p>
        </div>
      </div>
    </div>

    <div class="contact-support">
      <h3>Still need help?</h3>
      <button class="contact-btn">Contact Support</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const faqs = ref([
  {
    question: "How do I reset my password?",
    answer: "Go to Profile > Account Settings and enter a new password in the password field.",
    open: false
  },
  {
    question: "Are the courses free?",
    answer: "Yes! All language courses on this platform are currently free for university students.",
    open: false
  },
  {
    question: "How do I save a course?",
    answer: "Click the heart icon (♡) on any course card to add it to your 'My Courses' list.",
    open: false
  },
  {
    question: "Can I download videos?",
    answer: "Currently, videos can only be streamed online. We are working on an offline mode.",
    open: false
  }
]);

const toggleFaq = (index) => {
  faqs.value[index].open = !faqs.value[index].open;
};
</script>

<style scoped>
.help-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.help-header {
  text-align: center;
  margin-bottom: 50px;
}

.help-header h1 {
  color: var(--text-main);
  margin-bottom: 20px;
}

.search-box input {
  width: 100%;
  max-width: 500px;
  padding: 15px;
  border-radius: 30px;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  color: var(--text-main);
  outline: none;
  font-size: 1rem;
  box-shadow: var(--shadow-sm);
}

.faq-container h2 {
  color: var(--text-main);
  margin-bottom: 20px;
}

.faq-item {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  margin-bottom: 15px;
  overflow: hidden;
}

.faq-question {
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  border: none;
  color: var(--text-main);
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  text-align: left;
}

.faq-answer {
  padding: 0 20px 20px;
  color: var(--text-muted);
  line-height: 1.6;
  border-top: 1px solid var(--border-color);
}

.contact-support {
  text-align: center;
  margin-top: 50px;
  padding: 30px;
  background: var(--bg-card);
  border-radius: 12px;
}

.contact-btn {
  background-color: var(--primary-color);
  color: white;
  padding: 12px 30px;
  border-radius: 8px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
}
</style>