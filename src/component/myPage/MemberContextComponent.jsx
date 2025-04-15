import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// MemberContext를 생성해서 회원 정보를 관리
const MemberContext = createContext(null);

export const MemberProvider = ({ children }) => {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const memberId = localStorage.getItem("memberId");

    if (!token || !memberId) {
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:8081/api/members/${memberId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT 토큰
      },
    })
    .then((response) => {
      setMember(response.data);  // 응답 받은 회원 정보 저장
    })
    .catch((error) => {
      console.error("회원 정보 로딩 실패:", error);
    })
    .finally(() => {
      setLoading(false);  // 로딩 완료
    });
  }, []);

  return (
    <MemberContext.Provider value={member}>
      {loading ? <div>회원 정보 불러오는 중...</div> : children}
    </MemberContext.Provider>
  );
};

export const useMember = () => useContext(MemberContext);
