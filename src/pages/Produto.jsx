import { Link, useParams } from "react-router-dom";

function Produto({ produtos, adicionarAoCarrinho, carrinhoCount }) {
  const { id } = useParams();
  const produto = produtos.find((p) => p.id === parseInt(id));

  if (!produto) {
    return <div>Produto não encontrado</div>;
  }

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

      {/* barra do carrinho */}
      <div className="bg-light py-3">
        <div className="container">
          <Link to="/carrinho" className="text-decoration-none">
            <h2 className="text-primary">🛒 Carrinho ({carrinhoCount})</h2>
          </Link>
        </div>
      </div>

      <main className="container my-4">
        <Link to="/" className="text-decoration-none">
          ↩ Voltar
        </Link>

        <div className="row mt-4">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src={`${import.meta.env.BASE_URL}${produto.nome}.jpg`}
              alt={produto.nome}
              className="img-fluid w-100 rounded"
            />
          </div>
          <div className="col-md-6">
            <h2>{produto.nome}</h2>
            <div className="text-warning fs-5 mb-3">
              {renderStars(produto.avaliacoes)}{" "}
              <span className="text-muted">{produto.avaliacoes}</span>
            </div>
            <div className="border rounded p-3 mb-3">
              <h5>Descrição:</h5>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
                et totam voluptatum quo dolores iste laborum dolore nulla quas
                eum voluptates doloremque harum beatae cum maxime, consequuntur
                molestiae culpa illum. Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Hic recusandae magnam cum omnis beatae et
                facilis dolore sunt a, repellendus iste, voluptatum, rerum
                reprehenderit esse laudantium ducimus eum. Recusandae voluptates
                dolor quia, quaerat harum soluta quibusdam. Possimus, ipsa
                sequi. Laudantium similique deserunt saepe distinctio, natus
                odit non explicabo consequuntur fuga?
              </p>
            </div>
            <h3 className="text-success mb-3">R$ {produto.preco.toFixed(2)}</h3>
            <button
              className="btn btn-success btn-lg w-100"
              onClick={() => adicionarAoCarrinho(produto)}
            >
              🛒 Comprar
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

export default Produto;
