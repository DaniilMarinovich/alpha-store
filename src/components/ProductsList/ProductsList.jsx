import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { productsActions } from '../../store/productSlice';
import ProductCard from '../ProductCard/ProductCard';
import ProductFilters from '../ProductFilters/ProductFilters';
import classes from './ProductsList.module.css';

export default function ProductsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list } = useSelector(state => state.products);

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const categories = useMemo(() => {
    const allCats = list.map(p => p.category);
    return ['all', ...new Set(allCats)];
  }, [list]);

  const maxPriceInList = useMemo(() => {
    if (list.length === 0) return 1000;
    return Math.max(...list.map(p => p.price));
  }, [list]);

  useEffect(() => {
    if (maxPriceInList > 0) {
      setPriceRange([0, Math.ceil(maxPriceInList)]);
    }
  }, [maxPriceInList]);

  const filteredList = list.filter(product => {
    if (showFavoritesOnly && !product.isLiked) return false;
    if (selectedCategory !== 'all' && product.category !== selectedCategory)
      return false;
    if (
      searchQuery.trim() !== '' &&
      !product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    if (product.price < priceRange[0] || product.price > priceRange[1])
      return false;
    return true;
  });

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleNavigate = id => navigate(`/products/${id}`);
  const handleLike = id => dispatch(productsActions.toggleLike(id));
  const handleDelete = id => dispatch(productsActions.deleteProduct(id));
  const handleEdit = id => navigate(`/products/${id}/edit`);

  return (
    <div className={classes.container}>
      <ProductFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        priceRange={priceRange}
        handlePriceChange={handlePriceChange}
        maxPriceInList={maxPriceInList}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
      />

      <ul className={classes.grid}>
        {filteredList.map(product => (
          <li
            key={product.id}
            className={classes.gridItem}>
            <ProductCard
              {...product}
              onOpen={() => handleNavigate(product.id)}
              onToggleLike={handleLike}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </li>
        ))}
      </ul>

      {filteredList.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '2rem', opacity: 0.6 }}>
          Ничего не найдено
        </p>
      )}
    </div>
  );
}
