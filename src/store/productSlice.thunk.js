import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '../api/posts';

export const loadProductsThunk = createAsyncThunk(
  'productList/loadProducts',
  async () => {
    const data = await fetchProducts();

    return data;
  },
);
