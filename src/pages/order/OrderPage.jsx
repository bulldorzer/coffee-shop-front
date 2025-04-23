import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import BasicLayout from "../../layouts/BasicLayout"
import useMemberInfo from "../../hook/useMemberInfo";
import "../../css/order/orderPage.css";
import ProductSummary from "../../component/order/ProductSummary";
import OrdererInfoForm from "../../component/order/OrdererInfoForm";
import DeliveryInfoForm from "../../component/order/DeliveryInfoForm";
import PaymentInfo from "../../component/order/PaymentInfo";
import PaymentMethodSelect from "../../component/order/PaymentMethodSelect";



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
        option, // 옵션
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
        receiverName: '',// 수령인 이름
        receiverPhone: '',// 수령인 전화번호
        address: '',// 주소
        addressDetail: '', // 상세주소
        deliveryRequest: '',// 배송 요청 사항
    }); // 주문 정보 상태 관리

    // 배송비가 무료인 경우 배송비를 0으로 설정
    const [finalAmount, setFinalAmount] = useState(total);
    
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
                receiverName: member.name || '', // 수령인 이름
                receiverPhone: member.phone || '', // 수령인 전화번호
                address: member.city+" "+member.street+" "+member.zipcode|| '', // 주소
              }));
            } else {
              console.log("로그인한 사용자 정보 없음");
            }
          }
        
        // console.log("주문서 정보:",productId,productName,productImage,productPrice , quantity, option1, option2, total); // 상품 정보 확인
        // console.log("로그인한 회원 정보:",loginMember); // 로그인한 회원 정보 확인
        
    } , [loading, member]); // 컴포넌트 마운트 시 실행

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
    // const pointRate = 0.05; // 임시로 5%로 설정 (나중에 멤버십에 따라 변경 예정)

    

    /**
     * 테이블 데이터 생성
     * @param {string} productName - 상품명
     * @param {string} productImage - 상품 이미지 URL
     * @param {number} productPrice - 상품 가격
     * @param {number} quantity - 수량
     * @param {string} option1 - 옵션1
     * @param {string} option2 - 옵션2
     * @param {number} pointRate - 포인트 적립 비율
     */
    const tableData = [
        {
            productName: (
            <div className="flex gap-4">
                <img src={productImage} alt={productName} className="w-24 h-24" />
                <div>
                    <p>{productName}</p>
                    <p>- {option}</p>
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
            setOrderInfo(prev => ({
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
                <DeliveryInfoForm orderInfo={orderInfo} setOrderInfo={setOrderInfo} handleAddressSearch={handleAddressSearch} />

                {/* 결제 정보 */}
                <PaymentInfo loginMember={loginMember} productPrice={productPrice} deliveryFee={deliveryFee} total={total}
                onFinalAmountChange={setFinalAmount}
                />

                {/* 결제 수단 및 버튼 */}
                <PaymentMethodSelect 
                    finalAmount={finalAmount}
                    orderInfo={orderInfo}
                    loginMember={loginMember}
                    productInfo={{
                      productId,
                      quantity
                    }}
                />
        
            </div>
        </BasicLayout>
    )
}

export default OrderPage;