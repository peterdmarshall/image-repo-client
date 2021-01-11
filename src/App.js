import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from './auth/protectedRoute';
import Loading from './components/Loading';
import Dashboard from './components/Dashboard';

function App() {
  const { isLoading } = useAuth0();

  if(isLoading) {
    return <Loading />;
  }

  return (
    <Switch>
      <ProtectedRoute exact path="/" component={Dashboard}></ProtectedRoute>
    </Switch>
  );
}

export default App;
