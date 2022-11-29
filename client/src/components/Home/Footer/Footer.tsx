import githubIcon from '../../../assets/githubIcon.svg';
import { motion } from 'framer-motion';
import { footerBottomToTop } from '../../../utils/animations';
import styles from './footer.module.css';

export const Footer = () => {
  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={footerBottomToTop}
      className={styles.footer}
    >
      <a href="https://github.com/srsebbi">
        <img src={githubIcon} alt="go to my personal github page" />
      </a>
      <p className={styles.phrase}> Sebastián Perichón © 2022</p>
    </motion.footer>
  );
};
