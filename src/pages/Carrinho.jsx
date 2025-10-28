import { Link, useNavigate } from "react-router-dom";

function Carrinho({
  carrinho,
  excluirDoCarrinho,
  aumentarQuantidade,
  diminuirQuantidade,
  limparCarrinho,
  finalizarCompra,
  carrinhoCount,
}) {
  const navigate = useNavigate();

  const calcularTotal = () => {
    return carrinho.reduce(
      (total, item) => total + item.produto.preco * item.quantidade,
      0
    );
  };

  const getTotalItens = () => {
    return carrinho.reduce((total, item) => total + item.quantidade, 0);
  };

  const handleFinalizarCompra = () => {
    finalizarCompra(carrinho);
    navigate("/sucesso");
  };

  return (
    <body>
      <header className="bg-primary text-white text-center py-3">
        <h1>Minha Loja</h1>
      </header>

      <div className="bg-light py-3">
        <div className="container">
          <h2 className="text-primary">🛒 Carrinho ({carrinhoCount})</h2>
        </div>
      </div>

      <main className="container my-4">
        <Link to="/" className="text-decoration-none">
          ↩ Voltar
        </Link>

        <div className="bg-light p-4 rounded mt-4">
          <div className="mb-3">
            <strong>Itens: {getTotalItens()}</strong>
          </div>
          <div className="mb-3">
            <strong>Total: R$ {calcularTotal().toFixed(2)}</strong>
          </div>

          {carrinho.map((item) => (
            <div key={item.produto.id} className="bg-white p-3 mb-2 rounded">
              <div className="row align-items-center">
                <div className="col-auto">
                  <div className="bg-dark text-white p-3 d-flex align-items-center justify-content-center small">
                    {item.produto.nome}
                  </div>
                </div>
                <div className="col">
                  <Link
                    to={`/produto/${item.produto.id}`}
                    className="text-decoration-none"
                  >
                    <h6 className="mb-1">{item.produto.nome}</h6>
                  </Link>
                  <p className="mb-0">R$ {item.produto.preco.toFixed(2)}</p>
                </div>
                <div className="col-auto">
                  <button
                    className="btn btn-outline-success btn-sm rounded-circle me-2"
                    onClick={() => aumentarQuantidade(item.produto.id)}
                  >
                    +
                  </button>
                  <span className="mx-2">{item.quantidade}</span>
                  <button
                    className="btn btn-outline-danger btn-sm rounded-circle me-3"
                    onClick={() => diminuirQuantidade(item.produto.id)}
                  >
                    -
                  </button>
                </div>
                <div className="col-auto">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => excluirDoCarrinho(item.produto.id)}
                  >
                    🗑️ Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="d-flex justify-content-between mt-4">
            <button
              className="btn btn-danger"
              onClick={limparCarrinho}
              disabled={carrinho.length === 0}
            >
              Limpar
            </button>
            <button
              className="btn btn-success"
              onClick={handleFinalizarCompra}
              disabled={carrinho.length === 0}
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-primary text-white text-center py-3 mt-5">
        <p className="mb-0">Direitos Autorais. 2025.</p>
      </footer>
    </body>
  );
}

export default Carrinho;
