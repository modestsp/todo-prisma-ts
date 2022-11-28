import { useState } from 'react';
import { Projects } from './Projects/Projects';
import { Todos } from './Todos/Todos';
import { motion } from 'framer-motion';
import styles from './main.module.css';

export const Main = () => {
  const [selected, setSelected] = useState<string>('todos');
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelected('todos')}
          className={styles.option}
        >
          Todos
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelected('projects')}
          className={styles.option}
        >
          Projects
        </motion.button>
      </aside>
      <div className={styles.mainContent}>
        <h1 className={styles.title}>{selected}</h1>
        {selected === 'todos' ? <Todos /> : <Projects />}
      </div>
    </div>
  );
};
