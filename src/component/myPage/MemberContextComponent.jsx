import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// MemberContext를 생성해서 회원 정보를 관리
// MemberDTO정보를 가져옴
const MemberContext = createContext(null);

export const MemberProvider = ({ children }) => {
  // console.log("MemberProvider 렌더링됨");
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log("useEffect 실행");
    const token = localStorage.getItem("accessToken");  // accessToken로 수정

    // console.log("token:", token);

    if (!token) {
      setLoading(false);
      return;
    }

    // JWT 디코딩을 위한 함수
    const decodeJWT = (token) => {
      const base64Url = token.split('.')[1];  // JWT의 payload 부분을 분리
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // URL 안전한 Base64 -> 일반 Base64로 변환
      const decodedPayload = JSON.parse(atob(base64));  // Base64를 디코딩하고 JSON으로 파싱

      // 이메일을 추출 (email 또는 sub로 가져옴)
      const email = decodedPayload.email || decodedPayload.sub;
      // console.log("추출된 이메일:", email);
      return email;
    };

    const email = decodeJWT(token);  // 토큰에서 이메일 추출

    // 이메일을 기반으로 회원 정보를 받아옴
    if (email) {
      axios.get(`http://localhost:8081/api/members/me/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,  // JWT 토큰
        },
      })
        .then((response) => {
          console.log("회원 정보 응답 데이터:", response.data);
          setMember(response.data);  // 응답 받은 회원 정보 저장
        })
        .catch((error) => {
          console.error("회원 정보 로딩 실패:", error);
        })
        .finally(() => {
          setLoading(false);  // 로딩 완료
        });
    } else {
      setLoading(false);  // 이메일 추출 실패 시 로딩 완료
    }
  }, []);

  return (
    <MemberContext.Provider value={member}>
      {loading ? <div>회원 정보 불러오는 중...</div> : children}
    </MemberContext.Provider>
  );
};

export const useMember = () => useContext(MemberContext);