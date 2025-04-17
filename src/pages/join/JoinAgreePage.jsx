import { useState } from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import JoinStepHeader from "../../component/login/join/JoinStepHeader";
import AgreementCheckbox from "../../component/login/join/AgreementCheckBox";
import "../../css/login/JoinAgreePage.css";
import { privacyPolicy, termsOfService } from "../../data/TeramsText";

const JoinAgreePage = () => {
    const [allChecked, setAllChecked] = useState(false);
    const [termsChecked, setTermsChecked] = useState(false);
    const [privacyChecked, setPrivacyChecked] = useState(false);

    const handleAllChecked = (e) => {
        const checked = e.target.checked;
        setAllChecked(checked);
        setTermsChecked(checked);
        setPrivacyChecked(checked);
    };

    const handleTermsChecked = (e) => {
        const checked = e.target.checked;
        setTermsChecked(checked);
        if (!checked) {
            setAllChecked(false);
        } else if (privacyChecked) {
            setAllChecked(true);
        }
    };

    const handlePrivacyChecked = (e) => {
        const checked = e.target.checked;
        setPrivacyChecked(checked);
        if (!checked) {
            setAllChecked(false);
        } else if (termsChecked) {
            setAllChecked(true);
        }
    };

    return (
        <BasicLayout>
            <JoinStepHeader step={1} />
            <div className="join-agree-container">
                <h2>약관 동의</h2>
                <hr />
                <div className="agreement-section">
                    <AgreementCheckbox
                        label="모든 약관을 확인하고 전체 동의합니다."
                        checked={allChecked}
                        onChange={handleAllChecked}
                    />
                </div>
                <div className="agreement-section">
                    <AgreementCheckbox
                        label="이용 약관"
                        required
                        checked={termsChecked}
                        onChange={handleTermsChecked}
                    />
                    <textarea className="agreement-textarea" readOnly>
                        {termsOfService}
                    </textarea>
                </div>
                <div className="agreement-section">
                    <AgreementCheckbox
                        label="개인정보 수집 및 이용"
                        required
                        checked={privacyChecked}
                        onChange={handlePrivacyChecked}
                    />
                    <textarea className="agreement-textarea" readOnly>
                        {privacyPolicy}
                    </textarea>
                </div>
                <Link
                    to="/join"
                    className={`next-button ${termsChecked && privacyChecked ? "" : "disabled"}`}
                    onClick={(e) => {
                        if (!(termsChecked && privacyChecked)) {
                            e.preventDefault(); // 필수 약관 미동의 시 다음 단계로 못 넘어가게
                            alert("필수 약관에 동의해주세요.");
                        }
                    }}
                >
                    다음단계
                </Link>
            </div>
        </BasicLayout>
    );
};

export default JoinAgreePage;
