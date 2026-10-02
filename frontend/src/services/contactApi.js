import api from './api';

export async function sendContact(data) {
  const response = await api.post('/contact', data);
  return response.data;
}