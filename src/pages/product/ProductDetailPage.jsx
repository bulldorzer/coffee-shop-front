import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewList from '../../component/review/ReviewList';
import BasicLayout from '../../layouts/BasicLayout';
import ProductImageComponent from '../../component/product/ProductImageComponent';
import ProductDetailComponent from '../../component/product/ProductDetailComponent';
import ProductInquiryComponent from '../../component/ProductInquiry/ProductInquiryComponent';
import "../../css/product/ProductDetailPage.css";

/**
 * 상품 상세 페이지 - 나영일(ChatGPT)
 * @returns 
 */
export default function ProductDetailPage() {
  const { id } = useParams();

  // 더미 데이터로 예시 구현
  const [product, setProduct] = useState(null);

  useEffect(() => {                                 
    // 나중에 수정 : 상품(CoffeeBean) 정보 백엔드에서 받아올 것
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
          <li className='active'><a href="#p1">상세 정보</a></li>
          <li ><a href="#p2">상품 후기</a></li>
          <li><a href="#p3">상품 문의</a></li>
          <li><a href="#p4">배송반품교환안내</a></li>
        </ul>
      </div>
      <div className='productBoard'>
        <div className='product-details title' id='p1'>상세 정보</div>
      </div>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

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

      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

      <div className="tab-menu">
        <ul>
          <li ><a href="#p1">상세 정보</a></li>
          <li><a href="#p2">상품 후기</a></li>
          <li className='active'><a href="#p3">상품 문의</a></li>
          <li><a href="#p4">배송반품교환안내</a></li>
        </ul>
      </div>
      <div className='productBoard' id='p3'><ProductInquiryComponent coffeeBeanId={id}></ProductInquiryComponent></div>

      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

      <div className="tab-menu">
        <ul>
          <li ><a href="#p1">상세 정보</a></li>
          <li><a href="#p2">상품 후기</a></li>
          <li><a href="#p3">상품 문의</a></li>
          <li className='active'><a href="#p4">배송반품교환안내</a></li>
        </ul>
      </div><br/><br/>

      <div className='request-exchange' id='p4'>
        <h3>배송반품교환안내</h3>
        <h4 className='title'> 당일 출고안내</h4>

        <p>로스팅 원두는 매일 오전 10시까지 입금 확인된 주문건에 한해 당일 로스팅 후 출고됩니다. (1/2/4kg은 당일발송 제외)</p>
        <p>수제과일청의 경우 신선도를 위해 오후 3시까지 입금 확인된 주문건에 한해 당일 제조 후 당일 출고됩니다. (1/2/4kg은 당일발송 제외)</p><br/><br/>

        <h4 className='title'>배송안내</h4><br/>

        1. 오후 3시까지 입금 확인된 주문건만 당일 로스팅됩니다.<br/>
        2. 토, 일요일 및 공휴일 주문건은 다음날 로스팅 후 발송됩니다.<br/>
        3. 월, 화요일은 물량이 많을 경우 다음날 순차적으로 발송될 수 있습니다.<br/>
        4. 배송은 출고일부터 1~3일 소요 될 수 있습니다.<br/>
        5. 제주, 도서 산간 지역은 추가요금이 발생 할 수 있습니다.<br/><br/>

        <h4 className='title'>원두커피,액상커피 교환/반품</h4><br/>

        갓 볶은 원두커피/액상커피는 제조식품으로 교환 및 환불이 불가한 상품입니다.<br/><br/>

        (다음 사항은 교환, 환불이 불가능하오니 양해 부탁드립니다.)<br/>
        → 주문시 분쇄옵션사항 선택을 잘못한 경우<br/>
        → 기호에 의한 고객님의 단순변심<br/>
        단, 제품의 하자로 인한 교환 및 환불은 가능합니다.<br/><br/>

        <h4 className='title'>주의사항</h4><br/>

        →고객님 부주의로 분쇄옵션사항을 잘못 선택하였을 경우 교환 및 환불이 불가능한점 양해 부탁드립니다.<br/>
        →고객센터로 먼저 연락을 주시면 친절하게 교환 및 반품방법에 대해 안내 해드립니다.<br/>
        →고객님 임의대로 반품, 교환 등을하여 제품을 보내실 경우, 제품이 유실되거나 처리기간이 길어질 수 있으니 꼭 고객센터(052-1234-1234)로 먼저 연락을 주시면 감사하겠습니다. <br/><br/>

        ※ 반품시 편의점 택배는 이용이 불가합니다.
      </div>
      



      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </BasicLayout>
  );
}