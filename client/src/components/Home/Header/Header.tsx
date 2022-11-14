import { Link } from 'react-router-dom';
import styles from './header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <p>LOGO!</p>
      <ul>
        <li>
          <Link to="/auth/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/auth/LogIn">Log In</Link>
        </li>
      </ul>
    </header>
  );
};
