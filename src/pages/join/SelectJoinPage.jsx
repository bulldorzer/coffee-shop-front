import { useNavigate } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";

// 회원가입 선택화면 - 이재민
const SelectJoin = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleJoinButtonClick = () => {
        navigate("/join/agree");  // /join/agree 페이지로 리디렉션
    };

    return(
        <BasicLayout>
            <h2>가입 방법 선택</h2>
            <div>
                <button type="button" onClick={handleJoinButtonClick}>
                    쇼핑몰 회원가입
                </button>
                <button>카카오 아이디 회원가입</button>
            </div>
        </BasicLayout>
    );
}

export default SelectJoin;
