import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

/* 
  site feito usando apenas bootstrap = true
  instalar bootstrap pelo npm e customizar com temas diferentes = true
  formatar com priettier = true
*/

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App /> 
  </StrictMode>,
)
