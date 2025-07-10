import { apiConfig } from './apiConfig';

export async function registerUser(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  panId: string;
  mobileNumber: string;
}) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/auth/register`, {
      method: 'POST',
      headers: apiConfig.headers,
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Registration failed');
    }
    return result;
  } catch (error: any) {
    throw new Error(error.message || 'Registration failed');
  }
}

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/auth/login`, {
      method: 'POST',
      headers: apiConfig.headers,
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Login failed');
    }
    return result;
  } catch (error: any) {
    throw new Error(error.message || 'Login failed');
  }
} 