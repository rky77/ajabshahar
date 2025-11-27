import axios from "axios";
import { handleApiError } from "../utils/handleApiError";

export async function getPublishedFilms() {
  try {
    // Local Next.js API route (proxy)
    const response = await axios.get("/api/films", {
      // prevent caching issues
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    // Response should be array
    return response.data;

  } catch (error: any) {
    const message = handleApiError(error);
    console.error("[getPublishedFilms] API Error:", message, error);
    throw new Error(message);
  }
}
