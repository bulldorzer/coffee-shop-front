import { useNavigate } from "react-router-dom";
import { addOrderItem, createOrder } from "../../api/order/orderApi";
import { useEffect, useState } from "react";


const PaymentMethodSelect = ({finalAmount, usepoint, orderInfo, productInfo, deliveryInfo, loginMember }) => {

    const [isChecked, setIsChecked] = useState(false); // 체크박스 상태 관리

    const navigate = useNavigate(); // navigate 훅을 사용하여 페이지 이동

    const handleCancel = () => {
        navigate(-1); // 바로 이전 페이지로 이동
      };

    const handlePayment = async ()=>{
        try {
            if (!isChecked) {
                alert('필수 약관에 동의해주세요.');
                return;
            }
            // 1. 결제 로직 (실제 결제 API 호출시 이단계에서 결제진행)
            const isPaymentSuccess = true; // 결제 성공 여부 (가정)
            if (!isPaymentSuccess) return alert("결제에 실패하였습니다.");

            console.log("usepoint", usepoint);
            console.log("orderInfo" , orderInfo);
            console.log("productInfo" , productInfo);
            console.log("deliveryInfo" , deliveryInfo);
            console.log("loginMember" , loginMember);

            
            const orderRequest = {
                shipper : deliveryInfo.receiverName,
                request : deliveryInfo.deliveryRequest,
                city : deliveryInfo.address.split(" ")[0],
                street : deliveryInfo.address.split(" ")[1],
                zipcode : deliveryInfo.address.split(" ")[2],
                status: "READY",
                memberId: loginMember.memberId 
            }

            // 2. 주문서 생성 API 호출
            const order = await createOrder(loginMember.memberId, orderRequest); // 주문서 생성 API 호출
            console.log("order", order);
            const orderId = order; // 생성된 주문서 ID

            // 3. 주문서 상품추가 API 호출
            const orderItemRequest = {
                coffeeBeanId: productInfo.productId,
                qty: productInfo.quantity
            };
            await addOrderItem({
                orderId,
                coffeeBeanId: productInfo.productId,
                qty: productInfo.quantity,
                usepoint: usepoint,
                deliveryDTO: {
                  shipper : deliveryInfo.receiverName,
                  request : deliveryInfo.deliveryRequest,
                  city : deliveryInfo.address.split(" ")[0],
                  street : deliveryInfo.address.split(" ")[1],
                  zipcode : deliveryInfo.address.split(" ")[2],
                  status: "READY",
                  memberId: loginMember.memberId 
                }
              }); // 주문서 상품추가 API 호출

            // 4. 결제 성공 후 주문서 마이 페이지로 이동
            alert("결제 및 주문이 완료되었습니다. 주문서내역은 마이페이지에서 확인 가능합니다");
            // 잠시 막아둠
            navigate(`/mypage/orders`); // 주문서 상세 페이지로 이동

        } catch (error) {
            console.error("결제 실패 또는 서버 오류:", error);
            alert("결제 처리 중 오류가 발생했습니다.");
        }
    }

    return (
        <section>
            <h2 className="font-bold">결제 수단</h2>
            <div className="flex gap-8">
                <label><input type="radio" name="pay" /> 신용/체크 카드</label>
                <label><input type="radio" name="pay" /> 계좌 이체</label>
            </div>
            <div className="border p-4 mt-4 text-right text-lg font-bold">
            최종 결제 금액 : <strong>{finalAmount.toLocaleString()}원</strong> 원
            </div>
            <div className="mt-4">
                <label><input type="checkbox" checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)} /> (필수) 구매하실 상품의 결제 정보를 확인하였으며, 구매 진행에 동의합니다.</label>
            </div>
            <div className="mt-4 flex justify-center gap-4">
                <button className="order-button" onClick={handleCancel}>취소</button>
                <button className="order-button" onClick={handlePayment}>결제</button>
            </div>
        </section>
    );
}
export default PaymentMethodSelect;