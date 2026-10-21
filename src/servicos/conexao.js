const API_URL = "https://local-shopping-back.vercel.app/api";

async function requisicao(caminho, opcoes = {}) {
  const resposta = await fetch(`${API_URL}${caminho}`, {
    ...opcoes,
    headers: {
      "Content-Type": "application/json",
      ...opcoes.headers,
    },
  });

  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => ({}));
    throw new Error(erro.erro || "Não foi possível realizar a operação.");
  }

  if (resposta.status === 204) return null;

  return resposta.json();
}

export const API = {
  listarLojas: () => requisicao("/lojas"),
  buscarLoja: (id) => requisicao(`/lojas/${id}`),

  listarProdutos: (filtros = {}) => {
    const parametros = new URLSearchParams();

    Object.entries(filtros).forEach(([chave, valor]) => {
      if (valor !== undefined && valor !== null && valor !== "") {
        parametros.set(chave, valor);
      }
    });

    const query = parametros.toString();
    return requisicao(`/produtos${query ? `?${query}` : ""}`);
  },

  buscarProduto: (id) => requisicao(`/produtos/${id}`),

  listarFavoritos: (usuarioId) =>
    requisicao(`/favoritos?usuarioId=${encodeURIComponent(usuarioId)}`),

  adicionarFavorito: (usuarioId, produtoId) =>
    requisicao("/favoritos", {
      method: "POST",
      body: JSON.stringify({ usuarioId, produtoId }),
    }),

  removerFavorito: (usuarioId, produtoId) =>
    requisicao(`/favoritos/${produtoId}`, {
      method: "DELETE",
      body: JSON.stringify({ usuarioId }),
    }),
};
