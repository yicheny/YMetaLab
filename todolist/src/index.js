import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {createStore} from "redux";
import formApp from "./reducers/formApp";
import styles from './index.module.scss';

const store = createStore(formApp);

ReactDOM.render(
  <React.StrictMode>
      <div className={styles.colorBlue}>
          <Provider store={store}>
              <App />
          </Provider>
      </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
