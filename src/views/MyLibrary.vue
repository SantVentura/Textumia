<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { Book, NewBookPayload } from '../types'
import { addBook, getMyBooks } from '../services/books.service'
import { uploadBookPdf } from '../services/upload.service'
import { useAuth } from '../composables/useAuth'

import BookCard from '../components/BookCard.vue'
import BookForm from '../components/BookForm.vue'

const { user } = useAuth()
const books = ref<Book[]>([])
const resetKey = ref(0)

/* LOAD BOOKS */
async function loadBooks() {
  if (!user.value) {
    books.value = []
    return
  }
  books.value = await getMyBooks(user.value.uid)
}

/* ADD BOOK */
async function addBookHandler(book: NewBookPayload) {
  if (!user.value) return

  const pdfUrl = await uploadBookPdf(
    book.pdfFile,
    user.value.uid
  )

  await addBook({
    title: book.title,
    author: book.author,
    pdfUrl,
    coverUrl: null,
    userId: user.value.uid,
    status: 'pending'
  })

  resetKey.value++        // 🔄 reset form
  await loadBooks()
}

onMounted(loadBooks)
watch(user, loadBooks)
</script>

<template>
  <section class="page">
    <header class="page-header">
      <h2>Mis Libros</h2>
    </header>

    <div v-if="!user" class="empty">
      Inicia sesión para subir libros
    </div>

    <div v-else>
      <BookForm
        :reset-key="resetKey"
        @add-book="addBookHandler"
      />

      <p v-if="books.length === 0" class="empty">
        Aún no has agregado libros
      </p>

      <div class="grid">
        <BookCard
          v-for="book in books"
          :key="book.id"
          :book="book"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.page {
  padding: 1rem;
}

.page-header h2 {
  font-size: 18px;
  font-weight: 600;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 2fr));
  gap: 1.2rem;
  margin-top: 1rem;
}

.empty {
  margin-top: 1.5rem;
  font-size: 14px;
  opacity: 0.7;
}
</style>
0