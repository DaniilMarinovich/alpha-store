import { createSlice } from '@reduxjs/toolkit';
import { loadProductsThunk } from './productSlice.thunk';

const LS_KEY = 'alpha_store_products';

const updateLocalStorage = (list) => {
  localStorage.setItem(LS_KEY, JSON.stringify(list));
};

const getInitialList = () => {
  const data = localStorage.getItem(LS_KEY);
  return data ? JSON.parse(data) : [];
};

const initialState = {
  list: getInitialList(),
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
        updateLocalStorage(state.list);
      }
    },
    deleteProduct(state, action) {
      state.list = state.list.filter(product => product.id !== action.payload);
      updateLocalStorage(state.list);
    },
    addProduct(state, action) {
      state.list.unshift({
        ...action.payload,
        id: Date.now(),
        isLiked: false,
        category: 'User Product',
      });
      updateLocalStorage(state.list);
    },
    editProduct(state, action) {
      const { id, ...updates } = action.payload;
      const index = state.list.findIndex(item => item.id === id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...updates };
        updateLocalStorage(state.list);
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
        if (Array.isArray(action.payload)) {
           state.list = action.payload.map(item => ({
             ...item, 
             isLiked: item.isLiked ?? false 
           }));
           updateLocalStorage(state.list);
        }
      })
      .addCase(loadProductsThunk.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const productsActions = productsSlice.actions;
export default productsSlice.reducer;