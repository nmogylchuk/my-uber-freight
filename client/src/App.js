import React from 'react';
import './scss/styles.scss';

import { BrowserRouter } from "react-router-dom";
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import DriverHeader from './components/Driver/Header';
import ShipperHeader from './components/Shipper/Header';
// import Footer from './components/Footer/Footer';

function App() {
  const {token, login, logout, userId, userType} = useAuth();

  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated, userType);

  return (
    <AuthContext.Provider value={{token, login, logout, userId, userType, isAuthenticated}}>
      <BrowserRouter>
        { isAuthenticated && ((userType === "driver" && <DriverHeader />) || (userType === "shipper" && <ShipperHeader />)) }
        <div className="App">
          {routes}
        </div>
        {/* <Footer /> */}
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
