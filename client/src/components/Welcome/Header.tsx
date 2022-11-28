import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userService from '../../services/user.service';
import { useGetCurrentUser } from '../hooks/useGetCurrentUser';
import styles from './welcome.module.css';

export const Header = () => {
  const { data: currentUser } = useGetCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/home');
    }
  }, []);

  return (
    <header className={styles.headerContainer}>
      <h1>LOGO@</h1>
      <ul>
        <li>
          <Link to="/auth/sign-up">Sign Up</Link>
        </li>
        <li>
          <Link to="/auth/LogIn">Log In</Link>
        </li>
        <li
          // Timeout de 2 segundos para ver si clickea de nuevo
          onClick={() => console.log('Single')}
          onDoubleClick={() => console.log('DOUBLE')}
        >
          Button
        </li>
      </ul>
    </header>
  );
};
