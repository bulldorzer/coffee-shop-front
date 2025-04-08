import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react"; // 컴포넌트 로딩 최적화

const Loading = <div>Loading...</div>
const Main = lazy(() => import("../pages/MainPage.jsx"));
const Exam = lazy(()=>import("../pages/ExamplePage.jsx"))

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
    }
    
])

export default root;