<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './services/firebase'

onAuthStateChanged(auth, user => {
  console.log('Usuario:', user)
})
</script>

<template>
  <!-- HEADER GLOBAL -->
  <header class="app-header">
    
    <RouterLink to="/" class="home-link">
    <h1>Textumia</h1>
   
  </RouterLink>
       <RouterLink to="/" class="home-link">
     <img class="logo" src="/src/assets/T.png" alt="logo" />
  </RouterLink>

  </header>

  <!-- APP -->
  <div class="app">
    <Navbar />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
/* =========================
   🌈 VARIABLES DE TEMA
   ========================= */
:root {
  --bg: #ffffff;
  --text: #111111;
  --border: #e5e5e5;

  --header-bg: #000000;
  --header-text: #ffffff;
}

body.dark {
  --bg: #121212;
  --text: #eaeaea;
  --border: #333;

  --header-bg: #0d0d0d;
  --header-text: #ffffff;
}

/* =========================
   🌍 RESET BÁSICO
   ========================= */
body {
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--bg);
  color: var(--text);
}
.home-link {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: inherit;
}

/* =========================
   🧠 HEADER
   ========================= */
.app-header {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--header-bg);
  border-bottom: 1px solid var(--border);
}

.app-header h1 {
  font-size: 34px;
  margin: 10px;
  color: var(--header-text);
}

.logo {
  display: flex;
  width: 140px;
  height: 110px;
  object-fit: cover;
  margin-right: 10px;
  border-radius:70%;
}

/* =========================
   📦 APP
   ========================= */

.app {
   background: var(--bg);
  color: var(--text);
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: system-ui, sans-serif;
}
main {
  padding: 1rem;
}


/* =========================
   📱 RESPONSIVE
   ========================= */
@media (max-width: 640px) {
  .app-header h1 {
    font-size: 26px;
  }

  .logo {
    width: 90px;
  }

  main {
    padding: 0.75rem;
  }
}
</style>




