import { Link } from 'react-router-dom';
import classes from './Welcome.module.css';

export default function Welcome() {
  return (
    <div className={classes.hero}>
      <h1 className={classes.title}>Добро пожаловать в Alpha Store</h1>
      <p className={classes.subtitle}>
        Лучшие товары (которые мы скачали из API) специально для вас
      </p>

      <Link
        to="/products"
        className={classes.btn}>
        Перейти в каталог
      </Link>
    </div>
  );
}
