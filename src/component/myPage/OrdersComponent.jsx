const OrdersComponent = ({ orders }) => {
    const statusMap = {
      PENDING: "주문대기",
      ORDER: "주문접수",
      CANCEL: "주문취소", // 나중에 취소내역에서 보여줄 예정
      DELIVERY: "배송중",
      DELIVERY_OVER: "배송완료"
    };
  
    // CANCEL 상태를 제외한 주문만 필터링
    const filteredOrders = orders.filter(order => order.status !== "CANCEL");
  
    // 주문을 orderId 기준으로 그룹화
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
            <li>주문 내역이 없습니다.</li>
          )}
        </ul>
      </>
    );
  };
  
  export default OrdersComponent;
  