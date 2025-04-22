import { useState } from "react";
import { useMember } from "../myPage/MemberContextComponent";
import axios from "axios";
import "../../css/myPage/DeleteAccount.css"; // 새 CSS

const DeleteAccountComponent = () => {
  const [password, setPassword] = useState("");
  const member = useMember();

  const handleDelete = async () => {
    const confirmed = window.confirm("정말로 탈퇴하시겠습니까?");
    if (!confirmed) return;

    try {
      const response = await axios.post(
        `http://localhost:8081/api/members/${member.memberId}/verify-password`,
        { pw: password },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.data.verified) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      await axios.delete(`http://localhost:8081/api/members/${member.memberId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      localStorage.removeItem("token");
      alert("회원 탈퇴가 완료되었습니다.");
      window.location.href = "/login";
    } catch (error) {
      console.error("회원 탈퇴 실패:", error);
      alert("탈퇴 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="delete-account-box">
      <p className="delete-info">
        콩볶는사람들 원두커피쇼핑몰 홀릭커피 탈퇴안내<br /><br />
        쇼핑몰 이용에 불편하셨던 점이나 불만사항을 알려주시면 적극 반영하겠습니다.<br /><br />
        아울러 회원 탈퇴 시 아래 사항을 숙지하시기 바랍니다.<br />
        1. 회원 탈퇴 시 고객님의 정보는 전자상거래 소비자 보호법에 따라 일정 기간 보관됩니다.<br />
        2. 탈퇴 시 보유하셨던 마일리지는 모두 삭제됩니다.
      </p>

      <hr />

      <label className="delete-label">* 비밀번호 확인</label>
      <input
        className="delete-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="delete-btn" onClick={handleDelete}>
        회원 탈퇴
      </button>
    </div>
  );
};

export default DeleteAccountComponent;
