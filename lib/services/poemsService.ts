import axios from 'axios';
import { handleApiError } from '../utils/handleApiError';

export async function getPublishedPoems() {
  try {
    const response = await axios.get('/api/poems'); // Next.js API
    return response.data; // { status, page, ..., data: [...] }
  } catch (error) {
    const message = handleApiError(error);
    console.error('[getPublishedPoems] API Error:', message);
    throw new Error(message);
  }
}

export async function getPublishedPoemsById(id: string) {
  try {
    const response = await axios.get(`/api/poems/${id}`);
    return response.data;
  } catch (error) {
    const message = handleApiError(error);
    console.error('[getPublishedPoemsById] API Error:', message);
    throw new Error(message);
  }
}