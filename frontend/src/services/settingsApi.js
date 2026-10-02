import api from './api';

export async function getPublicSettings() {
  const response = await api.get('/settings/public');
  return response.data;
}