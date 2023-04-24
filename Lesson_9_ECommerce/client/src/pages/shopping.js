import React, { useState, useEffect } from "react";
import NavBar from "../components/nav";
import productImg from "../images/productImg.png";
import Axios from "axios";

const PAGE_PRODUCTS = "products";
const PAGE_CART = "cart";

const Shopping = () => {
  const [cartList, setCartList] = useState([]);
  const [page, setPage] = useState(PAGE_PRODUCTS);

  const [products, setProducts] = useState([
    // {
    //   image: productImg,
    //   name: "Product Title",
    //   description: "A description of the product",
    //   price: "Price"
    // },
    // {
    //   image: productImg,
    //   name: "Product Title",
    //   description: "A description of the product",
    //   price: "Price"
    // },
    // {
    //   image: productImg,
    //   name: "Product Title",
    //   description: "A description of the product",
    //   price: "Price"
    // },
    // {
    //   image: productImg,
    //   name: "Product Title",
    //   description: "A description of the product",
    //   price: "Price"
    // },
    // {
    //   image: productImg,
    //   name: "Product Title",
    //   description: "A description of the product",
    //   price: "Price"
    // },
    // {
    //   image: productImg,
    //   name: "Product Title",
    //   description: "A description of the product",
    //   price: "Price"
    // },
    // {
    //   image: productImg,
    //   name: "Product Title",
    //   description: "A description of the product",
    //   price: "Price"
    // },
    // {
    //   image: productImg,
    //   name: "Product Title",
    //   description: "A description of the product",
    //   price: "Price"
    // },
    // {
    //   image: productImg,
    //   name: "Product Title",
    //   description: "A description of the product",
    //   price: "Price"
    // },
    // {
    //   image: productImg,
    //   name: "Product Title",
    //   description: "A description of the product",
    //   price: "Price"
    // },
    // {
    //   image: productImg,
    //   name: "Product Title",
    //   description: "A description of the product",
    //   price: "Price"
    // },
  ]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/ecommerce/products`)
      .then((res) => {
        console.log("data:", res.data);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const addToCart = (product) => {
    setCartList([...cartList, product]);
  };

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  const renderProducts = () => (
    <>
      <header id="shopping-head">
        <button onClick={() => navigateTo(PAGE_CART)} id="goToCart">
          Go to Cart ({cartList.length})
        </button>
      </header>
      <div id="shopping">
        {products.map((product, idx) => (
          <div className="card" key={idx}>
            <div id="product">
              <img src={product.image} alt="" />
              <h2> {product.name} </h2>
              <h3> {product.description} </h3>
              <h3> {product.price} </h3>
              <button onClick={() => addToCart(product)}> Add to Cart </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );

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
            </div>
          </div>
        ))}
        <button id="checkout-btn">Checkout</button>
      </div>
    </>
  );

  return (
    <div className="main">
      {/* {renderProducts()} */}
      <>
        <header id="shopping-head">
          <button onClick={() => navigateTo(PAGE_CART)} id="goToCart">
            Go to Cart ({cartList.length})
          </button>
        </header>
        <div id="shopping">
          {products.map((product, idx) => (
            <div className="card" key={idx}>
              <div id="product">
                <img src={productImg} alt="" />
                <h2> {product.name} </h2>
                <h3> {product.description} </h3>
                <h3> {product.price} </h3>
                <button onClick={() => addToCart(product)}>
                  {" "}
                  Add to Cart{" "}
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
      {page === PAGE_CART && renderCart()}
      <NavBar length={cartList.length} />
    </div>
  );
};

export default Shopping;
