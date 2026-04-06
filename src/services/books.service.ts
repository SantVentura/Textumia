import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import type { Book } from '../types';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { deleteDoc } from 'firebase/firestore';

const booksCollection = collection(db, 'books');

/**
 * Guarda un libro en Firestore
 */
export async function addBook(book: Omit<Book, 'id'>) {
  const docRef = await addDoc(collection(db, 'books'), {
    ...book,
    views: 0, // 👈 CLAVE
  });

  return docRef.id;
}


export async function incrementBookViews(bookId: string) {
  const ref = doc(db, 'books', bookId)
  await updateDoc(ref, {
    views: increment(1)
  })
}

export async function getPublicBooks(): Promise<Book[]> {
  const q = query(booksCollection, where('status', '==', 'approved'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Book, 'id'>)
  }));
}


export async function getMyBooks(userId: string): Promise<Book[]> {
  const q = query(booksCollection, where('userId', '==', userId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Book, 'id'>)
  }));
}

export async function updateBook(
  id: string,
  data: { title: string; author: string }
) {
  const ref = doc(db, 'books', id);
  await updateDoc(ref, data);
}


export async function deleteBook(id: string) {
  const ref = doc(db, 'books', id);
  await deleteDoc(ref);
}