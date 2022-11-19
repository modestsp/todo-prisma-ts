import { useState } from 'react';
import { Projects } from './Projects/Projects';
import { Todos } from './Todos/Todos';
import styles from './main.module.css';
export const Main = () => {
  const [selected, setSelected] = useState<string>('todos');
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{selected}</h1>
      <div className={styles.mainContent}>
        <aside>
          <button onClick={() => setSelected('todos')}>Todos</button>
          <button onClick={() => setSelected('projects')}>Projects</button>
        </aside>
        {selected === 'todos' ? <Todos /> : <Projects />}
      </div>
    </div>
  );
};
