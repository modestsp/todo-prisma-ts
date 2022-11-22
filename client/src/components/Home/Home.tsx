import { Header } from './Header/Header';
import { Main } from './Main/Main';
import { Footer } from './Footer/Footer';
import styles from './home.module.css';
import { useGetCurrentUser } from '../hooks/useGetCurrentUser';
import { useNavigate } from 'react-router-dom';
export const Home = () => {
  const { data, isLoading, isError, error } = useGetCurrentUser();
  const navigate = useNavigate();

  if (isError) {
    console.log(error);
    navigate('/auth/login');
  }
  return (
    <div className={styles.container}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
