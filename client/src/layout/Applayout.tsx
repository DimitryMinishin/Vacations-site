import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import PathRouter from "./Pathrouter";

function AppLayout() {
  return (
    <div>
      <Header />
      <PathRouter />
      <Footer />
    </div>
  );
}

export default AppLayout;
