import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './ProductDetails.module.css';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = useSelector(state =>
    state.products.list.find(p => p.id == id),
  );

  if (!product) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        Товар не найден
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <button
        onClick={() => navigate(-1)}
        className={classes.backButton}>
        ← Назад
      </button>

      <div className={classes.card}>
        <div className={classes.imageBox}>
          <img
            src={product.image}
            alt={product.title}
            className={classes.image}
          />
        </div>

        <div className={classes.info}>
          <span className={classes.category}>{product.category}</span>
          <h1 className={classes.title}>{product.title}</h1>
          <p className={classes.description}>{product.description}</p>
          <div className={classes.price}>{product.price} $</div>
        </div>
      </div>
    </div>
  );
}
