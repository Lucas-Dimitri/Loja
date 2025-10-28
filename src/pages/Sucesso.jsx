import { Link } from "react-router-dom";

function Sucesso() {
  return (
    <div>
      {/* Header */}
      <div className="bg-primary text-white text-center py-3">
        <h1>Minha Loja</h1>
      </div>

      {/* Barra do Carrinho */}
      <div className="bg-light py-3">
        <div className="container">
          <h2 className="text-primary">🛒 Carrinho (0)</h2>
        </div>
      </div>

      <div className="container my-5 text-center">
        <Link to="/" className="text-decoration-none d-block text-start mb-4">
          ↩ Voltar
        </Link>

        <h1 className="text-success display-4">Itens comprados com sucesso!</h1>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-3 mt-5 fixed-bottom">
        <p className="mb-0">Direitos Autorais. 2025.</p>
      </footer>
    </div>
  );
}

export default Sucesso;
