import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./bs-customizacao.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

/* 
  1. site feito usando apenas bootstrap = true
    1.1. instalar bootstrap pelo npm e customizar com temas diferentes = true
  2. formatar com priettier = true
  3. colocar no github pages = true
  4. criar pagina administracao = true
    4.1. contendo lista de produtos disponiveis = true
    4.2. contendo lista de compras realizadas = true
    4.3. filtrar compras com algum produto especifico = true
*/

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
