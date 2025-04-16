import { useState } from "react";
import { useMember } from "../myPage/MemberContextComponent";
import axios from "axios";

// 회원정보 수정 - 이재민
const ProfileComponent = () => {
    const member = useMember();

    // 입력 값
    const [name, setName] = useState(member.name);
    const [phone, setPhone] = useState(member.phone);
    const [zipcode, setZipcode] = useState(member.zipcode);
    const [city, setCity] = useState(member.city);
    const [street, setStreet] = useState(member.street);
    const [password, setPassword] = useState(member.pw);
    const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인용
    const [emailId, setEmailId] = useState(member.email.split("@")[0]);
    const [emailDomain, setEmailDomain] = useState(member.email.split("@")[1]);

    const memberId = member.memberId;

    // 이메일 도메인 리스트
    const emailOptions = [
        "naver.com",
        "gmail.com",
        "hanmail.net",
        "daum.net",
        "nate.com",
    ];

    const handleSubmit = (e) => {
        e.preventDefault(); // 페이지 새로고침 방지

        // 비밀번호 확인
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
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
            email: `${emailId}@${emailDomain}`
        };

        axios
            .put(`http://localhost:8081/api/members/${memberId}`, updatedMember, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT 토큰
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
        <div>
            <form onSubmit={handleSubmit}>
                <label>* 이메일ID</label>
                <input
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                />
                <span>@</span>
                <input
                    value={emailDomain}
                    onChange={(e) => setEmailDomain(e.target.value)}
                    placeholder="직접입력"
                />
                <select
                    onChange={(e) => setEmailDomain(e.target.value)}
                    value="" // 항상 기본 상태로 유지
                >
                    <option value="" disabled hidden>도메인 선택</option>
                    {emailOptions.map((domain) => (
                        <option key={domain} value={domain}>
                            {domain}
                        </option>
                    ))}
                </select>
                <br />

                <label>* 새 비밀번호</label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />

                <label>* 새 비밀번호 확인</label>
                <input
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <br />

                <label>* 이름</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />

                <label>* 휴대폰 번호</label>
                <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <br />

                <label>* 주소</label>
                <input
                    value={city}
                    onChange={(e) => setZipcode(e.target.value)} // 우편번호 변경
                />
                <input
                    value={street}
                    onChange={(e) => setCity(e.target.value)} // 도시 변경
                />
                <button>우편번호 검색</button>
                <br />

                <label>* 상세 주소</label>
                <input
                    value={zipcode}
                    onChange={(e) => setStreet(e.target.value)} // 상세 주소 변경
                />
                <br />

                <input type="checkbox" defaultChecked />
                <label>정보/이벤트 수신에 동의합니다.</label>
                <br />

                <button type="submit">변경하기</button>
            </form>
        </div>
    );
};

export default ProfileComponent;
