<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import type { Book } from '../types'

const route = useRoute()
const router = useRouter()

const book = ref<Book | null>(null)
const loading = ref(true)

// HEADER AUTO HIDE
const showHeader = ref(true)
let timer: number

const onMove = () => {
  showHeader.value = true
  clearTimeout(timer)
  timer = window.setTimeout(() => {
    showHeader.value = false
  }, 2200)
}

// FULLSCREEN
const toggleFullscreen = () => {
  const el = document.documentElement
  if (!document.fullscreenElement) {
    el.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

// RECORDAR “PÁGINA”
const page = ref(1)

const savePage = () => {
  if (book.value) {
    localStorage.setItem(`reader-page-${book.value.id}`, String(page.value))
  }
}

onMounted(async () => {
  const id = route.params.id as string
  const refDoc = doc(db, 'books', id)
  const snap = await getDoc(refDoc)

  if (!snap.exists()) {
    router.push('/')
    return
  }

  book.value = {
    id: snap.id,
    ...(snap.data() as Omit<Book, 'id'>)
  }

  const saved = localStorage.getItem(`reader-page-${id}`)
  if (saved) page.value = Number(saved)

  loading.value = false
})

onBeforeUnmount(savePage)
</script>

<template>
  <div
    class="reader"
    @mousemove="onMove"
    @dblclick="toggleFullscreen"
  >

    <!-- HEADER -->
    <transition name="slide">
      <header v-show="showHeader" class="reader-header">
        <button class="back" @click="$router.back()">⬅</button>

        <div class="meta">
          <h2>{{ book?.title }}</h2>
          <p>{{ book?.author }}</p>
        </div>
      </header>
    </transition>

    <!-- LOADING -->
    <p v-if="loading" class="loading">
      📖 Cargando libro...
    </p>

    <!-- PDF -->
    <iframe
      v-if="book?.pdfUrl && !loading"
      :src="`${book.pdfUrl}#page=${page}&toolbar=0&navpanes=0&scrollbar=0`"
      class="pdf"
    />

  </div>
</template>

<style scoped>
.reader {
  height: 100vh;
  width: 98.7vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  color: var(--text);
}

/* HEADER */
.reader-header {
  height: 56px;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
}

.back {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: inherit;
}

/* META */
.meta {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.meta h2 {
  font-size: 15px;
  font-weight: 600;
  margin: 0;
}

.meta p {
  font-size: 12px;
  opacity: 0.65;
  margin: 0;
}

/* LOADING */
.loading {
  text-align: center;
  margin-top: 2rem;
  opacity: 0.8;
}

/* PDF */
.pdf {
  flex: 1;
  width: 100%;
  border: none;
  background: transparent;
  animation: fadeIn 0.4s ease;
}

/* SCROLLBAR GLOBAL (NEGRA Y DELGADA) */
:deep(::-webkit-scrollbar) {
  width: 8px;
}

:deep(::-webkit-scrollbar-track) {
  background: transparent;
}

:deep(::-webkit-scrollbar-thumb) {
  background: #000;
  border-radius: 10px;
}

/* ANIMATIONS */
@keyframes fadeIn {
  from { opacity: 0 }
  to { opacity: 1 }
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
