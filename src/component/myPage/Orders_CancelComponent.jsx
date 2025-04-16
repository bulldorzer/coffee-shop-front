import React from "react";

// 주문 취소 내역 조회 컴포넌트 - 이재민
const Orders_CancelComponent = ({ orders }) => {
  const statusMap = {
    PENDING: "주문대기",
    ORDER: "주문접수",
    CANCEL: "주문취소", // 취소된 주문만 표시
    DELIVERY: "배송중",
    DELIVERY_OVER: "배송완료"
  };

  // CANCEL 상태인 주문만 필터링
  const cancelOrders = orders.filter(order => order.status === "CANCEL");

  const groupByOrderId = () => {
    const grouped = {};
    cancelOrders.forEach((order) => {
      if (!grouped[order.orderId]) {
        grouped[order.orderId] = [];
      }
      grouped[order.orderId].push(order);
    });
    return Object.values(grouped);
  };

  const groupedOrders = groupByOrderId();

  return (
    <>
      <ul>
        <li>
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
                <li key={index}>
                  <span>{firstItem.orderDate}</span>
                  <span>
                    {firstItem.coffeeName}
                    {extraCount > 0 ? ` 외 ${extraCount}건` : ""}
                  </span>
                  <span>{totalPrice.toLocaleString()}원</span>
                  <span>{statusMap[firstItem.status]}</span> 
                </li>
              );
            })
          ) : (
            <li>주문 취소 내역이 없습니다.</li>
          )}
      </ul>
    </>
  );
};

export default Orders_CancelComponent;
