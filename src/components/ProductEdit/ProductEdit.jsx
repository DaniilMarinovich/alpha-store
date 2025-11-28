import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { productsActions } from '../../store/productSlice';
import classes from './ProductEdit.module.css';

export default function ProductEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productToEdit = useSelector(state =>
    state.products.list.find(p => p.id == id),
  );

  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    if (productToEdit) {
      setForm({
        title: productToEdit.title,
        price: productToEdit.price,
        description: productToEdit.description,
        image: productToEdit.image,
      });
    } else {
      navigate('/products');
    }
  }, [productToEdit, navigate]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(
      productsActions.editProduct({
        id: Number(id),
        ...form,
        price: Number(form.price),
      }),
    );

    navigate('/products');
  };

  if (!productToEdit) return null;

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Редактирование товара</h2>

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

        <div className={classes.actions}>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={classes.cancelBtn}>
            Отмена
          </button>
          <button
            type="submit"
            className={classes.submitBtn}>
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
}
