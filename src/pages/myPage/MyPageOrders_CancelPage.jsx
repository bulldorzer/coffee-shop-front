import React from "react";
import DateFilter from "../../component/utilComponent/DateFilter";
import Orders_CancelComponent from "../../component/myPage/Orders_CancelComponent";

// myPage취소/환불/교환내역 - 이재민


const MyPageOrders_CancelPage = () => {

  const handleDateSearch = (startDate, endDate) => {
    // 이후 날짜 데이터를 백으로 넘겨줄 코드
    console.log(startDate);
    console.log(endDate);
  }

  return (
    <div>
      <h3>취소/환불/교환 조회</h3>
      <div>
        <DateFilter onSearch={handleDateSearch} />
      </div>
      <span>취소/환불/교환 내역</span>
      <Orders_CancelComponent />
    </div>
  );
};

export default MyPageOrders_CancelPage;