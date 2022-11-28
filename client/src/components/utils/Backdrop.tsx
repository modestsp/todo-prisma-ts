import { motion } from 'framer-motion';
import styles from './utils.module.css';

export const Backdrop = ({
  children,
  onClick,
}: {
  children: any;
  onClick: any;
}) => {
  return (
    <motion.div
      className={styles.backdrop}
      onClick={onClick}
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};
