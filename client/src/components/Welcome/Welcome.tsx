import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../Home/Footer/Footer';
import { useGetCurrentUser } from '../hooks/useGetCurrentUser';
import { Header } from './Header';
import { motion } from 'framer-motion';
import styles from './welcome.module.css';
import { buttonDropIn } from '../../utils/animations';
// Si user entra logeado redirect to home

export const Welcome = () => {
  const { data: currentUser } = useGetCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/home');
    }
  });

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.hero}>
        <p className={styles.heroMsg}>
          A<span> simple </span>todo App
        </p>
        <motion.button
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={buttonDropIn}
          className={styles.getStarted}
          onClick={() => navigate('/auth/sign-up')}
        >
          Get started
        </motion.button>
      </div>
      <Footer />
    </div>
  );
};
