import React, { useEffect, useState } from "react";
import Orders_CancelComponent from "../../component/myPage/Orders_CancelComponent"; // 수정된 CancelOrdersComponent 임포트
import DateFilter from "../../component/utilComponent/DateFilter"; // DateFilter 임포트
import { useMember } from "../../component/myPage/MemberContextComponent";
import axios from "axios";

const MyPageOrders_CancelPage = () => {
  const member = useMember();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/orders/details/${member?.memberId}`);
        setOrders(response.data);
        setFilteredOrders(response.data); // 기본적으로 모든 주문을 필터된 상태로 설정
      } catch (error) {
        console.error("주문내역 로딩 실패", error);
      }
    };

    if (member?.memberId) {
      fetchOrders();
    }
  }, [member]);

  // 날짜 필터링 함수
  const handleDateSearch = (startDate, endDate) => {
    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.orderDate);
      return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });
    setFilteredOrders(filtered);
  };

  // 취소된 주문만 필터링
  const canceledOrders = filteredOrders.filter(order => order.status === "CANCEL");

  return (
    <div>
      <h3>취소/환불/교환</h3>
      <DateFilter onSearch={handleDateSearch} />
      <div>
        <span>취소/환불/교환 내역</span>
        <Orders_CancelComponent orders={canceledOrders} />
      </div>
    </div>
  );
};

export default MyPageOrders_CancelPage;
