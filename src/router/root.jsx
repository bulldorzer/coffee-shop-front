import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react"; // 컴포넌트 로딩 최적화
import myPageRoutes from "./myPageRoutes.jsx"

const Loading = <div>Loading...</div>

// 메인화면
const Main = lazy(() => import("../pages/main/MainPage.jsx"));
// 예제파일
const Exam = lazy(() => import("../pages/ExamplePage.jsx"));

// 로그인관련 - 영일
const Login = lazy(() => import("../pages/LoginPage.jsx"));
const JoinAgree = lazy(() => import("../pages/JoinAgreePage.jsx"));
const Join = lazy(() => import("../pages/JoinPage.jsx"));

// 카트 - 진우
const CartPage = lazy(()=> import("../pages/cart/CartPage.jsx"))

// 푸터 이용안내 - 진우
const UseGuidePage = lazy(() => import("../pages/UseGuidePage.jsx"))
// 주문서 관련 - 진우
const Order = lazy(()=> import("../pages/order/OrderPage.jsx"))
// 메뉴바 고객센터링크 - 진우
const InquiryFormPage = lazy(() => import("../pages/InquiryFormPage.jsx"))

// 상품 목록 - 영일
const ProductList = lazy(() => import("../pages/ProductListPage.jsx"))
// 상품 상세 - 영일
const ProductDetail = lazy(() => import("../pages/ProductDetailPage.jsx"))

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
        element : <Suspense fallback={Loading}><UseGuidePage/></Suspense>
    },
    {
        path : "/guide",
        element : <Suspense fallback={Loading}><InquiryFormPage/></Suspense>
    },
    myPageRoutes,
    {
        path : "/order",
        element : <Suspense fallback={Loading}><Order/></Suspense>
    },
    {
        path : "/cart",
        element : <Suspense fallback={Loading}><CartPage/></Suspense>
    },
    {
        path : "/productList",
        element : <Suspense fallback={Loading}><ProductList/></Suspense>
    },
    {
        path : "/product/:id",
        element : <Suspense fallback={Loading}><ProductDetail/></Suspense>
    }
    
])

export default root;