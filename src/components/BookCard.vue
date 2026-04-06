<script setup lang="ts">
import type { Book } from '../types';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../services/firebase';

const props = defineProps<{
  book: Book;
  readonly?: boolean;
}>();

const increaseViews = async () => {
  if (!props.book.id) return;

  const ref = doc(db, 'books', props.book.id);
  await updateDoc(ref, {
    views: increment(1),
  });

  // UX instantáneo (opcional pero recomendado)
  props.book.views = (props.book.views ?? 0) + 1;
};
</script>

<template>
  <div class="card">

    <!-- PORTADA -->
    <div class="cover">
      <img src="../assets/img/textumia.jpg" alt="Portada del libro" />
    </div>

    <!-- ESTADO (solo en Mis Libros) -->
    <span v-if="!readonly" class="status" :class="book.status">
      {{ book.status }}
    </span>

    <!-- INFO -->
    <h3>{{ book.title }}</h3>
    <p class="author">{{ book.author }}</p>

    <!-- GENRE (opcional, puedes ocultarlo luego) -->
    <p v-if="book.genre" class="genre">📚 {{ book.genre }}</p>

    <!-- VIEWS -->
    <p class="views">
      👁️ {{ book.views ?? 0 }} lecturas
    </p>

    <RouterLink v-if="book.status === 'approved' || !readonly" :to="`/read/${book.id}`" class="pdf"
      @click="readonly && increaseViews()">
      📖 Leer libro
      
    </RouterLink>
<p v-else-if="!readonly" class="pending-msg">
      ⏳ En revisión por el administrador
    </p>
    <!-- MENSAJE SI NO ESTÁ APROBADO -->
    

  </div>
</template>

<style scoped>
.views {
  font-size: 13px;
  color: #777;
  margin: 4px 0;
}

.card {
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background: white;
}

.cover {
  width: 100%;
  height: 200px;
  background: #f3f3f3;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7;
}

.status {
  display: inline-block;
  font-size: 12px;
  padding: 3px 6px;
  border-radius: 4px;
  margin-bottom: 6px;
}

.pending {
  background: #ffeeba;
}

.approved {
  background: #c3e6cb;
}

.author {
  color: #555;
}

.genre {
  font-size: 14px;
  margin-bottom: 6px;
}

.pdf {
  display: inline-block;
  margin-top: 8px;
  color: #2ecc71;
  font-weight: bold;
  text-decoration: none;
}

.pending-msg {
  font-size: 13px;
  color: #888;
}
</style>
