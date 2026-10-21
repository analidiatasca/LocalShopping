import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../servicos/conexao";
import CartaoProduto from "../componentes/CartaoProduto";

const USUARIO_ID = "visitante-local";

export default function Favoritos() {
  const [produtos, setProdutos] = useState([]);
  const [idsFavoritos, setIdsFavoritos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregarFavoritos() {
    setCarregando(true);
    setErro("");

    try {
      const [todosProdutos, favoritos] = await Promise.all([
        API.listarProdutos(),
        API.listarFavoritos(USUARIO_ID),
      ]);

      const listaProdutos = Array.isArray(todosProdutos) ? todosProdutos : [];
      const listaFavoritos = Array.isArray(favoritos) ? favoritos : [];

      const ids = listaFavoritos.map((item) =>
        typeof item === "string"
          ? item
          : item.produtoId || item.id
      );

      setIdsFavoritos(ids.filter(Boolean));
      setProdutos(listaProdutos.filter((produto) => ids.includes(produto.id)));
    } catch {
      setErro("Não foi possível carregar os favoritos. Confira a API.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarFavoritos();
  }, []);

  async function removerFavorito(produto) {
    try {
      await API.removerFavorito(USUARIO_ID, produto.id);
      await carregarFavoritos();
    } catch (erro) {
      setErro(erro.message || "Não foi possível remover o favorito.");
    }
  }

  return (
    <main className="pagina-interna">
      <section className="explorar-topo">
        <span className="subtitulo">SEUS QUERIDINHOS</span>
        <h1>Uma coleção de amor <span>♥</span></h1>
        <p>Guarde aqui os produtos que chamaram sua atenção.</p>
      </section>

      <section className="secao">
        {carregando ? (
          <p className="mensagem-vazia">Carregando seus favoritos... ♡</p>
        ) : erro ? (
          <p className="mensagem-vazia">{erro}</p>
        ) : produtos.length ? (
          <div className="grade-produtos">
            {produtos.map((produto) => (
              <CartaoProduto
                key={produto.id}
                produto={produto}
                favorito={idsFavoritos.includes(produto.id)}
                aoAlternarFavorito={removerFavorito}
              />
            ))}
          </div>
        ) : (
          <div className="mensagem-vazia">
            <span>♡</span>
            <h3>Você ainda não tem favoritos!</h3>
            <p>Quando encontrar algo que ama, guarde aqui.</p>
            <Link to="/explorar" className="botao-principal">
              Encontrar achadinhos →
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}