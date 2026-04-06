import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export async function uploadBookPdf(
  file: File,
  userId: string
): Promise<string> {
  const ref = storageRef(
    storage,
    `books/${userId}/${Date.now()}-${file.name}`
  );

  await uploadBytes(ref, file);
  return await getDownloadURL(ref);
}
