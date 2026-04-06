<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { Book } from '../types';
import {
  getPendingBooks,
  approveBook,
  rejectBook
} from '../services/admin.service';
import { useAuth } from '../composables/useAuth';

const { isAdmin, loadingAuth } = useAuth();

const books = ref<Book[]>([]);
const loadingBooks = ref(false);
const error = ref('');

async function load() {
  if (!isAdmin.value) return;

  try {
    loadingBooks.value = true;
    books.value = await getPendingBooks();
  } catch (e) {
    error.value = 'Error cargando libros pendientes';
  } finally {
    loadingBooks.value = false;
  }
}

const processingId = ref<string | null>(null);

async function approve(id: string) {
  processingId.value = id;
  await approveBook(id);
  processingId.value = null;
  await load();
}


async function reject(id: string) {
  const ok = confirm('¿Seguro que deseas rechazar este libro?');
  if (!ok) return;

  await rejectBook(id);
  await load();
}


onMounted(load);
watch(isAdmin, load);
</script>

<template>
  <section>
    <h2>🛂 Panel de Administración</h2>

    <p v-if="loadingAuth">
      ⏳ Verificando permisos...
    </p>

    <p v-else-if="!isAdmin">
      🚫 No tienes permisos para acceder a este panel
    </p>

    <template v-else>
      <p v-if="loadingBooks">
        ⏳ Cargando libros pendientes...
      </p>

      <p v-else-if="books.length === 0">
        📭 No hay libros pendientes
      </p>

      <div v-for="book in books" :key="book.id" class="card">
        <!-- HEADER CON BADGE -->
        <div class="header">
          <h3>{{ book.title }}</h3>
          <span class="badge pending">PENDIENTE</span>
        </div>

        <p>{{ book.author }}</p>

        <button
          class="approve"
          :disabled="processingId === book.id"
          @click="approve(book.id)"
        >
          ✅ Aprobar
        </button>

        <button class="reject" @click="reject(book.id)">
          ❌ Rechazar
        </button>
      </div>

      <p v-if="error" class="error">
        {{ error }}
      </p>
    </template>
  </section>
</template>

  

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  background: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.badge {
  font-size: 0.75rem;
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 600;
}

.pending {
  background: #f1c40f;
  color: #000;
}

button {
  margin-right: 0.5rem;
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.approve {
  background: #2ecc71;
  color: white;
}

.reject {
  background: #e74c3c;
  color: white;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
