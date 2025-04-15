import BasicLayout from "../../layouts/BasicLayout";
import JoinStepHeader from "../../component/login/join/JoinStepHeader";
import JoinForm from "../../component/login/join/JoinForm";

/**
 * 회원가입 화면 2 : 정보 입력 - 나영일
 * @returns 
 */

const JoinPage = () => {

    return (
        <BasicLayout>
            <JoinStepHeader step={2} />
            <JoinForm />
        </BasicLayout>
    );

}

export default JoinPage;