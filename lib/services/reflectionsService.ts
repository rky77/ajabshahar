import axios from 'axios'; // ✅ plain Axios, no baseURL
import { handleApiError } from '../utils/handleApiError';

export async function getPublishedReflections() {
  try {
    const response = await axios.get('/api/words?publish=true');
    return response.data;
  } catch (error) {
    const message = handleApiError(error);
    console.error('[getReflections] API Error:', message);
    throw new Error(message);
  }
}
