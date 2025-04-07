// Mock user data
interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  provider: 'google' | 'github';
}

interface AuthResponse {
  user: User;
  accessToken: string;
}

// Mock tokens
const MOCK_TOKENS = {
  google: 'mock-google-token',
  github: 'mock-github-token',
};

// Mock user data
const MOCK_USERS: Record<string, User> = {
  'mock-google-token': {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    provider: 'google',
  },
  'mock-github-token': {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@github.com',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    provider: 'github',
  },
};

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class AuthService {
  private accessToken: string | null = null;
  private user: User | null = null;

  constructor() {
    // Check if we have a token in localStorage
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('accessToken');
      const userStr = localStorage.getItem('user');
      if (userStr) {
        this.user = JSON.parse(userStr);
      }
    }
  }

  async loginWithGoogle(): Promise<AuthResponse> {
    // Simulate OAuth flow delay
    await delay(1000);

    const token = MOCK_TOKENS.google;
    const user = MOCK_USERS[token];

    this.setSession(token, user);
    return { user, accessToken: token };
  }

  async loginWithGithub(): Promise<AuthResponse> {
    // Simulate OAuth flow delay
    await delay(1000);

    const token = MOCK_TOKENS.github;
    const user = MOCK_USERS[token];

    this.setSession(token, user);
    return { user, accessToken: token };
  }

  async logout(): Promise<void> {
    await delay(500);
    this.clearSession();
  }

  async getUser(): Promise<User | null> {
    if (!this.accessToken) return null;
    return this.user;
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  private setSession(accessToken: string, user: User): void {
    this.accessToken = accessToken;
    this.user = user;
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  private clearSession(): void {
    this.accessToken = null;
    this.user = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    }
  }
}

export const authService = new AuthService();
