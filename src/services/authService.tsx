import { api } from '@/lib/api';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthService {
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  resendVerification: (email: string) => Promise<void>;
}

export const authService: AuthService = {
  async login(credentials: LoginCredentials) {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  async resendVerification(email: string) {
    await api.post('/auth/resend-verification', { email });
  }
}; 