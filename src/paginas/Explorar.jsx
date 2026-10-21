import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API } from "../servicos/conexao";
import BarraPesquisa from "../componentes/BarraPesquisa";
import CartaoProduto from "../componentes/CartaoProduto";

export default function Explorar() {
  const [produtos, setProdutos] = useState([]);
  const [lojas, setLojas] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [categoria, setCategoria] = useState("");
  const [lojaId, setLojaId] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [parametros] = useSearchParams();

  useEffect(() => {
    setCategoria(parametros.get("categoria") || "");
  }, [parametros]);

  useEffect(() => {
    Promise.all([API.listarProdutos(), API.listarLojas()])
      .then(([listaProdutos, listaLojas]) => {
        setProdutos(Array.isArray(listaProdutos) ? listaProdutos : []);
        setLojas(Array.isArray(listaLojas) ? listaLojas : []);
      })
      .catch(() => setErro("Não foi possível carregar os dados. Confira a API."))
      .finally(() => setCarregando(false));
  }, []);

  const produtosFiltrados = produtos.filter((produto) => {
    const texto = `${produto.nome || ""} ${produto.descricao || ""}`.toLowerCase();

    const correspondePesquisa = texto.includes(pesquisa.toLowerCase());

    const correspondeCategoria =
      !categoria ||
      produto.categoria?.toLowerCase() === categoria.toLowerCase();

    const correspondeLoja = !lojaId || produto.lojaId === lojaId;

    return correspondePesquisa && correspondeCategoria && correspondeLoja;
  });

  return (
    <main className="pagina-interna">
      <section className="explorar-topo">
        <span className="subtitulo">UM MUNDO DE ACHADINHOS</span>
        <h1>Encontre o que combina com você <span>♡</span></h1>
        <p>Pesquise, descubra e encontre produtos nas lojas da sua cidade.</p>

        <BarraPesquisa
          valor={pesquisa}
          aoAlterar={setPesquisa}
        />
      </section>

      <section className="secao explorar-conteudo">
        <div className="filtros">
          <label>
            Categoria
            <select
              value={categoria}
              onChange={(evento) => setCategoria(evento.target.value)}
            >
              <option value="">Todas as categorias</option>
              <option value="Roupas">Roupas</option>
              <option value="Calçados">Calçados</option>
              <option value="Beleza">Beleza</option>
              <option value="Acessórios">Acessórios</option>
              <option value="Casa">Casa</option>
            </select>
          </label>

          <label>
            Loja
            <select
              value={lojaId}
              onChange={(evento) => setLojaId(evento.target.value)}
            >
              <option value="">Todas as lojas</option>
              {lojas.map((loja) => (
                <option value={loja.id} key={loja.id}>
                  {loja.nome}
                </option>
              ))}
            </select>
          </label>

          <button
            className="botao-limpar"
            onClick={() => {
              setPesquisa("");
              setCategoria("");
              setLojaId("");
            }}
          >
            Limpar filtros ×
          </button>
        </div>

        <div className="resultado-titulo">
          <h2>Produtos encontrados <span>♡</span></h2>
          <span>{produtosFiltrados.length} produto(s)</span>
        </div>

        {carregando ? (
          <p className="mensagem-vazia">Carregando seus achadinhos... 🎀</p>
        ) : erro ? (
          <p className="mensagem-vazia">{erro}</p>
        ) : produtosFiltrados.length ? (
          <div className="grade-produtos">
            {produtosFiltrados.map((produto) => (
              <CartaoProduto key={produto.id} produto={produto} />
            ))}
          </div>
        ) : (
          <div className="mensagem-vazia">
            <span>🛍️</span>
            <h3>Nenhum produto encontrado</h3>
            <p>Tente mudar a pesquisa ou escolher outra categoria.</p>
          </div>
        )}
      </section>
    </main>
  );
}