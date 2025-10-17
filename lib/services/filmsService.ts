import axios from 'axios'; // ✅ plain Axios, no baseURL
import { handleApiError } from '../utils/handleApiError';

export async function getPublishedFilms() {
  try {
    const response = await axios.get('api/films');
    return response.data;
  } catch (error) {
    const message = handleApiError(error);
    console.error('[getReflections] API Error:', message);
    throw new Error(message);
  }
}
