<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getPublicBooks } from '../services/books.service'
import type { Book } from '../types'
import BookCard from '../components/BookCard.vue'

const books = ref<Book[]>([])
const search = ref('')

const filteredBooks = computed(() => {
  const text = search.value.toLowerCase()

  return books.value.filter(book => {
    const title = book.title?.toLowerCase() ?? ''
    const author = book.author?.toLowerCase() ?? ''

    return title.includes(text) || author.includes(text)
  })
})

onMounted(async () => {
  books.value = await getPublicBooks()
})
</script>

<template>
  <section class="page">
    <header class="page-header">
      <h2>Galería Pública</h2>

      <input
        v-model="search"
        placeholder="Buscar por título o autor"
        class="search"
      />
    </header>

    <p v-if="filteredBooks.length === 0" class="empty">
      No se encontraron libros
    </p>

    <div class="grid">
      <BookCard
        v-for="book in filteredBooks"
        :key="book.id"
        :book="book"
        readonly
      />
    </div>
  </section>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.page-header {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}

.search {
  width: 100%;
  max-width: 380px;
  padding: 10px 14px;
  border-radius: 20px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
}


.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 2fr));
  gap: 1.2rem;
  margin-top: 1rem;
}


.empty {
  opacity: 0.6;
  text-align: center;
}
</style>
