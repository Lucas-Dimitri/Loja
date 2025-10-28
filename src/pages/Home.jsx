import { Link } from "react-router-dom";

function Home({ produtos, adicionarAoCarrinho, carrinhoCount }) {
  const renderStars = (avaliacoes) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.min(5, Math.floor(avaliacoes / 20))) {
        stars.push(<span key={i}>★</span>);
      } else {
        stars.push(<span key={i}>☆</span>);
      }
    }
    return stars;
  };

  return (
    <body>
      <header className="bg-primary text-white text-center py-3">
        <h1>Minha Loja</h1>
      </header>

      {/* barra do carrinho e botao admin */}
      <div className="bg-light py-3">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/carrinho" className="text-decoration-none">
              <h2 className="text-primary mb-0">
                🛒 Carrinho ({carrinhoCount})
              </h2>
            </Link>
            <Link to="/admin" className="btn btn-outline-secondary">
              ⚙️ Admin
            </Link>
          </div>
        </div>
      </div>

      <main className="container my-4">
        <div>
          <h2>Lista de Produtos</h2>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {produtos.map((produto) => (
              <div key={produto.id} className="col">
                <div className="card h-100">
                  <img
                    src={`${import.meta.env.BASE_URL}${produto.nome}.jpg`}
                    alt={produto.nome}
                    className="card-img-top"
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">
                      <Link
                        to={`/produto/${produto.id}`}
                        className="text-decoration-none text-primary"
                      >
                        {produto.nome}
                      </Link>
                    </h5>
                    <div className="text-warning">
                      {renderStars(produto.avaliacoes)}{" "}
                      <span className="text-muted">{produto.avaliacoes}</span>
                    </div>
                    <p className="card-text fw-bold">
                      R$ {produto.preco.toFixed(2)}
                    </p>
                    <button
                      className="btn btn-outline-primary w-100"
                      onClick={() => adicionarAoCarrinho(produto)}
                    >
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-primary text-white text-center py-3 mt-5">
        <p className="mb-0">Direitos Autorais. 2025.</p>
      </footer>
    </body>
  );
}

export default Home;
