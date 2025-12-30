 ##F2L 🌿 (Free2Learn) - Language Learning Platform
F2L is a modern, immersive language learning web application designed for everyone. The platform offers a curated catalog of over 19 languages, featuring expert-led video lessons, progress tracking, and a personalized user experience.

✨ Key Features
Glassmorphism UI: A sleek, modern navigation bar using backdrop-blur effects for a premium feel.

Course Recommendations: A dedicated section that highlights "Staff Picks" and popular languages to help students start their journey.

Immersive Lesson Player: Integrated YouTube video player with lesson descriptions and a "Mark as Complete" system to track progress.

Dual Theme Support: Fully responsive light and dark modes with persistent storage for user preferences.

Personal Dashboard: Authenticated users can save courses to their "My Courses" list and manage their profile details.

Search & Discovery: Real-time catalog filtering to find specific languages instantly.

🛠️ Tech Stack
Framework: Vue.js 3 (Composition API with <script setup>).

Routing: Vue Router for multi-page navigation and dynamic course routing.

Styling: Modern CSS3 using CSS Variables for theming and Glassmorphism.

State Management: Custom Composables (useAuth) for global authentication and data persistence via localStorage.

📂 Project Structure
Plaintext

src/
├── assets/          # Global styles (main.css)
├── components/      # Reusable UI (CourseCard, Header, AuthForm, etc.)
├── composables/     # Logic (useAuth for user state)
├── data/            # Course content and lesson data (courses.js)
├── router/          # Route definitions (index.js)
└── views/           # Page views (Home, CourseDetail, Profile, etc.)
🚀 Getting Started
Prerequisites
Node.js (Latest LTS)

npm or yarn

Installation
Clone the repository:

Bash

git clone https://github.com/Hsu212/f2l-language-platform.git
cd f2l-language-platform
Install dependencies:

Bash

npm install
Run in Development Mode:

Bash

npm run dev
Build for Production:

Bash

npm run build
