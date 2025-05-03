import { useNavigate } from "react-router-dom";
import { addOrderItem, createOrder } from "../../api/order/orderApi";
import { useEffect, useState } from "react";


const PaymentMethodSelect = ({finalAmount, usepoint, addPoint, orderInfo, productInfo, deliveryInfo, loginMember }) => {

    const [isChecked, setIsChecked] = useState(false); // 체크박스 상태 관리

    const navigate = useNavigate(); // navigate 훅을 사용하여 페이지 이동

    const handleCancel = () => {
        navigate(-1); // 바로 이전 페이지로 이동
    };

    const isDeliveryInfoValid = () => {
        return deliveryInfo.receiverName?.trim() &&
            deliveryInfo.receiverPhone?.trim() &&
            deliveryInfo.address?.trim() &&
            deliveryInfo.addressDetail?.trim();
    }

    

    const handlePayment = async () => {
        try {
          if (!isDeliveryInfoValid()) {
            alert("배송 정보를 모두 입력해 주세요.");
            return;
          }
          if (!isChecked) {
            alert('필수 약관에 동의해주세요.');
            return;
          }
      
          const isPaymentSuccess = true;
          if (!isPaymentSuccess) {
            alert("결제에 실패하였습니다.");
            return;
          }
      
          const [city = "", street1 = "", street2 = "", zipcode = ""] = deliveryInfo.address.split(" ");
          const street = `${street1} ${street2} ${deliveryInfo.addressDetail || ""}`.trim();
      
          const orderRequest = {
            shipper: deliveryInfo.receiverName,
            request: deliveryInfo.deliveryRequest,
            city,
            street,
            zipcode,
            status: "READY",
            memberId: loginMember.memberId,
          };
      
          const orderId = await createOrder(loginMember.memberId, orderRequest);
          
          console.log("productInfo", productInfo);
          const isCartOrder = Array.isArray(productInfo);
          const orderItems = (isCartOrder ? productInfo : [productInfo]).map(item => ({
            name: `${loginMember.name} 주문서`,  // ← OrderDTO 필드
            orderDate: new Date().toISOString().slice(0, 10), // ← "YYYY-MM-DD" 형식
            status: "ORDER",             // ← OrderDTO 필드 (enum 값)
            orderItemRequestDTO: {
              coffeeBeanId: item.coffeeBeanId,
              orderPrice: item.price,
              qty: item.qty,
            },
            deliveryDTO: {
              shipper: deliveryInfo.receiverName,
              request: deliveryInfo.deliveryRequest,
              city,
              street,
              zipcode,
              status: "READY",
              memberId: loginMember.memberId,
            },
            city,
            street,
            zipcode,
          }));
          console.log("orderId", orderId);
          console.log("addPoint", addPoint);
            console.log("usepoint", usepoint);
          console.log("orderItems", orderItems);
      
          await addOrderItem({
            orderId,
            addPoint,
            usepoint,
            orderItems,
          });
      
          alert("결제 및 주문이 완료되었습니다. 주문서내역은 마이페이지에서 확인 가능합니다");
          navigate(`/mypage/orders`);
      
        } catch (error) {
          console.error("결제 실패 또는 서버 오류:", error);
          alert("결제 처리 중 오류가 발생했습니다.");
        }
      };

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