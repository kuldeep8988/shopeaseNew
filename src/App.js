import React from "react";
import Footer from "./Componets/Footer";
import Header from "./Componets/Header";
import ProductCart from "./Componets/ProductCart";
import Home from "./Pages/Home";
import Kids from "./Pages/Kids";
import Mens from "./Pages/Mens";
import Woman from "./Pages/Woman";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductDetail from "./Componets/ProductDetail";
import { Provider } from "react-redux";
import Store from "./Store/Store";
import Cart from "./Componets/Cart";
import Wishlist from "./Componets/Wishlist";
import Paymentcan from "./Componets/Paymentcan";
import Paymentsucc from "./Componets/Paymentsucc";
import Login from "./Componets/Login";
import Ragistration from "./Componets/Ragistration";
import { PersistGate } from "redux-persist/es/integration/react";
import { persistor } from "./Store/Store";
import "./index.css";
function App() {
  return (
    <div>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Header></Header>
            <Routes>
              <Route path="/" element={<Home></Home>} />
              <Route path="/kids" element={<Kids></Kids>} />
              <Route path="/mens" element={<Mens></Mens>} />
              <Route path="/woman" element={<Woman></Woman>} />
             <Route path="/product/:id" element={<ProductDetail />} />

              <Route path="/cart" element={<Cart></Cart>}></Route>
              <Route path="/wish" element={<Wishlist></Wishlist>}></Route>
              <Route path="/cancel" element={<Paymentcan></Paymentcan>}></Route>
              <Route path="/1" element={<Home></Home>}></Route>
              <Route
                path="/sucess"
                element={<Paymentsucc></Paymentsucc>}
              ></Route>
              <Route path="/login" element={<Login></Login>}></Route>
              <Route
                path="/page"
                element={<Ragistration></Ragistration>}
              ></Route>
            </Routes>

            <Footer></Footer>
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
