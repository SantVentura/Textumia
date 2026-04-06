export interface Book {
  id: string;
  title: string;
  author: string;
  genre?: string;
  status: 'pending' | 'approved';
  userId: string;
  pdfUrl?: string;      // 👈 nuevo
  coverUrl?: string | null;   // 👈 placeholder hoy
  views?: number
}

export interface NewBookPayload {
  title: string;
  author: string;
  pdfFile: File;
  genre?: string;
}
