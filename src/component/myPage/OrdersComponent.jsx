import { useState } from "react";
import ReviewForm from "../review/ReviewForm";

const OrdersComponent = ({ orders, memberId }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openOrderId, setOpenOrderId] = useState(null);

  const statusMap = {
    PENDING: "주문대기",
    ORDER: "주문접수",
    CANCEL: "주문취소",
    COMP: "배송중",
    COMPLETE: "배송완료"
  };

  const filteredOrders = orders.filter(order => order.status !== "CANCEL");

  const groupByOrderId = () => {
    const grouped = {};
    filteredOrders.forEach((order) => {
      if (!grouped[order.orderId]) {
        grouped[order.orderId] = [];
      }
      grouped[order.orderId].push(order);
    });
    return Object.values(grouped);
  };

  const groupedOrders = groupByOrderId();

  const toggleOrderDetails = (orderId) => {
    setOpenOrderId(prev => (prev === orderId ? null : orderId));
  };

  const handleWriteReview = (orderItem) => {
    setSelectedOrder(orderItem);
    setShowReviewForm(true);
  };

  const closeReviewForm = () => {
    setShowReviewForm(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <ul>
        <li>
          <span>주문날짜</span>
          <span>상품명</span>
          <span>총금액</span>
          <span>주문상태</span>
          <span></span>
        </li>

        {groupedOrders.length > 0 ? (
          groupedOrders.map((group, index) => {
            const firstItem = group[0];
            const extraCount = group.length - 1;
            const totalPrice = group.reduce((sum, item) => sum + item.totalPrice, 0);

            return (
              <li key={index}>
                <span>{firstItem.orderDate}</span>
                <span
                  style={{ cursor: "pointer", color: "#2a7ae2", textDecoration: "underline" }}
                  onClick={() => toggleOrderDetails(firstItem.orderId)}
                >
                  {firstItem.coffeeName}
                  {extraCount > 0 ? ` 외 ${extraCount}건` : ""}
                </span>
                <span>{totalPrice.toLocaleString()}원</span>
                <span>{statusMap[firstItem.status]}</span>
                <span></span>

                {/* 상세 상품 목록 */}
                {openOrderId === firstItem.orderId && (
                  <ul style={{ marginTop: "10px", paddingLeft: "20px", fontSize: "14px", color: "#444" }}>
                    {group.map((item, idx) => (
                      <li key={idx} style={{ marginBottom: "5px" }}>
                        - {item.coffeeName} / 수량: {item.qty}개 / 금액: {item.totalPrice.toLocaleString()}원
                        {item.status === "COMPLETE" && (
                          <button
                            style={{ marginLeft: "10px" }}
                            onClick={() => handleWriteReview(item)}
                          >
                            리뷰작성
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })
        ) : (
          <li>주문 내역이 없습니다.</li>
        )}
      </ul>

      {/* 리뷰 작성 폼 */}
      {showReviewForm && selectedOrder && (
        <ReviewForm
          onCancel={closeReviewForm}
          memberId={memberId}
          coffeeBeanId={selectedOrder.coffeeBeanId}
          writer={selectedOrder.writer}
        />
      )}
    </>
  );
};

export default OrdersComponent;
