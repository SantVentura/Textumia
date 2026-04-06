<script setup lang="ts">
import { useRouter } from 'vue-router'


const router = useRouter()

function goPublic() {
  router.push('/public')
}



</script>

<template>
  <section class="home">
    <div class="content">
      <h1>Lee y comparte libros digitales</h1>

      <p>
        Textumia es una biblioteca moderna para publicar y leer libros en PDF
        sin distracciones, enfocada en la experiencia de lectura.
      </p>

      <div class="actions">
        <button class="primary" @click="goPublic">
          Explorar  biblioteca
        </button>

        
      </div>
    </div>
  </section>
</template>

<style scoped>
.home {

  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  color: var(--text);
}

.content {
  max-width: 720px;
  text-align: center;
  padding: 2rem;
}

h1 {
  font-size: 42px;
  font-weight: 700;
 
}

p {
  font-size: 18px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

button {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  border: none;
}

.primary {
  background: #000;
  color: #fff;
}



.primary:hover {
  opacity: 0.85;
}


/* Responsive */
@media (max-width: 640px) {
  h1 {
    font-size: 32px;
  }

  p {
    font-size: 16px;
  }
}
</style>
