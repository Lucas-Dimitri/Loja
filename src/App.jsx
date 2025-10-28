import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./bs-customizacao.css";
import Home from "./pages/Home";
import Produto from "./pages/Produto";
import Carrinho from "./pages/Carrinho";
import Sucesso from "./pages/Sucesso";
import Admin from "./pages/Admin";
import DetalhesCompra from "./pages/DetalhesCompra";

function App() {
  const [carrinho, setCarrinho] = useState([]);

  const [compras, setCompras] = useState([]);

  const [produtos, setProdutos] = useState([
    { id: 1, nome: "Camisa Polo", preco: 129.9, avaliacoes: 87 },
    { id: 2, nome: "Tênis Esportivo", preco: 299.99, avaliacoes: 154 },
    { id: 3, nome: "Mochila Executiva", preco: 189.5, avaliacoes: 213 },
    { id: 4, nome: "Fone Bluetooth", preco: 89.0, avaliacoes: 42 },
    { id: 5, nome: "Relógio Digital", preco: 250.0, avaliacoes: 98 },
    { id: 6, nome: "Copo Térmico", preco: 45.75, avaliacoes: 11 },
    { id: 7, nome: "Mouse Gamer", preco: 75.99, avaliacoes: 27 },
    { id: 8, nome: "Teclado Mecânico", preco: 349.9, avaliacoes: 305 },
    { id: 9, nome: "Headset", preco: 599.9, avaliacoes: 23 },
  ]);

  const adicionarProduto = (novoProduto) => {
    const novoId =
      produtos.length > 0 ? Math.max(...produtos.map((p) => p.id)) + 1 : 1;
    setProdutos([...produtos, { ...novoProduto, id: novoId, avaliacoes: 0 }]);
  };

  const adicionarAoCarrinho = (produto) => {
    const itemExistente = carrinho.find(
      (item) => item.produto.id === produto.id
    );

    if (itemExistente) {
      setCarrinho(
        carrinho.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      );
    } else {
      setCarrinho([...carrinho, { produto, quantidade: 1 }]);
    }
  };

  const aumentarQuantidade = (produtoId) => {
    setCarrinho(
      carrinho.map((item) =>
        item.produto.id === produtoId
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
  };

  const diminuirQuantidade = (produtoId) => {
    setCarrinho(
      carrinho.map((item) =>
        item.produto.id === produtoId
          ? { ...item, quantidade: Math.max(1, item.quantidade - 1) }
          : item
      )
    );
  };

  const excluirDoCarrinho = (produtoId) => {
    setCarrinho(carrinho.filter((item) => item.produto.id !== produtoId));
  };

  const limparCarrinho = () => {
    setCarrinho([]);
  };

  const finalizarCompra = (itensCompra) => {
    const novoId =
      compras.length > 0 ? Math.max(...compras.map((c) => c.id)) + 1 : 1;
    const novaCompra = {
      id: novoId,
      data: new Date().toLocaleString("pt-BR"),
      itens: itensCompra,
      total: itensCompra.reduce(
        (total, item) => total + item.produto.preco * item.quantidade,
        0
      ),
    };
    setCompras([...compras, novaCompra]);
    limparCarrinho();
  };

  const getTotalItens = () => {
    return carrinho.reduce((total, item) => total + item.quantidade, 0);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              produtos={produtos}
              adicionarAoCarrinho={adicionarAoCarrinho}
              carrinhoCount={getTotalItens()}
            />
          }
        />
        <Route
          path="/produto/:id"
          element={
            <Produto
              produtos={produtos}
              adicionarAoCarrinho={adicionarAoCarrinho}
              carrinhoCount={getTotalItens()}
            />
          }
        />
        <Route
          path="/carrinho"
          element={
            <Carrinho
              carrinho={carrinho}
              excluirDoCarrinho={excluirDoCarrinho}
              aumentarQuantidade={aumentarQuantidade}
              diminuirQuantidade={diminuirQuantidade}
              limparCarrinho={limparCarrinho}
              finalizarCompra={finalizarCompra}
              carrinhoCount={getTotalItens()}
            />
          }
        />
        <Route path="/sucesso" element={<Sucesso />} />
        <Route
          path="/admin"
          element={
            <Admin
              produtos={produtos}
              compras={compras}
              adicionarProduto={adicionarProduto}
            />
          }
        />
        <Route
          path="/admin/compra/:id"
          element={<DetalhesCompra compras={compras} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
