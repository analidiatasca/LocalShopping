export default function BarraPesquisa({
  valor,
  aoAlterar,
  placeholder = "O que você está procurando?",
}) {
  return (
    <div className="barra-pesquisa">
      <span className="pesquisa-icone">⌕</span>

      <input
        type="search"
        value={valor}
        onChange={(evento) => aoAlterar(evento.target.value)}
        placeholder={placeholder}
        aria-label="Pesquisar produtos"
      />

      {valor && (
        <button
          className="limpar-pesquisa"
          onClick={() => aoAlterar("")}
          aria-label="Limpar pesquisa"
        >
          ×
        </button>
      )}
    </div>
  );
}