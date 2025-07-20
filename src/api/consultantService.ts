import { apiConfig } from './apiConfig';

export async function fetchAllUsers() {
  try {
    const response = await fetch(`${apiConfig.baseURL}/users`, {
      method: 'GET',
      headers: apiConfig.headers,
    });
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch users');
  }
} 