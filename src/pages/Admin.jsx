import { Link } from "react-router-dom";
import { useState, useMemo } from "react";

function Admin({ produtos, compras, adicionarProduto }) {
  const [filtro, setFiltro] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    preco: "",
  });

  const comprasFiltradas = useMemo(() => {
    if (!filtro) return compras;

    return compras.filter((compra) =>
      compra.itens.some((item) =>
        item.produto.nome.toLowerCase().includes(filtro.toLowerCase())
      )
    );
  }, [filtro, compras]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (novoProduto.nome && novoProduto.preco) {
      adicionarProduto({
        nome: novoProduto.nome,
        preco: parseFloat(novoProduto.preco),
      });
      setNovoProduto({ nome: "", preco: "" });
      setMostrarForm(false);
    }
  };

  return (
    <body>
      <header className="bg-primary text-white text-center py-3">
        <h1>Administração - Minha Loja</h1>
      </header>

      <main className="container my-4">
        {/* botao para voltar */}
        <Link to="/" className="text-decoration-none">
          ↩ Voltar para Loja
        </Link>

        {/* lista com produtos existentes */}
        <div className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Produtos Disponíveis ({produtos.length})</h2>
            <button
              className={`btn ${mostrarForm ? "btn-danger" : "btn-warning"}`}
              onClick={() => setMostrarForm(!mostrarForm)}
            >
              {mostrarForm ? "✕ Cancelar" : "+ Adicionar Produto"}
            </button>
          </div>

          {/* form para adicioanr produto */}
          {mostrarForm && (
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Adicionar Novo Produto</h5>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="nomeProduto" className="form-label">
                        Nome do Produto
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nomeProduto"
                        placeholder="Ex: Notebook Gamer"
                        value={novoProduto.nome}
                        onChange={(e) =>
                          setNovoProduto({
                            ...novoProduto,
                            nome: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="precoProduto" className="form-label">
                        Preço (R$)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        className="form-control"
                        id="precoProduto"
                        placeholder="Ex: 299.99"
                        value={novoProduto.preco}
                        onChange={(e) =>
                          setNovoProduto({
                            ...novoProduto,
                            preco: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-warning">
                      Adicionar Produto
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setMostrarForm(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* tabela com os produtos existentes */}
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Preço</th>
                  <th>Avaliações</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto) => (
                  <tr key={produto.id}>
                    <td>{produto.id}</td>
                    <td>{produto.nome}</td>
                    <td>R$ {produto.preco.toFixed(2)}</td>
                    <td>{produto.avaliacoes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* lista de compras */}
        <div className="mt-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Compras Realizadas ({comprasFiltradas.length})</h2>
          </div>

          {/* filtro para produtos presentes nas compras */}
          <div className="mb-4">
            <div className="input-group">
              <span className="input-group-text">🔍</span>
              <input
                type="text"
                className="form-control"
                placeholder="Filtrar por nome do produto..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
              {filtro && (
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setFiltro("")}
                >
                  Limpar
                </button>
              )}
            </div>
            {filtro && (
              <small className="text-muted">
                Mostrando compras que contêm "{filtro}"
              </small>
            )}
          </div>

          {/* lista com compras realizadas e com filtros aplicados, se forem feitosz */}
          {comprasFiltradas.length === 0 ? (
            <div className="alert alert-info">
              {filtro
                ? `Nenhuma compra encontrada com o produto "${filtro}"`
                : "Nenhuma compra realizada ainda."}
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
              {comprasFiltradas.map((compra) => (
                <div key={compra.id} className="col">
                  <div className="card h-100">
                    <div className="card-header bg-success text-white">
                      <strong>Compra #{compra.id}</strong>
                    </div>
                    <div className="card-body">
                      <p className="text-muted small mb-2">📅 {compra.data}</p>
                      <p className="mb-2">
                        <strong>Itens:</strong>{" "}
                        {compra.itens.reduce(
                          (total, item) => total + item.quantidade,
                          0
                        )}
                      </p>
                      <p className="mb-2">
                        <strong>Total:</strong> R$ {compra.total.toFixed(2)}
                      </p>
                      <Link
                        to={`/admin/compra/${compra.id}`}
                        className="btn btn-outline-primary btn-sm w-100"
                      >
                        Ver Detalhes
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-primary text-white text-center py-3 mt-5">
        <p className="mb-0">Direitos Autorais. 2025.</p>
      </footer>
    </body>
  );
}

export default Admin;
