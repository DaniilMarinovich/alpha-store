import { createSlice } from '@reduxjs/toolkit';
import { loadProductsThunk } from './productSlice.thunk';

const initialState = {
  list: [],
  status: 'idle',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleLike(state, action) {
      const product = state.list.find(item => item.id === action.payload);
      if (product) {
        product.isLiked = !product.isLiked;
      }
    },
    deleteProduct(state, action) {
      state.list = state.list.filter(product => product.id !== action.payload);
    },
    addProduct(state, action) {
      state.list.unshift({
        ...action.payload,
        id: Date.now(),
        isLiked: false,
        category: 'User Product',
      });
    },
    editProduct(state, action) {
      const { id, ...updates } = action.payload;

      const index = state.list.findIndex(item => item.id === id);

      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...updates };
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadProductsThunk.pending, state => {
        state.status = 'loading';
      })
      .addCase(loadProductsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.map(item => ({ ...item, isLiked: false }));
      })
      .addCase(loadProductsThunk.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const productsActions = productsSlice.actions;
export default productsSlice.reducer;
