import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetCurrentUser } from '../hooks/useGetCurrentUser';
import { LoginModal } from './LoginModal';
import { dropIn, headerDropIn } from '../../utils/animations';
import styles from './welcome.module.css';

export const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: currentUser } = useGetCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/home');
    }
  }, []);

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={headerDropIn}
      className={styles.headerContainer}
    >
      <div className={styles.logo}>Sp</div>
      <ul>
        <li>
          <button
            onClick={() => navigate('/auth/sign-up')}
            className={styles.signButton}
          >
            Sign Up
          </button>
        </li>
        <li>
          <button
            onClick={() => setModalOpen(!modalOpen)}
            onDoubleClick={() => navigate('/auth/login')}
            className={styles.login}
          >
            Log in
          </button>
          {modalOpen && (
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropIn}
            >
              <LoginModal />
            </motion.div>
          )}
        </li>
      </ul>
    </motion.header>
  );
};
