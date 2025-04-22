import { useState } from "react";
import { useMember } from "../myPage/MemberContextComponent";
import axios from "axios";
import "../../css/myPage/Profile.css";

// 회원정보 수정 - 이재민
const ProfileComponent = () => {
  const member = useMember();

  const [name, setName] = useState(member.name);
  const [phone, setPhone] = useState(member.phone);
  const [zipcode, setZipcode] = useState(member.zipcode);
  const [city, setCity] = useState(member.city);
  const [street, setStreet] = useState(member.street);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailId, setEmailId] = useState(member.email.split("@")[0]);
  const [emailDomain, setEmailDomain] = useState(member.email.split("@")[1]);

  const memberId = member.memberId;

  const emailOptions = [
    "naver.com",
    "gmail.com",
    "hanmail.net",
    "daum.net",
    "nate.com",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (password.length < 8) {
      alert("비밀번호는 최소 8자리 이상이어야 합니다.");
      return;
    }

    const updatedMember = {
      ...member,
      name,
      phone,
      zipcode,
      city,
      street,
      pw: password,
      email: `${emailId}@${emailDomain}`,
    };

    axios
      .put(`http://localhost:8081/api/members/${memberId}`, updatedMember, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        alert("회원 정보가 성공적으로 수정되었습니다!");
      })
      .catch((error) => {
        console.error("회원 정보 수정 실패:", error);
        alert("수정 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="profileComponent">
      <form className="join-form" onSubmit={handleSubmit}>
        <div className="email-id">
          <label>* 이메일ID</label>
          <input
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            required
          />
          <label className="at">@</label>
          <input
            className="email-domain"
            value={emailDomain}
            onChange={(e) => setEmailDomain(e.target.value)}
            placeholder="직접입력"
            required
          />
          <select
            onChange={(e) => setEmailDomain(e.target.value)}
            value=""
          >
            <option value="" disabled hidden>도메인 선택</option>
            {emailOptions.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
        </div>

        <div className="new-password">
          <label>
            * 새 비밀번호{" "}
            <span style={{ fontSize: "12px", color: "#888" }}>
              (8자리 이상)
            </span>
          </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="confirm-password">
          <label>* 새 비밀번호 확인</label>
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="name">
          <label>* 이름</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="phone">
          <label>* 휴대폰 번호</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="address">
          <label>* 주소</label>
          <input
            className="city"
            value={city}
            onChange={(e) => setZipcode(e.target.value)}
            required
          />
          <input
            className="street"
            value={street}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <button type="button">우편번호 검색</button>
        </div>

        <div>
          <label>* 상세 주소</label>
          <input
            className="zipcode"
            value={zipcode}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </div>

        <div className="event-agree">
        <label className="event-agree">
            <input className="event-check" type="checkbox" defaultChecked />
            정보/이벤트 수신에 동의합니다.
        </label>
        </div>

        <button className="update-btn" type="submit">
          변경하기
        </button>
      </form>
    </div>
  );
};

export default ProfileComponent;
