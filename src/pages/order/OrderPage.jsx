import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import BasicLayout from "../../layouts/BasicLayout"
import useMemberInfo from "../../hook/useMemberInfo";
import ProductSummary from "../../component/order/ProductSummary";
import OrdererInfoForm from "../../component/order/OrdererInfoForm";
import DeliveryInfoForm from "../../component/order/DeliveryInfoForm";
import PaymentInfo from "../../component/order/PaymentInfo";
import PaymentMethodSelect from "../../component/order/PaymentMethodSelect";
import "../../css/order/orderPage.css";



/**
 * 주문서 화면 - 진우
 * @returns 
 */
const OrderPage = () =>{
    const location = useLocation();
    const { productId,// 상품 ID
        productName,// 상품명
        productImage,// 상품 이미지
        productPrice,// 상품 가격
        deliveryFee,// 배송비
        quantity,// 수량
        grindFlag, // 옵션
        total // 총 금액
    } = location.state; // 상품 정보 가져오기

    // useMemberInfo 훅을 사용하여 로그인한 회원 정보 가져오기
    const { member, loading } = useMemberInfo();
    
    // 로그인한 memberDTO 정보 가져오기
    const [loginMember, setLoginMember] = useState({}); // 회원 정보 상태 관리

    // 주문 정보 상태 관리
    const [orderInfo, setOrderInfo] = useState({
        name: '', // 주문자 이름
        phone: '',// 주문자 전화번호
    }); // 주문 정보 상태 관리

    // 주문 정보 상태 관리
    const [deliveryInfo, setDeliveryInfo] = useState({
        receiverName: '',// 수령인 이름
        receiverPhone: '',// 수령인 전화번호
        address: '',// 주소
        addressDetail: '', // 상세주소
        deliveryRequest: '',// 배송 요청 사항
    }); // 주문 정보 상태 관리

    // 배송비가 무료인 경우 배송비를 0으로 설정
    const [finalAmount, setFinalAmount] = useState(total);
    
    const [addPoint, setAddPoint] = useState(0); // 적립 포인트 상태 관리
    
    // 사용 포인트 상태 관리
    const [usePoint, setUsePoint] = useState(0); 

    // 멤버쉽에 따른 포인트 적립 비율 계산 함수
    const calculatePointRate = (memberShip)=> {
      // console.log("멤버쉽 등급:", loginMember); // 멤버쉽 등급 확인
      switch (memberShip) {
          case "BRONZE" :
              return 0.05; // 5% 포인트 적립
          case "SILVER" :
              return 0.07; // 7% 포인트 적립
          case "GOLD" :
              return 0.12; // 12% 포인트 적립
          case "VIP" :
              return 0.2; // 20% 포인트 적립
          default:
              return 0; // 적립 없음
      }
  };

    // 포인트 적립 비율 계산
    const pointRate = calculatePointRate(loginMember.memberShip); 
     

    /**
     * 로그인한 회원 정보가 로딩 완료되면 실행되는 useEffect
     */
    useEffect(() => {

        if (!loading) {
            if (member) {
              console.log("로그인한 사용자 정보:", member);
              setLoginMember(member); // 로그인한 회원 정보 설정

              setOrderInfo(prev => ({
                ...prev,
                name: member.name || '', // 주문자 이름
                phone: member.phone || '', // 주문자 전화번호
              }));

              setDeliveryInfo(prev => ({
                ...prev,
                receiverName: '', // 수령인 이름
                receiverPhone: '', // 수령인 전화번호
                address: '', // 주소
                addressDetail: '',  // 상세주소
                deliveryRequest: '', // 배송 요청 사항
              }));
            } else {
              console.log("로그인한 사용자 정보 없음");
            }
          }
        
    } , [loading, member]); // 컴포넌트 마운트 시 실행

    useEffect(() => {
      const calculatedAddPoint = productPrice * quantity * pointRate; // 적립 포인트 계산
      setAddPoint(calculatedAddPoint); // 상태 업데이트
      console.log("적립 포인트:", calculatedAddPoint); // 디버깅용 로그
  }, [productPrice, quantity, pointRate]); // 의존성 배열에 필요한 값 추가

    

    
    

    

    /**
     * 테이블 데이터 생성
     * @param {string} productName - 상품명
     * @param {string} productImage - 상품 이미지 URL
     * @param {number} productPrice - 상품 가격
     * @param {number} quantity - 수량
     * @param {string} grindFlag - 분쇄 옵션
     * @param {number} pointRate - 포인트 적립 비율
     */
    const tableData = [
        {
            productName: (
            <div className="product-info">
                <img className="product-image" src={`http://localhost:8081/api/coffeeBeans/view/${productImage}`} 
            alt={productName}/> 
                <div>
                    <p>{productName}</p>
                    <p>- {grindFlag == 1 ? "분쇄 O" : "분쇄 X" }</p>
                </div>
            </div>
            ),
            quantity: quantity,
            productPrice: productPrice * quantity,
            addPoint: productPrice * pointRate * quantity,
        },
    ];

    // 주소 검색 버튼 클릭 시 Daum 우편번호 서비스 호출
    const handleAddressSearch = () => {
        new window.daum.Postcode({
          oncomplete: function (data) {
            // 도로명 주소 기준
            const fullAddress = data.roadAddress;
            setDeliveryInfo(prev => ({
              ...prev,
              address: fullAddress
            }));
          }
        }).open();
      };


    
    return(
        <BasicLayout>
            <div className="order-page">
                {/* 상품 목록 */}
                <ProductSummary tableData={tableData} />

                {/* 주문자 정보 */}
                <OrdererInfoForm orderInfo={orderInfo} setOrderInfo={setOrderInfo} />

                {/* 배송 정보 */}
                <DeliveryInfoForm deliveryInfo={deliveryInfo} setDeliveryInfo={setDeliveryInfo} orderInfo={orderInfo} handleAddressSearch={handleAddressSearch} />

                {/* 결제 정보 */}
                <PaymentInfo loginMember={loginMember} productPrice={productPrice} 
                deliveryFee={deliveryFee} 
                total={total}
                onFinalAmountChange={setFinalAmount}
                usePoint={setUsePoint} // 부모 컴포넌트에 포인트 사용 금액 전달
                />

                {/* 결제 수단 및 버튼 */}
                <PaymentMethodSelect 
                    finalAmount={finalAmount}
                    usepoint={usePoint}
                    addPoint={addPoint}
                    orderInfo={orderInfo}
                    productInfo={{
                      productId,
                      quantity
                    }}
                    deliveryInfo={deliveryInfo}
                    loginMember={loginMember}
                    
                />
        
            </div>
        </BasicLayout>
    )
}

export default OrderPage;