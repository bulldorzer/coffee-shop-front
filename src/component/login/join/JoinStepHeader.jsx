
/**
 * 가입 단계별 헤더 컴포넌트 - 나영일
 * @param {step}
 * @returns 
 */

const JoinStepHeader = ({ step }) => {

    return (
        <div className="joinheader">
            <h1 className="join-title">회원가입</h1>
            <div className="join-step">
                <span className="step1">01 약관동의 {step === 1 && '>'} </span>
                <span className="step2">02 정보입력 {step === 2 && '>'} </span>
            </div>
        </div>
    );
};

export default JoinStepHeader;