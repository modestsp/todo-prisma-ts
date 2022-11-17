import { Header } from './Header/Header';
import { Main } from './Main/Main';
import { Footer } from './Footer/Footer';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../App';

export const Home = () => {
  console.log(useContext(UserContext));

  // useEffect(() => {
  //   console.log(currentUser);

  //   console.log('Nuevo estate', currentUser);
  // }, []);
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
