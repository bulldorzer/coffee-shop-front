import React from "react";
import { useNavigate } from "react-router-dom";
import DeleteAccountComponent from "../../component/myPage/DeleteAccountComponent";
import "../../css/myPage/DeleteAccount.css";

const MyPageDeleteAccountPage = () => {
    const navigate = useNavigate();

    return(
        <div className="deleteAccountPage">
            <h3 className="page-title">회원정보 변경/탈퇴
                <button className="update-profile" onClick={() => navigate('/mypage/profile')}>정보 변경</button>
            </h3>
            <div>
                <span className="page-subtitle">회원 탈퇴</span>
            </div>
                <DeleteAccountComponent />
        </div>
    )
}

export default MyPageDeleteAccountPage