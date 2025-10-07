const tokenStorageKey = "jwt_token";

const API_BASE_URL = (() => {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";
  return base.endsWith("/") ? base.slice(0, -1) : base;
})();

interface RegisterSuccess {
  success: boolean;
  user: unknown;
}

interface LoginSuccess {
  success: boolean;
  token: string;
  user: unknown;
}

interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

async function parseJson(response: Response) {
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

export async function register(userData: unknown): Promise<RegisterSuccess | ErrorResponse> {
  const response = await fetch(`${API_BASE_URL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await parseJson(response);

  if (!response.ok) {
    return { message: data.message ?? "Registration failed", errors: data.errors };
  }

  return data;
}

export async function login(credentials: unknown): Promise<LoginSuccess | ErrorResponse> {
  const response = await fetch(`${API_BASE_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await parseJson(response);

  if (!response.ok) {
    return { message: data.message ?? "Login failed", errors: data.errors };
  }

  if (data.token) {
    localStorage.setItem(tokenStorageKey, data.token);
  }

  return data;
}

export async function getUser(): Promise<unknown | ErrorResponse> {
  const token = localStorage.getItem(tokenStorageKey);

  if (!token) {
    return { message: "No authentication token found." };
  }

  const response = await fetch(`${API_BASE_URL}/api/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await parseJson(response);

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem(tokenStorageKey);
    }

    return { message: data.message ?? "Failed to fetch user data." };
  }

  return data;
}

export function getAuthToken(): string | null {
  return localStorage.getItem(tokenStorageKey);
}

export function removeAuthToken(): void {
  localStorage.removeItem(tokenStorageKey);
}

export async function getLecturers(): Promise<unknown | ErrorResponse> {
  const token = localStorage.getItem(tokenStorageKey);

  if (!token) {
    return { message: "No authentication token found." };
  }

  const response = await fetch(`${API_BASE_URL}/api/dosen`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await parseJson(response);

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem(tokenStorageKey);
    }

    return { message: data.message ?? "Failed to fetch lecturer data." };
  }

  return data;
}

export const TOKEN_STORAGE_KEY = tokenStorageKey;
