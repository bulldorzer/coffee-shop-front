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
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedPayload = JSON.parse(atob(base64));
        return decodedPayload.email || decodedPayload.sub;
      } catch (error) {
        console.error("JWT 디코딩 실패:", error);
        return null;
      }
    };

    const email = decodeJWT(token);

    if (email) {
      axios
        .get(`http://localhost:8081/api/members/me/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setMember(res.data);
        })
        .catch((err) => {
          console.error("회원 정보 요청 실패:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return { member, loading };
};

export default useMemberInfo;