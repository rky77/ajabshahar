import axios from 'axios';
import { handleApiError } from '../utils/handleApiError';

export async function getFirstItems() {
  try {
    const resp = await axios.get('api/first_items');
    return resp.data;
  } catch (error) {
    const message = handleApiError(error);
    console.error('[getFirstItems] API Error:', message);
    throw new Error(message);
  }
}
