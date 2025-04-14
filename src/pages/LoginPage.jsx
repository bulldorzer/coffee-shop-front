import BasicLayout from "../layouts/BasicLayout";
import LoginComponent from "../component/login/LoginComponent";

/**
 * 로그인 화면 - 나영일
 * @returns 
 */

const LoginPage = () => {

    return (
        <BasicLayout>
            <div>
                <div className="container">
                    <LoginComponent />
                </div>
            </div>
        </BasicLayout>
    );
}

export default LoginPage;