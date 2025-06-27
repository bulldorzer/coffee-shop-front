import { useEffect, useState } from "react";
import axios from "axios";

const useMemberInfo = () => {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setLoading(false);
      return;
    }

    const decodeJWT = (token) => {
      try {
        const base64Url = token.split('.')[1]; // JWT의 payload 부분을 분리
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // URL 안전한 Base64 -> 일반 Base64로 변환
        const decodedPayload = JSON.parse(atob(base64)); // Base64를 디코딩하고 JSON으로 파싱
        return decodedPayload.email || decodedPayload.sub; // 이메일을 추출
      } catch (error) {
        console.error("JWT 디코딩 실패:", error);
        return null;
      }
    };

    const email = decodeJWT(token); // 토큰에서 이메일 추출

    // 이메일을 기반으로 회원 정보를 받아옴
    if (email) {
      axios
        .get(`http://localhost:8081/api/members/me/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`, // JWT 토큰
          },
        })
        .then((res) => {
          setMember(res.data); // 응답 받은 회원 정보 저장
        })
        .catch((err) => {
          console.error("회원 정보 요청 실패:", err);
        })
        .finally(() => {
          setLoading(false); // 로딩 완료
        });
    } else {
      setLoading(false); // 이메일 추출 실패 시 로딩 완료
    }
  }, []);

  return { member, loading };
};

export default useMemberInfo;