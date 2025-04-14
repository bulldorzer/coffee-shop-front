import React from "react";
import { useNavigate } from "react-router-dom";
import DeleteAccountComponent from "../component/myPage/DeleteAccountComponent";

const MyPageDeleteAccountPage = () => {
    const navigate = useNavigate();

    return(
        <div>
            <h3>회원정보 변경/탈퇴</h3>
            <button onClick={() => navigate('/mypage/profile')}>정보 변경</button>
            <span>회원 탈퇴</span>
            <DeleteAccountComponent />
        </div>
    )
}

export default MyPageDeleteAccountPage