import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewList from '../../component/review/ReviewList';
import BasicLayout from '../../layouts/BasicLayout';
import ProductImageComponent from '../../component/product/ProductImageComponent';
import ProductDetailComponent from '../../component/product/ProductDetailComponent';
import "../../css/product/ProductDetailPage.css";

/**
 * 상품 상세 페이지 - 나영일(ChatGPT)
 * @returns 
 */
export default function ProductDetailPage() {
  const { id } = useParams();

  // 더미 데이터로 예시 구현
  const [product, setProduct] = useState(null);

  useEffect(() => {                                 // 나중에 수정 : 상품(CoffeeBean) 정보 백엔드에서 받아올 것
    const dummy = {
      id,
      name: `상품 ${id}`,
      price: 12000,
      origin: '국내산',
      shipping: 3000,
      freeShippingOver: 30000,
      options1: ['소형 - 12000원', '중형 - 15000원', '대형 - 18000원'],
      options2: ['기본 - 무향', '라벤더 - 은은함', '자몽 - 상큼함'],
      image: 'https://via.placeholder.com/300x300?text=제품사진',
    };
    setProduct(dummy);
  }, [id]);

  if (!product) return <div className="p-6">로딩 중...</div>;

  return (
    <BasicLayout>
      <div className="product-detail-container">
        {/* 왼쪽: 이미지 */}
        <ProductImageComponent product={product}/>

        {/* 오른쪽: 상세정보 */}
        <ProductDetailComponent product={product}/>
      </div>

      <div className="tab-menu">
        <ul>
          <li ><a href="#p1">상세 정보</a></li>
          <li className='active'><a href="#p2">상품 후기</a></li>
          <li><a href="#p3">상품 문의</a></li>
          <li><a href="#p4">배송반품교환안내</a></li>
        </ul>
      </div>

      {/* 사용자 후기 */}
      <div id='p2'>
        <ReviewList coffeeBeanId={id}></ReviewList>
      </div>
    </BasicLayout>
  );
}