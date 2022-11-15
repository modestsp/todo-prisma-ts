import { Home } from './components/Home/Home';
import { createContext, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LogIn } from './components/LogIn/LogIn';
import { User } from './types';
import './App.css';
import userService from './services/user.service';

interface UserContextType {
  currentUser: User;
  setCurrentUser: (newSession: User) => void;
  accessToken: string;
  setAccessToken: (newToken: string) => void;
}

const initialState = {
  currentUser: {
    id: '',
    username: '',
    email: '',
    iat: 0,
    exp: 0,
    name: '',
    session: '',
  },
  accessToken: '',
  setCurrentUser: () => {},
  setAccessToken: () => '',
};
export const UserContext = createContext<UserContextType>(initialState);
function App() {
  const [accessToken, setAccessToken] = useState('');
  let todos: never[] = [];
  const [currentUser, setCurrentUser] = useState<User>({
    id: '',
    username: '',
    email: '',
    iat: 0,
    exp: 0,
    name: '',
    session: '',
  });

  useEffect(() => {
    const getTodos = async () => {
      todos = await userService.getAllTodos();
      return todos;
    };
    getTodos();
    console.log(todos);
  }, [accessToken]);

  return (
    <div className="App">
      <UserContext.Provider
        value={{ currentUser, setCurrentUser, accessToken, setAccessToken }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<LogIn />} />
          {/* <Route path='/auth/sign' element={<LogIn/>}/> */}
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
