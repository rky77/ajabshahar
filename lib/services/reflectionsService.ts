import axios from 'axios';
import { handleApiError } from '../utils/handleApiError';

export async function getPublishedReflections() {
  try {
    const response = await axios.get('/api/reflections');
    return response.data;
  } catch (error) {
    const message = handleApiError(error);
    console.error('[getPublishedReflections] API Error:', message);
    throw new Error(message);
  }
}

export async function getPublishedReflectionById(id: string) {
  try {
    const response = await axios.get(`/api/reflections/${id}`);
    return response.data;
  } catch (error) {
    const message = handleApiError(error);
    console.error('[getPublishedReflectionById] API Error:', message);
    throw new Error(message);
  }
}
