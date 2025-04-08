import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * 상품 목록 페이지 - 나영일(ChatGPT)
 * 
 */

const dummyProducts = Array.from({ length: 50 }).map((_, i) => ({       // 나중에 수정 : 상품(CoffeeBean) 정보 백엔드에서 받아올 것
  id: i + 1,
  name: `상품 ${i + 1}`,
  price: Math.floor(Math.random() * 10000) + 1000,
  category: ["딸기맛", "초코맛", "바닐라맛", "녹차맛"][i % 4],             // 나중에 수정 : 카테고리(Category) 정보 백엔드에서 받아와서 사용할 것
  image: "https://via.placeholder.com/150?text=제품사진",
}));

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(dummyProducts);
    setFilteredProducts(dummyProducts);
    setSortedProducts(dummyProducts);
  }, []);

  // 상품 정렬
  const sortProducts = (type) => {
    let sorted = [...filteredProducts];
    if (type === "high") sorted.sort((a, b) => b.price - a.price);
    else if (type === "low") sorted.sort((a, b) => a.price - b.price);
    else if (type === "recommend") sorted.sort(() => Math.random() - 0.5);      // 나중에 수정 : '추천순' 정렬 방식 설정

    setSortedProducts(sorted);
    setCurrentPage(1);
  };

  // 카테고리로 상품 필터링
  const filterByCategory = (category) => {
    setSelectedCategory(category);
    const filtered = category ? products.filter(p => p.category === category) : products;
    setFilteredProducts(filtered);
    setSortedProducts(filtered);
    setCurrentPage(1);
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const goToPage = (page) => setCurrentPage(page);

  // 클릭시 상세 정보 페이지로 이동
  const handleClickProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div>
      <h1>카테고리</h1>
      <div>
        {['딸기맛', '초코맛', '바닐라맛', '녹차맛'].map((cat) => (
          <button key={cat} onClick={() => filterByCategory(cat)}>
            {cat}
          </button>
        ))}
        <button onClick={() => filterByCategory(null)}>
          전체보기
        </button>
      </div>

      <p>총 상품 {sortedProducts.length}개</p>

      <div>
        <button onClick={() => sortProducts("recommend")}>추천순</button>
        <button onClick={() => sortProducts("high")}>높은가격순</button>
        <button onClick={() => sortProducts("low")}>낮은가격순</button>
      </div>

      <div>
        {currentProducts.map((product) => (
          <div key={product.id} onClick={() => handleClickProduct(product.id)}>
            <img src={product.image} alt={product.name}/>
            <div>{product.name}</div>
            <div>{product.price.toLocaleString()}원</div>
          </div>
        ))}
      </div>  

      <div>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button key={i + 1} onClick={() => goToPage(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>

    </div>
  );
}