import { Link, useParams } from "react-router-dom";

function DetalhesCompra({ compras }) {
  const { id } = useParams();
  const compra = compras.find((c) => c.id === parseInt(id));

  if (!compra) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger">Compra não encontrada</div>
        <Link to="/admin" className="btn btn-primary">
          Voltar para Administração
        </Link>
      </div>
    );
  }

  return (
    <body>
      <header className="bg-primary text-white text-center py-3">
        <h1>Detalhes da Compra</h1>
      </header>

      <main className="container my-4">
        <Link to="/admin" className="text-decoration-none">
          ↩ Voltar para Administração
        </Link>

        <div className="card mt-4">
          <div className="card-header bg-success text-white">
            <h3 className="mb-0">Compra #{compra.id}</h3>
          </div>
          <div className="card-body">
            <div className="row mb-4">
              <div className="col-md-6">
                <p>
                  <strong>Data:</strong> {compra.data}
                </p>
                <p>
                  <strong>Total de Itens:</strong>{" "}
                  {compra.itens.reduce(
                    (total, item) => total + item.quantidade,
                    0
                  )}
                </p>
              </div>
              <div className="col-md-6 text-md-end">
                <h4 className="text-success">
                  <strong>Total: R$ {compra.total.toFixed(2)}</strong>
                </h4>
              </div>
            </div>

            <h5 className="mb-3">Produtos Comprados</h5>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Produto</th>
                    <th className="text-center">Quantidade</th>
                    <th className="text-end">Preço Unit.</th>
                    <th className="text-end">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {compra.itens.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <Link
                          to={`/produto/${item.produto.id}`}
                          className="text-decoration-none"
                        >
                          {item.produto.nome}
                        </Link>
                      </td>
                      <td className="text-center">{item.quantidade}</td>
                      <td className="text-end">
                        R$ {item.produto.preco.toFixed(2)}
                      </td>
                      <td className="text-end">
                        <strong>
                          R$ {(item.produto.preco * item.quantidade).toFixed(2)}
                        </strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="table-light">
                  <tr>
                    <td colSpan="3" className="text-end">
                      <strong>Total:</strong>
                    </td>
                    <td className="text-end">
                      <strong className="text-success fs-5">
                        R$ {compra.total.toFixed(2)}
                      </strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-primary text-white text-center py-3 mt-5">
        <p className="mb-0">Direitos Autorais. 2025.</p>
      </footer>
    </body>
  );
}

export default DetalhesCompra;
