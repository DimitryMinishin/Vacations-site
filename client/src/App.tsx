import { Provider } from "react-redux";
import "./App.css";
import SocketContainer from "./components/socket/socket-container";
import { store } from "./components/store/store";
import AppLayout from "./layout/Applayout";

function App() {
  return (
    <div className="App">
      <SocketContainer>
        <Provider store={store}>
          <AppLayout />
        </Provider>
      </SocketContainer>
    </div>
  );
}

export default App;
