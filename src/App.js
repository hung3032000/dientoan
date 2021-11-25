import 'react-perfect-scrollbar/dist/css/styles.css';
import Routes from './routes/Routes';
import GlobalStyles from './components/GlobalStyles';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './styles/index.scss';
import { Provider } from 'react-redux';
import store, { history } from './store';
import 'sweetalert2/src/sweetalert2.scss';
import { ConnectedRouter } from 'connected-react-router';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
let persistor = persistStore(store);

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PersistGate loading={null} persistor={persistor}>
      <GlobalStyles />
        <Routes />
      </PersistGate>
    </ConnectedRouter>
  </Provider>
);

export default App;
