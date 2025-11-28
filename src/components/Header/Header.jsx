import Navigation from '../Navigation/Navigation';
import classes from './Header.module.css';

export default function Header() {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        Alpha Store<span>.</span>
      </h1>
      <Navigation />
    </header>
  );
}
