import { Footer } from '../Home/Footer/Footer';
import { Header } from './Header';
import styles from './welcome.module.css';

// Si user entra logeado redirect to home

export const Welcome = () => {
  return (
    <div className={styles.container}>
      <Header />
      <p>Welcome!</p>
      <button>Get Started!</button>
      <Footer />
    </div>
  );
};
