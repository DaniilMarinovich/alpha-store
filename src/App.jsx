import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import CreateProductPage from './pages/CreateProductPage';
import EditProductPage from './pages/EditProductPage';
import MainPage from './pages/MainPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProductsPage from './pages/ProductsPage';
import { loadProductsThunk } from './store/productSlice.thunk';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProductsThunk());
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="/"
        element={<RootLayout />}>
        <Route
          index
          element={<MainPage />}
        />

        <Route
          path="products"
          element={<ProductsPage />}
        />

        <Route
          path="products/:id"
          element={<ProductDetailsPage />}
        />

        <Route
          path="products/:id/edit"
          element={<EditProductPage />}
        />

        <Route
          path="create-product"
          element={<CreateProductPage />}
        />

        <Route
          path="*"
          element={<h2>404: Страница не найдена</h2>}
        />
      </Route>
    </Routes>
  );
}

export default App;
