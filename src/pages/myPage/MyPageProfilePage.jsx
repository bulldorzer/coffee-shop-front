import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ProfileComponent from "../../component/myPage/ProfileComponent";

// myPage회원정보 변경 페이지 - 이재민
const MyPageProfilePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h3>회원정보 변경/탈퇴</h3>
      <button onClick={() => navigate('/mypage/deleteaccount')}>회원 탈퇴</button>
      <div>
        <span>정보 변경</span>
        <span>* 표시는 반드시 입력하셔야 하는 항목입니다.</span>
        <div>
          <ProfileComponent />
        </div>
      </div>
    </div>
  );
};

export default MyPageProfilePage;