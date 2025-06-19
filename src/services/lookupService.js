import api from '../config/api.js'; 

/**
 * Fetches the list of all available degree levels.
 * @returns {Promise<Array<{code: string, name: string}>>}
 */
export const fetchDegreeLevels = async () => {
  try {
    const response = await api.get('/lookups/degree-levels/');
    return response.data;
  } catch (error) {
    console.error("❌ Failed to fetch degree levels:", error?.response?.data || error.message);
    throw error;
  }
};

/**
 * Fetches the list of all available academic programs.
 * @returns {Promise<Array<{id: number, name: string, degree_level_id: string, degree_level_name: string}>>}
 */
export const fetchPrograms = async () => {
  try {
    const response = await api.get('/lookups/programs/');
    return response.data;
  } catch (error) {
    console.error("❌ Failed to fetch programs:", error?.response?.data || error.message);
    throw error;
  }
};
