import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMemberDTO } from "../../api/order/orderApi";

import BasicLayout from "../../layouts/BasicLayout"
import DynamicTable from "../../component/utilComponent/DynamicTable";
import useMemberInfo from "../../hook/useMemberInfo";
import "../../css/order/orderPage.css";



{/* 필드 정의 */}
const columns = [
  { key: 'productName', label: '상품정보'},
  { key: 'quantity', label: '수량' },
  { key: 'productPrice', label: '금액' },
  { key: 'addPoint', label: '적립포인트' },
];

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
        quantity,// 수량
        option1,// 옵션1
        option2,// 옵션2
        total // 총 금액
    } = location.state; // 상품 정보 가져오기

    
    // 이메일 상태 관리
    // const [email, setEmail] = useState(""); 
    // 로그인한 memberDTO 정보 가져오기
    const [loginMember, setLoginMember] = useState({}); // 회원 정보 상태 관리
    
     const { member, loading } = useMemberInfo();

    // 멤버쉽에 따른 포인트 적립 비율 계산 함수
    const calculatePointRate = (loginMember)=> {
        console.log("멤버쉽 등급:", loginMember); // 멤버쉽 등급 확인
        switch (loginMember) {
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

    useEffect(() => {

        if (!loading) {
            if (member) {
              console.log("로그인한 사용자 정보:", member);
              console.log("로그인한 사용자 정보:", member.memberShip);
              setLoginMember(member); // 로그인한 회원 정보 설정
            } else {
              console.log("로그인한 사용자 정보 없음");
            }
          }
        
        // console.log("주문서 정보:",productId,productName,productImage,productPrice , quantity, option1, option2, total); // 상품 정보 확인
        // console.log("로그인한 회원 정보:",loginMember); // 로그인한 회원 정보 확인
        
    } , [loading, member]); // 컴포넌트 마운트 시 실행

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
                <p>- {option1}</p>
                <p>- {option2}</p>
                </div>
            </div>
            ),
            quantity: quantity,
            productPrice: productPrice * quantity,
            addPoint: productPrice * pointRate * quantity,
        },
    ];

    /**
     * 테이블 데이터에서 총합 계산
     * @param {Array} data - 테이블 데이터
     * @returns {Object} - 총합 객체
     
     */
    const calculateTotals = (data) => {
        let totalQuantity = 0;
        let totalPrice = 0;
        let totalPoint = 0;
        
        data.forEach(item => {
            totalQuantity += Number(item.quantity);
            totalPrice += Number(item.productPrice);
            totalPoint += Number(item.addPoint);
        });
        
        return { totalQuantity, totalPrice, totalPoint };
    };


    
    return(
        <BasicLayout>
            <div className="order-page">
                {/* 상품 목록 */}
                <section className="border border-black">
                    {/* 공통 컴포넌트로 대체예정 */}
                    <h2 className="title">주문서</h2>
                    <hr></hr>
                    <DynamicTable 
                        columns={columns}
                        data={tableData.map(item => ({
                            ...item,
                            quantity: `${item.quantity} 개`,
                            productPrice: `${item.productPrice.toLocaleString()} 원`,
                            addPoint: `${item.addPoint.toLocaleString()} 원`,
                        }))}
                        itemsPerPage={6}
                        showFooter={true}
                        footerContent={() => {
                            const { totalQuantity, totalPrice, totalPoint } = calculateTotals(tableData);
                            return (
                            <>
                                <tr className="text-right font-semibold">
                                    <td colSpan={4} className="p-2">
                                        총 합계: {totalQuantity}개 | 금액: {totalPrice.toLocaleString()}원 | 적립 포인트: {totalPoint.toLocaleString()}원
                                    </td>
                                </tr>
                            </>
                            );
                        }}
                    />
                </section>

                {/* 주문자 정보 */}
                <section>
                    <h2 className="title">주문자 정보</h2>
                    <div className="space-y-2">
                        <div className="flex items-center gap-4">
                            <label>*이름</label>
                            <input className="border px-2 py-1 flex-1" type="text" />
                        </div>
                        <div className="flex items-center gap-4">
                            <label>*휴대폰 번호</label>
                            <input className="border px-2 py-1 flex-1" type="text" />
                            <span>배송 안내 SMS로 알려드립니다.</span>
                        </div>
                    </div>
                </section>

                {/* 배송 정보 */}
                <section>
                    <h2 className="title">배송 정보</h2>
                    <div className="space-y-2">
                        <div className="flex items-center gap-4">
                            <label>*수령인</label>
                            <input className="border px-2 py-1 flex-1" type="text" />
                            <span>0자 / 25자</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <label>*휴대폰 번호</label>
                            <input className="border px-2 py-1 flex-1" type="text" />
                            <span>상품 도착 안내를 SMS로 알려드립니다</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <label>*주소</label>
                            <input className="border px-2 py-1 w-1/3" type="text" />
                            <button className="order-button">주소검색</button>
                            <input className="border px-2 py-1 flex-1" type="text" placeholder="상세주소" />
                        </div>
                        <div>
                            <label>*배송 요청 사항</label>
                            <textarea className="border px-2 py-1 w-full h-24" />
                            <span className="block text-right">0자 / 100자</span>
                        </div>
                    </div>
                </section>

                {/* 결제 정보 */}
                <section>
                    <h2 className="title">결제 정보</h2>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label>상품 합계 금액</label>
                            <span>(원)</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <label>배송비</label>
                            <span>(원)</span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <label>마일리지 사용</label>
                            <input className="border px-2 py-1" type="text" />
                            <label><input type="checkbox" /> 전액 사용하기 (보유 마일리지 : 00원)</label>
                        </div>
                        <div className="flex items-center justify-between">
                            <label>최종 결제 금액</label>
                            <span>(원)</span>
                        </div>
                    </div>
                </section>

                {/* 결제 수단 및 버튼 */}
                <section>
                    <h2 className="font-bold">결제 수단</h2>
                    <div className="flex gap-8">
                        <label><input type="radio" name="pay" /> 신용/체크 카드</label>
                        <label><input type="radio" name="pay" /> 계좌 이체</label>
                    </div>
                    <div className="border p-4 mt-4 text-right text-lg font-bold">
                    최종 결제 금액 : 원
                    </div>
                    <div className="mt-4">
                        <label><input type="checkbox" /> (필수) 구매하실 상품의 결제 정보를 확인하였으며, 구매 진행에 동의합니다.</label>
                    </div>
                    <div className="mt-4 flex justify-center gap-4">
                        <button className="order-button">취소</button>
                        <button className="order-button">결제</button>
                    </div>
                </section>
        
            </div>
        </BasicLayout>
    )
}

export default OrderPage;