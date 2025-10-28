import { Link } from "react-router-dom";

function Sucesso() {
  return (
    <body>
      <header className="bg-primary text-white text-center py-3">
        <h1>Minha Loja</h1>
      </header>

      <main>
        {/* barra do carrinho */}
        <div className="bg-light py-3">
          <div className="container">
            <h2 className="text-primary">🛒 Carrinho (0)</h2>
          </div>
        </div>

        {/* botao para voltar */}
        <div className="container my-5 text-center">
          <Link to="/" className="text-decoration-none d-block text-start mb-4">
            ↩ Voltar
          </Link>

          <h1 className="text-success display-4">
            Itens comprados com sucesso!
          </h1>
        </div>
      </main>

      <footer className="bg-primary text-white text-center py-3 mt-5 fixed-bottom">
        <p className="mb-0">Direitos Autorais. 2025.</p>
      </footer>
    </body>
  );
}

export default Sucesso;
