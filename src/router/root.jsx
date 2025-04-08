import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react"; // 컴포넌트 로딩 최적화

const Loading = <div>Loading...</div>
const Main = lazy(() => import("../pages/MainPage.jsx"));

const Exam = lazy(() => import("../pages/ExamplePage.jsx"));
const Login = lazy(() => import("../pages/LoginPage.jsx"));
const JoinAgree = lazy(() => import("../pages/JoinAgreePage.jsx"));
const Join = lazy(() => import("../pages/JoinPage.jsx"));


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

    }
    
])

export default root;