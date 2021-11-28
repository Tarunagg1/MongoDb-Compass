import React from 'react';
import Header from './components/Header.js';
import Connect from './components/Connect';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <Header />
      <Switch>
        <Route path="/" component={Connect} exact />
        <Route path="/dashboard" component={Dashboard} exact />
      </Switch>
    </React.Fragment>
  );
}

export default App;
