import { useState } from 'react';
import { Projects } from './Projects/Projects';
import { Todos } from './Todos/Todos';

export const Main = () => {
  const [selected, setSelected] = useState<string>('todos');
  return (
    <div>
      <aside>
        <button onClick={() => setSelected('todos')}>Todos</button>
        <button onClick={() => setSelected('projects')}>Projects</button>
      </aside>
      {selected === 'todos' ? <Todos /> : <Projects />}
    </div>
  );
};
