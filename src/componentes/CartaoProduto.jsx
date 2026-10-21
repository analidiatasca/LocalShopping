import { Link } from "react-router-dom";

export default function CartaoProduto({
  produto,
  favorito = false,
  aoAlternarFavorito,
}) {
  const id = produto.id || produto.codigo;
  const imagem =
    produto.imagem ||
    produto.imagemUrl ||
    produto.foto ||
    "";

  return (
    <article className="cartao-produto">
      <div className="produto-imagem">
        {imagem ? (
          <img src={imagem} alt={produto.nome} />
        ) : (
          <div className="imagem-placeholder">🎀</div>
        )}

        <button
          className={`botao-favorito ${favorito ? "ativo" : ""}`}
          onClick={() => aoAlternarFavorito?.(produto)}
          aria-label={favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          title={favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          {favorito ? "♥" : "♡"}
        </button>

        {produto.categoria && (
          <span className="etiqueta-categoria">{produto.categoria}</span>
        )}
      </div>

      <div className="produto-informacoes">
        <h3>{produto.nome}</h3>

        <p className="produto-descricao">
          {produto.descricao || "Um achadinho para você! ♡"}
        </p>

        <strong className="produto-preco">
          {Number.isFinite(Number(produto.preco))
            ? Number(produto.preco).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            : "Consulte o preço"}
        </strong>

        <Link to={`/produto/${id}`} className="botao-detalhes">
          Ver produto <span>→</span>
        </Link>
      </div>
    </article>
  );
}