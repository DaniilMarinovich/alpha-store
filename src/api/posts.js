import apiClient from './apiClient';

export async function fetchProducts() {
  const { data } = await apiClient.get('/products');
  return data;
}
