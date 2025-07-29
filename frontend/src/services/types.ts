  export interface ApiOptions {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
  }
  
  export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
  }
  
  export interface User {
    id: string;
    username: string;
    email: string;
    role: string;
    lastLogin?: string;
  }
  
  export interface LoginResponse {
    user: User;
    token: string;
  }

  export interface Country {
    name: string;
    code: string;
    phoneCode: string
  }

  export interface Address {
    prefecture: string;
    city: string;
    district: string;
    prefcode: string;
  }