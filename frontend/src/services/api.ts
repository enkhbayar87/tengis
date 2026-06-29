import type { ApiOptions, ApiResponse, LoginResponse, User } from './types';

// Гол санаа:
// - Dev үед: Vite proxy ашиглаад relative "/api" гэж дуудах (5173 -> 8080 руу дамжина)
// - Prod үед: хэрэгтэй бол VITE_API_BASE_URL env-ээр override хийж болно
const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL ?? '/api';

// API дуудалтын ерөнхий функц
const apiCall = async <T = any>(endpoint: string, options: ApiOptions = {}): Promise<ApiResponse<T>> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Default headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  // Token байвал нэмэх
  const token = localStorage.getItem('token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    // "Unexpected token '<'" гэдэг нь ихэнхдээ JSON хүлээгээд HTML буцааж авснаас болдог.
    // Тиймээс JSON биш ирвэл илүү ойлгомжтой алдаа гаргая.
    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(
        `API JSON биш хариу буцаалаа (Content-Type: ${contentType}). ` +
        `Эхний 80 тэмдэгт: ${text.slice(0, 80)}`
      );
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API дуудалтад алдаа гарлаа');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  // Нэвтрэх
  login: async (username: string, password: string): Promise<ApiResponse<LoginResponse>> => {
    return apiCall<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
  },

  // Бүртгүүлэх
  register: async (username: string, email: string, password: string, firstname: string, lastname: string, gender: string, birthday: string, phoneNumber: string, country: string, prefecture: string, city: string, district: string, postcode: string): Promise<ApiResponse<LoginResponse>> => {
    return apiCall<LoginResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password, firstname, lastname, gender, birthday, phoneNumber, country, prefecture, city, district, postcode })
    });
  },

  // Одоогийн хэрэглэгчийн мэдээлэл
  getMe: async (): Promise<ApiResponse<User>> => {
    return apiCall<User>('/auth/me');
  },

  // Гарах
  logout: async (): Promise<ApiResponse<void>> => {
    return apiCall<void>('/auth/logout', {
      method: 'POST'
    });
  }
};

// Health check
export const healthAPI = {
  check: async (): Promise<ApiResponse<any>> => {
    return apiCall('/health');
  }
};

export default apiCall; 