// services/admin.service.ts
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc
} from 'firebase/firestore';
import { db } from './firebase';
import type { Book } from '../types';

const booksCollection = collection(db, 'books');

export async function getPendingBooks(): Promise<Book[]> {
  const q = query(booksCollection, where('status', '==', 'pending'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Book, 'id'>)
  }));
}

export async function approveBook(id: string) {
  const ref = doc(db, 'books', id);
  await updateDoc(ref, {
    status: 'approved'
  });
}

export async function rejectBook(id: string) {
  const ref = doc(db, 'books', id);
  await updateDoc(ref, {
    status: 'rejected'
  });
}
