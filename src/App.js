import GlobalStyle, { ContentWrappper } from "./styles/GlobalStyle";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from "./store";
import { CashierProvider } from "./Context/CashierContext";
import history from "./services/history";
import Header from "./components/Layout/Header";
import { Router } from "react-router-dom";
import Routes from "./routes";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CashierProvider>
          <ContentWrappper className="content-wrapper">
            <Router history={history}>
              <GlobalStyle />
              <Header />
              <Routes />
              <ToastContainer autoClose={1000} className="toast-container" />
            </Router>
          </ContentWrappper>
        </CashierProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
