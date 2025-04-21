import React from "react";
import ProductQnAComponent from "../../component/myPage/ProductQnAComponent";
import { useMember } from "../../component/myPage/MemberContextComponent";

// myPage상품문의 - 이재민
const MyPageProductQnAPage = () => {

  const member = useMember();
  return (
    <div>
      <h3 className="page-title">상품문의</h3>
      <ProductQnAComponent memberId={member.memberId}/>
    </div>
  );
};

export default MyPageProductQnAPage;