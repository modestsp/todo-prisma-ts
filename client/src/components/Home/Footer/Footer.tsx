import githubIcon from '../../../assets/githubIcon.svg';
import styles from './footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a href="https://github.com/srsebbi">
        <img src={githubIcon} alt="go to my personal github page" />
      </a>
      <p className={styles.phrase}> Sebastian Perichón © 2022</p>
    </footer>
  );
};
