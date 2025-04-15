import React from "react";
import DateFilter from "../../component/utilComponent/DateFilter";
import OrdersComponent from "../../component/myPage/OrdersComponent";
// myPage주문내역/배송조회 - 이재민


const MyPageOrdersPage = () => {

  const handleDateSearch = (startDate, endDate) => {
    // 이후 날짜 데이터를 백으로 넘겨줄 코드
    console.log(startDate);
    console.log(endDate);
  }
  return (
    <div>
      <h3>주문목록/배송조회</h3>
      <div>
        <DateFilter onSearch={handleDateSearch}/>
      </div>
      <div>
        <span>주문목록/배송조회 내역</span>
        <OrdersComponent />
      </div>
    </div>
  );
};

export default MyPageOrdersPage;