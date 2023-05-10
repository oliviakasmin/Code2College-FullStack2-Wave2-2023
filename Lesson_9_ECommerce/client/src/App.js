import React, {useEffect, useState} from "react";
import "./styling/App.css";
import "./styling/nav.css";
import "./styling/footer.css";
import "./styling/home.css";
import "./styling/shopping.css";
import "./styling/about.css";
import "./styling/account.css";
import "./styling/contact.css";
import "./styling/hero.css";
import "./styling/featured.css";


import About from "./pages/about";
import Account from "./pages/account";
import Cart from "./pages/cart";
import Contact from "./pages/contact";
import Shopping from "./pages/shopping";
import Home from "./pages/home";
import Axios from "axios";


import { BrowserRouter, Route, Routes } from "react-router-dom";

import { NavBar } from "./components/index.js";
import { Footer } from "./components/index.js";
const PAGE_PRODUCTS = "products";
export const PAGE_CART = "cart";

function App() {
  const [cartList, setCartList] = useState([]);
  const [page, setPage] = useState(PAGE_PRODUCTS);
  const [products, setProducts] = useState([]);
  

  const getProducts = () => {
    Axios.get(`http://localhost:3001/api/ecommerce/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getProducts()
    getCart()

  }, []);

  const getCart = () => {
    Axios.get(`http://localhost:3001/api/ecommerce/cart`)
      .then((res) => {
        setCartList(res.data);
      })
      .catch((err) => console.log(err));
  }

  const removeFromCart = (id) => {
    Axios.delete(`http://localhost:3001/api/ecommerce/cart/${id}`)
      .then((res) => {
        getCart();
      })
      .catch((err) => console.log(err));
    }
    
  const addToCart = (id) => {
    Axios.post(`http://localhost:3001/api/ecommerce/cart/${id}`)
      .then((res) => {
        getCart();
      })
      .catch((err) => console.log(err));
  };

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  const renderCart = () => (
    <>
      <div id="cart-container">
        <button onClick={() => navigateTo(PAGE_PRODUCTS)} id="products-btn">
          Back to Products
        </button>

        <h1 id="cart-title"> Cart </h1>

        {cartList.map((product, idx) => (
          <div className="card card-container" key={idx}>
            <div id="product">
              <img src={product.image} alt="" />
              <h2> {product.name} </h2>
              <h3> {product.description} </h3>
              <h3> {product.price} </h3>
              <button onClick={()=>removeFromCart(product.id)}>Remove</button>
            </div>
          </div>
        ))}
        <button id="checkout-btn">Checkout</button>
      </div>
    </>
  );

  return (
    <>
      <BrowserRouter>
        <div className="main">
        <NavBar setProducts={setProducts} cartPath={()=>navigateTo(PAGE_CART)} length={cartList.length} />
          <Footer />
        </div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shopping" element={<Shopping cartList={cartList} navigateTo={navigateTo} addToCart={addToCart} products={products}/>} />
        </Routes>
          {page === PAGE_CART && renderCart()}
      </BrowserRouter>
    </>
  );
}

export default App;
