import GlobalStyle, { ContentWrappper } from "./styles/GlobalStyle";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import store , {persistor} from "./store";

import history from "./services/history";
import Header from "./components/Header";
import { Router } from "react-router-dom";
import Routes from "./routes";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ContentWrappper className="content-wrapper">
            <Router history={history}>
            <GlobalStyle />
            <Header />
            <Routes />
            <ToastContainer autoClose={1000} className="toast-container" />
          </Router>
        </ContentWrappper>
      </PersistGate>
    </Provider>
  );
}

export default App;
