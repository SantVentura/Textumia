<script setup lang="ts">
import { loginWithGoogle, logout } from '../services/auth.service';
import { useAuth } from '../composables/useAuth';
const toggleTheme = () => {
  document.body.classList.toggle('dark')

  localStorage.theme =
    document.body.classList.contains('dark')
      ? 'dark'
      : 'light'
}

const { user } = useAuth();



</script>

<template>
  <nav class="nav">
    
    <div class="left">
      <span class="logo"> Textumia</span>

      <RouterLink to="/public">Pública</RouterLink>
      <RouterLink to="/mine">Mi Galería</RouterLink>
    </div>

    <!-- AUTH -->
    <div class="right">
      <button style="cursor: pointer;" class="theme" @click="toggleTheme">
  🌙
</button>

      <button
        v-if="!user"
        class="login"
        @click="loginWithGoogle"
      >
        Iniciar sesión
      </button>

      <div v-else class="user">
        <span class="name">{{ user.displayName }}</span>
        <button class="logout" @click="logout">Salir</button>
      </div>
    </div>
  </nav>
</template>



<style scoped>
.nav {
  width: 98.7vw;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
 background: var(--bg);
  border-bottom: 1px solid var(--border);
}

.left {
  margin-left: 10px;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  color: var(--text);
  font-weight: 600;
 
  
  align-items:center ;
  font-size: 15px;
}

a {
  
  text-decoration: none;
  color:var(--text);
  font-size: 14px;
  
}
.router-link-{
  cursor: pointer;
}
.router-link-active {
  color: #2ecc71;
  font-weight: 600;
}

.right {
 
  display: flex;
  align-items: center;
  gap: 0.7rem;
    
}

.login {
  padding: 6px 12px;
  border-radius: 5px;
  border: 1px solid var(--border);
    background: var(--bg);
  color:var(--text);
  cursor: pointer;
  font-size: 13px;
}



.user {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.name {
  font-size: 13px;
  color: #555;
}

.logout {
  background: rgb(0, 0, 0);
  padding: 10px;
  border-radius: 20%;
  border: none;
  color: #ffffff;
  font-size: 13px;
  cursor: pointer;
}
.logout:hover{
  background-color: #302f2f;
  color: red;
  
}
 .theme {
  width: 30px;
  height: 30px;
    border-radius: 50%;
    background: var(--bg);
    
  }
@media (max-width: 768px) {
  .nav {
    flex-direction: column-reverse;
    height: auto;
    padding: 0.5rem 1rem;
    gap: 0.5rem;
  }

  .left {
    width: 100%;
    justify-content: space-around;

  }

  .logo {
    font-size: 14px;
  }

  .links {
    display: flex;
    gap: 0.8rem;
  }

  .right {
    width:80%;
    justify-content: space-between;
  }

  .name {
    display: none; /* en móvil no es necesario */
  }
}

@media (max-width: 420px) {
  .links a {
    font-size: 13px;
  }

  .login {
    padding: 5px 10px;
    font-size: 12px;
  }

  .theme {
    font-size: 14px;
  }
}
</style>
