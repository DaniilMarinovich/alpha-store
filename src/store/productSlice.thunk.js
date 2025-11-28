import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '../api/posts'; // Твоя функция запроса

const LS_KEY = 'alpha_store_products';

export const loadProductsThunk = createAsyncThunk(
  'productList/loadProducts',
  async () => {
    const savedData = localStorage.getItem(LS_KEY);

    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (parsed.length > 0) {
        return parsed;
      }
    }

    const data = await fetchProducts();
    return data;
  },
);