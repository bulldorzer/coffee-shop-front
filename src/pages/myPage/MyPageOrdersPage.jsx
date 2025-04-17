import React, { useEffect, useState } from "react";
import DateFilter from "../../component/utilComponent/DateFilter";
import OrdersComponent from "../../component/myPage/OrdersComponent";
import { useMember } from "../../component/myPage/MemberContextComponent"
import axios from "axios";
// myPage주문내역/배송조회 - 이재민


const MyPageOrdersPage = () => {
  const member = useMember();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  console.log("memberId: ",member?.memberId);
  console.log("memberName: ",member?.name);
  console.log("coffeeBeanId: ",orders);
 
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/orders/details/${member?.memberId}`);
        console.log(response.data);
        setOrders(response.data);
        setFilteredOrders(response.data);
      } catch (error) {
        console.error("주문내역 로딩 실패", error);
      }
    };

    if(member?.memberId) {
      fetchOrders();
    }
  }, [member]);

  const handleDateSearch = (startDate, endDate) => {
    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.orderDate);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return orderDate >= start && orderDate <= end;
    });
    setFilteredOrders(filtered);
  }
  return (
    <div>
      <h3>주문목록/배송조회</h3>
      <div>
        <DateFilter onSearch={handleDateSearch}/>
      </div>
      <div>
        <span>주문목록/배송조회 내역</span>
        <OrdersComponent orders={filteredOrders} memberId={member.memberId} name={member.name}/>
      </div>
    </div>
  );
};

export default MyPageOrdersPage;