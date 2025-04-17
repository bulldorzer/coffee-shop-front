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
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `http://localhost:8081/api/coffeeBeans/view/default.png`;  {/* 이미지를 불러오지 못했을 경우 default.png 표시 */}
            }}
          />
          <div>{product.name}</div>
          <div>{product.price.toLocaleString()}원</div>
        </div>
      ))}
    </div>
  );
}