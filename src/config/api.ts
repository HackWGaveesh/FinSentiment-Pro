// API Configuration
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  health: `${API_BASE_URL}/api/health`,
  trending: `${API_BASE_URL}/api/trending`,
  analyze: `${API_BASE_URL}/api/analyze`,
  search: `${API_BASE_URL}/api/search`,
};

export default API_BASE_URL;
