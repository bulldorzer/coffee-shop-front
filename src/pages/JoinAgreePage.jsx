import BasicLayout from "../layouts/BasicLayout";
import JoinStepHeader from "../component/login/join/JoinStepHeader";
import AgreementCheckbox from "../component/login/join/AgreementCheckBox";
import { Link } from "react-router-dom";
import "../css/login/JoinAgreePage.css"; // ✅ 스타일 추가

const JoinAgreePage = () => {
    return (
        <BasicLayout>
            <JoinStepHeader step={1} />
            <div className="join-agree-container">
                <h2>약관 동의</h2>
                <hr />
                <div className="agreement-section">
                    <AgreementCheckbox label="모든 약관을 확인하고 전체 동의합니다." />
                </div>
                <div className="agreement-section">
                    <AgreementCheckbox label="이용 약관" required />
                    <textarea className="agreement-textarea" readOnly>
                        이용 약관
                    </textarea>
                </div>
                <div className="agreement-section">
                    <AgreementCheckbox label="개인정보 수집 및 이용" required />
                    <textarea className="agreement-textarea" readOnly>
                        개인정보 수집 및 이용
                    </textarea>
                </div>
                <Link to="/join" className="next-button">다음단계</Link>
            </div>
        </BasicLayout>
    );
};

export default JoinAgreePage;