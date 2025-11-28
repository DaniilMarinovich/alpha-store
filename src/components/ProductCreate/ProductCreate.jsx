import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { productsActions } from '../../store/productSlice';
import classes from './ProductCreate.module.css';

export default function ProductCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(
      productsActions.addProduct({
        title: form.title,
        description: form.description,
        price: Number(form.price),
        image: form.image,
      }),
    );

    navigate('/products');
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Создать продукт</h2>

      <form
        onSubmit={handleSubmit}
        className={classes.form}>
        <div className={classes.formGroup}>
          <label className={classes.label}>Название</label>
          <input
            className={classes.input}
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Например, Super Backpack"
          />
        </div>

        <div className={classes.formGroup}>
          <label className={classes.label}>Цена ($)</label>
          <input
            className={classes.input}
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className={classes.formGroup}>
          <label className={classes.label}>Ссылка на картинку</label>
          <input
            className={classes.input}
            name="image"
            value={form.image}
            onChange={handleChange}
          />
        </div>

        <div className={classes.formGroup}>
          <label className={classes.label}>Описание</label>
          <textarea
            className={classes.textarea}
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className={classes.submitBtn}>
          Создать
        </button>
      </form>
    </div>
  );
}
