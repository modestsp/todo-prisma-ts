import { motion } from 'framer-motion';
import { Backdrop } from './Backdrop';
import styles from './utils.module.css';
import closeIcon from '../../assets/closeIcon.svg';

const dropIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.5,
      type: 'spring',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
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
        <motion.img
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          src={closeIcon}
          alt="edit todo"
          className={styles.closeButton}
          onClick={handleClose}
        />
        {children}
      </motion.div>
    </Backdrop>
  );
};
