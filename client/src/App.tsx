import { Home } from './components/Home/Home';
import { createContext, useContext, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { LogIn } from './components/LogIn/LogIn';
import { User } from './types';
import { SignUp } from './components/SignUp/SignUp';
import userService from './services/user.service';
import { useQuery } from '@tanstack/react-query';
import './App.css';
import { NotFound } from './NotFound';

interface UserContextType {
  currentUser?: User;
  setCurrentUser: (newUser: User) => void;
}

const initialUser = {
  id: '',
  username: '',
  email: '',
  iat: 0,
  exp: 0,
  name: '',
  session: '',
};
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
function App() {
  const [currentUser, setCurrentUser] = useState<User>(initialUser);
  const navigate = useNavigate();

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['currentUser'],
    queryFn: userService.getCurrentUser,
    onSuccess: (context) => {
      console.log('ACA EL CONTEXT', context);
    },
  });

  console.log('ACA LA DATA', data);
  console.log('ACA EL ERROR BOOLEAN', isError);
  console.log('ACA EL ERROR', error);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const loggedUser: User = await userService.getCurrentUser();
        setCurrentUser(loggedUser);
        console.log(currentUser);
      } catch (e) {
        console.log('No user');
        navigate('/auth/login');
      }
    };
    getCurrentUser();
    console.log('current User in App', currentUser);
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<LogIn />} />
          <Route path="/auth/sign-up" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
