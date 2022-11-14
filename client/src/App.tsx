import { Home } from './components/Home/Home';

import { Routes, Route } from 'react-router-dom';

import './App.css';
import { LogIn } from './components/LogIn/LogIn';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<LogIn />} />
        {/* <Route path='/auth/sign' element={<LogIn/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
