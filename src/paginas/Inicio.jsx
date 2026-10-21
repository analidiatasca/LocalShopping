
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../servicos/conexao";
import BarraPesquisa from "../componentes/BarraPesquisa";
import CartaoProduto from "../componentes/CartaoProduto";

const categorias = [
  { nome: "Roupas", emoji: "👗" },
  { nome: "Calçados", emoji: "👟" },
  { nome: "Beleza", emoji: "🎀" },
  { nome: "Acessórios", emoji: "👜" },
  { nome: "Casa", emoji: "🏡" },
];

export default function Inicio() {
  const [pesquisa, setPesquisa] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [lojas, setLojas] = useState([]);
  const [erroProdutos, setErroProdutos] = useState(false);
  const [erroLojas, setErroLojas] = useState(false);

  useEffect(() => {
    API.listarProdutos()
      .then((dados) =>
        setProdutos(Array.isArray(dados) ? dados : [])
      )
      .catch(() => setErroProdutos(true));

    API.listarLojas()
      .then((dados) =>
        setLojas(Array.isArray(dados) ? dados : [])
      )
      .catch(() => setErroLojas(true));
  }, []);

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome?.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <main>
      <section className="hero">
        <div className="hero-conteudo">
          <span className="mini-etiqueta">
            ♡ seu próximo achadinho está perto
          </span>

          <h1>
            Seu estilo,
            <br />
            <span>pertinho de você!</span>
          </h1>

          <p>
            Descubra produtos incríveis nas lojas da sua cidade.
            Mais praticidade, mais estilo e mais compras locais. ♡
          </p>

          <BarraPesquisa
            valor={pesquisa}
            aoAlterar={setPesquisa}
          />

          <Link to="/explorar" className="botao-principal">
            Explorar produtos <span>→</span>
          </Link>

          <div className="hero-nota">
            <span>♡</span> Valorize as lojas da sua região!
          </div>
        </div>

        <div className="hero-decoracao">
          <div className="bolha bolha-1">♡</div>
          <div className="bolha bolha-2">✦</div>
          <div className="sacola-ilustracao">
            <span className="sacola-coracao">♡</span>
            <span className="sacola-texto">
              local<br />shopping
            </span>
          </div>
          <div className="flor-decorativa">✿</div>
          <div className="estrela-decorativa">✧</div>
        </div>
      </section>

      <section className="secao">
        <div className="secao-titulo">
          <div>
            <span className="subtitulo">ESCOLHA SEU ESTILO</span>
            <h2>O que você procura? <span>♡</span></h2>
          </div>
        </div>

        <div className="categorias">
          {categorias.map((categoria) => (
            <Link
              to={`/explorar?categoria=${encodeURIComponent(categoria.nome)}`}
              className="categoria"
              key={categoria.nome}
            >
              <span className="categoria-emoji">
                {categoria.emoji}
              </span>
              <span>{categoria.nome}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="secao">
        <div className="secao-titulo">
          <div>
            <span className="subtitulo">COMÉRCIO DA SUA REGIÃO</span>
            <h2>Lojinhas para conhecer <span>🏬</span></h2>
          </div>
        </div>

        {erroLojas ? (
          <p className="mensagem-vazia">
            Não foi possível carregar as lojas. Confira se a API está ligada.
          </p>
        ) : lojas.length > 0 ? (
          <div className="grade-lojas">
            {lojas.slice(0, 6).map((loja) => (
              <article className="cartao-loja" key={loja.id}>
                <div className="loja-icone">♡</div>

                <h3>{loja.nome}</h3>

                {loja.categoria && (
                  <span className="loja-categoria">
                    {loja.categoria}
                  </span>
                )}

                {loja.cidade && (
                  <p>📍 {loja.cidade}</p>
                )}

                {loja.endereco && (
                  <p>🏠 {loja.endereco}</p>
                )}

                {loja.horario && (
                  <p>🕒 {loja.horario}</p>
                )}

                {loja.telefone && (
                  <p>☎️ {loja.telefone}</p>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="mensagem-vazia">
            <span>🎀</span>
            <h3>Novas lojinhas vêm aí!</h3>
            <p>
              Assim que você cadastrar lojas no banco de dados,
              elas aparecerão aqui.
            </p>
          </div>
        )}
      </section>

      <section className="secao">
        <div className="secao-titulo">
          <div>
            <span className="subtitulo">SELECIONADOS PARA VOCÊ</span>
            <h2>Achadinhos locais <span>🎀</span></h2>
          </div>

          <Link to="/explorar" className="link-ver-todos">
            Ver todos →
          </Link>
        </div>

        {erroProdutos ? (
          <p className="mensagem-vazia">
            Não conseguimos carregar os produtos. Confira se a API está ligada.
          </p>
        ) : produtosFiltrados.length > 0 ? (
          <div className="grade-produtos">
            {produtosFiltrados.slice(0, 4).map((produto) => (
              <CartaoProduto key={produto.id} produto={produto} />
            ))}
          </div>
        ) : (
          <div className="mensagem-vazia">
            <span>🎀</span>
            <h3>Seus próximos achadinhos aparecem aqui!</h3>
            <p>
              {pesquisa
                ? "Não encontramos produtos com esse nome."
                : "Assim que houver produtos cadastrados no banco, eles aparecerão nesta seção."}
            </p>
          </div>
        )}
      </section>

      <section className="banner-local">
        <span className="banner-icone">♡</span>
        <div>
          <h2>Comprar perto faz a diferença!</h2>
          <p>
            Descubra lojas locais e apoie quem faz parte da sua cidade.
          </p>
        </div>
        <Link to="/explorar" className="botao-banner">
          Descobrir produtos →
        </Link>
      </section>
    </main>
  );
}
