import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './App.tsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainApp />
  </StrictMode>
);
