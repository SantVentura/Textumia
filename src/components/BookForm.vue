<script setup lang="ts">
import { ref, watch } from 'vue'
import type { NewBookPayload } from '../types'

/* EVENTS */
const emit = defineEmits<{
  (e: 'add-book', book: NewBookPayload): void
}>()

/* PROPS */
const props = defineProps<{
  resetKey: number
}>()

/* STATE */
const title = ref('')
const author = ref('')
const pdfFile = ref<File | null>(null)
const loading = ref(false)

/* SUBMIT */
function submit() {
  if (loading.value) return
  if (!title.value || !author.value || !pdfFile.value) return

  loading.value = true

  emit('add-book', {
    title: title.value,
    author: author.value,
    pdfFile: pdfFile.value
  })
}

/* FILE */
function onFile(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (files?.[0]) {
    pdfFile.value = files[0]
  }
}

/* 🔄 RESET CONTROLADO DESDE EL PADRE */
watch(
  () => props.resetKey,
  () => {
    title.value = ''
    author.value = ''
    pdfFile.value = null
    loading.value = false
  }
)
</script>

<template>
  <form @submit.prevent="submit" class="form">
    <input
      v-model="title"
      placeholder="Título"
      :disabled="loading"
    />

    <input
      v-model="author"
      placeholder="Autor"
      :disabled="loading"
    />

    <label class="file">
      <input
        type="file"
        accept="application/pdf"
        @change="onFile"
        :disabled="loading"
      />
      <span>
        {{ pdfFile ? pdfFile.name : 'Seleccionar PDF' }}
      </span>
    </label>

    <button type="submit" :disabled="loading">
      {{ loading ? 'Subiendo…' : 'Subir libro' }}
    </button>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.2rem;
}

/* INPUTS */
input {
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  font-size: 14px;
  outline: none;
  min-width: 160px;
}

input::placeholder {
  opacity: 0.5;
}

/* FILE */
.file {
  position: relative;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px dashed var(--border);
  font-size: 13px;
  cursor: pointer;
  background: var(--bg);
  color: var(--text);
}

.file input {
  
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.file span {
  pointer-events: none;
  opacity: 0.7;
}

/* BUTTON */
button {
  margin-left: 65px;
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  background: #000;
  color: #fff;
  font-size: 13px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* DARK */
body.dark button {
  background: #fff;
  color: #000;
}
</style>
