import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import axios from "axios";

/**
 * 상품 목록 페이지 - 나영일(ChatGPT)
 * 
 */

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지
  const [totalPages, setTotalPages] = useState(0);    // 총 페이지수
  const [totalItems, setTotalItems] = useState(0);    // 총 상품 수
  const itemsPerPage = 10;                            // 페이지당 상품 수
  const navigate = useNavigate();

  // 서버에서 상품(product = coffeeBean) 가져오기
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/coffeeBeans/list", {
          params : {
            page : currentPage - 1,
            size : itemsPerPage
          }
        });
        const { content, totalPages, totalElements } = res.data;

        console.log("상품(원두) 응답:", res.data);  // 응답 구조 확인

        setProducts(content);
        setFilteredProducts(content);
        setSortedProducts(content);
        setTotalPages(totalPages);
        setTotalItems(totalElements);
      } catch (error) {
        console.error("상품 목록 불러오기 실패:", error);
      }
    };
  
    fetchProducts();
  }, [currentPage]);

  // 서버에서 카테고리 가져오기
  useEffect(() => {
    axios.get("http://localhost:8081/api/categories/parents/1")
    .then(res => {
      console.log("카테고리 응답:", res.data);  // 응답 구조 확인
      setCategories(res.data);
      })
      .catch(err => console.error("카테고리 가져오기 실패:", err));
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

  const currentProducts = sortedProducts;

  const goToPage = (page) => setCurrentPage(page);

  // 클릭시 상세 정보 페이지로 이동
  const handleClickProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <BasicLayout>
      <h1>카테고리</h1>
      <div>
        {categories.map(cat => (
          <button key={cat.id} onClick={() => filterByCategory(cat)}>
            {cat.name}
          </button>
        ))}
        <button onClick={() => filterByCategory(null)}>
          전체보기
        </button>
      </div>

      <p>총 상품 {totalItems}개</p>

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
          <button key={i + 1} onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>

    </BasicLayout>
  );
}