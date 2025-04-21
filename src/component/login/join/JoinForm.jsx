import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../../css/login/JoinForm.css";

// 회원가입 폼 - 나영일, 이재민
const JoinForm = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인용
    const [emailId, setEmailId] = useState("");
    const [emailDomain, setEmailDomain] = useState("");
    
    const emailOptions = [
        "naver.com",
        "gmail.com",
        "hanmail.net",
        "daum.net",
        "nate.com",
    ];

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // 페이지 새로고침 방지

        if (password.length < 8) {
            alert("비밀번호는 8자 이상이어야 합니다.");
            return;
        }

        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const newMember = {
            email: `${emailId}@${emailDomain}`, 
            pw: password,                       
            name: name,                         
            phone: phone,                       
            city: city,                         
            street: street,                     
            zipcode: zipcode,                  
            social: false   // 소셜 로그인 여부 (기본값: false)
        };

        axios
            .post("http://localhost:8081/api/members", newMember)
            .then(() => {
                alert("회원가입이 완료되었습니다!");
                navigate("/login");
            })
            .catch((error) => {
                console.error("회원가입 실패:", error);
                alert("회원가입 중 오류가 발생했습니다.");
            });
    };

    return (
        <div className="join-form-container">
            <h2>정보 입력</h2>
            <span>* 표시는 반드시 입력하셔야 하는 항목입니다.</span>
            
            <form onSubmit={handleSubmit}>
                <div className="labeled-input">
                    <label>* 이메일ID</label>
                    <div className="email-input-wrapper">
                        <input
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                            required
                        />
                        <span>@</span>
                        <input
                            value={emailDomain}
                            onChange={(e) => setEmailDomain(e.target.value)}
                            placeholder="직접입력"
                            required
                        />
                        <select
                            onChange={(e) => setEmailDomain(e.target.value)}
                            value={emailDomain}
                            required
                        >
                            <option value="" disabled hidden>도메인 선택</option>
                            {emailOptions.map((domain) => (
                                <option key={domain} value={domain}>
                                    {domain}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="labeled-input">
                    <label>* 비밀번호 (비밀번호는 8자 이상이어야 합니다.) </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                
                <div className="labeled-input">
                    <label>* 비밀번호 확인</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="labeled-input">
                    <label>* 이름</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="labeled-input">
                    <label>* 휴대폰 번호</label>
                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>

                <div className="labeled-input">
                    <label>* 주소</label>
                    <div className="address-input-wrapper">
                        <input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                        <input
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            required
                        />
                        <button type="button">우편번호 검색</button>
                    </div>
                </div>
                <div className="labeled-input">
                    <label>* 상세 주소</label>
                    <input
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        required
                    />
                </div>

                <div className="checkbox-group">
                    <input type="checkbox" defaultChecked />
                    <label>정보/이벤트 수신에 동의합니다.</label>
                </div>

                <div className="button-group">
                    <Link to="/join/agree">이전단계</Link>
                    <button type="submit">회원가입</button>
                </div>
            </form>
        </div>
    );
};

export default JoinForm;
