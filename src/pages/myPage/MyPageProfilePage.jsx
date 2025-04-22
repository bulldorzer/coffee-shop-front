import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ProfileComponent from "../../component/myPage/ProfileComponent";
import "../../css/myPage/Profile.css"

/**
 *  회원정보 변경/탈퇴 페이지
 * @author 이재민
 * @returns 
 */
const MyPageProfilePage = () => {
  const navigate = useNavigate();
  return (
    <div className="profilePage">
        <h3 className="page-title">회원정보 변경/탈퇴 
          <button className="delete-account" onClick={() => navigate('/mypage/deleteaccount')}>회원 탈퇴</button>
        </h3>
      <div className="info">
        <span className="page-subtitle">정보 변경</span>
        <span>* 표시는 반드시 입력하셔야 하는 항목입니다.</span>
      </div>
        <ProfileComponent />
    </div>
  );
};

export default MyPageProfilePage;