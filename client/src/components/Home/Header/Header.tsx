import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import userService from '../../../services/user.service';
import { useGetCurrentUser } from '../../hooks/useGetCurrentUser';
import { motion } from 'framer-motion';
import styles from './header.module.css';
import { headerDropIn } from '../../../utils/animations';

export const Header = () => {
  const navigate = useNavigate();
  const { data: currentUser } = useGetCurrentUser();

  const logOutHandler = async () => {
    await userService.logout();
    navigate('/auth/login');
  };
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Sp</div>
      {currentUser && (
        <div className={styles.welcomeContainer}>
          <p className={styles.welcomeMessage}>Welcome!</p>
          <p className={styles.username}>{currentUser.name}</p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={logOutHandler}
            className={styles.logoutButton}
          >
            Log Out
          </motion.button>
        </div>
      )}
    </header>
  );
};
