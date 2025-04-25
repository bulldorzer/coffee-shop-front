import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import axios from "axios";
import ProductListComponent from "../../component/product/ProductListComponent";
import "../../css/product/ProductListPage.css";

/**
 * 상품 목록 페이지 - 나영일(ChatGPT)
 * 
 */

export default function ProductListPage() {
  const [products, setProducts] = useState([]);                   // 상품 목록
  const [filteredProducts, setFilteredProducts] = useState([]);   // 카테고리로 필터링된 상품 목록
  const [sortedProducts, setSortedProducts] = useState([]);       // 정렬된 상품 목록
  const [subCategories, setSubCategories] = useState([]);         // 하위 카테고리
  const [categories, setCategories] = useState([]); // 상위 카테고리 목록
  const [categoryMap, setCategoryMap] = useState({}); // 동적으로 생성된 카테고리 맵
  const [currentPage, setCurrentPage] = useState(1);    // 현재 페이지
  const [totalPages, setTotalPages] = useState(0);      // 총 페이지수
  const [totalItems, setTotalItems] = useState(0);      // 총 상품 수
  const itemsPerPage = 20;                              // 페이지당 상품 수

  const [activeCategory, setActiveCategory] = useState(null); // 클릭된 카테고리 상태
  const [activeSort, setActiveSort] = useState(""); // 클릭된 정렬 상태

  const [searchParams] = new useSearchParams(); // URL 쿼리 파라미터
  const categoryParam = searchParams.get("category");   // 카테고리 파라미터
  const eventFlagParam = searchParams.get("eventFlag"); // 이벤트 상품 여부 파라미터

  const parentCategoryId = categoryMap[categoryParam];   // 부모 카테고리 ID 가져오기

  const paginatedProducts = sortedProducts.slice(   // 현재 페이지에 맞는 상품만 추출해서 렌더링
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 서버에서 상위 카테고리 가져오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/categories/parents");
        console.log("카테고리 응답:", res.data);

        // 카테고리 맵 생성
        const map = res.data.reduce((acc, category) => {
          acc[category.name] = category.id; // 카테고리 이름을 키로, ID를 값으로 설정
          return acc;
        }, {});
        setCategoryMap(map); // 동적으로 생성된 카테고리 맵 설정
        setCategories(res.data); // 상위 카테고리 목록 설정
      } catch (error) {
        console.error("카테고리 가져오기 실패:", error);
      }
    };

    fetchCategories();
  }, []);

  // 서버에서 하위 카테고리 가져오기
  useEffect(() => {
    const fetchSubCategories = async () => {
      if (eventFlagParam === "1") {
        // '특가상품' 클릭 시 하위 카테고리를 비웁니다.
        setSubCategories([]);
        return;
      }

      if (!parentCategoryId || !categoryMap || Object.keys(categoryMap).length === 0) {
        // parentCategoryId가 유효하지 않거나 categoryMap이 초기화되지 않은 경우 실행하지 않음
        console.warn("parentCategoryId가 유효하지 않거나 categoryMap이 초기화되지 않았습니다.");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:8081/api/categories/parents/${parentCategoryId}`);
        console.log("하위 카테고리 응답:", res.data);
        setSubCategories(res.data);
      } catch (error) {
        console.error("하위 카테고리 가져오기 실패:", error);
      }
    };

    fetchSubCategories();
  }, [parentCategoryId, eventFlagParam]);

  // 서버에서 상품 목록을 가져오고, 카테고리 및 이벤트 상품 여부에 따라 필터링
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/coffeeBeans/listAll");
        console.log("상품(원두) 응답:", res.data);  // 응답 구조 확인

        setProducts(res.data);

        let filtered = res.data;

        if (eventFlagParam === "1") {
          // 이벤트 상품 여부에 따라 필터링
          filtered = res.data.filter((p) => p.eventFlag === true);
        } else if (subCategories.length > 0) {
          // URL 파라미터에 따라 카테고리 필터링
          const subCategoryIds = subCategories.map((subCat) => subCat.id);
          filtered = res.data.filter((p) =>
            p.categoryIds?.some((categoryId) => subCategoryIds.includes(categoryId))
          );
        }

        setFilteredProducts(filtered);
        setSortedProducts(filtered);

        const totalItemsCount = filtered.length; // 필터링된 상품 수 계산
        setTotalItems(totalItemsCount);
        setTotalPages(Math.ceil(totalItemsCount / itemsPerPage)); // 총 페이지 수 계산
      
      } catch (error) {
        console.error("상품 목록 불러오기 실패:", error);
      }
    };

  fetchAllProducts();
  }, [subCategories, eventFlagParam]);

  useEffect(() => {
    // URL의 categoryParam이 변경되면 active 상태 초기화
    setActiveCategory(null);
    setActiveSort("");
  }, [categoryParam]);

  // 하위 카테고리로 상품 필터링
  const filterBySubCategory = (subCategoryId) => {
    setActiveCategory(subCategoryId); // 클릭된 카테고리 상태 업데이트
    const filtered = products.filter((p) => p.categoryIds?.includes(subCategoryId));
    setFilteredProducts(filtered);
    setSortedProducts(filtered);
    setTotalItems(filtered.length);
    setCurrentPage(1);
  };

  // 상품 정렬
  const sortProducts = (type) => {
    setActiveSort(type); // 클릭된 정렬 상태 업데이트
    let sorted = [...filteredProducts];
    if (type === "high") sorted.sort((a, b) => b.price - a.price);
    else if (type === "low") sorted.sort((a, b) => a.price - b.price);
    else if (type === "recommend") sorted.sort((a, b) => b.eventFlag - a.eventFlag);
    setSortedProducts(sorted);
    setCurrentPage(1);
  };

  return (
    <BasicLayout>
      <div className="product-list-container">
        <h2>{categoryParam ? categoryParam : "특가상품"}</h2>
        <div className="category-buttons">
          {/* 하위 카테고리 버튼 */}
          {subCategories.length > 0 ? (
            subCategories.map((subCat) => (
              <button key={subCat.id}
                className={activeCategory === subCat.id ? "active" : ""}
                onClick={() => filterBySubCategory(subCat.id)}>
                {subCat.name}
              </button>
            ))
          ) : (
            <p>하위 카테고리가 없습니다.</p>
          )}
        </div>

        <p>총 상품 {totalItems}개</p>

        <div className="sort-buttons">
          <button 
            className={activeSort === "recommend" ? "active" : ""}
            onClick={() => sortProducts("recommend")}
          >
            추천순
            </button>
          <button 
            className={activeSort === "high" ? "active" : ""}
            onClick={() => sortProducts("high")}
          >
            높은가격순
            </button>
          <button 
            className={activeSort === "low" ? "active" : ""}
            onClick={() => sortProducts("low")}
          >
            낮은가격순
            </button>
        </div>

        <ProductListComponent products={paginatedProducts}/>

        <div className="pagination">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i + 1} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </BasicLayout>
  );
}