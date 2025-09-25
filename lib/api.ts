const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

interface AuthResponse {
  token: string;
  token_type: string;
  expires_in: number;
  user: any; // You might want to define a more specific User interface
}

interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export async function register(userData: any): Promise<AuthResponse | ErrorResponse> {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    return { message: data.message || 'Registration failed', errors: data.errors };
  }

  return data;
}

export async function login(credentials: any): Promise<AuthResponse | ErrorResponse> {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    return { message: data.message || 'Login failed', errors: data.errors };
  }

  // Store the token
  if (data.token) {
    localStorage.setItem('jwt_token', data.token);
  }

  return data;
}

export async function getUser(): Promise<any | ErrorResponse> {
  const token = localStorage.getItem('jwt_token');

  if (!token) {
    return { message: 'No authentication token found.' };
  }

  const response = await fetch(`${API_BASE_URL}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    // If token is expired or invalid, clear it
    if (response.status === 401) {
      localStorage.removeItem('jwt_token');
    }
    return { message: data.message || 'Failed to fetch user data.' };
  }

  return data;
}

export function getAuthToken(): string | null {
  return localStorage.getItem('jwt_token');
}

export function removeAuthToken(): void {
  localStorage.removeItem('jwt_token');
}

export async function getLecturers(): Promise<any | ErrorResponse> {
  const token = localStorage.getItem('jwt_token');

  if (!token) {
    return { message: 'No authentication token found.' };
  }

  const response = await fetch(`${API_BASE_URL}/dosen`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('jwt_token');
    }
    return { message: data.message || 'Failed to fetch lecturer data.' };
  }

  return data;
}
