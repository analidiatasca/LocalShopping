import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../servicos/conexao";

export default function DetalhesProduto() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loja, setLoja] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      try {
        const item = await API.buscarProduto(id);

        if (!ativo) return;
        setProduto(item);

        if (item.lojaId) {
          try {
            const dadosLoja = await API.buscarLoja(item.lojaId);
            if (ativo) setLoja(dadosLoja);
          } catch {
            // O produto continua visível se os dados da loja falharem.
          }
        }
      } catch {
        if (ativo) setErro("Não encontramos esse produto.");
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregar();
    return () => {
      ativo = false;
    };
  }, [id]);

  if (carregando) {
    return <main className="mensagem-vazia">Carregando produto... 🎀</main>;
  }

  if (erro || !produto) {
    return (
      <main className="mensagem-vazia">
        <h2>{erro || "Produto não encontrado."}</h2>
        <Link to="/explorar" className="botao-principal">
          Voltar para explorar
        </Link>
      </main>
    );
  }

  const imagem = produto.imagem || produto.imagemUrl || produto.foto;

  return (
    <main className="pagina-interna">
      <section className="detalhes-produto">
        <div className="detalhes-imagem">
          {imagem ? (
            <img src={imagem} alt={produto.nome} />
          ) : (
            <span>🎀</span>
          )}
        </div>

        <div className="detalhes-conteudo">
          <span className="subtitulo">
            {produto.categoria || "ACHADINHO LOCAL"}
          </span>

          <h1>{produto.nome}</h1>

          <strong className="detalhes-preco">
            {Number.isFinite(Number(produto.preco))
              ? Number(produto.preco).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              : "Consulte o preço"}
          </strong>

          <p>{produto.descricao || "Entre em contato com a loja para saber mais sobre este produto."}</p>

          <div className="detalhes-loja">
            <span>♡ Disponível em</span>
            <strong>{loja?.nome || "Loja local"}</strong>
            {loja?.cidade && <span>📍 {loja.cidade}</span>}
            {loja?.endereco && <span>{loja.endereco}</span>}
          </div>

          <Link to="/explorar" className="botao-principal">
            Continuar explorando →
          </Link>
        </div>
      </section>
    </main>
  );
}