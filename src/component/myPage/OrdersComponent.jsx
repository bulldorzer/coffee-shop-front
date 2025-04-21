import { useState } from "react";
import ReviewForm from "../review/ReviewForm";
import "../../css/myPage/Orders.css";

const OrdersComponent = ({ orders, memberId, name }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openOrderId, setOpenOrderId] = useState(null);

  const statusMap = {
    PENDING: "주문대기",
    ORDER: "주문접수",
    CANCEL: "주문취소",
    COMP: "배송중",
    COMPLETE: "배송완료",
  };

  const fetchOrders = async () => {
    try {
      const res = await getOrdersByMember(memberId);
      setOrders(res);
    } catch (e) {
      console.error("주문 내역 새로고침 실패", e);
    }
  };

  const handleWriteReview = (orderItem) => {
    setSelectedOrder(orderItem);
    setShowReviewForm(true);
  };

  const closeReviewForm = () => {
    setShowReviewForm(false);
    setSelectedOrder(null);
  };

  const handleReviewSubmitComplete = async () => {
    closeReviewForm();
    await fetchOrders();
  };

  const filteredOrders = orders.filter((order) => order.status !== "CANCEL");

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
    setOpenOrderId((prev) => (prev === orderId ? null : orderId));
  };

  return (
    <>
      <ul className="orders-list">
        <li className="orders-header">
          <span>주문날짜</span>
          <span>상품명</span>
          <span>총금액</span>
          <span>주문상태</span>
        </li>

        {groupedOrders.length > 0 ? (
          groupedOrders.map((group, index) => {
            const firstItem = group[0];
            const extraCount = group.length - 1;
            const totalPrice = group.reduce((sum, item) => sum + item.totalPrice, 0);

            return (
              <div>
                <li key={index} className="order-item">
                  <span>{firstItem.orderDate}</span>
                  <span
                    className="order-name"
                    onClick={() => toggleOrderDetails(firstItem.orderId)}
                  >
                    {firstItem.coffeeName}
                    {extraCount > 0 ? ` 외 ${extraCount}건` : ""}
                  </span>
                  <span>{totalPrice.toLocaleString()}원</span>
                  <span>{statusMap[firstItem.status]}</span>
                </li>

                {openOrderId === firstItem.orderId && (
                  <ul className="order-details">
                    {group.map((item, idx) => (
                      <li key={idx} className="order-detail-item">
                        - {item.coffeeName} / 수량: {item.qty}개 / 금액: {item.totalPrice.toLocaleString()}원
                        {item.status === "COMPLETE" && (
                          <button
                            className="review-btn"
                            onClick={() => handleWriteReview(item)}
                          >
                            리뷰작성
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })
        ) : (
          <li className="empty-orders">주문 내역이 없습니다.</li>
        )}
      </ul>

      {showReviewForm && selectedOrder && (
        <ReviewForm
          onCancel={closeReviewForm}
          onSubmitComplete={handleReviewSubmitComplete}
          memberId={memberId}
          coffeeBeanId={selectedOrder.coffeeBeanId}
          writer={name}
        />
      )}
    </>
  );
};

export default OrdersComponent;
