import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.css';

const links = [
  { path: '/', label: 'Главная' },
  { path: '/products', label: 'Каталог' },
  { path: '/create-product', label: 'Создать' },
];

export default function Navigation() {
  return (
    <nav className={classes.nav}>
      <ul className={classes.list}>
        {links.map(link => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                isActive ? classes.activeLink : classes.link
              }
              end={link.path === '/'}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}