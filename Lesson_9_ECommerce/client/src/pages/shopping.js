import React from "react";

import { PAGE_CART } from "../App";

const Shopping = ({cartList, navigateTo, addToCart, products}) => {

 
  return (
    <div className="main">
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
                <img src={product.image_url} alt="" />
                <h2> {product.name} </h2>
                <h3> {product.description} </h3>
                <h3> {product.price} </h3>
                <button onClick={() => addToCart(product.id)}>
                  {" "}
                  Add to Cart{" "}
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    </div>
  );
};

export default Shopping;

