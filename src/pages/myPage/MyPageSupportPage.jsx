import React from "react";
import SupportComponent from "../../component/myPage/SupportComponent";

// myPage이용문의 - 이재민
const MyPageSupportPage = () => {
  return (
    <div>
      <div>
        <h3>이용문의</h3>
        <span>( 홈페이지 이용 중 문제나 문의사항을 남겨주세요. )</span>
      </div>
      <span>이용문의 표시</span>
      <SupportComponent />
    </div>
  );
};

export default MyPageSupportPage;