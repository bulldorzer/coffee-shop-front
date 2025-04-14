import LabeledInput from "./LabeledInput";
import EmailSelect from "./EmailSelect";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../../../css/login/JoinForm.css";

const JoinForm = () => {
    const [emailDomain, setEmailDomain] = useState("");

    return (
        <div className="join-form-container">
            <h2>정보 입력</h2>
            <span>* 표시는 반드시 입력하셔야 하는 항목입니다.</span>
            <hr />

            <div className="labeled-input">
                <label>이메일 ID</label>
                <div className="email-input-wrapper">
                    <input />
                    <span>@</span>
                    <EmailSelect value={emailDomain} onChange={e => setEmailDomain(e.target.value)} />
                </div>
            </div>

            <div className="labeled-input">
                <label>비밀번호</label>
                <input type="password" />
            </div>

            <div className="labeled-input">
                <label>비밀번호 확인</label>
                <input type="password" />
            </div>

            <div className="labeled-input">
                <label>이름</label>
                <input />
            </div>

            <div className="labeled-input">
                <label>휴대폰 번호</label>
                <input />
            </div>

            <div className="labeled-input">
                <label>주소</label>
                <div className="address-input-wrapper">
                    <input />
                    <button>우편번호 검색</button>
                </div>
            </div>

            <div className="labeled-input">
                <label>상세 주소</label>
                <input />
            </div>

            <div className="checkbox-group">
                <input type="checkbox" id="eventAgree" />
                <label htmlFor="eventAgree">정보/이벤트 수신에 동의합니다.</label>
            </div>

            <div className="button-group">
                <Link to="/join/agree">이전단계</Link>
                <Link to="/login">회원가입</Link>
            </div>
        </div>
    );
};

export default JoinForm;