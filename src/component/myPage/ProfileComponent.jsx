import { useState } from "react";
import { useMember } from "../myPage/MemberContextComponent"
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

    const [emailId, setemailId] = useState(member.email.split("@")[0]);
    const [emailDomain, setemailDomain] = useState(member.email.split("@")[1]);

    const memberId = member.memberId;

   

    
    
    const handleSubmit = (e) => {
        e.preventDefault(); // 페이지 새로고침 방지

        const updatedMember = {
            ...member,
            name,
            phone,
            zipcode,
            city,
            street,
            pw: password,
            email: `${emailId}@${emailDomain}`
        }

        axios
        .put(`http://localhost:8081/api/members/${memberId}`, updatedMember, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT 토큰
        },
        })
        .then((response) => {
        // 성공시 처리 (예: 알림, 리다이렉션)
        alert("회원 정보가 성공적으로 수정되었습니다!");
        })
        .catch((error) => {
        console.error("회원 정보 수정 실패:", error);
        alert("수정 중 오류가 발생했습니다.");
        });
    };
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>* 이메일ID</label>
                <input
                value={emailId}
                onChange={(e) => setemailId(e.target.value)} // 이메일ID 변경
                />
                <span>@</span>
                <select
                value={emailDomain}
                onChange={(e) => setemailDomain(e.target.value)} // 이메일 도메인 변경
                >
                <option>직접입력</option>
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="hanmail.net">hanmail.net</option>
                <option value="daum.net">daum.net</option>
                <option value="nate.com">nate.com</option>
                </select>
                <br />

                <label>* 비밀번호</label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // 비밀번호 변경
                />
                <br />

                <label>* 비밀번호 확인</label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // 비밀번호 확인
                />
                <br />

                <label>* 이름</label>
                <input
                value={name}
                onChange={(e) => setName(e.target.value)} // 이름 변경
                />
                <br />

                <label>* 휴대폰 번호</label>
                <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)} // 전화번호 변경
                />
                <br />

                <label>* 주소</label>
                <input
                value={city}
                onChange={(e) => setZipcode(e.target.value)} // 우편번호 변경
                />
                <input
                value={street}
                onChange={(e) => setCity(e.target.value)} // 도시 + 거리 변경
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