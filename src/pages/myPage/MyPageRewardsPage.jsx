import React from "react";
import RewardsComponent from "../../component/myPage/RewardsComponent";
import "../../css/myPage/Rewards.css"

// myPage회원등급/마일리지 - 이재민
const MyPageRewardsPage = () => {
  return (
    <div className="rewards">
      <h3 className="page-title">회원등급/마일리지</h3>
      <div>
        <RewardsComponent /> 
      </div>
    </div>
  );
};

export default MyPageRewardsPage;