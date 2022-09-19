

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<HomePage/>} path='/'/></Routes></BrowserRouter>
  );
}

export default App;
