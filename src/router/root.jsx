import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react"; // 컴포넌트 로딩 최적화
import myPageRoutes from "./myPageRoutes.jsx"

const Loading = <div>Loading...</div>

// 메인화면
const Main = lazy(() => import("../pages/MainPage.jsx"));
// 예제파일
const Exam = lazy(() => import("../pages/ExamplePage.jsx"));

// 로그인관련 - 재민
const Login = lazy(() => import("../pages/LoginPage.jsx"));
const JoinAgree = lazy(() => import("../pages/JoinAgreePage.jsx"));
const Join = lazy(() => import("../pages/JoinPage.jsx"));

// 푸터 이용안내 - 진우
const UseGuide = lazy(() => import("../pages/UseGuide.jsx"))

// 메뉴바 고객센터링크 - 진우
const InquiryForm = lazy(() => import("../pages/InquiryForm.jsx"))

/**
 * 어떤 경로에 무슨 컴포넌트를 보여줄 것인지 표시
 */
const root = createBrowserRouter([
    {
        path : "/",
        element : <Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path : "/exam",
        element : <Suspense fallback={Loading}><Exam/></Suspense>
    },
    {

        path : "/login",
        element : <Suspense fallback={Loading}><Login/></Suspense>
    },
    {
        path : "/join/agree",
        element : <Suspense fallback={Loading}><JoinAgree/></Suspense>
    },
    {
        path : "/join",
        element : <Suspense fallback={Loading}><Join/></Suspense>

    },
    {
        path : "/useguide",
        element : <Suspense fallback={Loading}><UseGuide/></Suspense>
    },
    {
        path : "/guide",
        element : <Suspense fallback={Loading}><InquiryForm/></Suspense>
    },
    myPageRoutes
    
])

export default root;