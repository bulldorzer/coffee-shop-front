import React from "react";
import MemberSaveComponent from "../../component/myPage/MemberSaveComponent";
import "../../css/myPage/MemberSave.css"


// myPage관심상품 - 이재민
const MyPageMemberSavePage = () => {  
  

  return (
    <div className="membersave">
      <h3 className="page-title k">관심상품</h3>
      <div className="page-subtitle">
      <span>관심 상품 목록</span>
      </div>
      <MemberSaveComponent />
    </div>
  );
};

export default MyPageMemberSavePage;