import { Header } from './Header/Header';
import { Main } from './Main/Main';
import { Footer } from './Footer/Footer';
import styles from './home.module.css';
import { useGetCurrentUser } from '../hooks/useGetCurrentUser';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader } from '../utils/Loader';

const style = {
  borderColor: 'white transparent white transparent',
  width: '60px',
  height: '60px',
};

export const Home = () => {
  const { data: currentUser, isLoading, isError, error } = useGetCurrentUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (isError && !isLoading) {
      navigate('/auth/login');
    }
  }, [currentUser, navigate, isError, error, isLoading]);

  return !isLoading ? (
    <div className={styles.container}>
      <Header />
      <Main />
      <Footer />
    </div>
  ) : (
    <div className={styles.loader}>
      <Loader style={style} />
    </div>
  );
};
