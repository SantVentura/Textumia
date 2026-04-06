import { ref } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';

const user = ref<any>(null);
const isAdmin = ref(false);
const loadingAuth = ref(true);

onAuthStateChanged(auth, async currentUser => {
  user.value = currentUser;

  if (!currentUser) {
    isAdmin.value = false;
    loadingAuth.value = false;
    return;
  }

  const token = await currentUser.getIdTokenResult(true);
  isAdmin.value = token.claims.admin === true;
  loadingAuth.value = false;
});

export function useAuth() {
  return {
    user,
    isAdmin,
    loadingAuth
  };
}
