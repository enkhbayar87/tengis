<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Бүртгүүлэх</h2>
      <form  class="login-form">
        <div class="form-group">
          <label for="username">Хэрэглэгчийн нэр:</label>
          <input 
            type="text" 
            id="username" 
            v-model="formData.username" 
            required 
            placeholder="Хэрэглэгчийн нэрээ оруулна уу"
          />
        </div>
        <div class="form-group">
          <label for="email">И-мэйл:</label>
          <input 
            type="email" 
            id="email" 
            v-model="formData.email" 
            required 
            placeholder="Email оруулна уу"
          />
        </div>
        <div class="form-group">
          <label for="password">Нууц үг:</label>
          <input 
            type="password" 
            id="password" 
            v-model="formData.password" 
            required 
            placeholder="Нууц үгээ оруулна уу"
          />
        </div>
        <div class="form-group">
          <label for="firstname">Нэр:</label>
          <input 
            type="text" 
            id="firstname" 
            v-model="formData.firstname" 
            required 
            placeholder="Нэрээ оруулна уу"
          />
        </div>
        <div class="form-group">
          <label for="lastname">Овог:</label>
          <input 
            type="text" 
            id="lastname" 
            v-model="formData.lastname" 
            required 
            placeholder="Овогоо оруулна уу"
          />
        </div>
        <div class="form-group">
          <label for="gender">Хүйс:</label>
          <select 
            id="gender" 
            v-model="formData.gender" 
            required 
            class="form-select"
          >
            <option value="">Хүйсээ сонгоно уу</option>
            <option value="male">Эрэгтэй</option>
            <option value="female">Эмэгтэй</option>
          </select>
        </div>
        <div class="form-group">
          <label for="birthday">Төрсөн огноо:</label>
          <input 
            type="date" 
            id="birthday" 
            v-model="formData.birthday" 
            required 
            placeholder="Төрсөн огноо оруулна уу"
          />
        </div>
        <div class="form-group">
          <label for="phone">Утасны дугаар:</label>
          <div class="phone-input-group">
            <select 
              v-model="formData.selectedCountry" 
              class="country-select"
              @change="onCountryChange"
            >
              <option value="">Улс сонгох</option>
              <option 
                v-for="country in countries" 
                :key="country.code" 
                :value="country.code"
              >
                {{ country.name }} ({{ country.phoneCode }})
              </option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <input 
            type="tel" 
            id="phone" 
            v-model="formData.phoneNumber" 
            required 
            placeholder="Утасны дугаар"
            class="phone-input"
          />
        </div>
        <div class="form-group">
          <label for="postalcode">Хаяг:</label>
          <input 
            type="text" 
            id="postalcode"
            required 
            placeholder="Шуудангийн дугаар оруулна уу"
            v-model="formData.postcode"
            @change="onPostalCodeChange"
          />
        </div>
        <div class="form-group">
          <input 
            type="text" 
            readonly
            required
            v-model="formData.address.prefecture"
          />
        </div>
        <div class="form-group">
          <input 
            type="text" 
            readonly
            required 
            v-model="formData.address.city"
          />
        </div>
        <div class="form-group">
          <input 
            type="text" 
            readonly
            required 
            v-model="formData.address.district"
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
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { authAPI } from '../services/api'
import type { Country, Address } from '../services/types'

const router = useRouter()

// Form data-г нэг объектод нэгтгэх
const formData = reactive({
  username: '',
  password: '',
  email: '',
  firstname: '',
  lastname: '',
  gender: '',
  birthday: new Date().toISOString().split('T')[0],
  phoneNumber: '',
  selectedCountry: '',
  address: {
    prefecture: '',
    city: '',
    district: ''
  },
  postcode: ''
})

// UI state
const errorMessage = ref('')
const isLoading = ref(false)
const countries = ref<Country[]>([])

// Улсын жагсаалт татах
const fetchCountries = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,idd')
    const data = await response.json()
    
    countries.value = data
      .filter((country: any) => country.idd && country.idd.root)
      .map((country: any) => ({
        name: country.name.common,
        code: country.cca2,
        phoneCode: country.idd.root + (country.idd.suffixes?.[0] || '')
      }))
      .sort((a: Country, b: Country) => a.name.localeCompare(b.name))
  } catch (error) {
    console.error('Улсын жагсаалт татахад алдаа:', error)
  }
}

// Улс сонгогдох үед
const onCountryChange = () => {
  // Энд нэмэлт логик бичиж болно
  console.log('Сонгосон улс:', formData.selectedCountry)
}

// Компонент ачаалагдахад улсын жагсаалт татах
fetchCountries()

const fetchPostalCodes = async () => {
  try {
    console.log('🚀 API дуудаж байна:', formData.postcode)
    
    const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${formData.postcode}`)
    const data = await response.json()
    
    console.log('📡 API response:', data)
    console.log('📊 Response status:', data.status)
    console.log('📋 Results:', data.results)
    
    if (data.status === 200 && data.results && data.results.length > 0) {
      const result = data.results[0]
      
      console.log('🎯 Эхний result:', result)
      console.log('🏛️ address1 (prefecture):', result.address1)
      console.log('🏙️ address2 (city):', result.address2)
      console.log('🏘️ address3 (district):', result.address3)
      
      // formData.address-д утгуудыг оноох
      formData.address.prefecture = result.address1 || ''
      formData.address.city = result.address2 || ''
      formData.address.district = result.address3 || ''
      
      console.log('✅ formData.address-д оноогдсон:', formData.address)
    } else {
      console.log('Хаяг олдсонгүй')
      // Хаяг олдсонгүй бол хоосон болгох
      formData.address.prefecture = ''
      formData.address.city = ''
      formData.address.district = ''
    }
  } catch (error) {
    console.error('Postal code татахад алдаа:', error)
    // Алдаа гарвал хоосон болгох
    formData.address.prefecture = ''
    formData.address.city = ''
    formData.address.district = ''
  }
}

const onPostalCodeChange = () => {
  console.log('🔍 onPostalCodeChange дуудагдаж байна')
  console.log('📮 Шуудангийн дугаар:', formData.postcode)
  fetchPostalCodes()
}


const handleRegister = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    // API дуудалт
    const response = await authAPI.register(
      formData.username, 
      formData.email, 
      formData.password,
      formData.firstname,
      formData.lastname,
      formData.gender,
      formData.birthday,
      formData.selectedCountry,
      formData.phoneNumber
    )
    
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

.form-select {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;
  background-color: white;
  cursor: pointer;
}

.form-select:focus {
  outline: none;
  border-color: #667eea;
}

.phone-input-group {
  display: flex;
  gap: 0.5rem;
}

.country-select {
  flex: 0 0 200px;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;
  background-color: white;
  cursor: pointer;
}

.country-select:focus {
  outline: none;
  border-color: #667eea;
}

.phone-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.phone-input:focus {
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