
/**
 * 가입 단계별 헤더 컴포넌트 - 나영일
 * @param {step}
 * @returns 
 */

const JoinStepHeader = ({ step }) => {

    return (
        <div>
            <h1>회원가입</h1>
            <span>01 약관동의 {step === 1 && '>'} </span>
            <span>02 정보입력 {step === 2 && '>'} </span>
            <hr/>
        </div>
    );
};

export default JoinStepHeader;