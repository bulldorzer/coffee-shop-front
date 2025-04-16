import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/product/ProductListPage.css";

export default function ProductList({ products }) {
  const navigate = useNavigate();

  const handleClickProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div
          className="product-card"
          key={product.id}
          onClick={() => handleClickProduct(product.id)}
        >
          <img
            src={`http://localhost:8081/api/coffeeBeans/view/${product.uploadFileNames[0]}`}
            alt={product.name}
          />
          <div>{product.name}</div>
          <div>{product.price.toLocaleString()}원</div>
        </div>
      ))}
    </div>
  );
}