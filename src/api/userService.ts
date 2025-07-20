import { apiConfig } from './apiConfig';

export async function changeUserStatus({ userId, newState }: { userId: number, newState: string }) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/auth/status-change`, {
      method: 'POST',
      headers: apiConfig.headers,
      body: JSON.stringify({ userId, newState }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Status change failed');
    }
    return result;
  } catch (error: any) {
    throw new Error(error.message || 'Status change failed');
  }
}

export async function uploadDocuments({ userId, aadhaarcard, pancard, loanstatement }: {
  userId: number,
  aadhaarcard: File,
  pancard: File,
  loanstatement: File,
}) {
  const formData = new FormData();
  formData.append('userId', String(userId));
  formData.append('aadhaarcard', aadhaarcard);
  formData.append('pancard', pancard);
  formData.append('loanstatement', loanstatement);

  try {
    const response = await fetch(`${apiConfig.baseURL}/documents/upload`, {
      method: 'POST',
      body: formData,
    });
    const contentType = response.headers.get('content-type');
    let result;
    if (contentType && contentType.includes('application/json')) {
      result = await response.json();
    } else {
      result = await response.text();
    }
    if (!response.ok) {
      throw new Error((result && result.message) || result || 'Document upload failed');
    }
    return result;
  } catch (error: any) {
    throw new Error(error.message || 'Document upload failed');
  }
}

export async function fetchUserDocuments(userId: number) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/documents/${userId}`, {
      method: 'GET',
      headers: apiConfig.headers,
    });
    if (!response.ok) {
      throw new Error('Failed to fetch documents');
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch documents');
  }
}

export async function fetchUserDetails(userId: number) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/auth/user/${userId}`, {
      method: 'GET',
      headers: apiConfig.headers,
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch user details');
  }
} 