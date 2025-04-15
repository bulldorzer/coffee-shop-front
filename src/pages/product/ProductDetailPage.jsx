import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewList from '../../component/review/ReviewList';
import BasicLayout from '../../layouts/BasicLayout';


/**
 * 상품 상세 페이지 - 나영일(ChatGPT)
 * @returns 
 */
export default function ProductDetailPage() {
  const { id } = useParams();

  // 더미 데이터로 예시 구현
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');

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

  const total = quantity * product.price;

  

  return (
    <BasicLayout>
      {/* 왼쪽: 이미지 */}
      <div>
        <img src={product.image} alt={product.name}/>
        <div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i}>썸네일</div>
          ))}
        </div>
      </div>

      {/* 오른쪽: 상세정보 */}
      <div>
        <h2>{product.name}</h2>
        <div>
          <p>제품명: {product.name}</p>
          <p>판매가: {product.price.toLocaleString()}원</p>
          <p>원산지: {product.origin}</p>
          <p>
            배송비: {product.shipping.toLocaleString()}원 (
            {product.freeShippingOver.toLocaleString()}원 이상 구매 시 무료)
          </p>
        </div>

        <div>
          <label>용량:</label>
          <select
            value={option1}
            onChange={(e) => setOption1(e.target.value)}
          >
            <option value="">- 옵션 선택 -</option>
            {product.options1.map((opt, idx) => (
              <option key={idx} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <label>분쇄:</label>
          <select
            value={option2}
            onChange={(e) => setOption2(e.target.value)}
          >
            <option value="">- 옵션 선택 -</option>
            {product.options2.map((opt, idx) => (
              <option key={idx} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <label>수량:</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          /> 개
        </div>

        <div>
          총 상품 금액(수량): <strong>{total.toLocaleString()}원</strong> ({quantity}개)
        </div>

        <div>
          <button>바로 구매하기</button>
          <button>장바구니 담기</button>
          <button>관심상품 등록</button>
        </div>

        <hr/>

        <div>
          <button>NAVER pay 구매</button>
          <button>KAKAO pay 구매</button>
        </div>
      </div>

      <div >
        <ul>
          <li className='active'><a href="#p1">상세 정보</a></li>
          <li><a href="#p2">상품 후기</a></li>
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