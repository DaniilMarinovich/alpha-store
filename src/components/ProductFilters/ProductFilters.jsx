import {
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import classes from './ProductFilters.module.css';

export default function ProductFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  priceRange,
  handlePriceChange,
  maxPriceInList,
  showFavoritesOnly,
  setShowFavoritesOnly,
}) {
  return (
    <div className={classes.controlsWrapper}>
      <TextField
        label="Поиск"
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        sx={{ bgcolor: 'white', minWidth: '180px' }}
      />

      <FormControl
        size="small"
        sx={{ minWidth: 150, bgcolor: 'white' }}>
        <InputLabel>Категория</InputLabel>
        <Select
          value={selectedCategory}
          label="Категория"
          onChange={e => setSelectedCategory(e.target.value)}>
          <MenuItem value="all">Все</MenuItem>
          {categories.map(cat => (
            <MenuItem
              key={cat}
              value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ width: 200, padding: '0 10px' }}>
        <Typography
          variant="caption"
          color="text.secondary">
          Цена: {priceRange[0]}$ — {priceRange[1]}$
        </Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={Math.ceil(maxPriceInList)}
          sx={{
            color: 'var(--accent-color)',
            '& .MuiSlider-thumb': { boxShadow: 'none' },
          }}
        />
      </Box>

      <FormControlLabel
        control={
          <Switch
            checked={showFavoritesOnly}
            onChange={e => setShowFavoritesOnly(e.target.checked)}
            color="primary"
          />
        }
        label="Избранное"
        sx={{ marginLeft: 'auto', userSelect: 'none' }}
      />
    </div>
  );
}
