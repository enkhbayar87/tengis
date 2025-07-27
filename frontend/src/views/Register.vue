<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Бүртгүүлэх</h2>
      <form @submit.prevent="handleRegister" class="login-form">
        <div class="form-group">
          <label for="username">Хэрэглэгчийн нэр:</label>
          <input 
            type="text" 
            id="username" 
            v-model="username" 
            required 
            placeholder="Хэрэглэгчийн нэрээ оруулна уу"
          />
        </div>
        <div class="form-group">
          <label for="email">Нууц үг:</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            required 
            placeholder="Email оруулна уу"
          />
        </div>
        <div class="form-group">
          <label for="password">Нууц үг:</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            required 
            placeholder="Нууц үгээ оруулна уу"
          />
        </div>       
        <button type="submit" class="login-btn">Бүртгүүлэх</button>
      </form>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authAPI } from '../services/api'

const router = useRouter()
const username = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)
const email = ref('')

const handleRegister = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    // API дуудалт
    const response = await authAPI.register(username.value, email.value, password.value)
    
    // Data байгаа эсэхийг шалгах
    if (!response.data) {
      throw new Error('API-аас өгөгдөл ирээгүй')
    }
    
    // Token-ийг localStorage-д хадгалах
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.user))
    
    // Dashboard руу шилжүүлэх
    router.push('/dashboard')
    
  } catch (error: any) {
    errorMessage.value = error.message || 'Нэвтрэх үед алдаа гарлаа'
    console.error('Login error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-card h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #555;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.login-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s;
}

.login-btn:hover {
  transform: translateY(-2px);
}

.error-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #fee;
  color: #c33;
  border-radius: 5px;
  text-align: center;
}
</style> 