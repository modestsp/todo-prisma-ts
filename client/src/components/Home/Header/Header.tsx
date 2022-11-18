import axios from 'axios';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import { useNavigate } from 'react-router-dom';
import userService from '../../../services/user.service';
import styles from './header.module.css';

export const Header = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);

  const logOutHandler = async () => {
    await userService.logout();
    // await userService.logout();
    // console.log('Logging out');
    navigate('/auth/login');
  };
  return (
    // ACTUALIZAR CONTEXT DE USER
    <header className={styles.header}>
      <p>LOGO!</p>
      {context?.currentUser?.id ? (
        <div>
          <p>Welcome {context.currentUser.name}</p>
          <button onClick={logOutHandler}>Log Out</button>
        </div>
      ) : (
        <ul>
          <li>
            <Link to="/auth/sign-up">Sign Up</Link>
          </li>
          <li>
            <Link to="/auth/LogIn">Log In</Link>
          </li>
        </ul>
      )}
    </header>
  );
};
