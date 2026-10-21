import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Cabecalho from "./componentes/Cabecalho";
import Inicio from "./paginas/Inicio";
import Explorar from "./paginas/Explorar";
import Favoritos from "./paginas/Favoritos";
import DetalhesProduto from "./paginas/DetalhesProduto";

function NaoEncontrada() {
  return (
    <main className="mensagem-vazia">
      <span>🎀</span>
      <h1>Ops! Essa página não existe.</h1>
      <a href="/" className="botao-principal">Voltar ao início</a>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Cabecalho />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/explorar" element={<Explorar />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/produto/:id" element={<DetalhesProduto />} />
        <Route path="*" element={<NaoEncontrada />} />
      </Routes>

      <footer className="rodape">
        <Link to="/" className="rodape-logo">LocalShopping ♡</Link>
        <p>Encontre perto. Escolha melhor. Compre local.</p>
        <span>Feito com carinho para valorizar o comércio local 🎀</span>
      </footer>
    </BrowserRouter>
  );
}