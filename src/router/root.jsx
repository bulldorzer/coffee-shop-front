import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react"; // 컴포넌트 로딩 최적화

const Loading = <div>Loading...</div>
const Main = lazy(() => import("../pages/MainPage.jsx"));

const root = createBrowserRouter([
    {
        path : "/",
        element : <Suspense fallback={Loading}><Main/></Suspense>
    }
    
])

export default root;