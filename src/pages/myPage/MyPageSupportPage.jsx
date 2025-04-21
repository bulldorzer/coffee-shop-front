import React from "react";
import SupportComponent from "../../component/myPage/SupportComponent";
import { useMember } from "../../component/myPage/MemberContextComponent";

// myPage이용문의 - 이재민
const MyPageSupportPage = () => {
  const member = useMember();
  return (
    <div>
      <div>
        <h3 className="page-title">이용문의</h3>
      </div>
      <SupportComponent memberId={member.memberId} name={member.name}/>
    </div>
  );
};

export default MyPageSupportPage;