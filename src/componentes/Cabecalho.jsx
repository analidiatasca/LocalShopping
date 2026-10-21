import { Link, NavLink } from "react-router-dom";

export default function Cabecalho() {
  return (
    <header className="cabecalho">
      <Link to="/" className="logo">
        <span className="logo-icone">♡</span>
        <span>
          Local<span className="logo-destaque">Shopping</span>
          <small>encontre perto, escolha melhor</small>
        </span>
      </Link>

      <nav className="navegacao">
        <NavLink to="/" end>Início</NavLink>
        <NavLink to="/explorar">Explorar</NavLink>
        <NavLink to="/favoritos">♡ Favoritos</NavLink>
      </nav>

      <Link to="/explorar" className="botao-cabecalho">
        Encontrar produtos <span>♡</span>
      </Link>
    </header>
  );
}