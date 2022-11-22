import { motion } from 'framer-motion';
import { Backdrop } from './Backdrop';
import styles from './home.module.css';

const dropIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.25,
      type: 'spring',
    },
  },
  exit: {
    opacity: 0,
  },
};

export const Modal = ({
  handleClose,
  children,
}: {
  handleClose: any;
  children: any;
}) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={styles.modal}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={dropIn}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClose}
          className={styles.closeButton}
        >
          X
        </motion.button>
        <p>{children}</p>
      </motion.div>
    </Backdrop>
  );
};
