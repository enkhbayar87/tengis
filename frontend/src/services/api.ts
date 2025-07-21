const API_BASE_URL = 'http://localhost:3001/api';

interface ApiOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  lastLogin?: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

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
  register: async (username: string, email: string, password: string): Promise<ApiResponse<LoginResponse>> => {
    return apiCall<LoginResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password })
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